"use server";
import { constantsCode } from "@/constants";
import { db } from "@/drizzle/db";
import { flow } from "@/drizzle/schema";
import { GoogleGenAI } from "@google/genai";
import { eq } from "drizzle-orm";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenAI({ apiKey });

// Types for React Flow
interface ReactFlowNode {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: { label: string; [key: string]: any };
  style?: { [key: string]: any };
}

interface ReactFlowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  label?: string;
  style?: { [key: string]: any };
  markerEnd?: { type: string };
}

interface ReactFlowDiagram {
  nodes: ReactFlowNode[];
  edges: ReactFlowEdge[];
}

export const generateContentTest = async (prompt: string) => {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `You are a professional React Flow diagram generator that converts natural language descriptions into structured React Flow diagrams.

Your task:
1. Parse user requirements and create appropriate React Flow node and edge structures
2. Generate nodes with proper positioning, styling, and data
3. Create edges that connect nodes logically
4. Handle vague prompts with intelligent assumptions
5. Apply professional styling and colors

React Flow Node Types Available:
- input: Entry points (rounded rectangles)
- default: Standard process nodes (rectangles)  
- output: End points (rounded rectangles)
- group: Container nodes for grouping

React Flow Edge Types Available:
- default: Standard straight edges
- straight: Straight lines
- step: Step edges with right angles
- smoothstep: Smooth step edges
- bezier: Curved bezier edges

Position nodes intelligently:
- Use a grid-like layout for flowcharts (150px spacing)
- Start from top-left (0,0) and arrange logically
- For hierarchical flows: top-to-bottom
- For process flows: left-to-right
- For network diagrams: distributed layout

Professional Styling:
- Primary nodes: #3b82f6 (blue)
- Success nodes: #10b981 (green)
- Warning nodes: #f59e0b (orange)
- Error nodes: #ef4444 (red)
- Default nodes: #6b7280 (gray)

Node styling example:
{
  backgroundColor: '#3b82f6',
  color: 'white',
  border: '2px solid #1d4ed8',
  borderRadius: '8px',
  padding: '10px',
  fontSize: '14px',
  fontWeight: '500'
}

Edge styling example:
{
  stroke: '#6b7280',
  strokeWidth: 2
}

Common diagram patterns to recognize:
1. Flowchart/Process: Sequential steps with decision points
2. Organizational: Hierarchical structure
3. Network: Interconnected components
4. Timeline: Linear progression
5. System Architecture: Components and connections
6. User Journey: Step-by-step user actions
7. Database Schema: Entities and relationships

Output Requirements:
- ONLY output a valid JSON object with 'nodes' and 'edges' arrays
- NO explanatory text, markdown, or code blocks
- Ensure all node IDs are unique
- Position nodes to avoid overlaps
- Create logical connections between related nodes
- Apply appropriate node types and styling

Example output structure:
{
  "nodes": [
    {
      "id": "1",
      "type": "input",
      "position": { "x": 0, "y": 0 },
      "data": { "label": "Start" },
      "style": { "backgroundColor": "#10b981", "color": "white" }
    }
  ],
  "edges": [
    {
      "id": "e1-2",
      "source": "1",
      "target": "2",
      "type": "default",
      "markerEnd": { "type": "arrowclosed" }
    }
  ]
}

Prompt: ${prompt}`,
    });

    const text = response.text as string;
    
    // Try to parse JSON from the response
    let diagramData: ReactFlowDiagram;
    try {
      // Remove any potential markdown formatting
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      diagramData = JSON.parse(cleanText);
    } catch (parseError) {
      // Fallback diagram if parsing fails
      diagramData = {
        nodes: [
          {
            id: '1',
            type: 'input',
            position: { x: 0, y: 0 },
            data: { label: 'Failed to Parse' },
            style: { backgroundColor: '#ef4444', color: 'white' }
          },
          {
            id: '2',
            type: 'default',
            position: { x: 0, y: 100 },
            data: { label: 'Please try again with a clearer prompt' },
            style: { backgroundColor: '#6b7280', color: 'white' }
          }
        ],
        edges: [
          {
            id: 'e1-2',
            source: '1',
            target: '2',
            markerEnd: { type: 'arrowclosed' }
          }
        ]
      };
    }

    // Validate the diagram structure
    if (!diagramData.nodes || !Array.isArray(diagramData.nodes)) {
      throw new Error('Invalid diagram structure: missing nodes array');
    }
    if (!diagramData.edges || !Array.isArray(diagramData.edges)) {
      throw new Error('Invalid diagram structure: missing edges array');
    }

    // Save to database
    const addDiagrams = await db
      .insert(flow)
      .values({
        prompt,
        diagram: JSON.stringify(diagramData),
      })
      .returning();
    
    const insertedDiagram = addDiagrams[0];
    
    return {
      success: true,
      data: {
        id: insertedDiagram.id,
        prompt,
        diagram: diagramData,
      },
    };
  } catch (error: any) {
    // Fallback error diagram
    const errorDiagram: ReactFlowDiagram = {
      nodes: [
        {
          id: 'error',
          type: 'default',
          position: { x: 0, y: 0 },
          data: { label: 'Error generating diagram' },
          style: { backgroundColor: '#ef4444', color: 'white' }
        }
      ],
      edges: []
    };

    return {
      success: false,
      error: error.message || "Error generating diagram",
      data: {
        diagram: errorDiagram
      }
    };
  }
};

export const updateDiagramTest = async (id: string, newPrompt: string) => {
  try {
    // Get the existing diagram
    const existing = await db
      .select()
      .from(flow)
      .where(eq(flow.id, id));

    if (!existing.length) {
      return {
        success: false,
        error: "Diagram not found",
      };
    }

    const originalDiagramString = existing[0].diagram;
    let originalDiagram: ReactFlowDiagram;
    
    try {
      originalDiagram = JSON.parse(originalDiagramString);
    } catch {
      return {
        success: false,
        error: "Invalid existing diagram format",
      };
    }

    // Ask Gemini to update the diagram
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a React Flow diagram editor.
- Update the given React Flow diagram based on the user's instruction
- Apply only the specific updates mentioned (add nodes, modify labels, change colors, etc.)
- Keep existing structure and styling where possible
- Maintain proper node positioning and connections
- Output ONLY a valid JSON object with 'nodes' and 'edges' arrays

Original Diagram:
${JSON.stringify(originalDiagram, null, 2)}

User Update Instruction:
"${newPrompt}"

Remember: Output only the JSON structure, no explanation or markdown.`,
    });

    const text = response.text as string;
    let updatedDiagram: ReactFlowDiagram;
    
    try {
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      updatedDiagram = JSON.parse(cleanText);
    } catch {
      return {
        success: false,
        error: "Failed to parse updated diagram",
      };
    }

    // Update database
    await db
      .update(flow)
      .set({
        prompt: newPrompt,
        diagram: JSON.stringify(updatedDiagram),
      })
      .where(eq(flow.id, id));

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

export const getALLDiagramTest = async () => {
  const diagramsData = await db.select().from(flow);
  
  // Parse diagram JSON strings back to objects
  return diagramsData.map(diagram => ({
    ...diagram,
    diagram: JSON.parse(diagram.diagram)
  }));
};