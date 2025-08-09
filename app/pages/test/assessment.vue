<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div class="container mx-auto px-4">
            <div class="max-w-6xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-8">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">
                        Assessment Scoring Verification Tool
                    </h1>
                    <p class="text-lg text-gray-600">
                        Validate scoring logic with predefined test cases and see step-by-step calculations
                    </p>
                </div>

                <!-- Test Case Selector -->
                <div class="mb-8">
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h2 class="text-2xl font-semibold mb-4">Select Test Case</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <button v-for="testCase in testCases" :key="testCase.id" @click="loadTestCase(testCase.id)"
                                :class="[
                                    'p-4 rounded-lg border text-left transition-all',
                                    selectedCase === testCase.id
                                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                ]">
                                <div class="font-semibold">{{ testCase.name }}</div>
                                <div class="text-sm text-gray-600 mt-1">{{ testCase.description }}</div>
                            </button>
                        </div>

                        <!-- Custom Input -->
                        <div class="mt-6 border-t pt-6">
                            <h3 class="font-semibold mb-4">Or Enter Custom Responses</h3>
                            <div class="grid grid-cols-5 gap-2 mb-4">
                                <div v-for="i in 25" :key="i" class="flex flex-col">
                                    <label class="text-xs text-gray-500 mb-1">Q{{ i }}</label>
                                    <select v-model="customResponses[i]" @change="calculateCustomResults"
                                        class="border rounded px-2 py-1 text-sm">
                                        <option value="">-</option>
                                        <option value="0">Never (0)</option>
                                        <option value="1">Rarely (1)</option>
                                        <option value="2">Sometimes (2)</option>
                                        <option value="3">Often (3)</option>
                                        <option value="4">Always (4)</option>
                                    </select>
                                </div>
                            </div>
                            <button @click="calculateCustomResults"
                                class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                Calculate Custom Results
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Results Display -->
                <div v-if="results" class="space-y-6">
                    <!-- Summary Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">Terrain Score</h3>
                                    <p class="text-3xl font-bold text-blue-600 mt-2">
                                        {{ results.terrainScore.toFixed(1) }}
                                    </p>
                                    <p class="text-sm text-gray-600 mt-1">
                                        {{ results.scoreLabels.terrain.emoji }} {{ results.scoreLabels.terrain.label }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">Coherence Score</h3>
                                    <p class="text-3xl font-bold text-purple-600 mt-2">
                                        {{ results.coherenceScore.toFixed(1) }}
                                    </p>
                                    <p class="text-sm text-gray-600 mt-1">
                                        {{ results.scoreLabels.coherence.emoji }} {{ results.scoreLabels.coherence.label
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">Phase & Time</h3>
                                    <p class="text-3xl font-bold text-green-600 mt-2">
                                        Phase {{ results.phase }}
                                    </p>
                                    <p class="text-sm text-gray-600 mt-1">
                                        {{ results.timeEstimate.min }}-{{ results.timeEstimate.max }} weeks
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Detailed Breakdown -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Dimensional Scores -->
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">Dimensional Scores Breakdown</h3>
                            <div class="space-y-3">
                                <div v-for="(score, dimension) in results.dimensionalScores" :key="dimension">
                                    <div class="flex justify-between items-center">
                                        <span class="font-medium">{{ dimension }}:</span>
                                        <span class="font-mono">{{ score.toFixed(1) }}</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full"
                                            :style="{ width: Math.min(100, Math.max(0, score)) + '%' }"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Calculation Steps -->
                        <div class="bg-white rounded-lg shadow-lg p-6">
                            <h3 class="text-xl font-semibold mb-4">Calculation Steps</h3>
                            <div class="space-y-4 text-sm">
                                <div class="border-l-4 border-blue-500 pl-4">
                                    <h4 class="font-semibold text-blue-700">Terrain Score Formula:</h4>
                                    <p class="text-gray-700 mt-1">
                                        D1(30%) + D2(25%) + D4(25%) + D5(20%)
                                    </p>
                                    <p class="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                                        {{ results.dimensionalScores.D1.toFixed(1) }}×0.3 +
                                        {{ results.dimensionalScores.D2.toFixed(1) }}×0.25 +
                                        {{ results.dimensionalScores.D4.toFixed(1) }}×0.25 +
                                        {{ results.dimensionalScores.D5.toFixed(1) }}×0.2 =
                                        {{ results.terrainScore.toFixed(1) }}
                                    </p>
                                </div>

                                <div class="border-l-4 border-purple-500 pl-4">
                                    <h4 class="font-semibold text-purple-700">Coherence Score Formula:</h4>
                                    <p class="text-gray-700 mt-1">
                                        D2(50%) + D6(50%)
                                    </p>
                                    <p class="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                                        {{ results.dimensionalScores.D2.toFixed(1) }}×0.5 +
                                        {{ results.dimensionalScores.D6.toFixed(1) }}×0.5 =
                                        {{ results.coherenceScore.toFixed(1) }}
                                    </p>
                                </div>

                                <div class="border-l-4 border-green-500 pl-4">
                                    <h4 class="font-semibold text-green-700">Phase Assignment:</h4>
                                    <div class="text-gray-700 mt-1 space-y-1">
                                        <p>Phase 0.1: min(D1,D8,D5) = {{ Math.min(results.dimensionalScores.D1,
                                            results.dimensionalScores.D8, results.dimensionalScores.D5).toFixed(1) }}
                                        </p>
                                        <p>Phase 0.2: min(D1,D4,D6) = {{ Math.min(results.dimensionalScores.D1,
                                            results.dimensionalScores.D4, results.dimensionalScores.D6).toFixed(1) }}
                                        </p>
                                        <p>Phase 0.3: min(D2,D7,D3) = {{ Math.min(results.dimensionalScores.D2,
                                            results.dimensionalScores.D7, results.dimensionalScores.D3).toFixed(1) }}
                                        </p>
                                        <p>Phase 0.4: min(D4,D7,D6) = {{ Math.min(results.dimensionalScores.D4,
                                            results.dimensionalScores.D7, results.dimensionalScores.D6).toFixed(1) }}
                                        </p>
                                    </div>
                                </div>

                                <div class="border-l-4 border-orange-500 pl-4">
                                    <h4 class="font-semibold text-orange-700">Time Multiplier:</h4>
                                    <p class="text-gray-700 mt-1">
                                        Formula: (1 + (80 - MinScore) / 30)²
                                    </p>
                                    <p class="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                                        (1 + (80 - {{ getPhaseMinScore().toFixed(1) }}) / 30)² = {{
                                        results.multiplier.toFixed(2) }}
                                    </p>
                                    <p class="text-xs text-gray-600 mt-1">
                                        Base time: {{ getPhaseBaseTime() }} weeks × {{ results.multiplier.toFixed(2) }}
                                        =
                                        {{ (getPhaseBaseTime() * results.multiplier).toFixed(1) }} weeks
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Question Responses Table -->
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-semibold mb-4">Question Responses & Contributions</h3>
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm">
                                <thead>
                                    <tr class="border-b">
                                        <th class="text-left py-2">Q#</th>
                                        <th class="text-left py-2">Response</th>
                                        <th class="text-left py-2">Reverse?</th>
                                        <th class="text-left py-2">Score</th>
                                        <th class="text-left py-2">Dimensions</th>
                                        <th class="text-left py-2 max-w-xs">Question Text</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="question in questionDetails" :key="question.id"
                                        class="border-b hover:bg-gray-50">
                                        <td class="py-2">{{ question.id }}</td>
                                        <td class="py-2">
                                            <span v-if="question.response !== undefined">
                                                {{ question.response }} ({{ getLikertLabel(question.response) }})
                                            </span>
                                            <span v-else class="text-gray-400">-</span>
                                        </td>
                                        <td class="py-2">
                                            <span :class="question.isReverse ? 'text-red-600' : 'text-green-600'">
                                                {{ question.isReverse ? 'Yes' : 'No' }}
                                            </span>
                                        </td>
                                        <td class="py-2 font-mono">{{ question.calculatedScore }}</td>
                                        <td class="py-2">
                                            <span v-for="dim in question.dimensions" :key="dim"
                                                class="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-1">
                                                {{ dim }}
                                            </span>
                                        </td>
                                        <td class="py-2 text-xs max-w-xs truncate" :title="question.text">
                                            {{ question.text }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAssessmentStore } from '~/stores/assessment'
import type { AssessmentResults } from '~/types/assessment'

const store = useAssessmentStore()

// Test cases data
const testCases = [
    {
        id: 'optimal',
        name: 'Optimal Health',
        description: 'Perfect scores across all dimensions',
        responses: {
            1: 0, 2: 4, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 4,
            11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 4, 17: 0, 18: 0, 19: 4,
            20: 0, 21: 0, 22: 4, 23: 4, 24: 4, 25: 0
        }
    },
    {
        id: 'dysfunction',
        name: 'Moderate Dysfunction',
        description: 'Significant symptoms across dimensions',
        responses: {
            1: 3, 2: 1, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 1,
            11: 3, 12: 3, 13: 3, 14: 3, 15: 3, 16: 1, 17: 3, 18: 3, 19: 1,
            20: 3, 21: 3, 22: 1, 23: 1, 24: 1, 25: 3
        }
    },
    {
        id: 'mixed',
        name: 'Mixed Profile',
        description: 'Transitional state with varied responses',
        responses: {
            1: 2, 2: 2, 3: 2, 4: 1, 5: 3, 6: 2, 7: 2, 8: 1, 9: 2, 10: 3,
            11: 2, 12: 2, 13: 2, 14: 2, 15: 1, 16: 3, 17: 1, 18: 2, 19: 3,
            20: 2, 21: 1, 22: 3, 23: 2, 24: 3, 25: 2
        }
    },
    {
        id: 'phase02',
        name: 'Phase 0.2 Target',
        description: 'Specific pattern to trigger Phase 0.2',
        responses: {
            1: 1, 2: 3, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 2, 10: 3,
            11: 1, 12: 1, 13: 2, 14: 2, 15: 2, 16: 2, 17: 2, 18: 1, 19: 3,
            20: 1, 21: 1, 22: 2, 23: 2, 24: 3, 25: 1
        }
    }
]

const selectedCase = ref('')
const customResponses = ref<Record<number, string>>({})
const results = ref<AssessmentResults | null>(null)

const questionDetails = computed(() => {
    if (!results.value) return []

    return store.getAllQuestions.filter(q => q.type !== 'freeform').map(question => {
        const response = store.getResponse(question.id)
        const calculatedScore = response !== undefined
            ? (question.isReverse ? 4 - response : response)
            : 0

        return {
            ...question,
            response,
            calculatedScore
        }
    })
})

const getLikertLabel = (value: number) => {
    const labels = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']
    return labels[value] || ''
}

const getPhaseMinScore = () => {
    if (!results.value) return 0

    const scores = results.value.dimensionalScores
    switch (results.value.phase) {
        case '0.1':
            return Math.min(scores.D1, scores.D8, scores.D5)
        case '0.2':
            return Math.min(scores.D1, scores.D4, scores.D6)
        case '0.3':
            return Math.min(scores.D2, scores.D7, scores.D3)
        case '0.4':
            return Math.min(scores.D4, scores.D7, scores.D6)
        default:
            return 80
    }
}

const getPhaseBaseTime = () => {
    if (!results.value) return 0

    const phaseInfo = store.getPhaseInfo
    return phaseInfo[results.value.phase]?.baseTime || 0
}

const loadTestCase = (caseId: string) => {
    const testCase = testCases.find(tc => tc.id === caseId)
    if (!testCase) return

    selectedCase.value = caseId

    // Clear existing responses
    store.resetAssessment()

    // Set test case responses
    Object.entries(testCase.responses).forEach(([qId, response]) => {
        store.setResponse(Number(qId), response as number)
    })

    // Calculate results
    results.value = store.calculateResults()
}

const calculateCustomResults = () => {
    // Clear existing responses
    store.resetAssessment()

    // Set custom responses
    Object.entries(customResponses.value).forEach(([qId, response]) => {
        if (response !== '' && response !== undefined) {
            store.setResponse(Number(qId), Number(response))
        }
    })

    // Only calculate if we have some responses
    const hasResponses = Object.values(customResponses.value).some(v => v !== '' && v !== undefined)
    if (hasResponses) {
        results.value = store.calculateResults()
        selectedCase.value = 'custom'
    }
}

// Load default test case on mount
onMounted(() => {
    loadTestCase('optimal')
})
</script>
