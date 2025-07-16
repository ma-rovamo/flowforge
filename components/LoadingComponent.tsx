import React, { useState, useEffect } from 'react'

const LoadingComponent = () => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  
  const steps = [
    "Analyzing your input...",
    "Interpreting diagram requirements...",
    "Structuring node relationships...",
    "Generating Mermaid syntax...",
    "Optimizing diagram layout...",
    "Applying visual styling...",
    "Rendering diagram components...",
    "Connecting nodes and edges...",
    "Validating diagram structure...",
    "Finalizing your masterpiece..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length)
    }, 1500)

    return () => {
      clearInterval(interval)
      clearInterval(stepInterval)
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-full min-h-[500px] bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 relative overflow-hidden">
      {/* Animated background network pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {/* Network nodes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-blue-500 rounded-full animate-pulse"
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${20 + Math.floor(i / 4) * 20}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '2s'
            }}
          />
        ))}
        
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-300"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating chart elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/5 opacity-5 animate-float">
          <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3v18h18v-2H5V3H3zm16 6l-4-4-4 4-5-5-2 2 7 7 4-4 4 4v-4z"/>
          </svg>
        </div>
        <div className="absolute top-2/3 right-1/5 opacity-5 animate-float" style={{animationDelay: '1s'}}>
          <svg className="w-20 h-20 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
          </svg>
        </div>
      </div>

      <div className="text-center max-w-lg mx-auto relative z-10 px-6">
        {/* Brand section */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Forge Flow Charts</h2>
          <p className="text-blue-600 font-medium">Crafting your diagram with precision</p>
        </div>

        {/* Main loading animation */}
        <div className="relative mb-8">
          <div className="w-40 h-40 mx-auto mb-6 relative">
            {/* Outer decorative ring */}
            <div className="absolute inset-0 rounded-full border-8 border-blue-100"></div>
            
            {/* Primary spinning ring */}
            <div className="absolute inset-2 rounded-full border-4 border-blue-600 border-t-transparent animate-spin shadow-lg"></div>
            
            {/* Secondary counter-spinning ring */}
            <div className="absolute inset-6 rounded-full border-2 border-blue-400 border-b-transparent animate-spin shadow-md" style={{animationDuration: '2s', animationDirection: 'reverse'}}></div>
            
            {/* Central content */}
            <div className="absolute inset-12 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-blue-100">
                <div className="relative">
                  {/* Animated chart icon */}
                  <svg className="w-8 h-8 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  
                  {/* Flowing data points */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-blue-700">Progress</span>
            <span className="text-sm font-bold text-blue-900">{progress}%</span>
          </div>
          
          <div className="w-full bg-blue-100 rounded-full h-4 shadow-inner border border-blue-200">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-300 ease-out relative overflow-hidden shadow-lg"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-blue-400 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Current step with professional styling */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-blue-900">
                {steps[currentStep]}
              </p>
            </div>
            <p className="text-sm text-blue-600 text-left">
              Our advanced Mermaid.js engine is working hard to create your perfect diagram
            </p>
          </div>
        </div>

        {/* Enhanced step indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index <= currentStep 
                  ? 'bg-blue-600 w-8 shadow-lg' 
                  : 'bg-blue-200 w-2'
              }`}
            />
          ))}
        </div>

        {/* Professional info card */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-blue-900 mb-2">
                🚀 Professional Tip
              </p>
              <p className="text-sm text-blue-700 leading-relaxed">
                Complex flowcharts with multiple decision points and connections may take a moment longer to process. We're optimizing every node and edge for the best visual result!
              </p>
            </div>
          </div>
        </div>

        {/* Animated processing indicators */}
        <div className="mt-6 flex justify-center items-center gap-3">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
          <span className="text-xs text-blue-600 font-medium">Processing</span>
        </div>
      </div>

     
    </div>
  )
}

export default LoadingComponent