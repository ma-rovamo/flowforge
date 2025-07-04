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
			contents: `
You are a Mermaid.js diagram generator.

Your job is to:
1. Interpret the user's prompt as a request to visualize something using Mermaid.js.
2. If the prompt is vague or non-technical, make reasonable assumptions and create a simple flowchart.
3. If the request includes an unsupported format (like BPMN or UML), ignore that and instead convert it into a valid Mermaid.js diagram.
4. If you cannot infer any meaningful structure, return this safe fallback:

\`\`\`mermaid
graph TD;
  A[Invalid or unclear prompt]
\`\`\`

Rules:
- Always respond ONLY with a valid Mermaid.js code block.
- Do NOT include any explanation, extra text, or markdown outside the Mermaid code block.

Prompt:
${prompt}
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
			contents: `
You are a Mermaid.js diagram editor.

- Your task is to update the given Mermaid diagram ONLY based on the user's new instruction.
- DO NOT regenerate the full diagram unless absolutely necessary.
- Apply only the specific updates mentioned by the user (e.g., change text, color, add one node, rename label, etc).
- Keep all other parts of the diagram unchanged.
- Respond ONLY with a valid Mermaid.js code block — no explanation or extra text.

Original Diagram:
\`\`\`mermaid
${originalDiagram}
\`\`\`

User Update Instruction:
"${newPrompt}"
      `,
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
