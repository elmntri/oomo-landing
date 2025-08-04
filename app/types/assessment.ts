// Core assessment data structures and types for the Coherence Assessment

export interface Question {
  id: number;
  text: string;
  dimensions: DimensionKey[];
  isReverse: boolean;
}

export interface AssessmentResponse {
  questionId: number;
  value: number; // 0-4 (Never=0, Rarely=1, Sometimes=2, Often=3, Almost Always=4)
  timestamp: Date;
}

export interface DimensionalScores {
  D1: number; // Exit Readiness
  D2: number; // Mental Override
  D3: number; // Oscillatory Capacity
  D4: number; // Terrain Flexibility
  D5: number; // Charge Reserve
  D6: number; // Coherence Synchrony
  D7: number; // Stuckness Pattern
  D8: number; // Environmental Load
}

export interface ScoreLabel {
  emoji: string;
  label: string;
  description: string;
}

export interface TimeEstimate {
  min: number;
  max: number;
}

export interface AssessmentResults {
  terrainScore: number;
  coherenceScore: number;
  dimensionalScores: DimensionalScores;
  phase: Phase;
  timeEstimate: TimeEstimate;
  scoreLabels: {
    terrain: ScoreLabel;
    coherence: ScoreLabel;
  };
}

export interface AssessmentState {
  // Navigation state
  currentQuestion: number;
  isComplete: boolean;
  startTime: Date | null;

  // Response data
  responses: Map<number, number>;

  // Calculated results
  results: AssessmentResults | null;

  // UI state
  isLoading: boolean;
  error: string | null;
}

// Likert scale options
export const LIKERT_OPTIONS = [
  "Never",
  "Rarely",
  "Sometimes",
  "Often",
  "Almost Always",
] as const;

export type LikertOption = (typeof LIKERT_OPTIONS)[number];

// Phase definitions
export type Phase = "0.1" | "0.2" | "0.3" | "0.4" | "1";

// Dimension key type for precise mapping
export type DimensionKey =
  | "D1"
  | "D2"
  | "D3"
  | "D4"
  | "D5"
  | "D6"
  | "D7"
  | "D8";

// Score range keys for precise label mapping
export type ScoreRangeKey = "0-19" | "20-39" | "40-59" | "60-79" | "80-100";

export interface PhaseInfo {
  phase: Phase;
  name: string;
  description: string;
  baseTime: number; // in weeks
  gateDimension: DimensionKey;
}
// Dimension mapping configuration with precise types
export const DIMENSION_MAPPING: Record<DimensionKey, number[]> = {
  D1: [1, 2, 3, 4, 5, 6], // Exit Readiness
  D2: [7, 8, 9, 12, 13, 16, 17], // Mental Override
  D3: [10, 11, 12], // Oscillatory Capacity
  D4: [13, 14, 15, 16, 17], // Terrain Flexibility
  D5: [5, 10, 11, 18, 19, 20, 21], // Charge Reserve
  D6: [9, 15, 22, 23, 24], // Coherence Synchrony
  D7: [3, 8, 13, 17], // Stuckness Pattern
  D8: [6, 19, 24, 25], // Environmental Load
};

// Score label configurations with precise types
export const TERRAIN_SCORE_LABELS: Record<ScoreRangeKey, ScoreLabel> = {
  "0-19": {
    emoji: "⚠️",
    label: "System Stalled",
    description:
      "Deeply impaired exits, override, or charge. System dysfunction requires foundational support.",
  },
  "20-39": {
    emoji: "🪨",
    label: "Blocked Terrain",
    description:
      "Some movement possible, but terrain is rigid, burdened, or low-charge. Significant overload present.",
  },
  "40-59": {
    emoji: "🌿",
    label: "Starting to Open",
    description:
      "Key exits or signals are beginning to respond. Active re-alignment needed for stability.",
  },
  "60-79": {
    emoji: "🌱",
    label: "Gaining Ground",
    description:
      "Terrain is loosening; ready for deeper pattern work and early rhythm establishment.",
  },
  "80-100": {
    emoji: "🌳",
    label: "Stable & Responsive",
    description:
      "Structural and signaling coherence is present. System ready for advanced integration.",
  },
};

export const COHERENCE_SCORE_LABELS: Record<ScoreRangeKey, ScoreLabel> = {
  "0-19": {
    emoji: "🌘",
    label: "Disconnected",
    description:
      "Severely fragmented rhythms; likely misaligned from light, food, and sleep cycles.",
  },
  "20-39": {
    emoji: "🌀",
    label: "Desynchronized",
    description:
      "Some patterns exist, but timing is unstable or frequently overridden.",
  },
  "40-59": {
    emoji: "🌗",
    label: "Re-patterning",
    description:
      "Daily rhythms are forming, but still fragile or inconsistent under stress.",
  },
  "60-79": {
    emoji: "🌖",
    label: "Aligning",
    description:
      "Rhythm and override patterns are stabilizing — signal flow is becoming clearer.",
  },
  "80-100": {
    emoji: "🌕",
    label: "Synchronized",
    description:
      "Biological clocks and energetic cycles are coherent and well-aligned.",
  },
};

// Phase information configuration
export const PHASE_INFO: Record<Phase, PhaseInfo> = {
  "0.1": {
    phase: "0.1",
    name: "Exit Readiness",
    description:
      "Focus on clearing exit pathways - bile flow, digestion, elimination, and fascia drainage.",
    baseTime: 2.5,
    gateDimension: "D1",
  },
  "0.2": {
    phase: "0.2",
    name: "Terrain Flexibility",
    description:
      "Unlock fascia pliability, improve microcirculation, and restore movement-induced flow.",
    baseTime: 2,
    gateDimension: "D4",
  },
  "0.3": {
    phase: "0.3",
    name: "Mental Override",
    description:
      "Address signal suppression, trauma loops, and false resilience patterns.",
    baseTime: 1.5,
    gateDimension: "D2",
  },
  "0.4": {
    phase: "0.4",
    name: "Charge Reserve",
    description:
      "Build sustainable energy reserves and optimize mitochondrial function.",
    baseTime: 2,
    gateDimension: "D5",
  },
  "1": {
    phase: "1",
    name: "Integration",
    description:
      "Advanced integration of all systems with full coherence and adaptability.",
    baseTime: 4,
    gateDimension: "D1", // All dimensions ≥ 68
  },
};
