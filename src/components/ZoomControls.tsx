
import React from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Plus, Minus } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { ZoomLevel } from "@/types";

interface ZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomChange: (zoom: number) => void;
  zoomLevels: ZoomLevel[];
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onZoomChange,
  zoomLevels
}) => {
  const currentZoomIndex = zoomLevels.findIndex(level => level.value === zoomLevel) || 0;
  
  const handleSliderChange = (value: number[]) => {
    const zoomIndex = value[0];
    if (zoomLevels[zoomIndex]) {
      onZoomChange(zoomLevels[zoomIndex].value);
    }
  };
  
  return (
    <div className="zoom-controls bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onZoomOut}
          disabled={currentZoomIndex <= 0}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="bg-muted px-2 py-1 rounded text-sm font-medium min-w-[60px] text-center">
          {zoomLevel}x
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onZoomIn}
          disabled={currentZoomIndex >= zoomLevels.length - 1}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-48">
        <Slider
          defaultValue={[currentZoomIndex]}
          max={zoomLevels.length - 1}
          step={1}
          value={[currentZoomIndex]}
          onValueChange={handleSliderChange}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{zoomLevels[0].label}</span>
          <span>{zoomLevels[zoomLevels.length - 1].label}</span>
        </div>
      </div>
    </div>
  );
};

export default ZoomControls;
