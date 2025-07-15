// This is a infrastructure component that renders demos
// Please do not modify this file

'use client'
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Target, Users, Download, Clock } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Natural Language Input",
      description: "Simply describe what you need in plain English. No need to learn complex diagram syntax or terminology.",
      badge: "Core Feature",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Professional Styling",
      description: "Every diagram follows industry standards with consistent styling, proper symbols, and clear connections.",
      badge: "Design",
      color: "violet"
    },
    {
      icon: Target,
      title: "Instant Iterations",
      description: "Refine your diagram through conversation. Ask for changes and watch them happen in real-time.",
      badge: "Workflow",
      color: "purple"
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description: "Download your diagrams as PNG, PDF, SVG, or get the raw Mermaid.js code for further customization.",
      badge: "Export",
      color: "blue"
    },
    {
      icon: Clock,
      title: "Diagram History",
      description: "Access previous versions of your diagrams and track the evolution of your design process.",
      badge: "Organization",
      color: "white"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share diagrams with your team, collect feedback, and make improvements together in real-time.",
      badge: "Teamwork",
      color: "purple"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-small" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-600/10 via-transparent to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 mb-8 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Powerful Features</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl text-white lg:text-7xl font-bold mb-8 tracking-tight">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Create Better Flowcharts
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Flow Forge combines the power of AI with professional flowchart standards,
              giving you tools that actually make sense.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm hover:border-gray-700/50 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-500/5 via-transparent to-${feature.color}-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
                
                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/20 rounded-2xl border border-${feature.color}-500/30 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-7 w-7 text-${feature.color}-400`} />
                    </div>
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-gray-800/80 text-gray-300 border-gray-700/50 backdrop-blur-sm"
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-100 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed text-base group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Animated bottom accent */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-full`} />
                  
                  {/* Corner decoration */}
                  <div className="absolute top-4 right-4 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl shadow-blue-500/25">
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
              <span className="text-white font-semibold text-lg">Ready to get started?</span>
              <button className="px-6 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Try Flow Forge
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
