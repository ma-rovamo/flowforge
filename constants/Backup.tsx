'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import mermaid from 'mermaid';

type Props = {
  response: string | any;
  theme?: 'light' | 'dark';
  title?: string;
};

export default function MermaidRenderer({ response, theme = 'light', title }: Props) {
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
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 16,
          flowchart: {
            curve: 'basis',
            htmlLabels: true,
            nodeSpacing: 50,
            rankSpacing: 50,
          },
        });

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
        }
        
        setError(errorMessage);
        setLoading(false);
      }
    };

    renderDiagram();
  }, [response, theme]);

  useEffect(() => {
    if (renderedSvg && mermaidRef.current) {
      mermaidRef.current.innerHTML = renderedSvg;
      
      // Force theme colors on the SVG content
      const svgElement = mermaidRef.current.querySelector('svg');
      if (svgElement) {
        // Apply theme-aware styles to override Mermaid's hardcoded colors
        svgElement.style.color = 'hsl(var(--foreground))';
        
        // Override text colors
        const textElements = svgElement.querySelectorAll('text, tspan, .label, .node-label');
        textElements.forEach(el => {
          (el as HTMLElement).style.fill = 'hsl(var(--foreground))';
          (el as HTMLElement).style.color = 'hsl(var(--foreground))';
        });
        
        // Override node/shape colors for better contrast
        const nodeElements = svgElement.querySelectorAll('.node rect, .node circle, .node polygon');
        nodeElements.forEach(el => {
          const currentFill = (el as SVGElement).getAttribute('fill');
          if (currentFill && (currentFill === '#000000' || currentFill === 'black')) {
            (el as SVGElement).setAttribute('fill', 'hsl(var(--muted))');
          }
        });
        
        // Override edge/line colors
        const edgeElements = svgElement.querySelectorAll('.edge path, .edge line');
        edgeElements.forEach(el => {
          (el as SVGElement).setAttribute('stroke', 'hsl(var(--muted-foreground))');
        });
      }
    }
  }, [renderedSvg]);

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
      const svgBlob = new Blob([renderedSvg], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `${title || 'mermaid-diagram'}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    }
  }, [renderedSvg, title]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(response);
      console.log('Diagram source copied to clipboard');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }, [response]);

  const copyRenderedSVG = useCallback(async () => {
    try {
      if (renderedSvg) {
        await navigator.clipboard.writeText(renderedSvg);
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
                className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                disabled={scale <= 0.3}
                aria-label="Zoom out"
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
                className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                disabled={scale >= 3}
                aria-label="Zoom in"
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
              title="Reset Zoom"
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
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
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
          <div className="absolute inset-0 flex justify-center items-center bg-background/80 z-10">
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