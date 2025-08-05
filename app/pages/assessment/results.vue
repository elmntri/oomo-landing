<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <div class="border-b bg-white border-gray-200 px-6 py-4">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-2xl font-light text-gray-900">Your Assessment Results</h1>
                <p class="text-gray-600 pt-1">Personalized insights based on your responses</p>
            </div>
        </div>

        <!-- Results Content -->
        <div class="max-w-4xl mx-auto px-6 py-12">
            <div v-if="results" class="flex flex-col gap-8">
                <!-- Section 1: Terrain Results -->
                <Card>
                    <CardHeader>
                        <CardTitle>Your Terrain Score</CardTitle>
                    </CardHeader>
                    <CardContent class="flex flex-col gap-6">
                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <span class="text-4xl sm:text-5xl">{{ results.scoreLabels.terrain.emoji }}</span>
                            <div class="flex-1">
                                <h3 class="text-xl sm:text-2xl font-medium text-gray-900">{{
                                    results.scoreLabels.terrain.label }}
                                </h3>
                                <p class="text-3xl sm:text-4xl font-light text-blue-600 pt-1">{{
                                    Math.round(results.terrainScore) }}
                                </p>
                                <p class="text-sm text-gray-500 pt-1">Terrain Score</p>
                            </div>
                        </div>
                        <div class="bg-gray-50 rounded-md p-4">
                            <p class="text-gray-700 leading-relaxed">{{ getScoreRevealsMessage(results.terrainScore) }}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <!-- Section 2: Coherence Score (Collapsible) -->
                <Card>
                    <Collapsible v-model:open="showCoherenceDetails">
                        <CollapsibleTrigger as-child>
                            <CardHeader class="cursor-pointer">
                                <div class="flex items-center justify-between w-full">
                                    <CardTitle>Your Coherence Score</CardTitle>
                                    <Icon :name="showCoherenceDetails ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                                        class="w-5 h-5 text-gray-500" />
                                </div>
                            </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <CardContent class="flex flex-col gap-6 pt-0">
                                <div class="flex items-center gap-4">
                                    <span class="text-5xl">{{ results.scoreLabels.coherence.emoji }}</span>
                                    <div>
                                        <h3 class="text-2xl font-medium text-gray-900">{{
                                            results.scoreLabels.coherence.label }}</h3>
                                        <p class="text-4xl font-light text-green-600 pt-1">{{
                                            Math.round(results.coherenceScore) }}</p>
                                        <p class="text-sm text-gray-500 pt-1">Coherence Score</p>
                                    </div>
                                </div>
                                <div class="bg-gray-50 rounded-md p-4">
                                    <p class="text-gray-700 leading-relaxed">{{
                                        getCoherenceMessage(results.coherenceScore) }}</p>
                                </div>
                            </CardContent>
                        </CollapsibleContent>
                    </Collapsible>
                </Card>

                <!-- Section 3: Dimensional Breakdown (Collapsible) -->
                <Card>
                    <Collapsible v-model:open="showDimensionalScores">
                        <CollapsibleTrigger as-child>
                            <CardHeader class="cursor-pointer">
                                <div class="flex items-center justify-between w-full">
                                    <CardTitle>Your Dimensional Breakdown</CardTitle>
                                    <Icon :name="showDimensionalScores ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                                        class="w-5 h-5 text-gray-500" />
                                </div>
                            </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <CardContent class="flex flex-col gap-6 pt-0">
                                <p class="text-gray-600">Each dimension represents a key aspect of your biological
                                    terrain.
                                    Scores at or below 63 indicate areas that need focused attention.</p>

                                <div class="flex flex-col gap-4">
                                    <div v-for="(score, dimension) in results.dimensionalScores" :key="dimension"
                                        class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-lg border"
                                        :class="getDimensionCardClass(score)">
                                        <div class="flex-1 min-w-0">
                                            <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                                <span class="font-medium text-gray-900 text-sm sm:text-base">{{
                                                    dimension }}</span>
                                                <span class="text-xs sm:text-sm text-gray-600 truncate">{{
                                                    getDimensionName(dimension) }}</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                                            <span class="text-lg sm:text-xl font-medium"
                                                :class="getDimensionScoreClass(score)">
                                                {{ Math.round(score) }}
                                            </span>
                                            <div class="w-20 sm:w-24 bg-gray-200 rounded-full h-2">
                                                <div class="h-2 rounded-full transition-all duration-300"
                                                    :class="getDimensionBarClass(score)"
                                                    :style="{ width: `${Math.min(score, 100)}%` }">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Scoring Legend -->
                                <div class="p-4 bg-gray-50 rounded-lg">
                                    <h4 class="font-medium text-gray-900 pb-2">Understanding Your Scores</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div class="flex items-center gap-2">
                                            <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                                            <span class="text-gray-600">0-39: Needs Support</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                            <span class="text-gray-600">40-63: Developing</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                                            <span class="text-gray-600">64+: Stable</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </CollapsibleContent>
                    </Collapsible>
                </Card>

                <!-- Section 4: Where You'll Start - Phase Assignment -->
                <Card>
                    <CardHeader>
                        <CardTitle>Where You'll Start</CardTitle>
                    </CardHeader>
                    <CardContent class="flex flex-col gap-6">
                        <div class="flex-1">
                            <h3 class="flex items-center gap-2 text-lg font-medium text-gray-900 pb-2">
                                <span class="bg-blue-100 rounded-lg p-2">Phase {{ results.phase }}</span>
                                <span>{{ phaseInfo?.name }}</span>
                            </h3>
                            <p class="text-gray-700 leading-relaxed pb-4">{{ phaseInfo?.description }}</p>

                            <!-- Time Estimate with Enhanced Visualization -->
                            <div class="bg-blue-50 rounded-md p-4">
                                <div class="flex items-center gap-2 pb-2">
                                    <Icon name="lucide:calendar" class="w-5 h-5 text-blue-600" />
                                    <span class="font-medium text-blue-900">Estimated Phase Duration</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="text-2xl font-light text-blue-700">{{ results.timeEstimate.min
                                        }}-{{
                                            results.timeEstimate.max }}</span>
                                    <span class="text-blue-600">weeks</span>
                                </div>
                                <p class="text-sm text-blue-600 pt-1">Based on your {{
                                    getPhaseGatingDimensions(results.phase) }} scores</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Section 5: What You'll Unlock -->
                <Card>
                    <CardHeader>
                        <CardTitle>What You'll Unlock When oomo Opens</CardTitle>
                    </CardHeader>
                    <CardContent class="flex flex-col gap-6">
                        <div class="flex flex-col gap-4">
                            <div class="flex items-start gap-3">
                                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p class="text-gray-700">You won't get a list of things to try. You'll get a starting
                                    point—and a clear path forward.</p>
                            </div>
                            <div class="flex items-start gap-3">
                                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p class="text-gray-700">oomo is built to guide you through health in the right order,
                                    based
                                    on how real systems work: feedback, timing, and readiness.</p>
                            </div>
                            <div class="flex items-start gap-3">
                                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p class="text-gray-700">You'll begin with Phase {{ results.phase }} that fits your
                                    current
                                    state, then unlock new actions as your system stabilizes.</p>
                            </div>
                        </div>

                        <div class="bg-gray-50 rounded-lg p-6">
                            <p class="text-gray-800 font-medium pb-2">This isn't textbook learning.</p>
                            <p class="text-gray-700 pb-4">It's personalized learning through experience—with the clarity
                                to
                                know what matters, when.</p>
                            <p class="text-gray-600 text-sm italic">Theory chases inputs. We care about outcomes. Can
                                your
                                system oscillate? Can it adapt without collapse? That's what real resilience looks like.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <!-- Section 6: Save & Return CTA -->
                <Card class="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <CardContent class="text-center p-8">
                        <h2 class="text-xl font-medium text-blue-900 pb-4">Save Your Score & Unlock Your Plan</h2>
                        <p class="text-blue-800 pb-6 max-w-2xl mx-auto">
                            Your assessment is complete! Save your results and we'll let you know when oomo opens.
                            Come back then to keep learning—with your own system as the textbook.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button @click="saveResults" size="lg" class="px-8">
                                Save & Get Notified
                            </Button>
                            <Button @click="retakeAssessment" variant="outline" size="lg" class="px-8">
                                Retake Assessment
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Loading State -->
            <Card v-else-if="assessmentStore.isLoading">
                <CardContent class="text-center py-12">
                    <Icon name="lucide:loader" class="w-8 h-8 animate-spin text-blue-600 mx-auto pb-4" />
                    <p class="text-gray-600">Calculating your results...</p>
                </CardContent>
            </Card>

            <!-- Error State -->
            <Card v-else-if="assessmentStore.error">
                <CardContent class="text-center py-12">
                    <Icon name="lucide:alert-circle" class="w-8 h-8 text-red-500 mx-auto pb-4" />
                    <p class="text-red-600 pb-4">{{ assessmentStore.error }}</p>
                    <Button @click="navigateTo('/assessment')">
                        Return to Assessment
                    </Button>
                </CardContent>
            </Card>

            <!-- No Results State -->
            <Card v-else>
                <CardContent class="text-center py-12">
                    <Icon name="lucide:alert-triangle" class="w-8 h-8 text-yellow-500 mx-auto pb-4" />
                    <p class="text-gray-600 pb-4">No assessment results found. Please complete the assessment first.</p>
                    <Button @click="navigateTo('/assessment')">
                        Start Assessment
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useAssessmentStore } from '~/stores/assessment'
import type { DimensionKey } from '~/types/assessment'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import { Button } from '~/components/ui/button'

// Store and reactive data
const assessmentStore = useAssessmentStore()
const showDimensionalScores = ref(false)
const showCoherenceDetails = ref(false)

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

const getPhaseGatingDimensions = (phase: string): string => {
    switch (phase) {
        case "0.1":
            return "Exit Readiness, Environmental Load, and Charge Reserve"
        case "0.2":
            return "Exit Readiness, Terrain Flexibility, and Coherence Synchrony"
        case "0.3":
            return "Mental Override, Stuckness Pattern, and Oscillatory Capacity"
        case "0.4":
            return "Terrain Flexibility, Stuckness Pattern, and Coherence Synchrony"
        default:
            return "overall system"
    }
}

const getScoreRevealsMessage = (terrainScore: number): string => {
    if (terrainScore >= 81) {
        return "Your system is capable of receiving. This score reflects a terrain with strong signs of coherence, open exits, buffered charge, and stable rhythms. That doesn't guarantee everything is optimal — but it does suggest your body is ready to amplify healing, not resist it."
    } else if (terrainScore >= 61) {
        return "Your system is beginning to stabilize. This score reflects a terrain with improving coherence, charge, and flexibility — strong enough to take on more input, but not yet fully locked in. One or two systems may still wobble under stress."
    } else if (terrainScore >= 41) {
        return "You're close — but still blocked. This score reflects a system that has pieces in place, but one or more bottlenecks are still dragging down your overall readiness. That might be drainage, charge, override, or structural stuckness."
    } else if (terrainScore >= 21) {
        return "Your terrain is overloaded. This score shows your system is still working through some combination of congestion, rigidity, depletion, or timing misalignment. These create functional blockages — not just symptoms — that make it hard to adapt to even helpful inputs."
    } else {
        return "Your body is protecting itself. This score reflects a system under significant internal strain. You may not feel terrible all the time — but at the cellular level, your terrain is likely stuck, congested, or collapsing under load."
    }
}

const getCoherenceMessage = (coherenceScore: number): string => {
    if (coherenceScore >= 81) {
        return "Your system shows strong coherence patterns. This indicates good synchronization between your biological rhythms, stable energy flow, and coordinated system responses. Your body's internal communication networks are functioning well."
    } else if (coherenceScore >= 61) {
        return "Your coherence is developing well. This shows improving synchronization between systems, though some rhythms may still be finding their optimal patterns. Your body is learning to coordinate its responses more effectively."
    } else if (coherenceScore >= 41) {
        return "Your coherence shows mixed patterns. Some systems are synchronizing well while others may be out of rhythm. This suggests your body is working to establish better internal coordination and timing."
    } else if (coherenceScore >= 21) {
        return "Your coherence patterns need support. This indicates disrupted synchronization between biological systems, irregular rhythms, or poor internal communication. Your body may be struggling to coordinate its responses effectively."
    } else {
        return "Your coherence is significantly disrupted. This reflects major desynchronization between biological systems, chaotic rhythms, or breakdown in internal communication pathways. Your body's coordination systems need focused attention."
    }
}

const getDimensionCardClass = (score: number): string => {
    if (score > 63) {
        return 'border-green-200 bg-green-50'
    } else if (score >= 40) {
        return 'border-yellow-200 bg-yellow-50'
    } else {
        return 'border-red-200 bg-red-50'
    }
}

const getDimensionScoreClass = (score: number): string => {
    if (score > 63) {
        return 'text-green-700'
    } else if (score >= 40) {
        return 'text-yellow-700'
    } else {
        return 'text-red-700'
    }
}

const getDimensionBarClass = (score: number): string => {
    if (score > 63) {
        return 'bg-green-400'
    } else if (score >= 40) {
        return 'bg-yellow-400'
    } else {
        return 'bg-red-400'
    }
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