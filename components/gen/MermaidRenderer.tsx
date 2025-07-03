'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';

type Props = {
  response: string | any;
  theme?: 'light' | 'dark';
  title?: string;
};

export default function MermaidRenderer({ response, theme: propTheme, title }: Props) {
  const { theme: systemTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [renderedSvg, setRenderedSvg] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const mermaidRef = useRef<HTMLDivElement>(null);

  // Determine the active theme
  const activeTheme = propTheme || systemTheme || 'light';
  const isDarkMode = activeTheme === 'dark';

  // Enhanced theme configuration for different diagram types
  const getMermaidConfig = useCallback((isDark: boolean) => {
    const baseConfig = {
      startOnLoad: false,
      securityLevel: 'loose',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: 14,
      darkMode: isDark,
      theme: isDark ? 'dark' : 'base',
    };

    // Enhanced theme variables for better contrast and readability
    const themeVariables = isDark ? {
      // Dark theme variables
      primaryColor: '#3b82f6',
      primaryTextColor: '#f8fafc',
      primaryBorderColor: '#1e40af',
      lineColor: '#64748b',
      sectionBkgColor: '#1e293b',
      altSectionBkgColor: '#334155',
      gridColor: '#475569',
      secondaryColor: '#64748b',
      tertiaryColor: '#475569',
      background: '#0f172a',
      mainBkg: '#1e293b',
      secondBkg: '#334155',
      tertiaryBkg: '#475569',
      primaryBkgColor: '#3b82f6',
      textColor: '#f1f5f9',
      nodeBorder: '#64748b',
      clusterBkg: '#334155',
      clusterBorder: '#64748b',
      defaultLinkColor: '#64748b',
      titleColor: '#f1f5f9',
      edgeLabelBackground: '#1e293b',
      nodeTextColor: '#f1f5f9',
      // Flowchart specific
      flowchartNodeBkg: '#334155',
      flowchartNodeBorder: '#64748b',
      flowchartEdgeColor: '#64748b',
      flowchartLinkColor: '#64748b',
      // Sequence diagram specific
      actorBkg: '#334155',
      actorBorder: '#64748b',
      actorTextColor: '#f1f5f9',
      actorLineColor: '#64748b',
      signalColor: '#64748b',
      signalTextColor: '#f1f5f9',
      labelBoxBkgColor: '#1e293b',
      labelBoxBorderColor: '#64748b',
      labelTextColor: '#f1f5f9',
      loopTextColor: '#f1f5f9',
      noteBorderColor: '#64748b',
      noteBkgColor: '#1e293b',
      noteTextColor: '#f1f5f9',
      // Gantt specific
      ganttTaskBkgColor: '#334155',
      ganttTaskTextColor: '#f1f5f9',
      ganttActiveTaskBkgColor: '#3b82f6',
      ganttActiveTaskBorderColor: '#1e40af',
      ganttGridColor: '#475569',
      ganttSectionBkgColor: '#1e293b',
      ganttTodayLineColor: '#ef4444',
      // Git specific
      git0: '#3b82f6',
      git1: '#10b981',
      git2: '#f59e0b',
      git3: '#ef4444',
      git4: '#8b5cf6',
      git5: '#06b6d4',
      git6: '#84cc16',
      git7: '#f97316',
      // Class diagram specific
      classText: '#f1f5f9',
      classBkg: '#334155',
      classBorder: '#64748b',
      relationColor: '#64748b',
      relationLabelColor: '#f1f5f9',
      relationLabelBkg: '#1e293b',
      // State diagram specific
      stateBkg: '#334155',
      stateBorder: '#64748b',
      stateText: '#f1f5f9',
      transitionColor: '#64748b',
      transitionLabelColor: '#f1f5f9',
      // Journey specific
      fillType0: '#3b82f6',
      fillType1: '#10b981',
      fillType2: '#f59e0b',
      fillType3: '#ef4444',
      fillType4: '#8b5cf6',
      fillType5: '#06b6d4',
      fillType6: '#84cc16',
      fillType7: '#f97316',
    } : {
      // Light theme variables
      primaryColor: '#3b82f6',
      primaryTextColor: '#1e293b',
      primaryBorderColor: '#2563eb',
      lineColor: '#64748b',
      sectionBkgColor: '#f8fafc',
      altSectionBkgColor: '#f1f5f9',
      gridColor: '#e2e8f0',
      secondaryColor: '#64748b',
      tertiaryColor: '#94a3b8',
      background: '#ffffff',
      mainBkg: '#ffffff',
      secondBkg: '#f8fafc',
      tertiaryBkg: '#f1f5f9',
      primaryBkgColor: '#3b82f6',
      textColor: '#1e293b',
      nodeBorder: '#e2e8f0',
      clusterBkg: '#f8fafc',
      clusterBorder: '#e2e8f0',
      defaultLinkColor: '#64748b',
      titleColor: '#1e293b',
      edgeLabelBackground: '#ffffff',
      nodeTextColor: '#1e293b',
      // Flowchart specific
      flowchartNodeBkg: '#ffffff',
      flowchartNodeBorder: '#e2e8f0',
      flowchartEdgeColor: '#64748b',
      flowchartLinkColor: '#64748b',
      // Sequence diagram specific
      actorBkg: '#ffffff',
      actorBorder: '#e2e8f0',
      actorTextColor: '#1e293b',
      actorLineColor: '#e2e8f0',
      signalColor: '#64748b',
      signalTextColor: '#1e293b',
      labelBoxBkgColor: '#f8fafc',
      labelBoxBorderColor: '#e2e8f0',
      labelTextColor: '#1e293b',
      loopTextColor: '#1e293b',
      noteBorderColor: '#e2e8f0',
      noteBkgColor: '#fefce8',
      noteTextColor: '#1e293b',
      // Gantt specific
      ganttTaskBkgColor: '#f8fafc',
      ganttTaskTextColor: '#1e293b',
      ganttActiveTaskBkgColor: '#3b82f6',
      ganttActiveTaskBorderColor: '#2563eb',
      ganttGridColor: '#e2e8f0',
      ganttSectionBkgColor: '#ffffff',
      ganttTodayLineColor: '#ef4444',
      // Git specific
      git0: '#3b82f6',
      git1: '#10b981',
      git2: '#f59e0b',
      git3: '#ef4444',
      git4: '#8b5cf6',
      git5: '#06b6d4',
      git6: '#84cc16',
      git7: '#f97316',
      // Class diagram specific
      classText: '#1e293b',
      classBkg: '#ffffff',
      classBorder: '#e2e8f0',
      relationColor: '#64748b',
      relationLabelColor: '#1e293b',
      relationLabelBkg: '#ffffff',
      // State diagram specific
      stateBkg: '#ffffff',
      stateBorder: '#e2e8f0',
      stateText: '#1e293b',
      transitionColor: '#64748b',
      transitionLabelColor: '#1e293b',
      // Journey specific
      fillType0: '#3b82f6',
      fillType1: '#10b981',
      fillType2: '#f59e0b',
      fillType3: '#ef4444',
      fillType4: '#8b5cf6',
      fillType5: '#06b6d4',
      fillType6: '#84cc16',
      fillType7: '#f97316',
    };

    return {
      ...baseConfig,
      themeVariables,
      flowchart: {
        curve: 'basis',
        htmlLabels: true,
        nodeSpacing: 50,
        rankSpacing: 50,
        padding: 10,
        useMaxWidth: true,
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        messageAlign: 'center',
        mirrorActors: true,
        bottomMarginAdj: 1,
        useMaxWidth: true,
      },
      gantt: {
        titleTopMargin: 25,
        barHeight: 20,
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        fontSize: 12,
        fontWeight: 'normal',
        gridLineStartPadding: 35,
        bottomPadding: 25,
        rightPadding: 75,
        leftPadding: 75,
        topPadding: 50,
        topAxis: false,
        axisFormat: '%m/%d/%Y',
        tickInterval: '1day',
        useMaxWidth: true,
      },
      c4: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        c4ShapeMargin: 50,
        c4ShapePadding: 20,
        width: 216,
        height: 60,
        boxMargin: 10,
        useMaxWidth: true,
      },
      gitGraph: {
        diagramPadding: 8,
        nodeLabel: {
          width: 75,
          height: 100,
          x: -25,
          y: 0,
        },
        mainBranchName: 'main',
        showCommitLabel: true,
        showBranches: true,
        rotateCommitLabel: true,
        useMaxWidth: true,
      },
      journey: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        leftMargin: 150,
        width: 150,
        height: 50,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        messageAlign: 'center',
        bottomMarginAdj: 1,
        useMaxWidth: true,
      },
      class: {
        titleTopMargin: 25,
        useMaxWidth: true,
      },
      state: {
        titleTopMargin: 25,
        useMaxWidth: true,
      },
      er: {
        diagramPadding: 20,
        layoutDirection: 'TB',
        minEntityWidth: 100,
        minEntityHeight: 75,
        entityPadding: 15,
        stroke: isDark ? '#64748b' : '#e2e8f0',
        fill: isDark ? '#334155' : '#ffffff',
        fontSize: 12,
        useMaxWidth: true,
      },
      pie: {
        textPosition: 0.75,
        useMaxWidth: true,
      },
      requirement: {
        rect_fill: isDark ? '#334155' : '#ffffff',
        text_color: isDark ? '#f1f5f9' : '#1e293b',
        rect_border_size: '0.5px',
        rect_border_color: isDark ? '#64748b' : '#e2e8f0',
        rect_min_width: 200,
        rect_min_height: 200,
        fontSize: 14,
        rect_padding: 10,
        line_height: 20,
        useMaxWidth: true,
      },
    };
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!response || typeof response !== 'string') {
        setError('Invalid diagram data received');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const config:any = getMermaidConfig(isDarkMode);
        mermaid.initialize(config) ;

        const cleanedResponse = response.trim();
        const isValid = await mermaid.parse(cleanedResponse);
        if (!isValid) {
          throw new Error('Invalid Mermaid syntax');
        }

        const diagramId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(diagramId, cleanedResponse);
        
        setRenderedSvg(svg);
        setLoading(false);

      } catch (err: any) {
        console.error('Mermaid rendering error:', err);
        let errorMessage = 'Failed to render diagram.';
        
        if (err.message?.includes('syntax')) {
          errorMessage = 'Invalid Mermaid syntax. Please check your diagram code.';
        } else if (err.message?.includes('Parse error')) {
          errorMessage = 'Diagram parsing error. Please verify the syntax is correct.';
        } else if (err.message?.includes('Lexical error')) {
          errorMessage = 'Diagram contains invalid characters or keywords.';
        } else if (err.message?.includes('Cannot read properties')) {
          errorMessage = 'Diagram type not supported or invalid configuration.';
        }
        
        setError(errorMessage);
        setLoading(false);
      }
    };

    renderDiagram();
  }, [response, isDarkMode, getMermaidConfig]);

  // Apply additional theme-specific styles to the rendered SVG
  useEffect(() => {
    if (renderedSvg && mermaidRef.current) {
      mermaidRef.current.innerHTML = renderedSvg;
      
      const svgElement = mermaidRef.current.querySelector('svg');
      if (svgElement) {
        // Set SVG background to match theme
        svgElement.style.backgroundColor = isDarkMode ? 'hsl(var(--background))' : 'hsl(var(--background))';
        
        // Ensure proper contrast for text elements
        const textElements = svgElement.querySelectorAll('text, tspan, .label, .node-label, .edgeLabel');
        textElements.forEach(el => {
          const element = el as HTMLElement;
          if (!element.style.fill || element.style.fill === 'rgb(0, 0, 0)' || element.style.fill === 'black') {
            element.style.fill = isDarkMode ? '#f1f5f9' : '#1e293b';
          }
        });

        // Ensure proper contrast for background elements with default colors
        const backgroundElements = svgElement.querySelectorAll('[fill="#ffffff"], [fill="white"]');
        backgroundElements.forEach(el => {
          const element = el as SVGElement;
          if (isDarkMode) {
            element.setAttribute('fill', '#334155');
          }
        });

        // Ensure proper contrast for border elements with default colors
        const borderElements = svgElement.querySelectorAll('[stroke="#000000"], [stroke="black"]');
        borderElements.forEach(el => {
          const element = el as SVGElement;
          element.setAttribute('stroke', isDarkMode ? '#64748b' : '#e2e8f0');
        });
      }
    }
  }, [renderedSvg, isDarkMode]);

  const handleZoom = useCallback((delta: number) => {
    setScale(prev => {
      const newScale = Math.max(0.3, Math.min(3, prev + delta));
      return newScale;
    });
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

    const downloadSVG = useCallback(() => {
    if (renderedSvg) {
      // Create a temporary container to modify the SVG
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = renderedSvg;
      const svgElement = tempDiv.querySelector('svg');
      
      if (svgElement) {
        // Apply theme-specific styles directly to the SVG for standalone use
        const themeStyles = isDarkMode ? `
          <style>
            text, tspan, .label, .node-label, .edgeLabel { fill: #f1f5f9 !important; }
            .node rect, .node circle, .node polygon { fill: #334155 !important; stroke: #64748b !important; }
            .edge path, .edge line { stroke: #64748b !important; }
            .cluster rect { fill: #334155 !important; stroke: #64748b !important; }
            .actor { fill: #334155 !important; stroke: #64748b !important; }
            .actor-man circle, .actor-man line { stroke: #f1f5f9 !important; }
            .labelBox { fill: #1e293b !important; stroke: #64748b !important; }
            .labelText { fill: #f1f5f9 !important; }
            .loopText { fill: #f1f5f9 !important; }
            .noteText { fill: #f1f5f9 !important; }
            .note rect { fill: #1e293b !important; stroke: #64748b !important; }
            .section0, .section1, .section2 { fill: #334155 !important; }
            .grid line { stroke: #475569 !important; }
            .tick text { fill: #f1f5f9 !important; }
            .classTitle { fill: #f1f5f9 !important; }
            .relation { stroke: #64748b !important; }
            .relationshipLabel { fill: #f1f5f9 !important; }
            .stateBox { fill: #334155 !important; stroke: #64748b !important; }
            .stateLabelText { fill: #f1f5f9 !important; }
            .transition { stroke: #64748b !important; }
            .transitionLabelText { fill: #f1f5f9 !important; }
            .journey-section { fill: #334155 !important; }
            .journey-section text { fill: #f1f5f9 !important; }
            .task { fill: #334155 !important; stroke: #64748b !important; }
            .taskText { fill: #f1f5f9 !important; }
            .entity { fill: #334155 !important; stroke: #64748b !important; }
            .entityLabel { fill: #f1f5f9 !important; }
            .relationshipLabelBox { fill: #1e293b !important; stroke: #64748b !important; }
            .requirement { fill: #334155 !important; stroke: #64748b !important; }
            .requirementLabelText { fill: #f1f5f9 !important; }
            .commit { fill: #334155 !important; stroke: #64748b !important; }
            .commit-label { fill: #f1f5f9 !important; }
            .branch-label { fill: #f1f5f9 !important; }
            .pie-title { fill: #f1f5f9 !important; }
            .pieCircle { stroke: #64748b !important; }
            .pieLegendText { fill: #f1f5f9 !important; }
            .c4Person { fill: #334155 !important; stroke: #64748b !important; }
            .c4PersonLabel { fill: #f1f5f9 !important; }
            .c4System { fill: #334155 !important; stroke: #64748b !important; }
            .c4SystemLabel { fill: #f1f5f9 !important; }
            .c4Container { fill: #334155 !important; stroke: #64748b !important; }
            .c4ContainerLabel { fill: #f1f5f9 !important; }
            .c4Component { fill: #334155 !important; stroke: #64748b !important; }
            .c4ComponentLabel { fill: #f1f5f9 !important; }
            .c4Relationship { stroke: #64748b !important; }
            .c4RelationshipLabel { fill: #f1f5f9 !important; }
          </style>
        ` : `
          <style>
            text, tspan, .label, .node-label, .edgeLabel { fill: #1e293b !important; }
            .node rect, .node circle, .node polygon { fill: #ffffff !important; stroke: #e2e8f0 !important; }
            .edge path, .edge line { stroke: #64748b !important; }
            .cluster rect { fill: #f8fafc !important; stroke: #e2e8f0 !important; }
            .actor { fill: #ffffff !important; stroke: #e2e8f0 !important; }
            .actor-man circle, .actor-man line { stroke: #1e293b !important; }
            .labelBox { fill: #f8fafc !important; stroke: #e2e8f0 !important; }
            .labelText { fill: #1e293b !important; }
            .loopText { fill: #1e293b !important; }
            .noteText { fill: #1e293b !important; }
            .note rect { fill: #fefce8 !important; stroke: #e2e8f0 !important; }
            .section0, .section1, .section2 { fill: #f8fafc !important; }
            .grid line { stroke: #e2e8f0 !important; }
            .tick text { fill: #1e293b !important; }
            .classTitle { fill: #1e293b !important; }
            .relation { stroke: #64748b !important; }
            .relationshipLabel { fill: #1e293b !important; }
            .stateBox { fill: #ffffff !important; stroke: #e2e8f0 !important; }
            .stateLabelText { fill: #1e293b !important; }
            .transition { stroke: #64748b !important; }
            .transitionLabelText { fill: #1e293b !important; }
            .journey-section { fill: #f8fafc !important; }
            .journey-section text { fill: #1e293b !important; }
            .task { fill: #f8fafc !important; stroke: #e2e8f0 !important; }
            .taskText { fill: #1e293b !important; }
            .entity { fill: #ffffff !important; stroke: #e2e8f0 !important; }
            .entityLabel { fill: #1e293b !important; }
            .relationshipLabelBox { fill: #ffffff !important; stroke: #e2e8f0 !important; }
            .requirement { fill: #ffffff !important; stroke: #e2e8f0 !important; }
            .requirementLabelText { fill: #1e293b !important; }
            .commit { fill: #ffffff !important; stroke: #e2e8f0 !important; }
            .commit-label { fill: #1e293b !important; }
            .branch-label { fill: #1e293b !important; }
            .pie-title { fill: #1e293b !important; }
            .pieCircle { stroke: #e2e8f0 !important; }
            .pieLegendText { fill: #1e293b !important; }
            .c4Person { fill: #ffffff !important; stroke: #e2e8f0 !important; }
            .c4PersonLabel { fill: #1e293b !important; }
            .c4System { fill: #ffffff !important; stroke: #e2e8f0 !important; }
            .c4SystemLabel { fill: #1e293b !important; }
            .c4Container { fill: #ffffff !important; stroke: #e2e8f0 !important; }
            .c4ContainerLabel { fill: #1e293b !important; }
            .c4Component { fill: #ffffff !important; stroke: #e2e8f0 !important; }
            .c4ComponentLabel { fill: #1e293b !important; }
            .c4Relationship { stroke: #64748b !important; }
            .c4RelationshipLabel { fill: #1e293b !important; }
          </style>
        `;
        
        // Set the SVG background color
        svgElement.style.backgroundColor = isDarkMode ? '#0f172a' : '#ffffff';
        
        // Add theme styles to the SVG
        const existingDefs = svgElement.querySelector('defs');
        if (existingDefs) {
          existingDefs.insertAdjacentHTML('beforeend', themeStyles);
        } else {
          svgElement.insertAdjacentHTML('afterbegin', `<defs>${themeStyles}</defs>`);
        }
        
        // Get the modified SVG content
        const modifiedSvg = svgElement.outerHTML;
        
        // Create blob and download
        const svgBlob = new Blob([modifiedSvg], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = `${title || 'mermaid-diagram'}-${isDarkMode ? 'dark' : 'light'}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
      }
    }
  }, [renderedSvg, title, isDarkMode]);


  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(response);
      // You can add a toast notification here if you have one
      console.log('Diagram source copied to clipboard');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }, [response]);

  const copyRenderedSVG = useCallback(async () => {
    try {
      if (renderedSvg) {
        await navigator.clipboard.writeText(renderedSvg);
        // You can add a toast notification here if you have one
        console.log('SVG code copied to clipboard');
      }
    } catch (err) {
      console.error('Failed to copy SVG to clipboard:', err);
    }
  }, [renderedSvg]);

  // Drag functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left click only
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoom(0.1);
      } else if (e.key === '-') {
        e.preventDefault();
        handleZoom(-0.1);
      } else if (e.key === '0') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, handleZoom, handleReset]);

  return (
    <div className={`mt-6 ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border border-border'} shadow-lg overflow-hidden transition-all duration-300 bg-background`}>
      {/* Header */}
      <div className="bg-muted/50 p-4 border-b border-border">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h3 className="text-sm font-semibold text-foreground ml-4">
              {title || 'Diagram Preview'}
            </h3>
          </div>
          
          <div className="flex items-center space-x-1">
            {/* Zoom Controls */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden mr-2">
              <button 
                onClick={() => handleZoom(-0.1)}
                className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={scale <= 0.3}
                aria-label="Zoom out"
                title="Zoom out (-)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
              
              <div className="px-3 py-2 text-xs font-mono text-muted-foreground border-x border-border min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </div>
              
              <button 
                onClick={() => handleZoom(0.1)}
                className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={scale >= 3}
                aria-label="Zoom in"
                title="Zoom in (+)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
            </div>

            {/* Action Buttons */}
            <button 
              onClick={handleReset}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Reset zoom"
              title="Reset Zoom (0)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 2v6h-6"></path>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M3 22v-6h6"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
              </svg>
            </button>

            <button 
              onClick={copyToClipboard}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy source"
              title="Copy Source Code"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>

            <button 
              onClick={copyRenderedSVG}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy SVG"
              title="Copy SVG Code"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13,2 13,9 20,9"></polyline>
              </svg>
            </button>

            <button 
              onClick={downloadSVG}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Download SVG"
              title="Download as SVG"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7,10 12,15 17,10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>

            <button 
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              title={isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                  <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
                  <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
                  <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
                  <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div 
        className={`${isFullscreen ? 'h-full' : 'min-h-[400px] max-h-[80vh]'} overflow-hidden relative bg-background`}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-background/80 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-muted rounded-full"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Rendering diagram...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="m-6 p-6 bg-destructive/10 border border-destructive/20 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-destructive-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-destructive font-semibold">Rendering Error</h4>
                <p className="text-destructive/80 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <div 
          ref={containerRef}
          className={`p-6 ${isFullscreen ? 'h-full flex items-center justify-center' : ''}`}
        >
          <div 
            ref={mermaidRef}
            className={`mermaid transition-all duration-300 ease-out origin-center max-w-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ 
              opacity: loading ? 0 : 1,
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center'
            }}
            onMouseDown={handleMouseDown}
            
          />
        </div>
      </div>
    </div>
  );
}