"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Play, 
  Users, 
  Clock, 
  TrendingUp, 
  MessageSquare, 
  Bot, 
  Send, 
  Download, 
  FileText, 
  Image as ImageIcon,
  Share2,
  ArrowRight
} from "lucide-react";
import { Hero } from "./ui/animated-hero";
// Utility function for className merging
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-600 bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white",
      ghost: "hover:bg-gray-800 hover:text-white text-gray-300"
    };
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8"
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

// Badge component
interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className }) => {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      className
    )}>
      {children}
    </span>
  );
};

// Card component
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      "bg-gray-900/50 border-gray-700 backdrop-blur-sm",
      className
    )}>
      {children}
    </div>
  );
};

// Mock chat messages
const mockMessages = [
  { id: 1, type: 'user', content: 'Create a user registration flowchart' },
  { id: 2, type: 'ai', content: 'I\'ll create a comprehensive user registration flowchart for you. This will include email verification, validation steps, and error handling.' }
];

// Mock flowchart nodes
const mockFlowchartNodes = [
  { id: 1, label: 'Start', type: 'start', x: 50, y: 20 },
  { id: 2, label: 'User Input', type: 'process', x: 50, y: 40 },
  { id: 3, label: 'Valid Email?', type: 'decision', x: 50, y: 60 },
  { id: 4, label: 'Send Verification', type: 'process', x: 80, y: 80 },
  { id: 5, label: 'Show Error', type: 'process', x: 20, y: 80 }
];

// Animated Group component
interface AnimatedGroupProps {
  children: React.ReactNode;
  className?: string;
  variants?: {
    container?: any;
    item?: any;
  };
}

const AnimatedGroup: React.FC<AnimatedGroupProps> = ({ 
  children, 
  className, 
  variants 
}) => {
  const defaultContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const defaultItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = variants?.container || defaultContainerVariants;
  const itemVariants = variants?.item || defaultItemVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Main Hero Component
const HeroSection: React.FC = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDemo(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartDemo = () => {
    setIsTyping(true);
    setCurrentMessage('Create a user registration flowchart');
    
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <AnimatedGroup className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Badge className="bg-blue-900/50 text-blue-300 border border-blue-700/50 backdrop-blur-sm">
              <Zap className="w-3 h-3 mr-1" />
              Beta
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent"
          >
            Forge Flowcharts Through Conversation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Transform your ideas into professional flowcharts using natural language. 
            No complex tools, just conversation.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-8 text-sm"
          >
            <div className="flex items-center gap-2 text-gray-400">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span>75% time saved</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>2min avg creation</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="w-4 h-4 text-purple-400" />
              <span>500+ beta users</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              onClick={handleStartDemo}
            >
              Join Beta Program
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </motion.div>
        </AnimatedGroup>

        {/* Demo Section */}
        <AnimatePresence>
          {showDemo && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Chat Interface */}
                <Card className="p-6 bg-gray-900/70 border-gray-700 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Assistant</h3>
                      <p className="text-sm text-gray-400">Ready to help</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6 h-64 overflow-y-auto">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg p-3 text-sm",
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-800 text-gray-100 border border-gray-700'
                          )}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Describe your flowchart..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <Button size="sm" className="px-3">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>

                {/* Flowchart Visualization */}
                <Card className="p-6 bg-gray-900/70 border-gray-700 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold">Generated Flowchart</h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="relative h-80 bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                      {/* Connections */}
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="7"
                          refX="9"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 10 3.5, 0 7"
                            fill="#60a5fa"
                          />
                        </marker>
                      </defs>
                      
                      {/* Flow lines */}
                      <motion.line
                        x1="200" y1="60" x2="200" y2="100"
                        stroke="#60a5fa"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                      />
                      <motion.line
                        x1="200" y1="140" x2="200" y2="180"
                        stroke="#60a5fa"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                      />
                      <motion.line
                        x1="240" y1="200" x2="320" y2="240"
                        stroke="#60a5fa"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 2, duration: 0.5 }}
                      />
                      <motion.line
                        x1="160" y1="200" x2="80" y2="240"
                        stroke="#60a5fa"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 2, duration: 0.5 }}
                      />

                      {/* Nodes */}
                      {mockFlowchartNodes.map((node, index) => (
                        <motion.g
                          key={node.id}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.2, duration: 0.3 }}
                        >
                          {node.type === 'start' && (
                            <ellipse
                              cx={node.x * 4}
                              cy={node.y * 3}
                              rx="40"
                              ry="20"
                              fill="#1f2937"
                              stroke="#60a5fa"
                              strokeWidth="2"
                            />
                          )}
                          {node.type === 'process' && (
                            <rect
                              x={node.x * 4 - 40}
                              y={node.y * 3 - 20}
                              width="80"
                              height="40"
                              rx="4"
                              fill="#1f2937"
                              stroke="#60a5fa"
                              strokeWidth="2"
                            />
                          )}
                          {node.type === 'decision' && (
                            <polygon
                              points={`${node.x * 4 - 40},${node.y * 3} ${node.x * 4},${node.y * 3 - 20} ${node.x * 4 + 40},${node.y * 3} ${node.x * 4},${node.y * 3 + 20}`}
                              fill="#1f2937"
                              stroke="#60a5fa"
                              strokeWidth="2"
                            />
                          )}
                          <text
                            x={node.x * 4}
                            y={node.y * 3 + 5}
                            textAnchor="middle"
                            className="fill-gray-300 text-xs font-medium"
                          >
                            {node.label}
                          </text>
                        </motion.g>
                      ))}
                    </svg>
                  </div>

                  {/* Export Options */}
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Export options</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          PDF
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <ImageIcon className="w-3 h-3 mr-1" />
                          PNG
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Download className="w-3 h-3 mr-1" />
                          SVG
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSection;
