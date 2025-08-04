import { defineStore } from "pinia";
import type {
  Question,
  DimensionalScores,
  ScoreLabel,
  TimeEstimate,
  AssessmentResults,
  AssessmentState,
  Phase,
  PhaseInfo,
  DimensionKey,
  ScoreRangeKey,
} from "~/types/assessment";
import {
  DIMENSION_MAPPING,
  TERRAIN_SCORE_LABELS,
  COHERENCE_SCORE_LABELS,
  PHASE_INFO,
} from "~/types/assessment";

// Embedded questions data
const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How often do you feel bloated, heavy, or sluggish after eating?",
    dimensions: ["D1"],
    isReverse: false,
  },
  {
    id: 2,
    text: "How often do you have at least one complete, satisfying bowel movement per day?",
    dimensions: ["D1"],
    isReverse: true,
  },
  {
    id: 3,
    text: 'How often do you feel your digestion is "stuck" or incomplete?',
    dimensions: ["D1", "D7"],
    isReverse: false,
  },
  {
    id: 4,
    text: "How often do you experience puffiness, swelling, or facial bloating in the morning?",
    dimensions: ["D1"],
    isReverse: false,
  },
  {
    id: 5,
    text: "How often do you feel overheated or flushed without sweating?",
    dimensions: ["D1", "D5"],
    isReverse: false,
  },
  {
    id: 6,
    text: "How often do you feel congested (sinus, chest, lymph) even when you're not sick?",
    dimensions: ["D1", "D8"],
    isReverse: false,
  },
  {
    id: 7,
    text: "How often do you push through fatigue or discomfort to meet deadlines or obligations?",
    dimensions: ["D2"],
    isReverse: false,
  },
  {
    id: 8,
    text: "How often do you feel guilt or anxiety when resting, even when your body is asking for it?",
    dimensions: ["D2", "D7"],
    isReverse: false,
  },
  {
    id: 9,
    text: "How often do you stay up late or skip meals to finish tasks, even when you know it throws off your rhythm?",
    dimensions: ["D2", "D6"],
    isReverse: false,
  },
  {
    id: 10,
    text: "How well do you maintain steady energy when you skip or delay a meal by a few hours?",
    dimensions: ["D3", "D5"],
    isReverse: true,
  },
  {
    id: 11,
    text: "How often do you struggle to bounce back after moderate physical activity or stress?",
    dimensions: ["D3", "D5"],
    isReverse: false,
  },
  {
    id: 12,
    text: "How often do you feel depleted the next day after intense work or social demands?",
    dimensions: ["D3", "D2"],
    isReverse: false,
  },
  {
    id: 13,
    text: "How often do you feel stress gets stuck in your body as tightness, aches, or shutdown during prolonged stressful periods?",
    dimensions: ["D4", "D2", "D7"],
    isReverse: false,
  },
  {
    id: 14,
    text: "How often do massages, foam rolling, or stretching feel unusually uncomfortable or blocked (beyond normal soreness)?",
    dimensions: ["D4"],
    isReverse: false,
  },
  {
    id: 15,
    text: "How often do you feel physically unsettled or uncomfortable when adjusting to new environments (e.g., beds, chairs, postures)?",
    dimensions: ["D4", "D6"],
    isReverse: false,
  },
  {
    id: 16,
    text: "How often can you release areas of tension in your body (e.g., belly, hips, chest) just through breath or awareness—without needing to move or stretch?",
    dimensions: ["D4", "D2"],
    isReverse: true,
  },
  {
    id: 17,
    text: "How often do you feel like your body stays locked or tense long after stress has passed—even when you try to unwind it?",
    dimensions: ["D4", "D2", "D7"],
    isReverse: false,
  },
  {
    id: 18,
    text: "How often do you wake up tired or unrefreshed—regardless of how long you slept?",
    dimensions: ["D5"],
    isReverse: false,
  },
  {
    id: 19,
    text: "How often do you feel noticeably more energized after 20–30 minutes in natural sunlight?",
    dimensions: ["D5", "D8"],
    isReverse: true,
  },
  {
    id: 20,
    text: "How often do you feel your energy crash midday, regardless of how well you slept?",
    dimensions: ["D5"],
    isReverse: false,
  },
  {
    id: 21,
    text: "How often do you rely on caffeine, sugar, or stimulants to function or feel alert?",
    dimensions: ["D5"],
    isReverse: false,
  },
  {
    id: 22,
    text: "If you dim or reduce artificial lights after sunset, how often do you naturally feel sleepy within 1–2 hours?",
    dimensions: ["D6"],
    isReverse: true,
  },
  {
    id: 23,
    text: "How often does your daily energy follow a steady rhythm—rising in the morning, peaking mid-day, and tapering at night?",
    dimensions: ["D6"],
    isReverse: true,
  },
  {
    id: 24,
    text: "How consistently do you get exposure to early morning sunlight before 9am?",
    dimensions: ["D6", "D8"],
    isReverse: true,
  },
  {
    id: 25,
    text: "How often do you feel your day-to-day environment is noisy, chaotic, or overly stimulating (traffic, EMFs, people, pressure)?",
    dimensions: ["D8"],
    isReverse: false,
  },
];

export const useAssessmentStore = defineStore("assessment-store", {
  state: (): AssessmentState => ({
    currentQuestion: 0,
    isComplete: false,
    startTime: null,
    responses: new Map(),
    results: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    getCurrentQuestion(): Question {
      // We know currentQuestion is always in bounds during normal operation
      return QUESTIONS[this.currentQuestion]!;
    },

    getTotalQuestions(): number {
      return QUESTIONS.length;
    },

    getProgressPercentage(): number {
      return ((this.currentQuestion + 1) / QUESTIONS.length) * 100;
    },

    getAllQuestions(): Question[] {
      return QUESTIONS;
    },

    getPhaseInfo(): Record<Phase, PhaseInfo> {
      return PHASE_INFO;
    },
  },

  actions: {
    // Navigation actions
    setCurrentQuestion(questionIndex: number) {
      if (questionIndex >= 0 && questionIndex < QUESTIONS.length) {
        this.currentQuestion = questionIndex;
      }
    },

    nextQuestion() {
      if (this.currentQuestion < QUESTIONS.length - 1) {
        this.currentQuestion++;
      } else {
        this.completeAssessment();
      }
    },

    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
      }
    },

    startAssessment() {
      this.currentQuestion = 0;
      this.isComplete = false;
      this.startTime = new Date();
      this.responses.clear();
      this.results = null;
      this.error = null;
      this.saveToStorage();
    },

    completeAssessment() {
      const validation = this.validateAssessmentCompletion();
      if (!validation.isValid) {
        this.error = validation.error || "Assessment validation failed";
        return false;
      }

      this.isComplete = true;
      this.results = this.calculateResults();
      this.error = null;
      this.saveToStorage();
      return true;
    },

    // Response management actions
    setResponse(questionId: number, value: number) {
      if (value >= 0 && value <= 4) {
        this.responses.set(questionId, value);
        this.saveToStorage();
      }
    },

    getResponse(questionId: number): number | undefined {
      return this.responses.get(questionId);
    },

    getAllResponses(): Map<number, number> {
      return new Map(this.responses);
    },

    // Scoring logic embedded in store
    calculateDimensionalScores(): DimensionalScores {
      const dimensionalScores: DimensionalScores = {
        D1: 0,
        D2: 0,
        D3: 0,
        D4: 0,
        D5: 0,
        D6: 0,
        D7: 0,
        D8: 0,
      };

      // Calculate each dimensional score
      for (const [dimension, questionIds] of Object.entries(
        DIMENSION_MAPPING
      ) as [DimensionKey, number[]][]) {
        let totalScore = 0;
        let maxPossible = 0;

        for (const qId of questionIds) {
          const response = this.responses.get(qId);
          if (response !== undefined) {
            const question = QUESTIONS.find((q) => q.id === qId);
            if (question) {
              // Apply reverse scoring if needed
              const score = question.isReverse ? 4 - response : response;
              totalScore += score;
            }
          }
          maxPossible += 4; // Max score per question is 4
        }

        // Normalize to 100-point scale
        if (maxPossible > 0) {
          dimensionalScores[dimension] = (totalScore / maxPossible) * 100;
        }
      }

      return dimensionalScores;
    },

    calculateTerrainScore(dimensionalScores: DimensionalScores): number {
      // Terrain score weights: D1(30%), D2(25%), D4(25%), D5(20%)
      return (
        dimensionalScores.D1 * 0.3 +
        dimensionalScores.D2 * 0.25 +
        dimensionalScores.D4 * 0.25 +
        dimensionalScores.D5 * 0.2
      );
    },

    calculateCoherenceScore(dimensionalScores: DimensionalScores): number {
      // Coherence score weights: D2(50%), D6(50%)
      return dimensionalScores.D2 * 0.5 + dimensionalScores.D6 * 0.5;
    },

    assignPhase(dimensionalScores: DimensionalScores): Phase {
      // Phase assignment logic based on dimensional score thresholds
      if (dimensionalScores.D1 < 68) return "0.1";
      if (dimensionalScores.D4 < 68) return "0.2";
      if (dimensionalScores.D2 < 68) return "0.3";
      if (dimensionalScores.D5 < 68) return "0.4";
      return "1";
    },

    calculatePhaseTime(phase: Phase, dimensionalScore: number): TimeEstimate {
      const phaseInfo = PHASE_INFO[phase];
      const baseTime = phaseInfo.baseTime;

      // Time estimation formula: Base_Time × (1 + (80 – Dx) / 30)²
      const multiplier = Math.pow(1 + (80 - dimensionalScore) / 30, 2);
      const exactTime = baseTime * multiplier;

      // Convert to time range based on score bands
      let range: number;
      if (dimensionalScore >= 80) {
        range = 0.5; // ±0.5 weeks
      } else if (dimensionalScore >= 60) {
        range = 1; // ±1 week
      } else if (dimensionalScore >= 40) {
        range = 2; // ±2 weeks
      } else {
        range = 3; // ±3 weeks for low scores
      }

      return {
        min: Math.max(1, Math.round(exactTime - range)),
        max: Math.round(exactTime + range),
      };
    },

    getScoreLabel(score: number, type: "terrain" | "coherence"): ScoreLabel {
      const labels =
        type === "terrain" ? TERRAIN_SCORE_LABELS : COHERENCE_SCORE_LABELS;

      let rangeKey: ScoreRangeKey;
      if (score >= 80) rangeKey = "80-100";
      else if (score >= 60) rangeKey = "60-79";
      else if (score >= 40) rangeKey = "40-59";
      else if (score >= 20) rangeKey = "20-39";
      else rangeKey = "0-19";

      return labels[rangeKey];
    },

    calculateResults(): AssessmentResults {
      const dimensionalScores = this.calculateDimensionalScores();
      const terrainScore = this.calculateTerrainScore(dimensionalScores);
      const coherenceScore = this.calculateCoherenceScore(dimensionalScores);
      const phase = this.assignPhase(dimensionalScores);

      // Get the gating dimension score for time estimation
      const phaseInfo = PHASE_INFO[phase];
      const gateDimensionScore = dimensionalScores[phaseInfo.gateDimension];
      const timeEstimate = this.calculatePhaseTime(phase, gateDimensionScore);

      return {
        terrainScore,
        coherenceScore,
        dimensionalScores,
        phase,
        timeEstimate,
        scoreLabels: {
          terrain: this.getScoreLabel(terrainScore, "terrain"),
          coherence: this.getScoreLabel(coherenceScore, "coherence"),
        },
      };
    },

    getResults(): AssessmentResults | null {
      return this.results;
    },

    // Validation methods
    isQuestionAnswered(questionId: number): boolean {
      return this.responses.has(questionId);
    },

    areAllQuestionsAnswered(): boolean {
      return QUESTIONS.every((question) => this.responses.has(question.id));
    },

    getUnansweredQuestions(): number[] {
      return QUESTIONS.filter(
        (question) => !this.responses.has(question.id)
      ).map((question) => question.id);
    },

    validateAssessmentCompletion(): { isValid: boolean; error?: string } {
      if (!this.areAllQuestionsAnswered()) {
        const unanswered = this.getUnansweredQuestions();
        return {
          isValid: false,
          error: `Please answer all questions before completing the assessment. Missing: ${unanswered.length} question(s).`,
        };
      }
      return { isValid: true };
    },

    // Persistence methods for localStorage integration
    saveToStorage() {
      if (typeof window !== "undefined") {
        const stateToSave = {
          currentQuestion: this.currentQuestion,
          isComplete: this.isComplete,
          startTime: this.startTime?.toISOString(),
          responses: Array.from(this.responses.entries()),
          results: this.results,
        };
        localStorage.setItem(
          "coherence-assessment",
          JSON.stringify(stateToSave)
        );
      }
    },

    loadFromStorage() {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("coherence-assessment");
        if (saved) {
          try {
            const state = JSON.parse(saved);
            this.currentQuestion = state.currentQuestion || 0;
            this.isComplete = state.isComplete || false;
            this.startTime = state.startTime ? new Date(state.startTime) : null;
            this.responses = new Map(state.responses || []);
            this.results = state.results || null;
          } catch (error) {
            console.error(
              "Failed to load assessment state from storage:",
              error
            );
            this.resetAssessment();
          }
        }
      }
    },

    resetAssessment() {
      this.currentQuestion = 0;
      this.isComplete = false;
      this.startTime = null;
      this.responses.clear();
      this.results = null;
      this.isLoading = false;
      this.error = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("coherence-assessment");
      }
    },
  },
});
