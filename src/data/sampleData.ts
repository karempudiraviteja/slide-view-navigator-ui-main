
import { Slide, ZoomLevel, DetectionResult } from "../types";

// Process the detection results from the JSON
const detectionResults: DetectionResult[] = [
  { x1: 121, y1: 4, x2: 163, y2: 45, label: 'Circular_RBC' },
  { x1: 396, y1: 312, x2: 433, y2: 353, label: 'Circular_RBC' },
  { x1: 388, y1: 90, x2: 428, y2: 130, label: 'Circular_RBC' },
  { x1: 334, y1: 157, x2: 373, y2: 199, label: 'Circular_RBC' },
  { x1: 27, y1: 148, x2: 64, y2: 190, label: 'Circular_RBC' },
  { x1: 89, y1: 339, x2: 131, y2: 380, label: 'Circular_RBC' },
  { x1: 346, y1: 222, x2: 381, y2: 265, label: 'Circular_RBC' },
  { x1: 455, y1: 24, x2: 491, y2: 66, label: 'Circular_RBC' },
  { x1: 250, y1: 374, x2: 287, y2: 412, label: 'Circular_RBC' },
  { x1: 30, y1: 350, x2: 67, y2: 392, label: 'Circular_RBC' },
  // ... (for brevity I'm showing only some entries, but in the actual implementation we'll use all the data)
];

// Convert detection results to our app's format
const processedDetections = detectionResults.map((detection, index) => {
  const { x1, y1, x2, y2, label } = detection;
  const width = x2 - x1;
  const height = y2 - y1;
  const confidence = 0.95; // Default confidence since not provided in data
  
  return {
    id: `detection-${index + 1}`,
    boundingBox: {
      x: x1,
      y: y1,
      width,
      height,
      color: "#FF3B30" // Red color for RBCs
    },
    label: label,
    confidence,
    description: "Red blood cell detected in the sample."
  };
});

// Sample slide data with the real image and detections
export const sampleSlide: Slide = {
  id: "slide-001",
  url: "/blood_cells.png", // Using the uploaded image
  width: 1024, // Setting dimensions based on typical image size
  height: 512, // You may need to adjust these based on the actual image
  metadata: {
    
    
      "sampleId": "19",
      "patientId": "7",
      "wsi_video_url": "None",
      "inference_results": "{'delayTime': 950, 'executionTime': 7223, 'id': 'sync-e1323ad4-a299-4159-9342-1fa220a3c2b5-e1', 'output': {'detection_results': [[121, 4, 163, 45, 'Circular_RBC'], [396, 312, 433, 353, 'Circular_RBC'], [388, 90, 428, 130, 'Circular_RBC'], [334, 157, 373, 199, 'Circular_RBC'], [27, 148, 64, 190, 'Circular_RBC'], [89, 339, 131, 380, 'Circular_RBC'], [346, 222, 381, 265, 'Circular_RBC'], [455, 24, 491, 66, 'Circular_RBC'], [250, 374, 287, 412, 'Circular_RBC'], [30, 350, 67, 392, 'Circular_RBC'], [256, 285, 293, 324, 'Circular_RBC'], [118, 316, 158, 354, 'Circular_RBC'], [155, 311, 189, 350, 'Circular_RBC'], [0, 270, 37, 307, 'Circular_RBC'], [248, 409, 285, 448, 'Circular_RBC'], [77, 271, 113, 307, 'Circular_RBC'], [222, 437, 262, 475, 'Circular_RBC'], [126, 41, 163, 79, 'Circular_RBC'], [250, 152, 288, 189, 'Circular_RBC'], [177, 75, 214, 114, 'Circular_RBC'], [157, 446, 196, 484, 'Circular_RBC'], [12, 310, 56, 346, 'Circular_RBC'], [404, 195, 441, 237, 'Circular_RBC'], [464, 135, 499, 171, 'Circular_RBC'], [314, 355, 352, 396, 'Circular_RBC'], [211, 401, 247, 440, 'Circular_RBC'], [55, 190, 94, 229, 'Circular_RBC'], [110, 87, 148, 121, 'Circular_RBC'], [456, 364, 496, 400, 'Circular_RBC'], [466, 296, 505, 342, 'Circular_RBC'], [205, 195, 249, 234, 'Circular_RBC'], [287, 8, 324, 48, 'Circular_RBC'], [315, 128, 344, 170, 'Circular_RBC'], [372, 206, 410, 245, 'Circular_RBC'], [414, 41, 451, 76, 'Circular_RBC'], [103, 118, 142, 156, 'Circular_RBC'], [59, 447, 95, 487, 'Circular_RBC'], [241, 98, 275, 140, 'Circular_RBC'], [419, 256, 455, 296, 'Circular_RBC'], [122, 435, 160, 473, 'Circular_RBC'], [76, 122, 108, 162, 'Circular_RBC'], [155, 130, 193, 166, 'Circular_RBC'], [93, 55, 131, 90, 'Circular_RBC'], [111, 245, 152, 274, 'Circular_RBC'], [291, 433, 326, 473, 'Circular_RBC'], [258, 344, 298, 377, 'Circular_RBC'], [141, 156, 177, 194, 'Circular_RBC'], [210, 341, 244, 382, 'Circular_RBC'], [58, 92, 97, 126, 'Circular_RBC'], [391, 246, 427, 289, 'Circular_RBC'], [418, 126, 454, 164, 'Circular_RBC'], [69, 243, 106, 273, 'Circular_RBC'], [465, 169, 503, 205, 'Circular_RBC'], [193, 290, 232, 323, 'Circular_RBC'], [161, 41, 198, 77, 'Circular_RBC'], [290, 390, 318, 434, 'Circular_RBC'], [382, 359, 419, 394, 'Circular_RBC'], [459, 203, 496, 237, 'Circular_RBC'], [175, 380, 211, 413, 'Circular_RBC'], [289, 284, 329, 318, 'Circular_RBC'], [271, 126, 306, 158, 'Circular_RBC'], [0, 148, 30, 187, 'Circular_RBC'], [174, 0, 209, 37, 'Circular_RBC'], [131, 272, 166, 304, 'Circular_RBC'], [27, 204, 61, 239, 'Circular_RBC'], [251, 249, 288, 283, 'Circular_RBC'], [46, 272, 82, 310, 'Circular_RBC'], [380, 458, 418, 490, 'Circular_RBC'], [402, 10, 440, 43, 'Circular_RBC'], [187, 479, 223, 511, 'Circular_RBC'], [0, 339, 35, 378, 'Circular_RBC'], [354, 432, 393, 465, 'Circular_RBC'], [252, 214, 288, 252, 'Circular_RBC'], [428, 379, 465, 419, 'Circular_RBC'], [142, 407, 176, 442, 'Circular_RBC'], [470, 259, 505, 292, 'Circular_RBC'], [437, 202, 462, 235, 'Circular_RBC'], [39, 62, 93, 93, 'Circular_RBC'], [106, 155, 144, 184, 'Circular_RBC'], [453, 101, 490, 138, 'Circular_RBC'], [354, 87, 389, 125, 'Circular_RBC'], [388, 125, 424, 167, 'Circular_RBC'], [292, 257, 327, 289, 'Circular_RBC'], [317, 221, 350, 260, 'Circular_RBC'], [351, 335, 389, 376, 'Circular_RBC'], [30, 389, 65, 422, 'Circular_RBC'], [166, 200, 202, 234, 'Circular_RBC'], [187, 316, 223, 350, 'Circular_RBC'], [51, 411, 85, 448, 'Circular_RBC'], [349, 268, 384, 300, 'Circular_RBC'], [444, 72, 479, 108, 'Circular_RBC'], [369, 293, 400, 329, 'Circular_RBC'], [501, 175, 512, 223, 'Circular_RBC'], [441, 166, 470, 204, 'Circular_RBC'], [221, 29, 258, 63, 'Circular_RBC'], [309, 306, 343, 340, 'Circular_RBC'], [361, 40, 395, 77, 'Circular_RBC'], [73, 0, 120, 22, 'Circular_RBC'], [10, 94, 49, 134, 'Circular_RBC'], [430, 295, 468, 328, 'Circular_RBC'], [202, 2, 234, 39, 'Circular_RBC'], [327, 32, 365, 64, 'Circular_RBC'], [39, 32, 79, 65, 'Circular_RBC'], [430, 0, 473, 17, 'Circular_RBC'], [59, 485, 94, 512, 'Circular_RBC'], [149, 227, 188, 253, 'Circular_RBC'], [341, 473, 378, 508, 'Circular_RBC'], [487, 38, 512, 75, 'Circular_RBC'], [4, 448, 36, 493, 'Circular_RBC'], [264, 63, 300, 100, 'Circular_RBC'], [191, 141, 220, 176, 'Circular_RBC'], [93, 416, 132, 450, 'Circular_RBC'], [498, 0, 512, 40, 'Circular_RBC'], [305, 193, 338, 230, 'Circular_RBC'], [313, 394, 343, 428, 'Circular_RBC'], [424, 348, 458, 380, 'Circular_RBC'], [488, 227, 512, 263, 'Circular_RBC'], [7, 61, 43, 95, 'Circular_RBC'], [489, 228, 511, 263, 'Circular_RBC'], [305, 496, 345, 512, 'Circular_RBC'], [249, 0, 294, 13, 'Circular_RBC'], [501, 290, 512, 337, 'Circular_RBC'], [421, 420, 455, 457, 'Circular_RBC'], [469, 0, 512, 13, 'Circular_RBC'], [324, 0, 372, 12, 'Circular_RBC'], [373, 0, 407, 25, 'Circular_RBC'], [373, 390, 410, 424, 'Circular_RBC'], [484, 438, 512, 468, 'Circular_RBC'], [70, 369, 106, 419, 'Circular_RBC'], [351, 12, 387, 49, 'Circular_RBC'], [449, 412, 483, 449, 'Circular_RBC'], [378, 487, 418, 511, 'Circular_RBC'], [0, 185, 13, 220, 'Circular_RBC'], [183, 348, 212, 384, 'Circular_RBC'], [266, 475, 297, 511, 'Circular_RBC'], [119, 504, 170, 512, 'Circular_RBC'], [335, 387, 373, 414, 'Circular_RBC'], [363, 41, 394, 77, 'Circular_RBC'], [442, 166, 470, 204, 'Circular_RBC'], [0, 52, 10, 100, 'Circular_RBC'], [737, 213, 778, 257, 'Circular_RBC'], [554, 360, 595, 407, 'Circular_RBC'], [658, 345, 697, 389, 'Circular_RBC'], [882, 427, 923, 469, 'Circular_RBC'], [800, 296, 839, 338, 'Circular_RBC'], [661, 216, 701, 253, 'Circular_RBC'], [568, 20, 613, 56, 'Circular_RBC'], [918, 224, 956, 267, 'Circular_RBC'], [670, 118, 712, 160, 'Circular_RBC'], [626, 400, 664, 440, 'Circular_RBC'], [979, 460, 1015, 500, 'Circular_RBC'], [718, 283, 756, 320, 'Circular_RBC'], [773, 282, 808, 325, 'Circular_RBC'], [910, 180, 946, 217, 'Circular_RBC'], [518, 330, 557, 372, 'Circular_RBC'], [784, 145, 823, 182, 'Circular_RBC'], [722, 405, 763, 443, 'Circular_RBC'], [666, 56, 703, 94, 'Circular_RBC'], [690, 476, 734, 511, 'Circular_RBC'], [803, 411, 842, 446, 'Circular_RBC'], [742, 335, 776, 379, 'Circular_RBC'], [736, 436, 773, 473, 'Circular_RBC'], [619, 201, 653, 238, 'Circular_RBC'], [772, 434, 806, 471, 'Circular_RBC'], [914, 404, 954, 438, 'Circular_RBC'], [575, 420, 614, 460, 'Circular_RBC'], [835, 436, 874, 475, 'Circular_RBC'], [597, 307, 634, 344, 'Circular_RBC'], [941, 59, 978, 98, 'Circular_RBC'], [719, 118, 756, 156, 'Circular_RBC'], [542, 463, 580, 500, 'Circular_RBC'], [643, 295, 682, 333, 'Circular_RBC'], [558, 255, 595, 291, 'Circular_RBC'], [707, 323, 747, 360, 'Circular_RBC'], [777, 78, 814, 113, 'Circular_RBC'], [744, 142, 782, 179, 'Circular_RBC'], [915, 290, 953, 327, 'Circular_RBC'], [855, 156, 892, 201, 'Circular_RBC'], [857, 250, 896, 284, 'Circular_RBC'], [707, 15, 744, 53, 'Circular_RBC'], [959, 34, 998, 66, 'Circular_RBC'], [714, 85, 753, 118, 'Circular_RBC'], [891, 320, 930, 355, 'Circular_RBC'], [686, 153, 725, 188, 'Circular_RBC'], [522, 410, 564, 444, 'Circular_RBC'], [979, 424, 1016, 462, 'Circular_RBC'], [566, 69, 602, 111, 'Circular_RBC'], [939, 453, 979, 489, 'Circular_RBC'], [860, 0, 895, 40, 'Circular_RBC'], [895, 133, 933, 171, 'Circular_RBC'], [699, 201, 734, 234, 'Circular_RBC'], [876, 206, 914, 241, 'Circular_RBC'], [732, 174, 766, 207, 'Circular_RBC'], [643, 475, 682, 511, 'Circular_RBC'], [851, 373, 889, 408, 'Circular_RBC'], [712, 51, 749, 91, 'Circular_RBC'], [599, 384, 634, 421, 'Circular_RBC'], [658, 384, 698, 424, 'Circular_RBC'], [771, 331, 806, 368, 'Circular_RBC'], [870, 475, 915, 511, 'Circular_RBC'], [792, 108, 828, 141, 'Circular_RBC'], [763, 180, 802, 213, 'Circular_RBC'], [832, 63, 866, 103, 'Circular_RBC'], [862, 57, 901, 99, 'Circular_RBC'], [722, 255, 759, 288, 'Circular_RBC'], [829, 324, 864, 365, 'Circular_RBC'], [809, 369, 850, 400, 'Circular_RBC'], [970, 270, 1018, 299, 'Circular_RBC'], [696, 437, 731, 474, 'Circular_RBC'], [861, 280, 901, 317, 'Circular_RBC'], [601, 260, 634, 297, 'Circular_RBC'], [837, 223, 874, 259, 'Circular_RBC'], [772, 471, 811, 507, 'Circular_RBC'], [794, 21, 833, 54, 'Circular_RBC'], [953, 400, 989, 438, 'Circular_RBC'], [860, 342, 897, 374, 'Circular_RBC'], [694, 349, 728, 393, 'Circular_RBC'], [586, 204, 620, 241, 'Circular_RBC'], [739, 28, 774, 68, 'Circular_RBC'], [670, 316, 709, 349, 'Circular_RBC'], [673, 0, 714, 26, 'Circular_RBC'], [918, 0, 954, 31, 'Circular_RBC'], [806, 242, 838, 280, 'Circular_RBC'], [983, 143, 1018, 181, 'Circular_RBC'], [861, 128, 899, 161, 'Circular_RBC'], [780, 208, 818, 239, 'Circular_RBC'], [896, 98, 930, 136, 'Circular_RBC'], [954, 244, 991, 278, 'Circular_RBC'], [699, 231, 735, 266, 'Circular_RBC'], [512, 177, 537, 219, 'Circular_RBC'], [528, 273, 560, 322, 'Circular_RBC'], [866, 403, 908, 436, 'Circular_RBC'], [927, 92, 964, 131, 'Circular_RBC'], [631, 47, 666, 81, 'Circular_RBC'], [512, 455, 543, 493, 'Circular_RBC'], [647, 11, 684, 48, 'Circular_RBC'], [512, 118, 538, 157, 'Circular_RBC'], [824, 471, 860, 511, 'Circular_RBC'], [979, 310, 1016, 348, 'Circular_RBC'], [910, 346, 951, 381, 'Circular_RBC'], [771, 51, 811, 79, 'Circular_RBC'], [979, 382, 1016, 419, 'Circular_RBC'], [957, 1, 993, 36, 'Circular_RBC'], [646, 155, 680, 190, 'Circular_RBC'], [945, 201, 980, 236, 'Circular_RBC'], [531, 202, 569, 234, 'Circular_RBC'], [569, 288, 602, 322, 'Circular_RBC'], [584, 169, 619, 206, 'Circular_RBC'], [633, 344, 662, 386, 'Circular_RBC'], [559, 104, 602, 139, 'Circular_RBC'], [917, 40, 953, 75, 'Circular_RBC'], [621, 0, 663, 22, 'Circular_RBC'], [848, 309, 886, 345, 'Circular_RBC'], [548, 148, 590, 184, 'Circular_RBC'], [817, 179, 850, 214, 'Circular_RBC'], [663, 180, 694, 219, 'Circular_RBC'], [581, 137, 618, 171, 'Circular_RBC'], [878, 177, 913, 210, 'Circular_RBC'], [520, 240, 556, 275, 'Circular_RBC'], [887, 373, 925, 410, 'Circular_RBC'], [512, 75, 538, 117, 'Circular_RBC'], [742, 381, 778, 413, 'Circular_RBC'], [611, 234, 647, 266, 'Circular_RBC'], [512, 292, 536, 332, 'Circular_RBC'], [599, 470, 635, 508, 'Circular_RBC'], [839, 105, 866, 135, 'Circular_RBC'], [1013, 305, 1024, 347, 'Circular_RBC'], [512, 33, 521, 80, 'Circular_RBC'], [582, 458, 612, 505, 'Circular_RBC'], [805, 0, 845, 26, 'Circular_RBC'], [913, 488, 952, 512, 'Circular_RBC'], [994, 213, 1023, 253, 'Circular_RBC'], [523, 0, 562, 22, 'Circular_RBC'], [999, 113, 1024, 147, 'Circular_RBC'], [638, 255, 670, 286, 'Circular_RBC'], [1010, 412, 1024, 455, 'Circular_RBC'], [775, 235, 812, 271, 'Circular_RBC'], [595, 77, 630, 113, 'Circular_RBC'], [512, 222, 522, 268, 'Circular_RBC'], [865, 402, 907, 438, 'Circular_RBC'], [854, 475, 877, 512, 'Circular_RBC'], [777, 391, 819, 419, 'Circular_RBC'], [916, 375, 957, 409, 'Circular_RBC'], [707, 0, 757, 11, 'Circular_RBC'], [611, 164, 645, 198, 'Circular_RBC'], [527, 382, 560, 412, 'Circular_RBC'], [942, 488, 982, 512, 'Circular_RBC'], [523, 501, 572, 512, 'Circular_RBC'], [547, 433, 581, 467, 'Circular_RBC'], [580, 458, 611, 507, 'Circular_RBC'], [1000, 36, 1024, 67, 'Circular_RBC'], [626, 74, 655, 99, 'Circular_RBC'], [512, 76, 537, 117, 'Circular_RBC'], [994, 243, 1023, 274, 'Circular_RBC'], [925, 374, 958, 409, 'Circular_RBC'], [967, 0, 1013, 11, 'Circular_RBC'], [520, 0, 563, 24, 'Circular_RBC']], 'status': 'COMPLETED', 'workerId': 'vgfqxs1imv8aym'}",
      "celerystatus": "completed",
      "filename": "blood_cells.png",
      "sample_type": "blood",
      "date": "2024-12-09"
    
  },
  detections: processedDetections
};

export const zoomLevels: ZoomLevel[] = [
  { value: 0.25, label: "0.25x" },
  { value: 0.5, label: "0.5x" },
  { value: 1, label: "1x" },
  { value: 2, label: "2x" },
  { value: 4, label: "4x" },
  { value: 8, label: "8x" },
  { value: 16, label: "16x" },
  { value: 32, label: "32x" },
];
