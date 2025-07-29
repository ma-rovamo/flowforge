import React from 'react';
import { getALLDiagramTest } from '@/lib/actions/flow';
import { Workflow, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DiagramsList from '@/components/gen/TestList';

const Show = async () => {
  const rawDiagrams = await getALLDiagramTest();
  const diagrams = rawDiagrams
    .filter((d: any) => d.createdAt !== null)
    .map((d: any) => ({
      ...d,
      createdAt: d.createdAt as Date,
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Workflow className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Diagrams
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage and view all your flow diagrams
                </p>
              </div>
            </div>
            
            <Link href="/test">
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4" />
                Create New
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <DiagramsList diagrams={diagrams} />
      </div>
    </div>
  );
};

export default Show;