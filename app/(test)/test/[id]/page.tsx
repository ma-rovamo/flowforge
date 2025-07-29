import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/drizzle/db';
import {  flow } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import Viewer from '@/components/gen/Viewer';



const DiagramPage = async ({ params }: {params:Promise<{id:string}>}) => {
  const { id } = await params;

  try {
    // Fetch the diagram from database
    const diagramData = await db
      .select()
      .from(flow)
      .where(eq(flow.id, id))
      .limit(1);

    if (!diagramData.length) {
      notFound();
    }

    const diagram = diagramData[0];
    const parsedDiagram = JSON.parse(diagram.diagram);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Viewer 
          id={diagram.id}
          initialPrompt={diagram.prompt}
          initialDiagram={parsedDiagram}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching diagram:', error);
    notFound();
  }
};

export default DiagramPage;