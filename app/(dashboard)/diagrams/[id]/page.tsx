import DiagramEditor from '@/components/DiagramEditor';
import { db } from '@/drizzle/db';
import { diagrams } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import React from 'react'

const DiagramsDynamice = async ({params,}: {params: Promise<{ id: string }>}) => {
    const {id } = await params
      const data = await db
    .select()
    .from(diagrams)
    .where(eq(diagrams.id, id))
    .limit(1);

  if (!data.length) return <div>Diagram not found</div>;
  return (
    <><DiagramEditor diagram={data[0]} /></>
  )
}

export default DiagramsDynamice