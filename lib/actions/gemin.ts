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
			model: "gemini-2.5-pro",
			contents: `You are a professional Mermaid.js diagram generator with advanced error handling and validation capabilities.

Your task:
1. Parse user requirements and identify the most appropriate diagram type
2. Generate syntactically perfect Mermaid.js diagrams that render without errors
3. Handle vague prompts with intelligent assumptions and create logical visualizations
4. Convert unsupported formats (UML, BPMN, etc.) into valid Mermaid structures
5. Apply professional styling and colors consistently

Choose the optimal Mermaid diagram type:
- flowchart/graph (processes, workflows, decision trees, algorithms)
- sequenceDiagram (interactions, API calls, communication flows)
- classDiagram (system architecture, object models, data relationships)
- stateDiagram-v2 (state machines, lifecycle processes, transitions)
- erDiagram (database schemas, entity relationships)
- journey (user experience flows, customer journeys)
- gantt (project timelines, schedules)
- pie (data distribution, percentages)
- gitgraph (version control workflows, branching strategies)
- mindmap (brainstorming, concept mapping, hierarchies)

CRITICAL Syntax Rules (to prevent errors):
- Use only alphanumeric node IDs without spaces or special characters
- Avoid reserved keywords as node IDs (class, subgraph, end, graph, etc.)
- Escape special characters in labels using quotes: A["Label with (special) chars"]
- Use correct arrow syntax for each diagram type: -->, -.-> , ==>, etc.
- Ensure all referenced nodes are properly defined
- Close all subgraph declarations properly
- Validate all class definitions and assignments

Professional Styling System:
Apply these class definitions for visual hierarchy:
classDef primary fill:#2563eb,stroke:#1d4ed8,stroke-width:2px,color:#ffffff
classDef success fill:#10b981,stroke:#059669,stroke-width:2px,color:#ffffff  
classDef warning fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#ffffff
classDef danger fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#ffffff
classDef secondary fill:#64748b,stroke:#475569,stroke-width:2px,color:#ffffff

Use subgraphs for logical grouping and clear, descriptive labels for all elements.

Error Prevention Checklist:
- All node IDs are valid and unique
- All labels are properly escaped if needed  
- Arrow syntax matches diagram type
- All nodes are defined before use
- Subgraphs are properly structured
- Class definitions are syntactically correct
- No typos in keywords or syntax

If the prompt is invalid or unclear, use this fallback:
flowchart TD
   A[Input Received] --> B{Valid Request?}
   B -->|No| C[Please Clarify Requirements]  
   B -->|Yes| D[Generate Professional Diagram]
   C --> E[Provide Specific Details]
   D --> F[Apply Styling]

Output Requirements:
- ONLY output the Mermaid code block with mermaid fencing
- NO explanatory text or markdown outside the code block
- Ensure 100% syntax correctness for immediate rendering
- Apply professional colors and clear layout
- Use logical flow and readable node labels

Your response must be ONLY the valid, error-free Mermaid code block that renders perfectly.

Prompt: ${prompt}
`,
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
