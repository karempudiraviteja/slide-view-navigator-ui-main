
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Slide, Detection } from "../types";
import ZoomControls from "./ZoomControls";
import ViewerControls from "./ViewerControls";
import { zoomLevels } from "../data/sampleData";
import { toast } from "sonner";

interface SlideViewerProps {
  slide: Slide;
  selectedDetection?: string;
  onViewportChange: (viewport: { x: number; y: number; width: number; height: number }) => void;
  onSelectDetection: (id: string | null) => void;
}

const SlideViewer: React.FC<SlideViewerProps> = ({
  slide,
  selectedDetection,
  onViewportChange,
  onSelectDetection,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State for tracking viewer parameters
  const [zoom, setZoom] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [viewerMode, setViewerMode] = useState<"pan" | "select">("pan");
  const [showGrid, setShowGrid] = useState<boolean>(false);
  
  // Track which detection bounding box the mouse is over
  const [hoveredDetection, setHoveredDetection] = useState<string | null>(null);
  
  // Calculate the dimensions of the viewport in slide coordinates
  const calculateViewport = useCallback(() => {
    if (!containerRef.current) return null;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    
    // Calculate the portion of the slide that's currently visible
    const viewportWidth = containerWidth / zoom;
    const viewportHeight = containerHeight / zoom;
    
    // Adjust position to ensure it's centered correctly
    const viewportX = -position.x / zoom;
    const viewportY = -position.y / zoom;
    
    return {
      x: viewportX,
      y: viewportY,
      width: viewportWidth,
      height: viewportHeight,
    };
  }, [position, zoom]);
  
  // Update viewport when position or zoom changes
  useEffect(() => {
    const viewport = calculateViewport();
    if (viewport) {
      onViewportChange(viewport);
    }
  }, [position, zoom, calculateViewport, onViewportChange]);
  
  // Draw the slide and bounding boxes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    
    // Set canvas dimensions based on container
    const container = containerRef.current;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the slide image with current zoom and position
    const img = new Image();
    img.src = slide.url;
    img.onload = () => {
      ctx.save();
      
      // Apply transformations for zoom and position
      ctx.translate(position.x, position.y);
      ctx.scale(zoom, zoom);
      
      // Draw the main slide image
      ctx.drawImage(img, 0, 0, slide.width, slide.height);
      
      // Draw grid if enabled
      if (showGrid) {
        const gridSize = 100; // Grid cell size in slide coordinates
        const gridColor = "rgba(255, 255, 255, 0.3)";
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1 / zoom;
        
        for (let x = 0; x <= slide.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, slide.height);
          ctx.stroke();
        }
        
        for (let y = 0; y <= slide.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(slide.width, y);
          ctx.stroke();
        }
      }
      
      // Draw detection bounding boxes
      slide.detections.forEach(detection => {
        const { x, y, width, height, color } = detection.boundingBox;
        const isSelected = detection.id === selectedDetection;
        const isHovered = detection.id === hoveredDetection;
        
        // Determine box style based on selection state
        ctx.strokeStyle = color || "#FF0000";
        ctx.lineWidth = (isSelected || isHovered) ? 3 / zoom : 2 / zoom;
        
        // Draw the box
        ctx.strokeRect(x, y, width, height);
        
        // Draw label if selected or hovered
        if (isSelected || isHovered) {
          const labelBg = isSelected ? "#0066FF" : "#333333";
          const padding = 5;
          const fontSize = 14 / zoom;
          ctx.font = `${fontSize}px sans-serif`;
          const labelWidth = ctx.measureText(detection.label).width + (padding * 2);
          const labelHeight = fontSize + (padding * 2);
          
          // Draw label background
          ctx.fillStyle = labelBg;
          ctx.fillRect(x, y - labelHeight - 2 / zoom, labelWidth, labelHeight);
          
          // Draw label text
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(detection.label, x + padding / zoom, y - padding / zoom);
          
          // If selected, draw confidence too
          if (isSelected) {
            const confText = `${Math.round(detection.confidence * 100)}%`;
            ctx.fillText(confText, x + padding / zoom, y - padding / zoom - fontSize);
          }
        }
      });
      
      ctx.restore();
    };
  }, [slide, position, zoom, selectedDetection, hoveredDetection, showGrid]);
  
  // Check if mouse is over any detection bounding box
  const checkDetectionHover = (clientX: number, clientY: number) => {
    if (!containerRef.current) return null;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Convert screen coordinates to slide coordinates
    const slideX = (x - position.x) / zoom;
    const slideY = (y - position.y) / zoom;
    
    // Check each detection
    for (const detection of slide.detections) {
      const { x, y, width, height } = detection.boundingBox;
      if (
        slideX >= x && slideX <= x + width &&
        slideY >= y && slideY <= y + height
      ) {
        return detection.id;
      }
    }
    
    return null;
  };
  
  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!containerRef.current) return;
    
    setDragStart({ x: e.clientX, y: e.clientY });
    
    if (viewerMode === "select") {
      // Check if we clicked on a detection
      const detectionId = checkDetectionHover(e.clientX, e.clientY);
      if (detectionId) {
        onSelectDetection(detectionId);
        const detection = slide.detections.find(d => d.id === detectionId);
        if (detection) {
          toast(`Selected: ${detection.label}`);
        }
      } else {
        onSelectDetection(null);
      }
    } else {
      setIsDragging(true);
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (viewerMode === "select") {
      const detectionId = checkDetectionHover(e.clientX, e.clientY);
      setHoveredDetection(detectionId);
      return;
    }
    
    if (isDragging && dragStart) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
    setHoveredDetection(null);
  };
  
  // Zoom controls
  const handleZoomIn = () => {
    const currentIndex = zoomLevels.findIndex(level => level.value === zoom);
    if (currentIndex < zoomLevels.length - 1) {
      setZoom(zoomLevels[currentIndex + 1].value);
    }
  };
  
  const handleZoomOut = () => {
    const currentIndex = zoomLevels.findIndex(level => level.value === zoom);
    if (currentIndex > 0) {
      setZoom(zoomLevels[currentIndex - 1].value);
    }
  };
  
  // Reset view to default
  const handleResetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };
  
  // Fit the slide to the screen
  const handleFitToScreen = () => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    const scaleX = containerWidth / slide.width;
    const scaleY = containerHeight / slide.height;
    const scale = Math.min(scaleX, scaleY, 1); // Don't zoom in more than 1x
    
    // Find the closest zoom level
    const closestZoomLevel = zoomLevels.reduce((prev, curr) => {
      return Math.abs(curr.value - scale) < Math.abs(prev.value - scale) ? curr : prev;
    });
    
    setZoom(closestZoomLevel.value);
    
    // Center the image
    const scaledWidth = slide.width * closestZoomLevel.value;
    const scaledHeight = slide.height * closestZoomLevel.value;
    const x = (containerWidth - scaledWidth) / 2;
    const y = (containerHeight - scaledHeight) / 2;
    
    setPosition({ x, y });
  };
  
  // Handle viewport navigation from hub view
  const navigateToPoint = (x: number, y: number) => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    // Center the view on the clicked point
    const newX = (containerWidth / 2) - (x * zoom);
    const newY = (containerHeight / 2) - (y * zoom);
    
    setPosition({ x: newX, y: newY });
  };
  
  // Navigate to a specific detection
  const navigateToDetection = useCallback((detectionId: string) => {
    const detection = slide.detections.find(d => d.id === detectionId);
    if (!detection) return;
    
    const { x, y, width, height } = detection.boundingBox;
    
    // Calculate center of the bounding box
    const centerX = x + (width / 2);
    const centerY = y + (height / 2);
    
    // Navigate to it
    navigateToPoint(centerX, centerY);
    
    // Increase zoom if it's too low
    const minZoomForDetail = 4;
    if (zoom < minZoomForDetail) {
      setZoom(minZoomForDetail);
    }
  }, [slide.detections, zoom]);
  
  // When selected detection changes, navigate to it
  useEffect(() => {
    if (selectedDetection) {
      navigateToDetection(selectedDetection);
    }
  }, [selectedDetection, navigateToDetection]);
  
  // Make the navigation function available to parent
  useEffect(() => {
    // This would be exposed via a ref or callback in a real implementation
    if ((window as any).__navigateToPoint === undefined) {
      (window as any).__navigateToPoint = navigateToPoint;
    }
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="slide-viewer relative bg-neutral-900"
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={`slide-canvas w-full h-full ${viewerMode === "pan" ? "cursor-grab" : "cursor-pointer"} ${isDragging ? "cursor-grabbing" : ""}`}
      />
      
      <ViewerControls
        onReset={handleResetView}
        onFitToScreen={handleFitToScreen}
        mode={viewerMode}
        onModeChange={setViewerMode}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(prev => !prev)}
      />
      
      <ZoomControls
        zoomLevel={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomChange={setZoom}
        zoomLevels={zoomLevels}
      />
    </div>
  );
};

export default SlideViewer;
