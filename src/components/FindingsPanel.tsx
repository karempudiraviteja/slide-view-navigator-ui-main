
import React from "react";
import { Detection, SlideMetadata } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FindingsPanelProps {
  metadata: SlideMetadata;
  detections: Detection[];
  onDetectionClick: (id: string) => void;
  selectedDetection?: string;
}

const FindingsPanel: React.FC<FindingsPanelProps> = ({
  metadata,
  detections,
  onDetectionClick,
  selectedDetection,
}) => {
  return (
    <div className="findings-panel h-full p-4 space-y-6 w-full">
      <div>
        <h2 className="text-2xl font-bold mb-2">Slide Information</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Patient ID:</span>
                <span>{metadata.patientId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Sample ID:</span>
                <span>{metadata.sampleId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{metadata.date}</span>
              </div>
              
            </div>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground mt-2">{metadata.description}</p>
      </div>

      <Separator />

      <div>
        <h2 className="text-2xl font-bold mb-2">Findings</h2>
        <div className="space-y-4">
          {detections.map((detection) => (
            <Card 
              key={detection.id}
              className={`cursor-pointer transition-colors ${
                selectedDetection === detection.id ? "border-primary ring-2 ring-primary/20" : ""
              }`}
              onClick={() => onDetectionClick(detection.id)}
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{detection.label}</CardTitle>
                  <Badge 
                    variant={detection.confidence > 0.9 ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {Math.round(detection.confidence * 100)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-1">
                <p className="text-sm text-muted-foreground">{detection.description}</p>
                <div 
                  className="w-4 h-4 mt-2 rounded-sm" 
                  style={{ background: detection.boundingBox.color || "#FF0000" }} 
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindingsPanel;
