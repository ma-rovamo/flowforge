'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import mermaid from 'mermaid';
import { toast } from 'sonner';

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
  const [isDownloading, setIsDownloading] = useState(false);
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

        // Make individual elements draggable
        makeElementsDraggable(svgElement);
      }
    }
  }, [renderedSvg]);

 const makeElementsDraggable = (svgElement: SVGElement) => {
  const draggableElements = svgElement.querySelectorAll('.node, .edgePath, .cluster');

  draggableElements.forEach((element) => {
    const el = element as SVGElement;
    let isDraggingElement = false;
    let startX = 0;
    let startY = 0;
    let initialTransform = '';
    let elementStartX = 0;
    let elementStartY = 0;

    // Store original transform for reset functionality
    if (!el.getAttribute('data-original-transform')) {
      el.setAttribute('data-original-transform', el.getAttribute('transform') || '');
    }

    const handleElementMouseDown = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      isDraggingElement = true;
      startX = e.clientX;
      startY = e.clientY;
      initialTransform = el.getAttribute('transform') || '';

      // Parse current position
      const transformMatch = initialTransform.match(/translate\(([^)]+)\)/);
      if (transformMatch) {
        const coords = transformMatch[1].split(',').map(s => parseFloat(s.trim()));
        elementStartX = coords[0] || 0;
        elementStartY = coords[1] || 0;
      } else {
        elementStartX = 0;
        elementStartY = 0;
      }

      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
      document.addEventListener('mousemove', handleElementMouseMove);
      document.addEventListener('mouseup', handleElementMouseUp);
    };

    const handleElementMouseMove = (e: MouseEvent) => {
      if (!isDraggingElement) return;

      const dx = (e.clientX - startX) / scale;
      const dy = (e.clientY - startY) / scale;

      const newX = elementStartX + dx;
      const newY = elementStartY + dy;

      // Removed clamping to allow free movement *anywhere*

      // Apply new transform
      let newTransform = initialTransform;
      if (initialTransform.includes('translate(')) {
        newTransform = initialTransform.replace(/translate\([^)]+\)/, `translate(${newX}, ${newY})`);
      } else {
        newTransform = `translate(${newX}, ${newY}) ${initialTransform}`;
      }

      el.setAttribute('transform', newTransform);
    };

    const handleElementMouseUp = () => {
      isDraggingElement = false;
      el.style.cursor = 'grab';
      el.style.userSelect = '';
      document.removeEventListener('mousemove', handleElementMouseMove);
      document.removeEventListener('mouseup', handleElementMouseUp);
    };

    el.style.cursor = 'grab';
    el.style.userSelect = 'none';
    el.addEventListener('mousedown', handleElementMouseDown);
  });
};


  const handleZoom = useCallback((delta: number) => {
    setScale(prev => {
      const newScale = Math.max(0.3, Math.min(3, prev + delta));
      return newScale;
    });
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    
    // Reset individual element positions
    if (mermaidRef.current) {
      const svgElement = mermaidRef.current.querySelector('svg');
      if (svgElement) {
        const draggableElements = svgElement.querySelectorAll('.node, .edgePath, .cluster');
        draggableElements.forEach((element) => {
          const el = element as SVGElement;
          const originalTransform = el.getAttribute('data-original-transform');
          if (originalTransform !== null) {
            el.setAttribute('transform', originalTransform);
          }
        });
      }
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const downloadSVG = useCallback(() => {
    if (renderedSvg) {
      const svgBlob = new Blob([renderedSvg], { type: 'image/svg+2xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `${title || 'mermaid-diagram'}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
      toast.success('SVG downloaded successfully');
    }
  }, [renderedSvg, title]);

  const downloadJPG = useCallback(async () => {
    if (!renderedSvg) return;
    
    setIsDownloading(true);
    
    try {
      // Create a new SVG with better styling for export
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(renderedSvg, 'image/svg+xml');
      const svgElement = svgDoc.querySelector('svg');
      
      if (!svgElement) {
        throw new Error('Invalid SVG content');
      }

      // Get SVG dimensions
      const svgRect = svgElement.getBoundingClientRect();
      const svgWidth = svgElement.width?.baseVal?.value || svgElement.viewBox?.baseVal?.width || 800;
      const svgHeight = svgElement.height?.baseVal?.value || svgElement.viewBox?.baseVal?.height || 800;
      
      // Clean up the SVG for better export
      const exportSvg = svgElement.cloneNode(true) as SVGElement;
      
      // Remove any problematic attributes
      exportSvg.removeAttribute('width');
      exportSvg.removeAttribute('height');
      exportSvg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
      
      // Force text color for better visibility
      const textElements = exportSvg.querySelectorAll('text, tspan, .label, .node-label');
      textElements.forEach(el => {
        (el as SVGElement).style.fill = theme === 'dark' ? '#ffffff' : '#000000';
        (el as SVGElement).style.color = theme === 'dark' ? '#ffffff' : '#000000';
      });
      
      // Improve node visibility
      const nodeElements = exportSvg.querySelectorAll('.node rect, .node circle, .node polygon');
      nodeElements.forEach(el => {
        const currentFill = (el as SVGElement).getAttribute('fill');
        if (!currentFill || currentFill === 'none' || currentFill === 'transparent') {
          (el as SVGElement).setAttribute('fill', theme === 'dark' ? '#2a2a2a' : '#ffffff');
        }
        (el as SVGElement).setAttribute('stroke', theme === 'dark' ? '#666666' : '#333333');
        (el as SVGElement).setAttribute('stroke-width', '2');
      });
      
      // Improve edge visibility
      const edgeElements = exportSvg.querySelectorAll('.edge path, .edge line');
      edgeElements.forEach(el => {
        (el as SVGElement).setAttribute('stroke', theme === 'dark' ? '#888888' : '#333333');
        (el as SVGElement).setAttribute('stroke-width', '2');
      });
      
      // Create canvas with high DPI for better quality
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Use higher DPI for better quality
      const dpr = window.devicePixelRatio || 1;
      const scaleFactor = 3 * dpr; // Even higher scale for better quality
      
      canvas.width = svgWidth * scaleFactor;
      canvas.height = svgHeight * scaleFactor;
      canvas.style.width = `${svgWidth}px`;
      canvas.style.height = `${svgHeight}px`;
      
      // Scale context for better quality
      ctx.scale(scaleFactor, scaleFactor);
      
      // Set high-quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Set background color
      ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#ffffff';
      ctx.fillRect(0, 0, svgWidth, svgHeight);
      
      // Convert cleaned SVG to data URL
      const svgString = new XMLSerializer().serializeToString(exportSvg);
      const svgBase64 = btoa(unescape(encodeURIComponent(svgString)));
      const svgDataUrl = `data:image/svg+xml;base64,${svgBase64}`;
      
      // Create and load image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const loadPromise = new Promise<void>((resolve, reject) => {
        img.onload = () => {
          try {
            // Draw with high quality
            ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        img.onerror = () => reject(new Error('Failed to load SVG image'));
      });
      
      img.src = svgDataUrl;
      await loadPromise;
      
      // Convert canvas to blob with high quality
      const downloadPromise = new Promise<void>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const jpgUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = jpgUrl;
            downloadLink.download = `${title || 'mermaid-diagram'}.jpg`;
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(jpgUrl);
            resolve();
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/jpeg', 0.95); // High quality JPEG
      });
      
      await downloadPromise;
      
    } catch (err) {
      console.error('Failed to download JPG:', err);
      // Fallback to simpler method
      try {
        await downloadJPGSimple();
      } catch (fallbackErr) {
        console.error('Fallback download also failed:', fallbackErr);
      }
    } finally {
      setIsDownloading(false);
    }
  }, [renderedSvg, title, theme]);

  const downloadJPGSimple = useCallback(async () => {
    if (!mermaidRef.current) return;
    
    const svgElement = mermaidRef.current.querySelector('svg');
    if (!svgElement) return;
    
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      const scaleFactor = 2;
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;
      
      ctx.scale(scaleFactor, scaleFactor);
      ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#ffffff';
      ctx.fillRect(0, 0, img.width, img.height);
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const downloadUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `${title || 'mermaid-diagram'}.jpg`;
          link.click();
          URL.revokeObjectURL(downloadUrl);
        }
      }, 'image/jpeg', 0.95);
      
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  }, [title, theme]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(response);
      console.log('Diagram source copied to clipboard');
      toast.success('Diagram source copied to clipboard');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }, [response]);

  const copyRenderedSVG = useCallback(async () => {
    try {
      if (renderedSvg) {
        await navigator.clipboard.writeText(renderedSvg);
        toast.success('SVG code copied to clipboard');
        console.log('SVG code copied to clipboard');
      }
    } catch (err) {
      console.error('Failed to copy SVG to clipboard:', err);
    }
  }, [renderedSvg]);

  // Improved drag functionality for entire diagram
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left click only
      // Check if we're clicking on an element or empty space
      const target = e.target as HTMLElement;
      const isOnElement = target.closest('.node, .edgePath, .cluster');
      
      if (!isOnElement) {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        e.preventDefault();
      }
    }
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Allow free movement with generous boundaries
      const maxBoundary = 12000;
      const minBoundary = -12000;
      
      setPosition({
        x: Math.max(minBoundary, Math.min(maxBoundary, newX)),
        y: Math.max(minBoundary, Math.min(maxBoundary, newY))
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
    <div className={`mt-6 ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl'} shadow-lg overflow-hidden transition-all duration-300`}>
      {/* Header */}
      <div className=" p-4 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div> */}
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
              aria-label="Reset zoom and position"
              title="Reset Zoom & Position"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 2">
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

            {/* Download Dropdown */}
            <div className="relative group">
              <button 
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Download options"
                title="Download"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <button 
                  onClick={downloadSVG}
                  className="w-full px-4 py-2 text-left hover:bg-muted text-foreground text-sm flex items-center space-x-2 rounded-t-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13,2 13,9 20,9"></polyline>
                  </svg>
                  <span>Download as SVG</span>
                </button>
                <button 
                  onClick={downloadJPG}
                  disabled={isDownloading}
                  className="w-full px-4 py-2 text-left hover:bg-muted text-foreground text-sm flex items-center space-x-2 rounded-b-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21,15 16,10 5,21"></polyline>
                  </svg>
                  <span>{isDownloading ? 'Converting...' : 'Download as JPG'}</span>
                </button>
              </div>
            </div>

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
        className={`${isFullscreen ? 'h-full' : 'min-h-[400px] max-h-[80vh]'} overflow-hidden relative bg-background select-none`}
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
  className={`relative w-full h-full ${isFullscreen ? 'fixed inset-0 z-50' : 'h-[600px]'}`}
  style={{
    overflow: 'visible', // allow dragging beyond container bounds
    backgroundColor: 'var(--background)', // preserve background styling
    padding: 0 // remove padding to maximize drag area
  }}
>
  <div
    ref={mermaidRef}
    className={`mermaid w-full h-full transition-all duration-300 ease-out origin-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
    style={{
      opacity: loading ? 0 : 1,
      transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
      transformOrigin: 'center center',
    }}
    onMouseDown={handleMouseDown}
  />
</div>

      </div>
      
    
    </div>
  );
}