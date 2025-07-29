import React from 'react';
import { Workflow, Zap, Users, Layers } from 'lucide-react';
import FormCardTest from '@/components/gen/FlowTestCard';
import Link from 'next/link';

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        
        {/* Content */}
        <div className="relative">
          {/* Header */}
          <header className="px-4 py-6">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href={'/'}>
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <Workflow className="h-8 w-8 text-white" />
                </div>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Forge Flow
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Intelligent Flow Diagrams
                  </p>
                </div>
              </div>
              
              {/* Navigation or additional controls can go here */}
              <div className="hidden md:flex items-center gap-4">
                <Link href={'/show'} className="text-sm text-gray-600 dark:text-gray-300">
                 Chats
                </Link>
              </div>
            </div>
          </header>

          {/* Hero Content */}
          <div className="px-4 pt-8 pb-16">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Turn Ideas into
                  <br />
                  Interactive Diagrams
                </h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Describe your process, workflow, or system in plain English. 
                  Our AI will create beautiful, interactive flow diagrams instantly.
                </p>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { icon: Zap, text: "AI-Powered" },
                  { icon: Users, text: "Interactive" },
                  { icon: Layers, text: "Professional" },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-600 shadow-sm"
                  >
                    <feature.icon className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="relative">
        <FormCardTest />
      </div>

      {/* Features Section */}
      <div className="px-4 py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Why Choose Flow Forge AI?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Create professional diagrams without learning complex tools or syntax
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Workflow,
                title: "Natural Language Input",
                description: "Simply describe your process in plain English. No need to learn diagram syntax or complicated tools.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Zap,
                title: "Instant Generation",
                description: "Get professional-quality flow diagrams in seconds. AI understands your requirements and creates perfect layouts.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Layers,
                title: "Interactive & Editable",
                description: "Pan, zoom, and explore your diagrams. Make real-time edits with natural language updates.",
                color: "from-indigo-500 to-purple-500"
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Perfect for Every Use Case
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From simple workflows to complex system architectures
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Business Process Flows",
              "Software Architecture",
              "User Journey Maps",
              "API Documentation",
              "System Workflows",
              "Decision Trees",
              "Database Schemas",
              "Project Timelines"
            ].map((useCase, i) => (
              <div
                key={i}
                className="p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-3"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {useCase}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Workflow className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">Flow Forge AI</span>
          </div>
          <p className="text-gray-400 text-sm">
            Transform your ideas into beautiful, interactive flow diagrams with the power of AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default page;