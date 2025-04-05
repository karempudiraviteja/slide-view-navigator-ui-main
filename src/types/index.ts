
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  confidence?: number;
  color?: string;
}

export interface Detection {
  id: string;
  boundingBox: BoundingBox;
  label: string;
  confidence: number;
  description?: string;
}

export interface SlideMetadata {
  id: string;
  patientId: string;
  sampleId: string;
  date: string;
  magnification: string;
  stain: string;
  description: string;
}

export interface Slide {
  id: string;
  url: string;
  metadata: SlideMetadata;
  detections: Detection[];
  width: number;
  height: number;
}

export interface ZoomLevel {
  value: number;
  label: string;
}

// Updated interface for storing the original detection data format
export interface DetectionResult {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
}
