"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { getALLDiagram } from "@/lib/actions/gemin";
import { truncateText } from "@/lib/utils";

type Diagram = {
  id: string;
  prompt: string;
  diagram: string;
  createdAt?: string;
};

export default function AllDiagrams() {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiagrams = async () => {
      try {
        // Direct call to server action (wrapped inside client)
        const data:any = await getALLDiagram();
        setDiagrams(data);
      } catch (err) {
        console.error("Failed to fetch diagrams:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiagrams();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (!diagrams.length) {
    return (
      <p className="text-center text-muted-foreground py-10">No diagrams found.</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      {diagrams.map((diagram) => (
        <div
          key={diagram.id}
          className=""
        >
             <Link
              href={`/diagrams/${diagram.id}`}
              className="text-sm text-blue-500 hover:underline"
            >

          <h2 className="text-sm font-medium mb-2 text-muted-foreground">
          <p>{truncateText(diagram.prompt, 24)}</p>

          </h2>
            </Link>
        </div>
      ))}
    </div>
  );
}
