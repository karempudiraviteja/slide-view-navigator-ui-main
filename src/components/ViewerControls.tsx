
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Maximize, 
  MousePointer, 
  Move, 
  Grid,
  LayoutGrid
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ViewerControlsProps {
  onReset: () => void;
  onFitToScreen: () => void;
  mode: "pan" | "select";
  onModeChange: (mode: "pan" | "select") => void;
  showGrid: boolean;
  onToggleGrid: () => void;
}

const ViewerControls: React.FC<ViewerControlsProps> = ({
  onReset,
  onFitToScreen,
  mode,
  onModeChange,
  showGrid,
  onToggleGrid
}) => {
  return (
    <div className="viewer-controls absolute top-4 left-4 flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onReset}
              className="bg-background/80 backdrop-blur-sm"
            >
              <Home className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset View</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onFitToScreen}
              className="bg-background/80 backdrop-blur-sm"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Fit to Screen</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={mode === "pan" ? "default" : "outline"}
              size="icon"
              onClick={() => onModeChange("pan")}
              className={mode !== "pan" ? "bg-background/80 backdrop-blur-sm" : ""}
            >
              <Move className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Pan Mode</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={mode === "select" ? "default" : "outline"}
              size="icon"
              onClick={() => onModeChange("select")}
              className={mode !== "select" ? "bg-background/80 backdrop-blur-sm" : ""}
            >
              <MousePointer className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Select Mode</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showGrid ? "default" : "outline"}
              size="icon"
              onClick={onToggleGrid}
              className={!showGrid ? "bg-background/80 backdrop-blur-sm" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Grid</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ViewerControls;
