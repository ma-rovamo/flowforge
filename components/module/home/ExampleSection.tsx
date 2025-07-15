'use client'
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, ArrowRight, FileText, Users, GitBranch, Database, Server, ShieldCheck } from "lucide-react";

const ExamplesSection = () => {
  const examples = [
    {
      icon: FileText,
      title: "Customer Onboarding Flow",
      category: "Business Process",
      complexity: "Medium",
      prompt: "Create a customer onboarding flow that handles new signups, email verification, and account setup",
      description: "A comprehensive flowchart showing the entire customer journey from initial signup to completed account setup with error handling.",
      color: "blue-600"
    },
    {
      icon: Users,
      title: "Approval Workflow",
      category: "Team Collaboration",
      complexity: "Simple",
      prompt: "Design an approval process for marketing content with multiple stakeholders",
      description: "Visualizes how content moves through different approval stages with decision points for revisions and final publishing.",
      color: "blue-500"
    },
    {
      icon: GitBranch,
      title: "Software Release Pipeline",
      category: "Development",
      complexity: "Complex",
      prompt: "Map out a CI/CD pipeline for our web application with testing and staging environments",
      description: "Detailed flowchart showing code movement from commit to production with all testing gates and deployment steps.",
      color: "blue-600"
    },
    {
      icon: Database,
      title: "Data Processing Workflow",
      category: "Data Engineering",
      complexity: "Complex",
      prompt: "Create a flowchart for ETL process that handles data validation and transformation",
      description: "Visualizes the complete journey of data from extraction to loading with all transformation and validation steps.",
      color: "blue-500"
    }
  ];

  const getComplexityColor = (complexity:any) => {
    switch (complexity) {
      case "Simple":
        return "bg-blue-900/20 text-blue-400 border-blue-800/30";
      case "Medium":
        return "bg-blue-900/30 text-blue-300 border-blue-700/30";
      case "Complex":
        return "bg-blue-900/40 text-blue-200 border-blue-600/30";
      default:
        return "bg-blue-900/20 text-blue-400 border-blue-800/30";
    }
  };

  return (
    <section id="examples" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0">
              <Code className="h-4 w-4 mr-2" />
              Real Examples
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              See Flow Forge in
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent"> Action</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From simple decision trees to complex business processes—discover how natural language
              transforms into professional flowcharts across different use cases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {examples.map((example, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden bg-gray-900 border border-gray-800 hover:border-blue-900/30 hover:shadow-blue-900/20 transition-all duration-500"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 bg-${example.color}/20 rounded-xl border border-${example.color}/30`}>
                        <example.icon className={`h-6 w-6 text-${example.color}`} />
                      </div>
                      <div>
                        <span className="text-sm text-gray-400">{example.category}</span>
                        <h3 className="text-xl font-bold text-white">{example.title}</h3>
                      </div>
                    </div>
                    <Badge className={getComplexityColor(example.complexity)}>
                      {example.complexity}
                    </Badge>
                  </div>

                  <div className="bg-black rounded-lg p-4 mb-4 border border-gray-800">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-xs font-medium text-gray-500">PROMPT:</span>
                    </div>
                    <p className="text-sm italic text-white">
                      "{example.prompt}"
                    </p>
                  </div>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {example.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-700 text-gray-100 group-hover:border-blue-500 bg-blue-500 group-hover:text-blue-400 transition-colors"
                    >
                      Try This Example
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <span className="text-sm text-gray-500">~2 min to create</span>
                  </div>
                </div>
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="inline-block p-6 bg-blue-900/10 border border-blue-900/20">
              <h3 className="text-lg font-semibold mb-2 text-white">Want to See More Examples?</h3>
              <p className="text-gray-400 mb-4">
                Join our beta program and explore dozens of real-world flowchart templates
              </p>
              <Button variant="hero" className="bg-blue-600 hover:bg-blue-700 text-white">
                Explore Full Library
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;
