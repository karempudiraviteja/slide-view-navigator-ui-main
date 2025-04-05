
import React, { useState, useEffect } from "react";
import SlideViewer from "@/components/SlideViewer";
import FindingsPanel from "@/components/FindingsPanel";
import HubView from "@/components/HubView";
import { sampleSlide } from "@/data/sampleData";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [selectedDetection, setSelectedDetection] = useState<string | null>(null);
  const [viewport, setViewport] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  
  // Auto-fit the slide to the screen when first loaded
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Function to handle detection selection from the findings panel
  const handleDetectionClick = (id: string) => {
    setSelectedDetection(id === selectedDetection ? null : id);
  };
  
  // Function to handle click on the hub view to navigate
  const handleHubViewClick = (x: number, y: number) => {
    // Use the globally exposed function from SlideViewer
    if ((window as any).__navigateToPoint) {
      (window as any).__navigateToPoint(x, y);
    }
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Left sidebar for findings */}
      <div className="w-80 h-full border-r">
        <FindingsPanel
          metadata={sampleSlide.metadata}
          detections={sampleSlide.detections}
          onDetectionClick={handleDetectionClick}
          selectedDetection={selectedDetection || undefined}
        />
      </div>
      
      {/* Main content area */}
      <div className="flex flex-col flex-grow h-full overflow-hidden">
        {/* Top area with hub view */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">Blood Cell Analysis</h1>
              <p className="text-muted-foreground">
                Sample: {sampleSlide.metadata.sampleId} | Patient: {sampleSlide.metadata.patientId} | Date: {sampleSlide.metadata.date}
              </p>
            </div>
            <div className="w-[300px]">
              <p className="text-sm font-medium mb-1">Navigation Thumbnail</p>
              <HubView 
                slide={sampleSlide}
                viewportRect={viewport}
                onHubViewClick={handleHubViewClick}
              />
            </div>
          </div>
        </div>
        
        {/* Main slide viewer */}
        <div className="flex-grow">
          <SlideViewer 
            slide={sampleSlide}
            selectedDetection={selectedDetection || undefined}
            onViewportChange={setViewport}
            onSelectDetection={setSelectedDetection}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
