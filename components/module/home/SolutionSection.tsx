'use client'
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Zap, Edit3, ArrowRight } from "lucide-react";

const SolutionSection = () => {
  const steps = [
    {
      step: "01",
      icon: MessageSquare,
      title: "Describe Your Process",
      description: "Simply tell Flow Forge what you want to map out. Use natural language like 'I need a customer onboarding flow that handles new signups and returning users.'",
      example: "No technical jargon required—just explain it like you would to a colleague.",
      color: "blue-600"
    },
    {
      step: "02", 
      icon: Zap,
      title: "AI Generates Your Flowchart",
      description: "Our intelligent system understands your requirements and creates a professional flowchart with proper symbols, connections, and layout using Mermaid.js.",
      example: "Perfect formatting, industry-standard symbols, and logical flow automatically applied.",
      color: "blue-500"
    },
    {
      step: "03",
      icon: Edit3,
      title: "Refine and Perfect",
      description: "Make adjustments through conversation or direct editing. Export in multiple formats or share with your team instantly.",
      example: "PNG, PDF, SVG exports ready. Share via link or integrate with your favorite tools.",
      color: "blue-400"
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0">
              <Zap className="h-4 w-4 mr-2" />
              The Flow Forge Solution
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              From <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Conversation to Creation</span>
              <br />in Minutes
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience a completely new way to create flowcharts. No templates, no complex interfaces—
              just natural conversation that transforms into professional diagrams.
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden bg-gray-900 border border-gray-800 hover:border-blue-900/30 hover:shadow-blue-900/20 transition-all duration-500 group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="relative p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className={`order-${index % 2 === 0 ? '1' : '2'} md:order-${index % 2 === 0 ? '1' : '2'}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 bg-${step.color}/20 rounded-2xl flex items-center justify-center border-2 border-${step.color}`}>
                          <step.icon className={`h-8 w-8 text-${step.color}`} />
                        </div>
                        <div>
                          <span className="text-3xl font-bold text-gray-500">
                            {step.step}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-bold text-white">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div className={`p-4 bg-blue-900/20 rounded-lg border border-${step.color}/30`}>
                        <p className="text-sm font-medium text-blue-300">
                          ✨ {step.example}
                        </p>
                      </div>
                      
                      {index < steps.length - 1 && (
                        <div className="hidden md:flex items-center justify-center mt-8">
                          <ArrowRight className="h-6 w-6 text-blue-500 animate-pulse" />
                        </div>
                      )}
                    </div>

                    <div className={`order-${index % 2 === 0 ? '2' : '1'} md:order-${index % 2 === 0 ? '2' : '1'}`}>
                      <div className="bg-black rounded-xl p-6 border border-gray-800">
                        {index === 0 && (
                          <div className="space-y-4">
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm font-medium text-white">Natural Language Input</span>
                              </div>
                              <p className="text-gray-400 text-sm">
                                "Create a decision tree for customer support tickets based on urgency and department"
                              </p>
                            </div>
                          </div>
                        )}

                        {index === 1 && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                              <span className="text-sm font-medium text-white">Generating Mermaid.js diagram...</span>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 font-mono text-xs">
                              <div className="text-blue-400">
                                flowchart TD<br/>
                                &nbsp;&nbsp;A[Support Ticket] {'->'} B{'{Urgent?}'}<br/>
                                &nbsp;&nbsp;B {'-->'}|Yes| C[Priority Queue]<br/>
                                &nbsp;&nbsp;B {'-->'}|No| D{'{Department?}'}<br/>
                                &nbsp;&nbsp;D {'-->'}|Tech| E[Tech Support]<br/>
                                &nbsp;&nbsp;D {'-->'}|Billing| F[Billing Team]
                              </div>
                            </div>
                          </div>
                        )}

                        {index === 2 && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm font-medium text-white">Ready to Export</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center hover:border-blue-600/50 hover:bg-blue-900/10 transition-all duration-300 cursor-pointer">
                                <div className="text-2xl mb-1">📊</div>
                                <span className="text-xs text-gray-400">PNG</span>
                              </div>
                              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center hover:border-blue-600/50 hover:bg-blue-900/10 transition-all duration-300 cursor-pointer">
                                <div className="text-2xl mb-1">📄</div>
                                <span className="text-xs text-gray-400">PDF</span>
                              </div>
                              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center hover:border-blue-600/50 hover:bg-blue-900/10 transition-all duration-300 cursor-pointer">
                                <div className="text-2xl mb-1">🎨</div>
                                <span className="text-xs text-gray-400">SVG</span>
                              </div>
                              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 text-center hover:border-blue-600/50 hover:bg-blue-900/10 transition-all duration-300 cursor-pointer">
                                <div className="text-2xl mb-1">🔗</div>
                                <span className="text-xs text-gray-400">Share</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
