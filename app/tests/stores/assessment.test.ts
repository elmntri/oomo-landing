import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAssessmentStore } from "~/stores/assessment";
import type { DimensionalScores, Phase } from "~/types/assessment";

// Mock localStorage
Object.defineProperty(window, "localStorage", {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

describe("Assessment Store - Scoring Logic", () => {
  let store: ReturnType<typeof useAssessmentStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useAssessmentStore();
    vi.clearAllMocks();
  });

  describe("Dimensional Score Calculation", () => {
    it("should calculate dimensional scores correctly with normal responses", () => {
      // Set up test responses for D1 (questions 1,2,3,4,5,6)
      // D1 questions: 1(reverse), 2(normal), 3(reverse), 4(reverse), 5(reverse), 6(reverse)
      store.setResponse(1, 2); // reverse: 4-2 = 2
      store.setResponse(2, 3); // normal: 3
      store.setResponse(3, 1); // reverse: 4-1 = 3
      store.setResponse(4, 0); // reverse: 4-0 = 4
      store.setResponse(5, 4); // reverse: 4-4 = 0
      store.setResponse(6, 2); // reverse: 4-2 = 2

      // Expected D1 score: (2+3+3+4+0+2) / (6*4) * 100 = 14/24 * 100 = 58.33
      const dimensionalScores = store.calculateDimensionalScores();
      expect(dimensionalScores.D1).toBeCloseTo(58.33, 2);
    });

    it("should handle reverse scoring correctly", () => {
      // Test with all maximum responses (4) on reverse questions
      store.setResponse(1, 4); // reverse: 4-4 = 0
      store.setResponse(3, 4); // reverse: 4-4 = 0
      store.setResponse(4, 4); // reverse: 4-4 = 0
      store.setResponse(5, 4); // reverse: 4-4 = 0
      store.setResponse(6, 4); // reverse: 4-4 = 0
      // And minimum response on normal question
      store.setResponse(2, 0); // normal: 0

      // Expected D1 score: (0+0+0+0+0+0) / (6*4) * 100 = 0
      const dimensionalScores = store.calculateDimensionalScores();
      expect(dimensionalScores.D1).toBe(0);
    });

    it("should handle perfect scores correctly", () => {
      // Set perfect responses for D1
      store.setResponse(1, 0); // reverse: 4-0 = 4
      store.setResponse(2, 4); // normal: 4
      store.setResponse(3, 0); // reverse: 4-0 = 4
      store.setResponse(4, 0); // reverse: 4-0 = 4
      store.setResponse(5, 0); // reverse: 4-0 = 4
      store.setResponse(6, 0); // reverse: 4-0 = 4

      // Expected D1 score: (4+4+4+4+4+4) / (6*4) * 100 = 24/24 * 100 = 100
      const dimensionalScores = store.calculateDimensionalScores();
      expect(dimensionalScores.D1).toBe(100);
    });

    it("should ignore freeform questions in dimensional scoring", () => {
      // Set responses for D7 questions (3, 8, 13, 17)
      store.setResponse(3, 2); // reverse: 4-2 = 2
      store.setResponse(8, 1); // reverse: 4-1 = 3
      store.setResponse(13, 3); // reverse: 4-3 = 1
      store.setResponse(17, 0); // reverse: 4-0 = 4

      // Freeform question should not affect scoring
      store.setFreeformResponse(26, "This should not affect scoring");

      const dimensionalScores = store.calculateDimensionalScores();
      // Expected D7 score: (2+3+1+4) / (4*4) * 100 = 10/16 * 100 = 62.5
      expect(dimensionalScores.D7).toBe(62.5);
    });
  });

  describe("Terrain Score Calculation", () => {
    it("should calculate terrain score with correct weights", () => {
      const mockScores: DimensionalScores = {
        D1: 80, // 30% weight
        D2: 60, // 25% weight
        D3: 40,
        D4: 70, // 25% weight
        D5: 50, // 20% weight
        D6: 90,
        D7: 30,
        D8: 20,
      };

      const terrainScore = store.calculateTerrainScore(mockScores);
      // Expected: 80*0.3 + 60*0.25 + 70*0.25 + 50*0.2 = 24 + 15 + 17.5 + 10 = 66.5
      expect(terrainScore).toBe(66.5);
    });
  });

  describe("Coherence Score Calculation", () => {
    it("should calculate coherence score with correct weights", () => {
      const mockScores: DimensionalScores = {
        D1: 80,
        D2: 70, // 50% weight
        D3: 40,
        D4: 60,
        D5: 50,
        D6: 80, // 50% weight
        D7: 30,
        D8: 20,
      };

      const coherenceScore = store.calculateCoherenceScore(mockScores);
      // Expected: 70*0.5 + 80*0.5 = 35 + 40 = 75
      expect(coherenceScore).toBe(75);
    });
  });

  describe("Phase Assignment", () => {
    it("should assign phase 0.1 when D1, D8, D5 minimum is ≤ 63", () => {
      const mockScores: DimensionalScores = {
        D1: 60, // min of (60, 70, 80) = 60 ≤ 63
        D2: 80,
        D3: 80,
        D4: 80,
        D5: 80,
        D6: 80,
        D7: 80,
        D8: 70,
      };

      const phase = store.assignPhase(mockScores);
      expect(phase).toBe("0.1");
    });

    it("should assign phase 0.2 when D1, D4, D6 minimum is ≤ 63 (and phase 0.1 criteria not met)", () => {
      const mockScores: DimensionalScores = {
        D1: 60, // min of (60, 70, 80) = 60 ≤ 63
        D2: 80,
        D3: 80,
        D4: 70,
        D5: 70, // D1,D8,D5 min = min(60,80,70) = 60, but we'll make D5 > 63
        D6: 80,
        D7: 80,
        D8: 80, // D1,D8,D5 min = min(60,80,70) = 60 ≤ 63, so this would be 0.1
      };

      // Need to adjust to test 0.2 specifically
      const adjustedScores: DimensionalScores = {
        D1: 60, // min of (60, 70, 80) = 60 ≤ 63
        D2: 80,
        D3: 80,
        D4: 70,
        D5: 80, // D1,D8,D5 min = min(60,80,80) = 60 ≤ 63
        D6: 80,
        D7: 80,
        D8: 80,
      };

      // This will still trigger phase 0.1, let's create a scenario for 0.2
      const phase02Scores: DimensionalScores = {
        D1: 60, // min of (60, 70, 80) = 60 ≤ 63 for 0.2
        D2: 80,
        D3: 80,
        D4: 70,
        D5: 70, // D1,D8,D5 min = min(60,80,70) = 60 ≤ 63, triggers 0.1
        D6: 80,
        D7: 80,
        D8: 80,
      };

      // Let's create proper 0.2 scenario
      const correctPhase02: DimensionalScores = {
        D1: 60, // D1,D4,D6 min = min(60,60,70) = 60 ≤ 63
        D2: 80,
        D3: 80,
        D4: 60,
        D5: 70, // D1,D8,D5 min = min(60,80,70) = 60 ≤ 63, this triggers 0.1 first
        D6: 70,
        D7: 80,
        D8: 80,
      };

      // To test 0.2, need D1,D8,D5 > 63 but D1,D4,D6 ≤ 63
      const phase02Test: DimensionalScores = {
        D1: 60, // part of both 0.1 (D1,D8,D5) and 0.2 (D1,D4,D6)
        D2: 80,
        D3: 80,
        D4: 50, // D1,D4,D6 min = min(60,50,80) = 50 ≤ 63
        D5: 80, // D1,D8,D5 min = min(60,80,80) = 60 ≤ 63
        D6: 80,
        D7: 80,
        D8: 80,
      };
      // This will still be 0.1. Let's make D1,D8,D5 all > 63

      const finalPhase02: DimensionalScores = {
        D1: 60, // D1,D4,D6 min = min(60,50,80) = 50 ≤ 63
        D2: 80,
        D3: 80,
        D4: 50,
        D5: 70, // D1,D8,D5 min = min(60,70,70) = 60 ≤ 63, still 0.1
        D6: 80,
        D7: 80,
        D8: 70,
      };

      // Correct approach for 0.2:
      const properPhase02: DimensionalScores = {
        D1: 50, // D1,D4,D6 min = min(50,60,80) = 50 ≤ 63
        D2: 80,
        D3: 80,
        D4: 60,
        D5: 70, // D1,D8,D5 min = min(50,70,70) = 50 ≤ 63
        D6: 80,
        D7: 80,
        D8: 70,
      };
      // Still 0.1 because D1 is in both

      // Let's make a clean 0.2 test:
      const cleanPhase02: DimensionalScores = {
        D1: 80, // D1,D4,D6 min = min(80,50,60) = 50 ≤ 63
        D2: 80,
        D3: 80,
        D4: 50,
        D5: 80, // D1,D8,D5 min = min(80,80,80) = 80 > 63
        D6: 60,
        D7: 80,
        D8: 80,
      };

      const phase = store.assignPhase(cleanPhase02);
      expect(phase).toBe("0.2");
    });

    it("should assign phase 1 when all phase criteria > 63", () => {
      const mockScores: DimensionalScores = {
        D1: 80,
        D2: 80,
        D3: 80,
        D4: 80,
        D5: 80,
        D6: 80,
        D7: 80,
        D8: 80,
      };

      const phase = store.assignPhase(mockScores);
      expect(phase).toBe("1");
    });
  });

  describe("Time Multiplier Calculation", () => {
    it("should calculate multiplier correctly", () => {
      const score = 50;
      // Formula: (1 + (80 - score) / 30)²
      // (1 + (80 - 50) / 30)² = (1 + 30/30)² = (1 + 1)² = 2² = 4
      const multiplier = store.calculateMultiplier(score);
      expect(multiplier).toBe(4);
    });

    it("should handle perfect score (80)", () => {
      const multiplier = store.calculateMultiplier(80);
      // (1 + (80 - 80) / 30)² = (1 + 0)² = 1
      expect(multiplier).toBe(1);
    });

    it("should handle low scores", () => {
      const multiplier = store.calculateMultiplier(20);
      // (1 + (80 - 20) / 30)² = (1 + 60/30)² = (1 + 2)² = 3² = 9
      expect(multiplier).toBe(9);
    });
  });

  describe("Phase Time Estimation", () => {
    it("should calculate phase time correctly for phase 0.1", () => {
      const mockScores: DimensionalScores = {
        D1: 50, // min of D1, D8, D5 for phase 0.1
        D2: 80,
        D3: 80,
        D4: 80,
        D5: 60,
        D6: 80,
        D7: 80,
        D8: 70,
      };

      const timeEstimate = store.calculatePhaseTime("0.1", mockScores);

      // Min score for 0.1 is min(50, 70, 60) = 50
      // Multiplier: (1 + (80-50)/30)² = (1 + 1)² = 4
      // Base time for 0.1: 2.5 weeks
      // Exact time: 2.5 * 4 = 10 weeks
      // For exact time 10: range = 2, so min = 8, max = 12

      expect(timeEstimate.min).toBe(8);
      expect(timeEstimate.max).toBe(12);
    });

    it("should handle deep collapse scenario", () => {
      const mockScores: DimensionalScores = {
        D1: 20, // Very low scores
        D2: 80,
        D3: 80,
        D4: 80,
        D5: 20,
        D6: 80,
        D7: 80,
        D8: 20,
      };

      const timeEstimate = store.calculatePhaseTime("0.1", mockScores);

      // Min score: min(20, 20, 20) = 20
      // Multiplier: (1 + (80-20)/30)² = (1 + 2)² = 9
      // Base time: 2.5, Exact time: 2.5 * 9 = 22.5 weeks
      // For deep collapse: -3 to +4 weeks
      // Min: max(1, 22.5-3) = max(1, 19.5) = 20 (rounded)
      // Max: 22.5+4 = 26.5 = 27 (rounded)

      expect(timeEstimate.min).toBeGreaterThan(15);
      expect(timeEstimate.max).toBeGreaterThan(timeEstimate.min);
    });
  });

  describe("Score Labels", () => {
    it("should return correct terrain labels for different score ranges", () => {
      expect(store.getScoreLabel(10, "terrain").label).toBe("Dysfunction");
      expect(store.getScoreLabel(30, "terrain").label).toBe("Low Capacity");
      expect(store.getScoreLabel(50, "terrain").label).toBe(
        "Transitional State"
      );
      expect(store.getScoreLabel(70, "terrain").label).toBe(
        "Emerging Stability"
      );
      expect(store.getScoreLabel(90, "terrain").label).toBe("Readiness");
    });

    it("should return correct coherence labels for different score ranges", () => {
      expect(store.getScoreLabel(10, "coherence").label).toBe("Disconnected");
      expect(store.getScoreLabel(30, "coherence").label).toBe("Desynchronized");
      expect(store.getScoreLabel(50, "coherence").label).toBe("Re-patterning");
      expect(store.getScoreLabel(70, "coherence").label).toBe("Aligning");
      expect(store.getScoreLabel(90, "coherence").label).toBe("Synchronized");
    });

    it("should handle boundary values correctly", () => {
      expect(store.getScoreLabel(80, "terrain").label).toBe("Readiness");
      expect(store.getScoreLabel(79.9, "terrain").label).toBe(
        "Emerging Stability"
      );
      expect(store.getScoreLabel(60, "terrain").label).toBe(
        "Emerging Stability"
      );
      expect(store.getScoreLabel(59.9, "terrain").label).toBe(
        "Transitional State"
      );
    });
  });

  describe("Complete Assessment Flow", () => {
    it("should calculate complete results correctly with known input", () => {
      // Set up a complete test case with known expected outcomes
      // Using responses that should result in specific scores

      // Set responses for all required questions (1-25, skipping 26 which is freeform)
      for (let i = 1; i <= 25; i++) {
        store.setResponse(i, 2); // Middle response (Sometimes)
      }

      const results = store.calculateResults();

      expect(results).toBeDefined();
      expect(results.terrainScore).toBeGreaterThan(0);
      expect(results.coherenceScore).toBeGreaterThan(0);
      expect(results.phase).toMatch(/^(0\.[1-4]|1)$/);
      expect(results.timeEstimate.min).toBeGreaterThan(0);
      expect(results.timeEstimate.max).toBeGreaterThan(
        results.timeEstimate.min
      );
      expect(results.scoreLabels.terrain).toBeDefined();
      expect(results.scoreLabels.coherence).toBeDefined();
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("should handle missing responses gracefully", () => {
      // Only set some responses
      store.setResponse(1, 2);
      store.setResponse(2, 3);

      const dimensionalScores = store.calculateDimensionalScores();

      // Should still calculate scores, but may be zero for dimensions without responses
      expect(typeof dimensionalScores.D1).toBe("number");
      expect(dimensionalScores.D1).toBeGreaterThanOrEqual(0);
    });

    it("should validate question bounds", () => {
      // Test that invalid responses don't get set
      const initialSize = store.responses.size;

      store.setResponse(1, 5); // Invalid (> 4)
      store.setResponse(2, -1); // Invalid (< 0)

      expect(store.responses.size).toBe(initialSize); // Should not have added invalid responses
    });
  });
});
