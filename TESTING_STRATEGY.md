# Assessment Scoring Logic Testing Strategy

This document outlines our comprehensive testing strategy for the assessment scoring logic, designed to ensure both technical accuracy and product owner confidence.

## Overview

We've implemented a **two-pronged testing approach**:

1. **Technical Automated Tests** - Comprehensive unit tests using Vitest
2. **Product Owner Verification Tool** - Visual interface for manual validation

## 🔧 Technical Automated Tests

### Location & Usage

```bash
# Run all tests
npm run test

# Run only assessment tests
npm run test:run tests/stores/assessment.test.ts

# Run reference test cases
npm run test:run tests/stores/assessment-reference.test.ts
```

### Test Coverage

#### Core Scoring Logic Tests (`assessment.test.ts`)

- **Dimensional Score Calculation** - Tests scoring for each of the 8 dimensions (D1-D8)
- **Reverse Scoring Validation** - Ensures negative symptom questions are scored correctly
- **Terrain Score Calculation** - Validates weighted formula: D1(30%) + D2(25%) + D4(25%) + D5(20%)
- **Coherence Score Calculation** - Validates weighted formula: D2(50%) + D6(50%)
- **Phase Assignment Logic** - Tests all phase assignment criteria
- **Time Multiplier Formula** - Validates `(1 + (80 - score) / 30)²` calculation
- **Score Label Assignment** - Tests boundary conditions for terrain/coherence labels
- **Edge Cases** - Missing responses, invalid inputs, boundary values

#### Reference Test Cases (`assessment-reference.test.ts`)

- **Optimal Health Profile** - Perfect responses across all dimensions
- **Moderate Dysfunction** - Significant symptom patterns
- **Mixed/Transitional Profile** - Mid-range responses
- **Specific Phase Testing** - Targeted scenarios for each phase
- **Time Estimation Validation** - Various severity levels and time impacts

### Key Test Results

#### Reference Case 1: Optimal Health

```
Terrain Score: 100.0 (Readiness)
Coherence Score: 100.0 (Synchronized)
Phase: 1
All Dimensional Scores: 100.0
```

#### Reference Case 2: Moderate Dysfunction

```
Terrain Score: 25.0 (Low Capacity)
Coherence Score: 25.0 (Desynchronized)
Phase: 0.1
Time Estimate: 17-24 weeks
All Dimensional Scores: 25.0
```

#### Reference Case 3: Mixed Profile

```
Terrain Score: 57.9 (Transitional State)
Coherence Score: 62.9 (Aligning)
Phase: 0.1
Time Estimate: 8-12 weeks
```

## 👥 Product Owner Verification Tool

### Access

Visit `/test-scoring` in your browser when running the development server.

### Features

#### 1. **Predefined Test Cases**

- **Optimal Health** - Demonstrates perfect scoring
- **Moderate Dysfunction** - Shows low-score scenarios
- **Mixed Profile** - Transitional state examples
- **Phase 0.2 Target** - Specific phase assignment validation

#### 2. **Custom Input Testing**

- Input any combination of responses for questions 1-25
- Real-time calculation of results
- See immediate impact of response changes

#### 3. **Step-by-Step Calculation Display**

- **Terrain Score Formula**: Shows exact weighted calculation
- **Coherence Score Formula**: Displays D2/D6 weighting
- **Phase Assignment Logic**: Shows min score calculations for each phase
- **Time Multiplier**: Displays formula `(1 + (80 - MinScore) / 30)²`

#### 4. **Detailed Breakdown Tables**

- **Dimensional Scores**: Visual progress bars for each dimension
- **Question Responses**: Shows raw response, reverse scoring, calculated score
- **Dimension Mapping**: Which questions contribute to which dimensions

### How Product Owners Can Use This Tool

1. **Validate Expected Outcomes**

   - Load the "Optimal Health" case - should show Phase 1, perfect scores
   - Load "Moderate Dysfunction" - should show Phase 0.1, low scores, longer time estimates

2. **Test Edge Cases**

   - Use custom input to test boundary scenarios
   - Verify phase transitions at score thresholds (63 is key boundary)
   - Test time estimation extremes (very low vs. high scores)

3. **Understand the Logic**
   - Watch how changing individual responses affects overall scores
   - See which questions have the biggest impact on terrain vs. coherence
   - Observe phase assignment priorities (0.1 takes precedence over 0.2, etc.)

## 🎯 Key Validation Points

### Critical Scoring Rules

1. **Reverse Questions**: Higher symptom responses = lower scores
2. **Terrain Weighting**: D1(30%), D2(25%), D4(25%), D5(20%) = 100%
3. **Coherence Weighting**: D2(50%) + D6(50%) = 100%
4. **Phase Assignment Priority**: 0.1 → 0.2 → 0.3 → 0.4 → 1
5. **Time Multiplier**: Quadratic relationship - severe scores exponentially increase time

### Expected Behaviors

- **Perfect responses** should yield 100/100 scores, Phase 1
- **Severe dysfunction** should yield ~25 scores, Phase 0.1, 17-24 week estimates
- **Mixed responses** should yield mid-range scores, appropriate phase assignment
- **Phase boundaries** at min dimension score ≤ 63

## 🚀 Running Tests in CI/CD

The automated tests can be integrated into your deployment pipeline:

```yaml
# Example GitHub Actions workflow
- name: Run Assessment Tests
  run: |
    npm install
    npm run test:run
```

## 📊 Test Metrics

- **Total Test Coverage**: 25+ test cases
- **Key Functions Tested**: 15+ core scoring functions
- **Edge Cases Covered**: 10+ boundary and error conditions
- **Reference Scenarios**: 4 documented use cases
- **Validation Points**: 20+ critical business rules

## 🔄 Maintenance

### When to Update Tests

- **New questions added**: Update dimensional mappings
- **Scoring formula changes**: Update weight calculations
- **Phase criteria changes**: Update assignment logic tests
- **Time estimation changes**: Update multiplier formulas

### Test Data Management

- Reference test cases are hardcoded for consistency
- Expected outcomes are documented for regression testing
- Custom scenarios can be saved in the verification tool

## 📝 Conclusion

This dual-testing approach ensures:

- **Technical Reliability**: Automated tests catch regressions and edge cases
- **Business Confidence**: Visual tool allows product owners to validate expected behaviors
- **Documentation**: Clear examples of how scoring works in practice
- **Maintainability**: Easy to update when business rules change

The automated tests provide confidence in deployment, while the verification tool enables ongoing validation and stakeholder buy-in.
