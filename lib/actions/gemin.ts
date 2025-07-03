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
  Convert this prompt into a valid Mermaid.js diagram. Respond ONLY with the Mermaid code block.

  Prompt: ${prompt}
  `,
		});

		const text = response.text as any;
		const match = text.match(/```mermaid([\s\S]*?)```/);
		const diagram = match ? match[1].trim() : "graph TD;\nA[Failed to parse]";
		
		// save to database
		const addDiagrams = await db.insert(diagrams).values({
			prompt,
			diagram,
		});
	return {
			success: true,
			data: {
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
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Update or regenerate a valid Mermaid.js diagram based on this new prompt:
"${newPrompt}"
Respond ONLY with the updated Mermaid code block.
      `,
    });

    const text = response.text as any;
    const match = text.match(/```mermaid([\s\S]*?)```/);
    const diagram = match ? match[1].trim() : "graph TD;\nA[Failed to parse]";

    // Update existing diagram in DB
    const updated = await db
      .update(diagrams)
      .set({
        prompt: newPrompt,
        diagram,
      })
      .where(eq(diagrams.id, id));

    return {
      success: true,
      data: {
        prompt: newPrompt,
        diagram,
        id,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to update diagram",
    };
  }
};


export const getALLDiagram = async ()=> {

	const diagramsData = await db.select().from(diagrams);
	return diagramsData;
	
}
