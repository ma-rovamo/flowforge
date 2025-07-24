import React, { useState, useEffect } from 'react'

const LoadingComponent = () => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(0)
  
  const steps = [
    "Initializing diagram engine...",
    "Parsing input requirements...",
    "Analyzing diagram complexity...",
    "Mapping node relationships...",
    "Calculating optimal layout...",
    "Generating Mermaid syntax...",
    "Processing flowchart logic...",
    "Optimizing visual hierarchy...",
    "Rendering node components...",
    "Connecting pathways...",
    "Applying smart styling...",
    "Validating diagram structure...",
    "Fine-tuning positioning...",
    "Enhancing visual clarity...",
    "Finalizing your masterpiece..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 150)

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = (prev + 1) % steps.length
        if (nextStep < prev) {
          setCompletedSteps(steps.length)
        } else {
          setCompletedSteps(nextStep)
        }
        return nextStep
      })
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(stepInterval)
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #3b82f6 2px, transparent 2px),
                           radial-gradient(circle at 80% 50%, #6366f1 2px, transparent 2px),
                           radial-gradient(circle at 40% 20%, #8b5cf6 2px, transparent 2px),
                           radial-gradient(circle at 60% 80%, #06b6d4 2px, transparent 2px)`,
          backgroundSize: '100px 100px, 120px 120px, 80px 80px, 90px 90px'
        }} />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 opacity-10 animate-float">
          <div className="w-24 h-24 border-2 border-blue-400 rounded-lg rotate-45 animate-pulse" />
        </div>
        <div className="absolute top-3/4 right-1/4 opacity-10 animate-float" style={{animationDelay: '2s'}}>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-1/6 opacity-10 animate-float" style={{animationDelay: '4s'}}>
          <div className="w-20 h-20 border-2 border-indigo-400 rotate-12 animate-pulse" />
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto relative z-10 px-8">
        {/* Enhanced brand section */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-400 rounded-full animate-bounce" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-blue-900 bg-clip-text text-transparent mb-3">
            Forge Flow Charts
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Engineering your diagram with <span className="text-blue-600 font-semibold">precision & elegance</span>
          </p>
        </div>

        {/* Enhanced main loading animation */}
        <div className="relative mb-12">
          <div className="w-48 h-48 mx-auto mb-8 relative">
            {/* Multi-layered loading rings */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-100 shadow-inner"></div>
            
            <div className="absolute inset-2 rounded-full border-4 border-blue-600 border-t-transparent animate-spin shadow-lg"></div>
            
            <div className="absolute inset-4 rounded-full border-3 border-indigo-500 border-r-transparent animate-spin shadow-md" style={{animationDuration: '2s', animationDirection: 'reverse'}}></div>
            
            <div className="absolute inset-8 rounded-full border-2 border-purple-400 border-b-transparent animate-spin" style={{animationDuration: '3s'}}></div>
            
            {/* Enhanced central content */}
            <div className="absolute inset-16 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent animate-pulse"></div>
                <div className="relative z-10">
                  <svg className="w-10 h-10 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                
                {/* Orbiting particles */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-indigo-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-2 left-2 w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced progress section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-base font-bold text-gray-700">Processing Progress</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{progress}%</span>
              {progress === 100 && (
                <svg className="w-6 h-6 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-6 shadow-inner border border-gray-300 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 h-6 rounded-full transition-all duration-500 ease-out relative overflow-hidden shadow-lg"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full animate-pulse" style={{animationDuration: '2s'}}></div>
            </div>
          </div>
        </div>

        {/* Enhanced current step display */}
        <div className="mb-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <p className="text-xl font-bold text-gray-800 mb-1">
                    {steps[currentStep]}
                  </p>
                  <p className="text-sm text-gray-600">
                    Step {currentStep + 1} of {steps.length} • {Math.round((currentStep + 1) / steps.length * 100)}% Complete
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Our advanced AI-powered Mermaid.js engine is meticulously crafting your diagram with intelligent layout optimization and visual enhancement algorithms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced step indicators */}
        <div className="mb-10">
          <div className="flex justify-center items-center gap-1 mb-4 flex-wrap">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-3 rounded-full transition-all duration-700 ${
                  index < completedSteps 
                    ? 'bg-green-500 w-8 shadow-lg animate-pulse' 
                    : index === currentStep
                    ? 'bg-blue-600 w-12 shadow-lg animate-pulse'
                    : 'bg-gray-300 w-3'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 font-medium">
            {completedSteps} of {steps.length} steps completed
          </p>
        </div>

        {/* Enhanced professional info cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-gray-800 mb-2">⚡ Lightning Fast</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Advanced parallel processing ensures your diagrams are generated in record time with optimal performance.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-gray-800 mb-2">🎨 Smart Design</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  AI-driven layout algorithms automatically optimize spacing, alignment, and visual hierarchy for professional results.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced processing indicators */}
        <div className="flex justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '1.2s'
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">Processing</span>
          </div>
          
          <div className="w-px h-6 bg-gray-300"></div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secure Processing</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default LoadingComponent