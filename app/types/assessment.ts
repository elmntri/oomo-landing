// Core assessment data structures and types for the Coherence Assessment

export interface Question {
  id: number;
  text: string;
  dimensions: DimensionKey[];
  isReverse: boolean;
  type?: "likert" | "freeform"; // Optional type, defaults to "likert"
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
  multiplier: number;
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
  responses: Map<number, number>; // For likert scale responses
  freeformResponses: Map<number, string>; // For freeform responses

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
    emoji: "🟥",
    label: "Dysfunction",
    description:
      "Your body is protecting itself.\nThis score reflects a system under significant internal strain. You may not feel terrible all the time — but at the cellular level, your terrain is likely stuck, congested, or collapsing under load.\n\nThat's not failure. It's your body safely limiting change until conditions improve.\n\nThis is the hardest phase to see clearly, but also the most essential to start. Once exits unblock and pressure softens, healing becomes possible again.",
  },
  "20-39": {
    emoji: "🟧",
    label: "Low Capacity",
    description:
      "Your terrain is overloaded.\nThis score shows your system is still working through some combination of congestion, rigidity, depletion, or timing misalignment. These create functional blockages — not just symptoms — that make it hard to adapt to even helpful inputs.\n\nThat doesn't mean your body isn't trying. It means it's holding the line until conditions are safer.\n\nWe begin by clearing space — so your system can stop protecting and start responding.",
  },
  "40-59": {
    emoji: "🟨",
    label: "Transitional State",
    description:
      "You're close — but still blocked.\nThis score reflects a system that has pieces in place, but one or more bottlenecks are still dragging down your overall readiness. That might be drainage, charge, override, or structural stuckness.\n\nYou don't need to overhaul everything. But you do need targeted sequencing — supporting what's ready, while softening what's not.\n\nThis is where momentum builds — if you work with your terrain, not against it.",
  },
  "60-79": {
    emoji: "🟩",
    label: "Emerging Stability",
    description:
      "Your system is beginning to stabilize.\nThis score reflects a terrain with improving coherence, charge, and flexibility — strong enough to take on more input, but not yet fully locked in. One or two systems may still wobble under stress.\n\nThe key now is integration: making sure signal clarity and rhythm hold under real-world complexity.\n\nThis is where the work gets smarter, not harder.",
  },
  "80-100": {
    emoji: "🟦",
    label: "Readiness",
    description:
      "Your system is capable of receiving.\nThis score reflects a terrain with strong signs of coherence, open exits, buffered charge, and stable rhythms.\n\nThat doesn't guarantee everything is optimal — but it does suggest your body is ready to amplify healing, not resist it.\n\nThis is where health becomes expansive. The work ahead is to sustain that state under stress, deepen system flexibility, and eventually support others still on their way.",
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
    name: "Exits",
    description:
      "Focus on clearing exit pathways - bile flow, digestion, elimination, and fascia drainage.",
    baseTime: 2.5,
  },
  "0.2": {
    phase: "0.2",
    name: "Fascia",
    description:
      "Unlock fascia pliability, improve microcirculation, and restore movement-induced flow.",
    baseTime: 2,
  },
  "0.3": {
    phase: "0.3",
    name: "Override",
    description:
      "Address signal suppression, trauma loops, and false resilience patterns.",
    baseTime: 1.5,
  },
  "0.4": {
    phase: "0.4",
    name: "Charge",
    description:
      "Build sustainable energy reserves and optimize mitochondrial function.",
    baseTime: 2,
  },
  "1": {
    phase: "1",
    name: "Integration",
    description:
      "Advanced integration of all systems with full coherence and adaptability.",
    baseTime: 4,
  },
};
