"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Loader2, FileText, Eye, Settings, Sparkles, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { updateDiagram } from "@/lib/actions/gemin";
import MermaidRenderer from "./gen/MermaidRenderer";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import Link from "next/link";
import LoadingComponent from "./LoadingComponent";

export default function DiagramEditor({ diagram }: { diagram: { id: string; prompt: string; diagram: string } }) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | undefined>(diagram.diagram);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input');
  const [modalOpen, setModalOpen] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    const res = await updateDiagram(diagram.id, prompt);

    if (res.success) {
      setResponse(res.data?.diagram);
      setActiveTab('input');
      setPrompt('')
      setModalOpen(false);
    } else {
      setError(res.error || "Update failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] relative">
      {/* Sheet */}
      <Sheet open={modalOpen} onOpenChange={setModalOpen}>
        <SheetTrigger asChild>
          <Button variant={'ghost'} className="fixed top-6 left-6 z-50 p-3 cursor-pointer dark:bg-slate-900 border border-slate-200 dark:border-slate-700   transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800">
            <Menu className="w-5 h-5 " />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-96 p-0 flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
            <SheetHeader className="space-y-0">
              <SheetTitle className="flex items-center gap-3 text-left">
                <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-sm">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      Forge Flow
                    </span>
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    AI-powered diagram creation
                  </p>
                </div>
              </SheetTitle>
            </SheetHeader>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex rounded-xl p-1 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('input')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  activeTab === 'input'
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                )}
              >
                <FileText className="w-4 h-4" />
                Create
              </button>
              <button
                onClick={() => setActiveTab('output')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  activeTab === 'output'
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                )}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 px-6 py-4 overflow-auto">
            {activeTab === 'input' ? (
              <div className="space-y-6">
                {/* Input Section */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">
                    Describe your diagram
                  </label>
                  <Textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e: any) => setPrompt(e.target.value)}
                    disabled={loading}
                    placeholder="Describe the diagram you want to create... For example: 'Create a flowchart showing the user registration process'"
                    className="min-h-[120px] resize-none border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
                  />
                </div>
                
                {/* Quick Examples */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Quick Examples
                  </h3>
                  <div className="grid gap-2">
                    {[
                      { text: "User authentication flow", icon: "🔐" },
                      { text: "Database architecture diagram", icon: "🗃️" },
                      { text: "API request lifecycle", icon: "🔄" },
                    ].map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(example.text)}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-lg transition-all duration-200 hover:shadow-sm group"
                      >
                        <span className="text-lg">{example.icon}</span>
                        <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100">
                          {example.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <p className="text-sm text-red-700 dark:text-red-400 font-medium">Error</p>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Generated Code */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Generated Code
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                    <pre className="text-xs text-slate-600 dark:text-slate-400 overflow-auto max-h-64 font-mono leading-relaxed">
                      {response || "No diagram generated yet"}
                    </pre>
                  </div>
                </div>
                
                {/* Diagram Statistics */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Diagram Information
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Type</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1">Mermaid</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Status</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1">
                        {response ? "Generated" : "Pending"}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 col-span-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Lines of Code</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1">
                        {response ? response.split('\n').length : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <Button
              onClick={handleUpdate}
              disabled={loading || !prompt.trim()}
              className="w-full h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-3" />
                  Generating Diagram...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3" />
                  Generate Diagram
                </>
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 p-3 md:p-6">
        <div className="flex flex-col">
          <div className="flex-1 overflow-auto mb-16 min-h-[300px]">
            {loading ? (
              <LoadingComponent/>
            ) : response ? (
              <MermaidRenderer response={response} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-lg text-center text-muted-foreground">
                  No diagram yet. Click the menu button to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}