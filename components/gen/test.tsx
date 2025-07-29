"use client";

import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  BackgroundVariant,
  MarkerType,
} from '@xyflow/react';

// Import React Flow styles
import '@xyflow/react/dist/style.css';

interface ReactFlowRendererProps {
  response: {
    nodes: Node[];
    edges: Edge[];
  };
}

const ReactFlowRenderer: React.FC<ReactFlowRendererProps> = ({ response }) => {
  // Initialize nodes and edges with proper typing
  const initialNodes = useMemo(() => {
    if (!response?.nodes) return [];
    return response.nodes.map((node) => ({
      ...node,
      // Ensure markerEnd is properly set for edges if needed
    //   @ts-ignore
      markerEnd: node.markerEnd || undefined,
    }));
  }, [response?.nodes]);

  const initialEdges = useMemo(() => {
    if (!response?.edges) return [];
    return response.edges.map((edge) => ({
      ...edge,
      // Set default marker type if not specified
      markerEnd: edge.markerEnd || { type: MarkerType.ArrowClosed },
    }));
  }, [response?.edges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Don't render if no data
  if (!response || (!response.nodes?.length && !response.edges?.length)) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
        <p className="text-gray-500 dark:text-gray-400">No diagram data to display</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
          proOptions={{ hideAttribution: true }}
        fitView
        fitViewOptions={{
          padding: 0.2,
          includeHiddenNodes: false,
        }}
        attributionPosition="bottom-left"
        className="bg-gray-50 dark:bg-gray-800"
      >
        <Controls 
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg"
          style={{
            bottom: 20,
            left: 20,
          }}
        />
        {/* <MiniMap 
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg"
          style={{
            backgroundColor: '#f9fafb',
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
          nodeColor={(node) => {
            if (node.style?.backgroundColor) {
              return node.style.backgroundColor as string;
            }
            return '#3b82f6';
          }}
          nodeStrokeWidth={2}
          pannable
          zoomable
        /> */}
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          color="#e5e7eb"
          className="dark:opacity-20"
        />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowRenderer;