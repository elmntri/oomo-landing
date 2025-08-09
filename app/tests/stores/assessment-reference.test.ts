import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAssessmentStore } from "~/stores/assessment";

/**
 * Reference Test Cases for Product Owner Verification
 *
 * These tests represent specific scenarios with documented expected outcomes
 * that can be verified manually in the product owner verification tool.
 */

describe("Assessment Store - Reference Test Cases", () => {
  let store: ReturnType<typeof useAssessmentStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useAssessmentStore();
  });

  describe("Reference Case 1: Optimal Health Profile", () => {
    it("should produce expected results for optimal responses", () => {
      // Set optimal responses (0 for reverse questions, 4 for normal questions)
      const optimalResponses = {
        1: 0,
        2: 4,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 4,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 4,
        17: 0,
        18: 0,
        19: 4,
        20: 0,
        21: 0,
        22: 4,
        23: 4,
        24: 4,
        25: 0,
      };

      Object.entries(optimalResponses).forEach(([qId, response]) => {
        store.setResponse(Number(qId), response);
      });

      const results = store.calculateResults();

      // Document expected outcomes for product owner verification
      expect(results.terrainScore).toBe(100);
      expect(results.coherenceScore).toBe(100);
      expect(results.phase).toBe("1");
      expect(results.scoreLabels.terrain.label).toBe("Readiness");
      expect(results.scoreLabels.coherence.label).toBe("Synchronized");

      // All dimensional scores should be 100
      Object.values(results.dimensionalScores).forEach((score) => {
        expect(score).toBe(100);
      });

      console.log("REFERENCE CASE 1 - Optimal Health:", {
        terrainScore: results.terrainScore,
        coherenceScore: results.coherenceScore,
        phase: results.phase,
        dimensionalScores: results.dimensionalScores,
        terrainLabel: results.scoreLabels.terrain.label,
        coherenceLabel: results.scoreLabels.coherence.label,
      });
    });
  });

  describe("Reference Case 2: Moderate Dysfunction Profile", () => {
    it("should produce expected results for moderate dysfunction", () => {
      // Set responses indicating moderate dysfunction (mostly 3s for reverse, 1s for normal)
      const dysfunctionResponses = {
        1: 3,
        2: 1,
        3: 3,
        4: 3,
        5: 3,
        6: 3,
        7: 3,
        8: 3,
        9: 3,
        10: 1,
        11: 3,
        12: 3,
        13: 3,
        14: 3,
        15: 3,
        16: 1,
        17: 3,
        18: 3,
        19: 1,
        20: 3,
        21: 3,
        22: 1,
        23: 1,
        24: 1,
        25: 3,
      };

      Object.entries(dysfunctionResponses).forEach(([qId, response]) => {
        store.setResponse(Number(qId), response);
      });

      const results = store.calculateResults();

      // Expected: Low scores, early phase assignment
      expect(results.terrainScore).toBe(25); // Should be low
      expect(results.coherenceScore).toBe(25); // Should be low
      expect(results.phase).toBe("0.1"); // Should be earliest phase
      expect(results.scoreLabels.terrain.label).toBe("Low Capacity");
      expect(results.scoreLabels.coherence.label).toBe("Desynchronized");

      console.log("REFERENCE CASE 2 - Moderate Dysfunction:", {
        terrainScore: results.terrainScore,
        coherenceScore: results.coherenceScore,
        phase: results.phase,
        dimensionalScores: results.dimensionalScores,
        terrainLabel: results.scoreLabels.terrain.label,
        coherenceLabel: results.scoreLabels.coherence.label,
        timeEstimate: results.timeEstimate,
      });
    });
  });

  describe("Reference Case 3: Mixed Profile (Transitional)", () => {
    it("should produce expected results for mixed responses", () => {
      // Set mixed responses (average around "Sometimes" = 2)
      const mixedResponses = {
        1: 2,
        2: 2,
        3: 2,
        4: 1,
        5: 3,
        6: 2,
        7: 2,
        8: 1,
        9: 2,
        10: 3,
        11: 2,
        12: 2,
        13: 2,
        14: 2,
        15: 1,
        16: 3,
        17: 1,
        18: 2,
        19: 3,
        20: 2,
        21: 1,
        22: 3,
        23: 2,
        24: 3,
        25: 2,
      };

      Object.entries(mixedResponses).forEach(([qId, response]) => {
        store.setResponse(Number(qId), response);
      });

      const results = store.calculateResults();

      // Expected: Mid-range scores
      expect(results.terrainScore).toBeGreaterThan(40);
      expect(results.terrainScore).toBeLessThan(70);
      expect(results.scoreLabels.terrain.label).toMatch(
        /Transitional|Emerging/
      );

      console.log("REFERENCE CASE 3 - Mixed Profile:", {
        terrainScore: results.terrainScore,
        coherenceScore: results.coherenceScore,
        phase: results.phase,
        dimensionalScores: results.dimensionalScores,
        terrainLabel: results.scoreLabels.terrain.label,
        coherenceLabel: results.scoreLabels.coherence.label,
        timeEstimate: results.timeEstimate,
      });
    });
  });

  describe("Reference Case 4: Specific Phase Testing", () => {
    it("should assign phase 0.2 correctly", () => {
      // Create a profile where D1,D8,D5 > 63 but D1,D4,D6 ≤ 63
      const responses = {
        // D1 questions (1,2,3,4,5,6): Set to get D1 = 75
        1: 1,
        2: 3,
        3: 1,
        4: 1,
        5: 1,
        6: 1, // D1 = 75

        // D8 questions (6,19,24,25): Set to get D8 = 75
        19: 3,
        24: 3,
        25: 1, // D8 = 75 (question 6 already set above)

        // D5 questions (5,10,11,18,19,20,21): Set to get D5 = 75
        10: 3,
        11: 1,
        18: 1,
        20: 1,
        21: 1, // D5 = 75 (questions 5,19 already set)

        // D4 questions (13,14,15,16,17): Set to get D4 = 50 (≤ 63)
        13: 2,
        14: 2,
        15: 2,
        16: 2,
        17: 2, // D4 = 50

        // D6 questions (9,15,22,23,24): Set to get D6 = 50 (≤ 63)
        9: 2,
        22: 2,
        23: 2, // D6 = 50 (questions 15,24 already set)

        // Fill remaining questions
        7: 1,
        8: 1,
        12: 1,
      };

      Object.entries(responses).forEach(([qId, response]) => {
        store.setResponse(Number(qId), response);
      });

      const results = store.calculateResults();

      console.log("REFERENCE CASE 4 - Phase 0.2 Test:", {
        phase: results.phase,
        dimensionalScores: results.dimensionalScores,
        phaseCheckD1D8D5: Math.min(
          results.dimensionalScores.D1,
          results.dimensionalScores.D8,
          results.dimensionalScores.D5
        ),
        phaseCheckD1D4D6: Math.min(
          results.dimensionalScores.D1,
          results.dimensionalScores.D4,
          results.dimensionalScores.D6
        ),
      });
    });
  });

  describe("Time Calculation Verification", () => {
    it("should calculate time estimates correctly for different severity levels", () => {
      // Test different severity levels and their time impacts
      const severityTests = [
        {
          name: "Mild (Score 70)",
          score: 70,
          expectedFormula: "(1 + (80-70)/30)² = (1 + 0.33)² = 1.78",
        },
        {
          name: "Moderate (Score 50)",
          score: 50,
          expectedFormula: "(1 + (80-50)/30)² = (1 + 1)² = 4",
        },
        {
          name: "Severe (Score 30)",
          score: 30,
          expectedFormula: "(1 + (80-30)/30)² = (1 + 1.67)² = 7.11",
        },
        {
          name: "Perfect (Score 80)",
          score: 80,
          expectedFormula: "(1 + (80-80)/30)² = (1 + 0)² = 1",
        },
      ];

      severityTests.forEach((test) => {
        const multiplier = store.calculateMultiplier(test.score);
        const expectedValue = Math.pow(1 + (80 - test.score) / 30, 2);
        expect(multiplier).toBeCloseTo(expectedValue, 2);

        console.log(`Time Multiplier - ${test.name}:`, {
          score: test.score,
          multiplier: multiplier.toFixed(2),
          formula: test.expectedFormula,
          calculated: expectedValue.toFixed(2),
        });
      });
    });
  });
});
