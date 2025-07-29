"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Eye, 
  Edit3, 
  Trash2, 
  Calendar,
  Search,
  Grid3X3,
  List,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow } from 'date-fns';

interface Diagram {
  id: string;
  prompt: string;
  diagram: any;
  createdAt: Date;
  updatedAt: Date;
}

interface DiagramsListProps {
  diagrams: Diagram[];
}

const DiagramsList: React.FC<DiagramsListProps> = ({ diagrams }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDiagrams = diagrams.filter(diagram =>
    diagram.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const DiagramCard = ({ diagram }: { diagram: Diagram }) => {
    const nodeCount = diagram.diagram?.nodes?.length || 0;
    const edgeCount = diagram.diagram?.edges?.length || 0;

    return (
      <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Preview */}
        <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {nodeCount}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                Nodes • {edgeCount} Edges
              </div>
            </div>
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link href={`/test/${diagram.id}`}>
              <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm">
              {diagram.prompt}
            </h3>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDistanceToNow(new Date(diagram.createdAt), { addSuffix: true })}
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/test/${diagram.id}`}>
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <Eye className="h-3 w-3" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="h-7 px-2">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DiagramRow = ({ diagram }: { diagram: Diagram }) => {
    const nodeCount = diagram.diagram?.nodes?.length || 0;
    const edgeCount = diagram.diagram?.edges?.length || 0;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 dark:text-white truncate">
              {diagram.prompt}
            </h3>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <span>{nodeCount} nodes • {edgeCount} edges</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDistanceToNow(new Date(diagram.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Link href={`/test/${diagram.id}`}>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (diagrams.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
            <Grid3X3 className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            No diagrams yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Create your first flow diagram to get started
          </p>
          <Link href="/test">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Create Your First Diagram
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search diagrams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {filteredDiagrams.length} diagram{filteredDiagrams.length !== 1 ? 's' : ''}
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Diagrams */}
      {filteredDiagrams.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300">
            No diagrams found matching "{searchTerm}"
          </p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-3'
        }>
          {filteredDiagrams.map((diagram) => (
            <div key={diagram.id}>
              {viewMode === 'grid' ? (
                <DiagramCard diagram={diagram} />
              ) : (
                <DiagramRow diagram={diagram} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiagramsList;