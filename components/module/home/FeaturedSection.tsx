'use client'
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Natural Language Input",
      description: "Simply describe what you need in plain English. No need to learn complex diagram syntax or terminology.",
      badge: "Core Feature",
      color: "blue-600"
    },
    {
      icon: Sparkles,
      title: "Professional Styling",
      description: "Every diagram follows industry standards with consistent styling, proper symbols, and clear connections.",
      badge: "Design",
      color: "blue-500"
    },
    {
      icon: Sparkles,
      title: "Instant Iterations",
      description: "Refine your diagram through conversation. Ask for changes and watch them happen in real-time.",
      badge: "Workflow",
      color: "blue-600"
    },
    {
      icon: Sparkles,
      title: "Multiple Export Formats",
      description: "Download your diagrams as PNG, PDF, SVG, or get the raw Mermaid.js code for further customization.",
      badge: "Export",
      color: "blue-500"
    },
    {
      icon: Sparkles,
      title: "Diagram History",
      description: "Access previous versions of your diagrams and track the evolution of your design process.",
      badge: "Organization",
      color: "blue-600"
    },
    {
      icon: Sparkles,
      title: "Team Collaboration",
      description: "Share diagrams with your team, collect feedback, and make improvements together in real-time.",
      badge: "Teamwork",
      color: "blue-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0">
              <Sparkles className="h-4 w-4 mr-2" />
              Powerful Features
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Create Better Flowcharts</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Flow Forge combines the power of AI with professional flowchart standards,
              giving you tools that actually make sense.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="relative group overflow-hidden bg-black border border-gray-800 hover:border-blue-900/30 hover:shadow-blue-900/20 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-${feature.color}/20 rounded-xl border border-${feature.color}/30`}>
                      <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                    </div>
                    <Badge variant="outline" className="text-xs text-gray-300 border-gray-700">
                      {feature.badge}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Hover effect indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
