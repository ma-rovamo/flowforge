// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Loader2, FileText, Eye, Settings, Sparkles, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
// import { updateDiagram } from "@/lib/actions/gemin";
// import MermaidRenderer from "./gen/MermaidRenderer";
// import { cn } from "@/lib/utils";
// import { Textarea } from "./ui/textarea";
// import Link from "next/link";
// import LoadingComponent from "./LoadingComponent";

// export default function DiagramEditor({ diagram }: { diagram: { id: string; prompt: string; diagram: string } }) {
//   // const [prompt, setPrompt] = useState(diagram.prompt);
//   const [prompt, setPrompt] = useState('');
//   const [response, setResponse] = useState<string | undefined>(diagram.diagram);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<'input' | 'output'>('input');
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // Check if screen is mobile on mount and resize
//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       if (mobile) {
//         setSidebarCollapsed(true);
//       }
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const handleUpdate = async () => {
//     setLoading(true);
//     setError(null);
//     const res = await updateDiagram(diagram.id, prompt);

//     if (res.success) {
//       setResponse(res.data?.diagram);
//       setActiveTab('input');
//       setPrompt('')
//       if (isMobile) {
//         setMobileMenuOpen(false);
//       }
//     } else {
//       setError(res.error || "Update failed");
//     }

//     setLoading(false);
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   return (
//     <div className="flex h-[calc(100vh-6rem)] relative">
//       {/* Mobile Menu Button */}
//       {isMobile && (
//         <button
//           onClick={toggleMobileMenu}
//           className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg md:hidden"
//         >
//           {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//         </button>
//       )}

//       {/* Mobile Overlay */}
//       {isMobile && mobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={() => setMobileMenuOpen(false)}
//         />
//       )}

//       {/* Left Sidebar */}
//       <div className={cn(
//         "border-r border-slate-700 transition-all duration-300 ease-in-out ",
//         // Desktop behavior
//         "hidden md:flex md:flex-col",
//         sidebarCollapsed ? "md:w-16" : "md:w-80",
//         // Mobile behavior
//         isMobile && mobileMenuOpen && "fixed inset-y-0 left-0 z-40 w-80 flex flex-col md:relative md:z-auto",
//         isMobile && !mobileMenuOpen && "hidden"
//       )}>
//         {/* Sidebar Header */}
//         <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-700 relative">
//           <div className={cn(
//             "flex items-center gap-3 transition-all duration-300",
//             sidebarCollapsed && !isMobile ? "justify-center" : ""
//           )}>
//             <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
//               <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//             </div>
//             {(!sidebarCollapsed || isMobile) && (
//               <div className="min-w-0">
//                 <Link href="/" className="flex items-center gap-2">
//                 <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
//                  Forge Flow
//                 </h2>
//                 </Link>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">
//                   Create stunning diagrams with AI
//                 </p>
//               </div>
//             )}
//           </div>
          
//           {/* Collapse Button - Desktop Only */}
//           {!isMobile && (
//             <button
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className={cn(
//                 "absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm",
//                 sidebarCollapsed ? "rotate-180" : ""
//               )}
//             >
//               <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
//             </button>
//           )}
//         </div>

//         {(sidebarCollapsed && !isMobile) ? (
//           /* Collapsed Sidebar Content - Desktop Only */
//           <div className="flex flex-col items-center p-4 space-y-4">
//             <button
//               onClick={() => setActiveTab('input')}
//               className={cn(
//                 "p-3 rounded-lg transition-all tooltip",
//                 activeTab === 'input'
//                   ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
//                   : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
//               )}
//               title="Input"
//             >
//               <FileText className="w-5 h-5" />
//             </button>
//             <button
//               onClick={() => setActiveTab('output')}
//               className={cn(
//                 "p-3 rounded-lg transition-all",
//                 activeTab === 'output'
//                   ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
//                   : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
//               )}
//               title="Preview"
//             >
//               <Eye className="w-5 h-5" />
//             </button>
//             <div className="flex-1" />
//             <button
//               onClick={handleUpdate}
//               disabled={loading || !prompt.trim()}
//               className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
//               title="Generate Diagram"
//             >
//               {loading ? (
//                 <Loader2 className="animate-spin w-5 h-5" />
//               ) : (
//                 <Sparkles className="w-5 h-5" />
//               )}
//             </button>
//           </div>
//         ) : (
//           /* Expanded Sidebar Content */
//           <>
//             {/* Sidebar Navigation */}
//             <div className="p-4">
//               <div className="flex rounded-lg  p-1">
//                 <button
//                   onClick={() => setActiveTab('input')}
//                   className={cn(
//                     "flex-1 flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all",
//                     activeTab === 'input'
//                       ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
//                       : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
//                   )}
//                 >
//                   <FileText className="w-4 h-4" />
//                   Input
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('output')}
//                   className={cn(
//                     "flex-1 flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all",
//                     activeTab === 'output'
//                       ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
//                       : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
//                   )}
//                 >
//                   <Eye className="w-4 h-4" />
//                   Preview
//                 </button>
//               </div>
//             </div>

//             {/* Sidebar Content */}
//             <div className="flex-1 p-4 overflow-auto">
//               {activeTab === 'input' ? (
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Textarea
//                       id="prompt"
//                       value={prompt}
//                       onChange={(e: any) => setPrompt(e.target.value)}
//                       disabled={loading}
//                       placeholder="Describe the diagram you want to create... For example: 'Create a flowchart showing the user registration process'"
                      
//                     />
//                   </div>
                  
                  
//                     <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Quick Examples</h3>
//                     <div>
//                       {[
//                         "User authentication flow",
//                         "Database architecture diagram",
//                         "API request lifecycle",
//                       ].map((example, index) => (
//                         <button
//                           key={index}
//                           onClick={() => setPrompt(example)}
//                           className="w-full text-left px-3  text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
//                         >
//                           {example}
//                         </button>
//                       ))}
                 
//                   </div>

//                   {error && (
//                     <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
//                       <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Generated Code</h3>
//                     <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md p-3">
//                       <pre className="text-xs text-slate-600 dark:text-slate-400 overflow-auto max-h-60">
//                         {response || "No diagram generated yet"}
//                       </pre>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Diagram Info</h3>
//                     <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
//                       <p>Type: Mermaid Diagram</p>
//                       <p>Status: {response ? "Generated" : "Pending"}</p>
//                       <p>Lines: {response ? response.split('\n').length : 0}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Sidebar Footer */}
//             <div className="p-4 border-t border-slate-200 dark:border-slate-700">
//               <Button
//                 onClick={handleUpdate}
//                 disabled={loading || !prompt.trim()}
//                 className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin w-4 h-4 mr-2" />
//                     Generating...
//                   </>
//                 ) : (
//                   <>
//                     <Sparkles className="w-4 h-4 mr-2" />
//                     Generate Diagram
//                   </>
//                 )}
//               </Button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Main Content Area */}
//       <div className={cn(
//         "flex-1 p-3 md:p-6",
//         isMobile && mobileMenuOpen && "blur-sm"
//       )}>
//       {/* Right Side - Output Section */}
// {/* Right Side - Output Section */}
// <div className=" flex flex-col ">
//   <div className="flex-1 overflow-auto  mb-16  min-h-[300px]">
//     {loading ? (
//       <LoadingComponent/>
//     ) : response ? (
//       <MermaidRenderer response={response} />
//     ) : (
//       <div className="flex items-center justify-center h-full">
//         <p className="text-lg text-center text-muted-foreground">
//           No diagram yet. {typeof window !== 'undefined' && window.innerWidth < 768 
//             ? "Tap the menu to get started" 
//             : "Enter a description in the sidebar to get started"}
//         </p>
//       </div>
//     )}
//   </div>
// </div>


//       </div>
//     </div>
//   );
// }