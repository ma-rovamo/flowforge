'use client'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, MessageSquare, Zap, Share2, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { demoSteps } from "@/constants";
import Link from "next/link";

const HeroSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % demoSteps.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black text-white">
      {/* Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      <div className="relative container mx-auto px-6 py-16 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Professional Beta Badge */}
          <Badge className="mb-8 bg-blue-600 text-white border-0 px-6 py-2 text-sm font-medium">
            <Zap className="h-4 w-4 mr-2" />
            Now in Beta - Join Early Access
          </Badge>

          {/* Clean Professional Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              Forge Flowcharts
            </span>
            <br />
            Through Conversation
          </h1>

          {/* Professional Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Transform complex processes into clear, professional flowcharts using natural language. 
            No more dragging boxes or wrestling with templates—just describe what you need, 
            and our AI builds it for you.
          </p>

          {/* Clean Statistics */}
          <div className="grid grid-cols-3 gap-8 mb-10 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500 mb-1">75%</div>
              <div className="text-xs text-gray-400">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500 mb-1">2min</div>
              <div className="text-xs text-gray-400">Avg. Creation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500 mb-1">500+</div>
              <div className="text-xs text-gray-400">Beta Users</div>
            </div>
          </div>

          {/* Professional CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href={'/diagrams'}>
            <Button variant="hero" size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              Join Beta Program
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-600 text-blue-500 hover:bg-blue-900/20">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Enhanced Live Demo Preview */}
          <Card className=" mx-auto bg-gray-900  border border-gray-800  hover:shadow-blue-900/20 transition-all duration-500 group">
            <div className="p-8 md:p-12">
              <div className="text-left">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold flex items-center text-white">
                    <MessageSquare className="h-7 w-7 mr-3 text-blue-500" />
                    Live Demo: See the Magic Happen
                  </h3>
                  <Badge variant="outline" className="animate-pulse border-blue-500 text-white">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Live
                  </Badge>
                </div>
                
                {/* Enhanced Mock Chat Interface */}
                <div className={`space-y-6 mb-8 transition-all duration-500 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-blue-900/50">
                      <span className="text-lg">👤</span>
                    </div>
                    <div className="bg-gray-800 rounded-2xl px-6 py-4 max-w-2xl shadow-md text-white">
                      <p className="text-lg">{demoSteps[currentStep].user}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-blue-900/50">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div className="bg-blue-900/20 border border-blue-700/30 rounded-2xl px-6 py-4 max-w-2xl shadow-md text-white">
                      <p className="text-lg">{demoSteps[currentStep].ai}</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Generated Flowchart Preview */}
                <div className="bg-gray-800 rounded-2xl p-8 text-center border border-gray-700">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                    <span className="text-lg font-medium text-blue-400">{demoSteps[currentStep].status}</span>
                    <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                  </div>
                  
                  {/* Enhanced Mock Flowchart Visualization */}
                  <div className="bg-black rounded-2xl p-8 border border-gray-800 shadow-md">
                    <div className="flex flex-col items-center gap-6 text-base">
                      <div className="bg-blue-900/30 border-2 border-blue-700 rounded-xl px-6 py-3 font-semibold shadow-md hover:shadow-blue-900/30 transition-all duration-300 cursor-pointer text-white">
                        User Visits Site
                      </div>
                      <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full"></div>
                      <div className="bg-blue-900/30 border-2 border-blue-600 rounded-xl px-6 py-3 shadow-md hover:shadow-blue-900/30 transition-all duration-300 cursor-pointer text-white">
                        Has Account?
                      </div>
                      <div className="flex items-center gap-12">
                        <div className="flex flex-col items-center gap-3">
                          <span className="text-sm font-medium text-blue-400 bg-blue-900/50 px-3 py-1 rounded-full">Yes</span>
                          <div className="bg-blue-900/30 border-2 border-blue-500 rounded-xl px-4 py-3 shadow-md hover:shadow-blue-900/30 transition-all duration-300 cursor-pointer text-white">
                            Login Flow
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                          <span className="text-sm font-medium text-blue-400 bg-blue-900/50 px-3 py-1 rounded-full">No</span>
                          <div className="bg-blue-900/30 border-2 border-blue-500 rounded-xl px-4 py-3 shadow-md hover:shadow-blue-900/30 transition-all duration-300 cursor-pointer text-white">
                            Signup Flow
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Export Options */}
                <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-800">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">Export as: PNG, PDF, SVG, or Mermaid code</span>
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <Button variant="accent" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/30">
                    Try This Example Live
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
