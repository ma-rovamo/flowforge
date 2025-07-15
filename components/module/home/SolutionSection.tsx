'use client'
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Zap, Edit3, ArrowRight, Sparkles, ChevronRight } from "lucide-react";

const SolutionSection = () => {
  const steps = [
    {
      step: "01",
      icon: MessageSquare,
      title: "Describe Your Process",
      description: "Simply tell Flow Forge what you want to map out. Use natural language like 'I need a customer onboarding flow that handles new signups and returning users.'",
      example: "No technical jargon required—just explain it like you would to a colleague.",
      color: "blue",
      visual: (
        <div className="space-y-4">
          <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-gray-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-300">Natural Language Input</span>
            </div>
            <div className="bg-gray-950/60 rounded-lg p-4 border border-gray-800/30">
              <p className="text-gray-300 text-sm font-mono">
                "Create a decision tree for customer support tickets based on urgency and department"
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      step: "02", 
      icon: Zap,
      title: "AI Generates Your Flowchart",
      description: "Our intelligent system understands your requirements and creates a professional flowchart with proper symbols, connections, and layout using Mermaid.js.",
      example: "Perfect formatting, industry-standard symbols, and logical flow automatically applied.",
      color: "blue",
      visual: (
        <div className="space-y-4">
          <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-gray-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-300">AI Processing</span>
              <div className="ml-auto">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
            <div className="bg-gray-950/60 rounded-lg p-4 border border-gray-800/30 font-mono text-sm">
              <div className="text-blue-400 leading-relaxed">
                <span className="text-gray-500"># </span>flowchart TD<br/>
                <span className="text-gray-500"># </span>&nbsp;&nbsp;A[Support Ticket] {'->'} B{'{Urgent?}'}<br/>
                <span className="text-gray-500"># </span>&nbsp;&nbsp;B {'-->'}|Yes| C[Priority Queue]<br/>
                <span className="text-gray-500"># </span>&nbsp;&nbsp;B {'-->'}|No| D{'{Department?}'}<br/>
                <span className="text-gray-500"># </span>&nbsp;&nbsp;D {'-->'}|Tech| E[Tech Support]<br/>
                <span className="text-gray-500"># </span>&nbsp;&nbsp;D {'-->'}|Billing| F[Billing Team]
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: "03",
      icon: Edit3,
      title: "Refine and Perfect",
      description: "Make adjustments through conversation or direct editing. Export in multiple formats or share with your team instantly.",
      example: "PNG, PDF, SVG exports ready. Share via link or integrate with your favorite tools.",
      color: "blue",
      visual: (
        <div className="space-y-4">
          <div className="bg-gray-900/50 backdrop-blur rounded-xl p-6 border border-gray-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-300">Ready to Export</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-950/60 rounded-lg p-4 border border-gray-800/30 text-center hover:border-blue-600/50 hover:bg-blue-900/10 transition-all duration-300 cursor-pointer group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
                <span className="text-xs font-medium text-gray-400 group-hover:text-blue-300">PNG</span>
              </div>
              <div className="bg-gray-950/60 rounded-lg p-4 border border-gray-800/30 text-center hover:border-blue-600/50 hover:bg-blue-900/10 transition-all duration-300 cursor-pointer group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📄</div>
                <span className="text-xs font-medium text-gray-400 group-hover:text-blue-300">PDF</span>
              </div>
              <div className="bg-gray-950/60 rounded-lg p-4 border border-gray-800/30 text-center hover:border-blue-600/50 hover:bg-blue-900/10 transition-all duration-300 cursor-pointer group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎨</div>
                <span className="text-xs font-medium text-gray-400 group-hover:text-blue-300">SVG</span>
              </div>
              <div className="bg-gray-950/60 rounded-lg p-4 border border-gray-800/30 text-center hover:border-blue-600/50 hover:bg-blue-900/10 transition-all duration-300 cursor-pointer group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🔗</div>
                <span className="text-xs font-medium text-gray-400 group-hover:text-blue-300">Share</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-24 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-20">
              <Badge className="mb-8 bg-gradient-to-r from-blue-600/20 to-blue-800/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm group hover:from-blue-600/30 hover:to-blue-800/30 transition-all duration-300">
                <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                <span className="font-medium">The Flow Forge Solution</span>
              </Badge>
              
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                From{' '}
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Conversation
                </span>
                {' '}to{' '}
                <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Creation
                </span>
                <br />
                <span className="text-gray-400 text-4xl md:text-6xl">in Minutes</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
                Experience a completely new way to create flowcharts. No templates, no complex interfaces—
                just natural conversation that transforms into professional diagrams.
              </p>
            </div>

            {/* Steps Section */}
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800/50 backdrop-blur-sm hover:border-blue-800/40 transition-all duration-700 group">
                    {/* Animated glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500" />
                    
                    <div className="relative p-8 md:p-12 lg:p-16">
                      <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                        {/* Content Section */}
                        <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                          <div className="flex items-start gap-6 mb-8">
                            <div className="relative">
                              <div className={`w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-2xl flex items-center justify-center border-2 border-blue-500/30 backdrop-blur-sm group-hover:border-blue-400/50 transition-all duration-500`}>
                                <step.icon className={`h-10 w-10 text-blue-400 group-hover:text-blue-300 transition-colors`} />
                              </div>
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-black">
                                <span className="text-xs font-bold text-white">
                                  {step.step.split('')[1]}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="text-4xl font-bold text-gray-600">
                                  {step.step}
                                </span>
                                <ChevronRight className="h-5 w-5 text-gray-600" />
                              </div>
                              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                                {step.title}
                              </h3>
                            </div>
                          </div>
                          
                          <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                            {step.description}
                          </p>
                          
                          <div className={`p-6 bg-gradient-to-r from-blue-500/10 to-blue-700/10 rounded-xl border border-blue-500/20 backdrop-blur-sm`}>
                            <div className="flex items-start gap-3">
                              <Sparkles className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                              <p className="text-sm md:text-base font-medium text-blue-300 leading-relaxed">
                                {step.example}
                              </p>
                            </div>
                          </div>
                          
                          {/* Connection Arrow for larger screens */}
                          {index < steps.length - 1 && (
                            <div className="hidden lg:flex items-center justify-center mt-12">
                              <div className="flex items-center gap-3 text-blue-500/60">
                                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-500/40"></div>
                                <ArrowRight className="h-6 w-6 animate-pulse" />
                                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500/40 to-transparent"></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Visual Section */}
                        <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl blur-xl"></div>
                            <div className="relative">
                              {step.visual}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionSection;
