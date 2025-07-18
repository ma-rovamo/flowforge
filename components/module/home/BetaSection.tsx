'use client'
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, Zap, Check, ArrowRight, Shield, Clock, MessageSquare, Users, FileText, Code, Briefcase, HelpCircle, Lightbulb, Gauge, Bot } from "lucide-react";

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

  const faqs = [
    {
      question: "How accurate are the AI-generated flowcharts?",
      answer: "Our AI understands context and industry standards, creating flowcharts that typically require minimal adjustments."
    },
    {
      question: "Can I edit the flowcharts after creation?",
      answer: "Absolutely! You can refine through conversation or use our visual editor for detailed adjustments."
    },
    {
      question: "What happens to my data?",
      answer: "Your flowcharts and conversations are encrypted and never used to train our models. You own your data completely."
    },
    {
      question: "How is this different from other flowchart tools?",
      answer: "Instead of starting with a blank canvas, you start with a conversation. Our AI handles the technical complexity while you focus on your actual process."
    }
  ];

  return (
    <div className=" min-h-screen bg-gray-950 text-white">
      <section className="py-20">
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
                    className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Get Beta Access Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-gray-700 cursor-pointer text-gray-500 hover:bg-gray-800 hover:text-white"
                  >
                    Questions? Contact Us
                  </Button>
                </div>
              </Card>

              {/* Enhanced Trust Indicators */}
              <Card className="p-6 bg-gray-900 border border-gray-800">
                <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-500" />
                  Trust & Performance
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
                    <div>
                      <div className="font-medium text-sm text-white">Enterprise Security</div>
                      <div className="text-xs text-gray-400">End-to-end encryption, SOC 2 Type II</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Gauge className="h-4 w-4 text-blue-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-white">99.9% Uptime</div>
                      <div className="text-xs text-gray-400">Reliable service guarantee</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Bot className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-white">AI-Powered</div>
                      <div className="text-xs text-gray-400">Advanced language models</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-4 w-4 text-blue-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm text-white">24/7 Beta Support</div>
                      <div className="text-xs text-gray-400">Direct access to our team</div>
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <span className="text-blue-300 font-medium">500+ Beta Users</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Actively shaping the future</div>
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
                    className="p-6 text-center bg-gray-900 border border-gray-800 hover:border-blue-900/30 hover:shadow-blue-900/20 transition-all duration-300 hover:bg-gray-900/80"
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

            {/* FAQ Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                  <HelpCircle className="h-6 w-6 text-blue-500" />
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Everything you need to know about Flow Forge and our beta program
                </p>
              </div>

              <Card className="bg-gray-900 border border-gray-800 cursor-pointer overflow-hidden ">
                <Accordion type="single" collapsible className="w-full cursor-pointer">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-gray-800">
                      <AccordionTrigger className="px-8 py-6 text-left text-white hover:text-blue-300 hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-8 pb-6 text-gray-300 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </div>

            {/* Enhanced Social Proof */}
            <div className="mt-16 grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-900/20">
                <div className="text-center">
                  <div className="text-3xl mb-4">💬</div>
                  <blockquote className="text-lg italic mb-4 text-white">
                    "Flow Forge cut our process documentation time by 75%. What used to take hours now takes minutes."
                  </blockquote>
                  <cite className="text-blue-300 font-medium">
                    — Sarah Chen, Operations Manager
                  </cite>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-900/20">
                <div className="text-center">
                  <div className="text-3xl mb-4">🚀</div>
                  <blockquote className="text-lg italic mb-4 text-white">
                    "The AI understands exactly what I'm trying to visualize. It's like having a design partner."
                  </blockquote>
                  <cite className="text-purple-300 font-medium">
                    — Marcus Rodriguez, Lead Developer
                  </cite>
                </div>
              </Card>
            </div>

            {/* Final CTA */}
           <div className="mt-20 text-center">
  <Card className="p-12 bg-gradient-to-r from-blue-900/20 via-blue-800/10 to-blue-900/20 border border-blue-900/30">
    <h3 className="text-3xl font-bold mb-4 text-white">
      Ready to Transform Your Workflow?
    </h3>
    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      Join the beta program today and experience the future of flowchart creation
    </p>

    <div className="flex justify-center">
      <Button
        className="w-full sm:w-auto cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
      >
        Start Creating Now
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>

    <p className="text-sm text-gray-400 mt-4">
      No commitment required • Full access during beta
    </p>
  </Card>
</div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default BetaSection;
