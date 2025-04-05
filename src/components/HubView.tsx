
import React, { useRef, useEffect } from "react";
import { Slide } from "../types";

interface HubViewProps {
  slide: Slide;
  viewportRect: { x: number; y: number; width: number; height: number } | null;
  onHubViewClick: (x: number, y: number) => void;
}

const HubView: React.FC<HubViewProps> = ({ slide, viewportRect, onHubViewClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailWidth = 300;
  // Calculate height while maintaining aspect ratio
  const thumbnailHeight = Math.round((slide.height / slide.width) * thumbnailWidth);
  
  // Draw the thumbnail and bounding boxes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create an image element
    const img = new Image();
    img.src = slide.url;
    img.onload = () => {
      // Draw the main slide thumbnail
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Draw detection bounding boxes
      const scaleX = canvas.width / slide.width;
      const scaleY = canvas.height / slide.height;
      
      slide.detections.forEach(detection => {
        const { x, y, width, height, color } = detection.boundingBox;
        ctx.strokeStyle = color || "#FF0000";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          x * scaleX, 
          y * scaleY, 
          width * scaleX, 
          height * scaleY
        );
      });
    };
  }, [slide]);
  
  // Draw the viewport indicator rectangle
  useEffect(() => {
    if (!viewportRect || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Calculate scaled position in hub view
    const scaleX = canvas.width / slide.width;
    const scaleY = canvas.height / slide.height;
    
    // Redraw hub view first (we could optimize this later)
    const img = new Image();
    img.src = slide.url;
    img.onload = () => {
      // Draw the slide image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Draw detection boxes
      slide.detections.forEach(detection => {
        const { x, y, width, height, color } = detection.boundingBox;
        ctx.strokeStyle = color || "#FF0000";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          x * scaleX, 
          y * scaleY, 
          width * scaleX, 
          height * scaleY
        );
      });
      
      // Draw viewport indicator
      ctx.strokeStyle = "#0066FF";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        viewportRect.x * scaleX,
        viewportRect.y * scaleY,
        viewportRect.width * scaleX,
        viewportRect.height * scaleY
      );
    };
    
  }, [viewportRect, slide]);
  
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert the click position from thumbnail coordinates to slide coordinates
    const slideX = (x / thumbnailWidth) * slide.width;
    const slideY = (y / thumbnailHeight) * slide.height;
    
    onHubViewClick(slideX, slideY);
  };
  
  return (
    <div 
      ref={containerRef}
      className="hub-view-container bg-secondary/40"
    >
      <canvas
        ref={canvasRef}
        width={thumbnailWidth}
        height={thumbnailHeight}
        onClick={handleClick}
        className="w-full h-auto cursor-pointer"
      />
    </div>
  );
};

export default HubView;
