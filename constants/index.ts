import dedent from "dedent";
import { Briefcase, Building, Clock, Code, Download, HelpCircle, Lightbulb, MessageSquare, Sparkles, Users } from "lucide-react";

export const constantsCode =  {
  CHAT_PROMPT: dedent`
    You are an expert AI Assistant with experience in building modern UIs using React, TypeScript, and Tailwind CSS.

    📌 GUIDELINES:
    - Greet the user and clearly state what you are building.
    - Keep your response concise (under 15 lines).
    - Do not include code unless asked.
    - Be friendly, helpful, and to the point.


      Generate a complete **React project structure** using **TypeScript (.tsx/.ts)** with either **Vite** or **Next.js App Router**, depending on the context. Use **Tailwind CSS** for styling, and structure the project using best practices.

    📦 Available libraries:
    - ✅ Tailwind CSS (default styling)
    - ✅ shadcn/ui (for polished UI components – use wisely)
    - ✅ lucide-react (icons – use only these: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight)
    - ✅ date-fns (date formatting)
    - ✅ react-chartjs-2 (charts and graphs)
    - ✅ @google/generative-ai (Gemini API, only if AI generation is required)
    - ✅ Firebase (only if user needs auth or data persistence)

    🌄 For placeholder or stock images, use:
    - https://archive.org/download/placeholder-image/placeholder-image.jpg
    - Or actual Unsplash image URLs

    📁 Return a valid JSON with this structure:
    {
      "projectTitle": "Project Name",
      "explanation": "One-paragraph overview of the app’s purpose, architecture, and functionality.",
      "files": {
        "/src/App.tsx": {
          "code": "import React from 'react';\\n...TSX code..."
        },
        "/src/components/Header.tsx": {
          "code": "..."
        },
        ...
      },
      "generatedFiles": ["/src/App.tsx", "/src/components/Header.tsx", ...]
    }

    🧩 Extra Guidelines:
    - Always use .tsx for React components and .ts for logic or config.
    - Use Tailwind for layout, spacing, and typography.
    - Use Lucide icons only if they add UX value (don’t overuse).
    - Use shadcn/ui for modals, buttons, cards, tabs, etc.
    - Add emojis to enhance clarity and user enjoyment 🎨🚀📊.
    - Write clean, scalable, production-grade code.
    - Make UI layouts beautiful, not generic or cookie-cutter.
    - Ensure all generated files are well-named and logically organized.

    🚀 This prompt powers a smart AI code generator for no-code tools like **Lovable** or **Bolt.new**, enabling instant creation of beautiful, modern UI projects.
  `,

  CODE_GEN_PROMPT: dedent`
    Generate a complete **React project structure** using **TypeScript (.tsx/.ts)** with either **Vite** or **Next.js App Router**, depending on the context. Use **Tailwind CSS** for styling, and structure the project using best practices.

    📦 Available libraries:
    - ✅ Tailwind CSS (default styling)
    - ✅ shadcn/ui (for polished UI components – use wisely)
    - ✅ lucide-react (icons – use only these: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight)
    - ✅ date-fns (date formatting)
    - ✅ react-chartjs-2 (charts and graphs)
    - ✅ @google/generative-ai (Gemini API, only if AI generation is required)
    - ✅ Firebase (only if user needs auth or data persistence)

    🌄 For placeholder or stock images, use:
    - https://archive.org/download/placeholder-image/placeholder-image.jpg
    - Or actual Unsplash image URLs

    📁 Return a valid JSON with this structure:
    {
      "projectTitle": "Project Name",
      "explanation": "One-paragraph overview of the app’s purpose, architecture, and functionality.",
      "files": {
        "/src/App.tsx": {
          "code": "import React from 'react';\\n...TSX code..."
        },
        "/src/components/Header.tsx": {
          "code": "..."
        },
        ...
      },
      "generatedFiles": ["/src/App.tsx", "/src/components/Header.tsx", ...]
    }

    🧩 Extra Guidelines:
    - Always use .tsx for React components and .ts for logic or config.
    - Use Tailwind for layout, spacing, and typography.
    - Use Lucide icons only if they add UX value (don’t overuse).
    - Use shadcn/ui for modals, buttons, cards, tabs, etc.
    - Add emojis to enhance clarity and user enjoyment 🎨🚀📊.
    - Write clean, scalable, production-grade code.
    - Make UI layouts beautiful, not generic or cookie-cutter.
    - Ensure all generated files are well-named and logically organized.

    🚀 This prompt powers a smart AI code generator for no-code tools like **Lovable** or **Bolt.new**, enabling instant creation of beautiful, modern UI projects.
  `
};


export const Prompt = `
Convert the following text into a valid Mermaid.js diagram.

Rules:
1. Return ONLY Mermaid.js syntax — no code blocks, no markdown.
2. Do NOT include explanations, text, or formatting — just raw Mermaid code.
3. Choose the most appropriate diagram type: flowchart, classDiagram, sequenceDiagram, stateDiagram, or pie.
4. Use clear, concise, well-structured syntax with proper indentation.
5. If applicable, structure it using direction tags like "graph TD;" (for flowcharts).
6. If the input doesn't describe any diagram content, return an empty string.

Examples:
• Flowchart: graph TD; A[Start] --> B{Decision} --> C[End]
• Class diagram: classDiagram; class User { +String name +login() }
• Sequence diagram: sequenceDiagram; Client->>Server: Request

ONLY return valid Mermaid.js syntax, no explanation, no markdown, no commentary.
`;


// hero

export const demoSteps = [
    {
      user: "Create a customer onboarding flow that handles new signups and returning users",
      ai: "Perfect! I'll create a flowchart showing the signup process with decision points for new vs. returning users...",
      status: "Generating your flowchart with Mermaid.js..."
    },
    {
      user: "Add error handling for failed payments",
      ai: "Great addition! I'm adding error handling branches for payment failures and retry logic...",
      status: "Updating flowchart structure..."
    },
    {
      user: "Include email verification step",
      ai: "Excellent! Adding email verification with timeout handling and resend options...",
      status: "Finalizing your professional flowchart..."
    }
  ];


 export const features = [
    {
      icon: MessageSquare,
      title: "Natural Language Processing",
      description: "No technical jargon required. Describe your process the way you'd explain it to a colleague.",
      color: "flow-purple",
      badge: "Core Feature"
    },
    {
      icon: Lightbulb,
      title: "Smart Suggestions", 
      description: "AI recognizes patterns and suggests improvements, missing steps, or alternative flows.",
      color: "flow-blue",
      badge: "AI Powered"
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description: "Download as PNG, PDF, SVG, or integrate with popular tools like Miro, Figma, and Lucidchart.",
      color: "flow-emerald",
      badge: "Export Ready"
    },
    {
      icon: Clock,
      title: "Version Control",
      description: "Track changes and iterations with built-in version history. Never lose your work again.",
      color: "flow-cyan",
      badge: "Coming Soon"
    },
    {
      icon: Users,
      title: "Collaboration Ready",
      description: "Share drafts, gather feedback, and iterate together with your team seamlessly.",
      color: "flow-purple",
      badge: "Full Release"
    },
    {
      icon: Sparkles,
      title: "Mermaid.js Integration",
      description: "Built on industry-standard Mermaid.js, ensuring compatibility and professional output.",
      color: "flow-blue",
      badge: "Technical"
    }
  ];



    export const examples = [
      {
        icon: Building,
        category: "Business Process",
        title: "Invoice Approval Workflow",
        prompt: "Create a workflow for our invoice approval process with three approval levels and rejection handling.",
        description: "Perfect for mapping complex business processes with multiple decision points and approval chains.",
        complexity: "Intermediate",
        color: "flow-purple"
      },
      {
        icon: HelpCircle,
        category: "Decision Tree",
        title: "Customer Support Routing",
        prompt: "Build a decision tree for customer support tickets based on urgency and department.",
        description: "Ideal for customer service workflows and automated routing systems.",
        complexity: "Beginner",
        color: "flow-blue"
      },
      {
        icon: Code,
        category: "System Architecture",
        title: "User Authentication Flow",
        prompt: "Design a flow showing how user data moves through our authentication system.",
        description: "Great for technical documentation and system design discussions.",
        complexity: "Advanced",
        color: "flow-emerald"
      },
      {
        icon: Briefcase,
        category: "Project Workflow",
        title: "Content Creation Process",
        prompt: "Map out our content creation process from ideation to publication.",
        description: "Essential for creative teams and content marketing workflows.",
        complexity: "Intermediate",
        color: "flow-cyan"
      }
    ];




      export const benefits = [
        "Unlimited flowchart creation",
        "All current export formats", 
        "No watermarks or restrictions",
        "Early access to new features",
        "Priority support from our team",
        "Direct feedback channel",
        "Grandfathered pricing when we launch"
      ];
    
     export  const perfectFor = [
        {
          icon: MessageSquare,
          title: "Business Analysts",
          description: "Documenting complex processes without technical barriers"
        },
        {
          icon: Briefcase,
          title: "Project Managers", 
          description: "Mapping workflows and project dependencies quickly"
        },
        {
          icon: Code,
          title: "Developers",
          description: "Creating system diagrams and technical documentation"
        },
        {
          icon: Users,
          title: "Teams",
          description: "Who need flowcharts but hate complexity"
        }
      ];