'use client'
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Zap, Check, ArrowRight, Shield, Clock, MessageSquare, Users, FileText, Code, Briefcase } from "lucide-react";

const BetaSection = () => {
  const benefits = [
    "Unlimited flowchart creation",
    "Export to PNG, PDF, SVG formats",
    "Access to all diagram types",
    "Collaborative sharing",
    "Version history & tracking",
    "Priority feature requests",
    "Early access to new features",
    "Direct support from our team"
  ];

  const perfectFor = [
    {
      icon: Users,
      title: "Product Teams",
      description: "Map user journeys and product workflows with ease"
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Create clear process docs and technical guides"
    },
    {
      icon: Code,
      title: "Developers",
      description: "Visualize algorithms and system architecture"
    },
    {
      icon: Briefcase,
      title: "Consultants",
      description: "Present complex processes to clients clearly"
    }
  ];

  return (
    <section id="beta" className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0">
              <Star className="h-4 w-4 mr-2" />
              Beta Program
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Forge Better Flowcharts?</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join hundreds of beta users who've already discovered a better way to create flowcharts.
              No credit card required, no complex setup—just powerful, conversational diagram creation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* What's Included */}
            <Card className="lg:col-span-2 p-8 bg-gray-900 border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 flex items-center text-white">
                <Zap className="h-6 w-6 mr-3 text-blue-500" />
                What's Included in Beta
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Get Beta Access Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-700 text-gray-700 hover:bg-gray-800 "
                >
                  Questions? Contact Us
                </Button>
              </div>
            </Card>

            {/* Trust Indicators */}
            <Card className="p-6 bg-gray-900 border border-gray-800">
              <h3 className="text-lg font-semibold mb-6 text-white">Trust Indicators</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium text-sm text-white">Enterprise Security</div>
                    <div className="text-xs text-gray-400">End-to-end encryption</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="font-medium text-sm text-white">99.9% Uptime</div>
                    <div className="text-xs text-gray-400">Reliable service guarantee</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium text-sm text-white">24/7 Beta Support</div>
                    <div className="text-xs text-gray-400">Direct access to our team</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="font-medium text-sm text-white">SOC 2 Compliant</div>
                    <div className="text-xs text-gray-400">Coming soon</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Perfect For */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">Perfect For</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {perfectFor.map((item, index) => (
                <Card 
                  key={index} 
                  className="p-6 text-center bg-gray-900 border border-gray-800 hover:border-blue-900/30 hover:shadow-blue-900/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <h4 className="font-semibold mb-2 text-white">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <Card className="mt-16 p-8 bg-blue-900/10 border border-blue-900/20">
            <div className="text-center">
              <div className="text-2xl mb-4">💬</div>
              <blockquote className="text-lg italic mb-4 text-white">
                "Flow Forge cut our process documentation time by 75%. What used to take hours now takes minutes."
              </blockquote>
              <cite className="text-gray-400">
                — Sarah Chen, Operations Manager
              </cite>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BetaSection;
