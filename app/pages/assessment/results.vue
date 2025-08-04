<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <div class="border-b bg-white border-gray-200 px-6 py-4">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-2xl font-light text-gray-900">Your Assessment Results</h1>
                <p class="text-gray-600 mt-1">Personalized insights based on your responses</p>
            </div>
        </div>

        <!-- Results Content -->
        <div class="max-w-4xl mx-auto px-6 py-12">
            <div v-if="results" class="space-y-8">
                <!-- Score Summary Cards -->
                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Terrain Score -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center space-x-3 mb-4">
                            <span class="text-3xl">{{ results.scoreLabels.terrain.emoji }}</span>
                            <div>
                                <h3 class="text-lg font-medium text-gray-900">Terrain Score</h3>
                                <p class="text-3xl font-light text-blue-600">{{ Math.round(results.terrainScore) }}</p>
                            </div>
                        </div>
                        <div class="mb-3">
                            <h4 class="font-medium text-gray-900">{{ results.scoreLabels.terrain.label }}</h4>
                            <p class="text-sm text-gray-600 mt-1">{{ results.scoreLabels.terrain.description }}</p>
                        </div>
                    </div>

                    <!-- Coherence Score -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center space-x-3 mb-4">
                            <span class="text-3xl">{{ results.scoreLabels.coherence.emoji }}</span>
                            <div>
                                <h3 class="text-lg font-medium text-gray-900">Coherence Score</h3>
                                <p class="text-3xl font-light text-green-600">{{ Math.round(results.coherenceScore) }}
                                </p>
                            </div>
                        </div>
                        <div class="mb-3">
                            <h4 class="font-medium text-gray-900">{{ results.scoreLabels.coherence.label }}</h4>
                            <p class="text-sm text-gray-600 mt-1">{{ results.scoreLabels.coherence.description }}</p>
                        </div>
                    </div>
                </div>

                <!-- Phase Assignment -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Recommended Starting Phase</h3>
                    <div class="flex items-center space-x-4 mb-4">
                        <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Phase {{ results.phase }}
                        </div>
                        <div v-if="phaseInfo">
                            <h4 class="font-medium text-gray-900">{{ phaseInfo.name }}</h4>
                            <p class="text-sm text-gray-600">{{ phaseInfo.description }}</p>
                        </div>
                    </div>
                    <div class="bg-gray-50 rounded-md p-4">
                        <div class="flex items-center space-x-2 text-sm text-gray-600">
                            <Icon name="lucide:calendar" class="w-4 h-4" />
                            <span>Estimated completion: {{ results.timeEstimate.min }}-{{ results.timeEstimate.max }}
                                weeks</span>
                        </div>
                    </div>
                </div>

                <!-- Dimensional Scores (Collapsible) -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <button @click="showDimensionalScores = !showDimensionalScores"
                        class="flex items-center justify-between w-full text-left">
                        <h3 class="text-lg font-medium text-gray-900">Detailed Dimensional Scores</h3>
                        <Icon :name="showDimensionalScores ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                            class="w-5 h-5 text-gray-500" />
                    </button>

                    <div v-if="showDimensionalScores" class="mt-4 space-y-3">
                        <div v-for="(score, dimension) in results.dimensionalScores" :key="dimension"
                            class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <span class="text-sm font-medium text-gray-700">{{ dimension }}: {{
                                getDimensionName(dimension) }}</span>
                            <span class="text-sm text-gray-900">{{ Math.round(score) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Next Steps -->
                <div class="bg-blue-50 rounded-lg border border-blue-200 p-6">
                    <h3 class="text-lg font-medium text-blue-900 mb-3">Next Steps</h3>
                    <p class="text-blue-800 mb-4">
                        Your assessment is complete! Save your results to return to them later when oomo opens.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-3">
                        <button @click="saveResults"
                            class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                            Save & Return Later
                        </button>
                        <button @click="retakeAssessment"
                            class="bg-white text-blue-600 border border-blue-300 px-6 py-2 rounded-md hover:bg-blue-50 transition-colors">
                            Retake Assessment
                        </button>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-else-if="assessmentStore.isLoading" class="text-center py-12">
                <Icon name="lucide:loader" class="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p class="text-gray-600">Calculating your results...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="assessmentStore.error" class="text-center py-12">
                <Icon name="lucide:alert-circle" class="w-8 h-8 text-red-500 mx-auto mb-4" />
                <p class="text-red-600 mb-4">{{ assessmentStore.error }}</p>
                <button @click="navigateTo('/assessment')"
                    class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Return to Assessment
                </button>
            </div>

            <!-- No Results State -->
            <div v-else class="text-center py-12">
                <Icon name="lucide:alert-triangle" class="w-8 h-8 text-yellow-500 mx-auto mb-4" />
                <p class="text-gray-600 mb-4">No assessment results found. Please complete the assessment first.</p>
                <button @click="navigateTo('/assessment')"
                    class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Start Assessment
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useAssessmentStore } from '~/stores/assessment'
import type { DimensionKey } from '~/types/assessment'

// Store and reactive data
const assessmentStore = useAssessmentStore()
const showDimensionalScores = ref(false)

// Computed properties
const results = computed(() => assessmentStore.getResults())
const phaseInfo = computed(() => {
    if (results.value) {
        return assessmentStore.getPhaseInfo[results.value.phase]
    }
    return null
})

// Methods
const getDimensionName = (dimension: DimensionKey): string => {
    const dimensionNames = {
        D1: 'Exit Readiness',
        D2: 'Mental Override',
        D3: 'Oscillatory Capacity',
        D4: 'Terrain Flexibility',
        D5: 'Charge Reserve',
        D6: 'Coherence Synchrony',
        D7: 'Stuckness Pattern',
        D8: 'Environmental Load'
    }
    return dimensionNames[dimension]
}

const saveResults = () => {
    // Results are already saved to localStorage via the store
    // Could add additional functionality here like email capture
    alert('Results saved! You can return to view them anytime.')
}

const retakeAssessment = () => {
    assessmentStore.resetAssessment()
    navigateTo('/assessment')
}

// Initialize on mount
onMounted(() => {
    // Load from storage in case of page refresh
    assessmentStore.loadFromStorage()

    // If no results and not complete, redirect to assessment
    if (!results.value && !assessmentStore.isComplete) {
        navigateTo('/assessment')
    }
})
</script>