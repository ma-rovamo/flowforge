"use server";
import { constantsCode } from "@/constants";
import { db } from "@/drizzle/db";
import { diagrams } from "@/drizzle/schema";
import { GoogleGenAI } from "@google/genai";
import { eq } from "drizzle-orm";

const apiKey = process.env.GEMINI_API_KEY!;

const genAI = new GoogleGenAI({ apiKey });

export const generateContent = async (prompt: string) => {
	try {
		const response = await genAI.models.generateContent({
			model: "gemini-2.5-flash",
			contents: `You are a professional Mermaid.js diagram generator.

Your task:
1. Interpret the user's prompt and generate a valid Mermaid.js diagram that clearly visualizes the described concept.
2. If the prompt is vague or non-technical, make thoughtful assumptions and create a simple, logical flowchart.
3. If the request includes unsupported formats like UML or BPMN, reinterpret the intent and convert it into a valid Mermaid.js structure.
4. Choose the most appropriate Mermaid diagram type based on the user's request:
   - flowchart/graph (for processes, workflows, decision trees)
   - sequenceDiagram (for interactions, API calls, communication)
   - classDiagram (for system architecture, data models)
   - stateDiagram-v2 (for state machines, lifecycle processes)
   - erDiagram (for database schemas, relationships)
   - journey (for user experience flows)
   - gantt (for project timelines)
   - pie (for data distribution)
   - gitgraph (for version control workflows)
   - mindmap (for brainstorming, concepts)
5. If no valid structure can be inferred, return this fallback:

\`\`\`mermaid
graph TD;
  A[Invalid or unclear prompt]
\`\`\`

Formatting & Style Guidelines:
- Always use the Mermaid.js syntax only — do NOT include any explanation, text, or markdown outside the code block.
- Use \`\`\`mermaid fenced code block at the beginning and end.
- Default to clean and readable layouts like \`flowchart TD\` or \`graph LR\`.
- Apply professional styling using these color schemes:
  - Primary: #2563eb (blue), #059669 (emerald), #7c3aed (purple)
  - Secondary: #64748b (slate), #6b7280 (gray)
  - Success: #10b981 (green), Warning: #f59e0b (amber), Error: #ef4444 (red)
- Use professional classDef styling:
  \`classDef primary fill:#2563eb,stroke:#1d4ed8,stroke-width:2px,color:#ffffff\`
  \`classDef success fill:#10b981,stroke:#059669,stroke-width:2px,color:#ffffff\`
  \`classDef warning fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#ffffff\`
  \`classDef danger fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#ffffff\`
- Apply professional styling when appropriate using Mermaid features such as:
  - \`classDef\` for color themes and highlights with professional colors.
  - \`subgraph\` for grouping related nodes with descriptive titles.
  - Clear naming conventions and spacing to improve readability.
  - Assign classes to nodes using \`class\` statements for visual hierarchy.

Your response must be ONLY the Mermaid code block, and it should always be clean, valid, and professional-looking with appropriate colors and styling.


Prompt: ${prompt}`,
		});

		const text = response.text as any;
		const match = text.match(/```mermaid([\s\S]*?)```/);
		const diagram = match ? match[1].trim() : "graph TD;\nA[Failed to parse]";
		// save to database
		const addDiagrams = await db
			.insert(diagrams)
			.values({
				prompt,
				diagram,
			})
			.returning();
		const insertedDiagram = addDiagrams[0];
		return {
			success: true,
			data: {
				id: insertedDiagram.id,
				prompt,
				diagram,
			},
		};
	} catch (error: any) {
		return {
			success: false,
			error: error || "graph TD;\nA[Error generating diagram]",
		};
	}
};

export const updateDiagram = async (id: string, newPrompt: string) => {
	try {
		// 1. Get the existing diagram
		const existing = await db
			.select()
			.from(diagrams)
			.where(eq(diagrams.id, id));

		if (!existing.length) {
			return {
				success: false,
				error: "Diagram not found",
			};
		}

		const originalDiagram = existing[0].diagram;

		// 2. Ask Gemini to apply only specific updates
		const response = await genAI.models.generateContent({
			model: "gemini-2.5-flash",
			contents: `You are a Mermaid.js diagram editor.
- Your task is to update the given Mermaid diagram ONLY based on the user's new instruction.
- DO NOT regenerate the full diagram unless absolutely necessary.
- Apply only the specific updates mentioned by the user (e.g., change text, color, add one node, rename label, etc).
- Keep all other parts of the diagram unchanged including existing professional styling.
- Maintain existing classDef definitions and color schemes.
- Respond ONLY with a valid Mermaid.js code block — no explanation or extra text.

Original Diagram:
\`\`\`mermaid
${originalDiagram}
\`\`\`

User Update Instruction:
"${newPrompt}"`,
		});

		// 3. Extract the new diagram
		const text = response.text as any;
		const match = text.match(/```mermaid([\s\S]*?)```/);
		const updatedDiagram = match
			? match[1].trim()
			: "graph TD;\nA[Failed to parse]";

		// 4. Update DB
		await db
			.update(diagrams)
			.set({
				prompt: newPrompt,
				diagram: updatedDiagram,
			})
			.where(eq(diagrams.id, id));

		// 5. Return updated data
		return {
			success: true,
			data: {
				id,
				prompt: newPrompt,
				diagram: updatedDiagram,
			},
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.message || "Failed to update diagram",
		};
	}
};

export const getALLDiagram = async () => {
	const diagramsData = await db.select().from(diagrams);
	return diagramsData;
};
