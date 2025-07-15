// This is a infrastructure component that renders demos
// Please do not modify this file

import { Card } from "@/components/ui/card";
import { AlertTriangle, Clock, Users, FileX, ArrowDown, Zap } from "lucide-react";

function ProblemSection() {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Complex Interfaces",
      description: "Most tools force you through confusing menus, endless templates, and overwhelming feature sets that distract from your actual goal."
    },
    {
      icon: Clock,
      title: "Steep Learning Curves",
      description: "Hours spent watching tutorials and reading documentation instead of focusing on documenting your actual process flows."
    },
    {
      icon: FileX,
      title: "Abandoned Projects",
      description: "Teams start with enthusiasm but give up halfway through because the tools are too frustrating and time-consuming to master."
    },
    {
      icon: Users,
      title: "Avoiding Documentation",
      description: "Important processes go undocumented and team knowledge stays siloed because creating flowcharts feels like a chore."
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5 mb-6">
              <AlertTriangle className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">The Problem Space</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Why Most Flowchart Tools </span>
              <span className="bg-gradient-to-r from-bleu-400 via-blue-500 to-blue-500 bg-clip-text text-transparent">
                Miss the Mark
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
              Most flowchart creators treat every user the same way—forcing you through complex interfaces,
              endless template libraries, and steep learning curves. You spend more time 
              <span className="text-white font-medium"> fighting the tool </span>
              than focusing on your actual process.
            </p>
            
            <div className="mt-8 flex justify-center">
              <ArrowDown className="h-6 w-6 text-slate-400 animate-bounce" />
            </div>
          </div>

          {/* Problems Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            {problems.map((problem, index) => {
              const IconComponent = problem.icon;
              return (
                <Card 
                  key={index} 
                  className="group relative p-8 bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-500 hover:border-slate-700/50 overflow-hidden"
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl border border-red-500/20 group-hover:border-red-400/30 transition-colors duration-300">
                        <IconComponent className="h-7 w-7 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-semibold text-white group-hover:text-slate-50 transition-colors duration-300">
                        {problem.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-base group-hover:text-slate-300 transition-colors duration-300">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Impact Statement */}
          <div className="max-w-4xl mx-auto">
            <Card className="relative p-10 bg-gradient-to-br from-red-500/10 via-red-500/5 to-orange-500/10 border border-red-500/20 backdrop-blur-sm overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-2xl" />
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 mb-6">
                  <Zap className="h-5 w-5 text-orange-400" />
                  <span className="text-sm font-medium text-orange-300 uppercase tracking-wider">The Result</span>
                </div>
                
                <p className="text-2xl md:text-3xl font-medium leading-relaxed">
                  <span className="text-red-300">Abandoned projects</span>,
                  <span className="text-white"> inconsistent diagrams</span>, and
                  <span className="text-red-300"> teams avoiding documentation </span>
                  <span className="text-slate-300">altogether.</span>
                </p>
                
                <div className="mt-8 flex justify-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
