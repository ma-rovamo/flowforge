'use client'
import { Card } from "@/components/ui/card";
import { AlertTriangle, Clock, Users, FileX } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Complex Interfaces",
      description: "Most tools force you through confusing menus and endless template libraries"
    },
    {
      icon: Clock,
      title: "Steep Learning Curves",
      description: "Hours spent learning the tool instead of focusing on your actual process"
    },
    {
      icon: FileX,
      title: "Abandoned Projects",
      description: "Teams give up halfway through because the tools are too frustrating"
    },
    {
      icon: Users,
      title: "Avoiding Documentation",
      description: "Important processes go undocumented because flowcharts are too hard to create"
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Why Most Flowchart Tools
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent"> Miss the Mark</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Most flowchart creators treat every user the same way—forcing you through complex interfaces,
            endless template libraries, and steep learning curves. You spend more time fighting the tool
            than focusing on your actual process.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {problems.map((problem, index) => (
              <Card key={index} className="p-6 bg-black border border-gray-800 hover:shadow-blue-900/20 hover:border-blue-900/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-900/20 rounded-lg">
                    <problem.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold mb-2 text-white">{problem.title}</h3>
                    <p className="text-gray-400">{problem.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-blue-900/10 border border-blue-900/20">
            <p className="text-lg font-medium text-blue-400">
              The result? Abandoned projects, inconsistent diagrams, and teams avoiding documentation altogether.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
