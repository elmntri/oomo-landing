<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <div class="border-b bg-white border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
            <div class="max-w-4xl mx-auto">
                <div class="flex items-center space-x-3 mb-2">
                    <img src="/logo.svg" alt="OOMO" class="w-8 h-8 lg:w-10 lg:h-10 flex-shrink-0" />
                    <h1 class="text-xl lg:text-2xl font-light text-gray-900">Your Assessment Results</h1>
                </div>
                <!-- <p class="text-sm lg:text-base text-gray-600">Personalized insights based on your responses</p> -->
            </div>
        </div>

        <!-- Results Content -->
        <div class="max-w-4xl mx-auto px-6 py-12">
            <div v-if="results" class="flex flex-col gap-8">
                <!-- Section 1: Your Score -->
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
                            <div class="text-gray-700 leading-relaxed whitespace-pre-line">{{
                                getScoreRevealsMessage(results.terrainScore) }}
                            </div>
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
                        <CollapsibleContent v-auto-animate>
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

                <!-- Section 3: Where You'll Start - Phase Assignment -->
                <Card>
                    <CardHeader>
                        <CardTitle>Where You'll Start</CardTitle>
                    </CardHeader>
                    <CardContent class="flex flex-col gap-6">

                        <!-- Phase 1 Content -->
                        <div v-if="results.phase === '1'" class="flex-1">
                            <h3 class="text-lg font-medium text-gray-900 pb-4">
                                You're ready to start building.
                            </h3>
                            <div class="flex flex-col gap-4 text-gray-700 leading-relaxed">
                                <p>You've cleared enough biological debt to begin Phase 1 — the first true phase of
                                    coherence.</p>
                                <p>That doesn't mean you're "done" with terrain prep. But it does mean:</p>
                                <ul class="list-disc pl-6 space-y-1">
                                    <li>Your exits are flowing.</li>
                                    <li>Your fascia and timing systems are stable enough to hold inputs.</li>
                                    <li>Your body is ready to respond.</li>
                                </ul>
                                <p>This is where light, grounding, food, and other inputs begin to work as intended.
                                    We'll help you layer progressively, so your system stays stable and continues
                                    adapting.</p>
                                <div class="bg-blue-50 rounded-md p-4 mt-4">
                                    <p class="text-blue-800 font-medium">🚀 The goal now? Build momentum without
                                        collapse. That's what Phase 1 is all about.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Phase 0.x Content -->
                        <div v-else class="flex-1">
                            <h3 class="text-lg font-medium text-gray-900 pb-4">
                                You're starting in <span
                                    class="bg-blue-50 p-2 rounded-lg text-blue-700 font-semibold">Phase {{
                                        results.phase }} –
                                    {{ phaseInfo?.name }}</span>
                            </h3>
                            <div class="flex flex-col gap-4 text-gray-700 leading-relaxed">
                                <p>You're beginning in {{ phaseInfo?.name }}, with the goal of resetting your terrain to
                                    receive healthy inputs.</p>
                                <p>Your current state suggests this phase may take you {{
                                    getRelativeTimeDescription(results) }}, depending on consistency and
                                    terrain response.</p>
                                <p>After this, you'll move through...</p>
                                <ul class="list-disc pl-6 space-y-1">
                                    <li v-for="nextPhase in getNextPhases(results.phase)" :key="nextPhase.phase">
                                        <strong>{{ nextPhase.phase }}</strong> which {{ nextPhase.timeDescription }}
                                    </li>
                                </ul>
                                <p>...until you're ready to build, not just clear.</p>
                                <div class="bg-amber-50 rounded-md p-4 mt-4">
                                    <p class="text-amber-800"><strong>Remember:</strong> clearing debt isn't wasted
                                        time. It's what makes your system responsive again. Inputs won't land until the
                                        foundation is stable.</p>
                                </div>
                            </div>

                            <!-- Time Estimate with Enhanced Visualization -->
                            <div class="bg-blue-50 rounded-md p-4 mt-6">
                                <div class="flex items-center gap-2 pb-2">
                                    <Icon name="lucide:calendar" class="w-5 h-5 text-blue-600" />
                                    <span class="font-medium text-blue-900">Estimated Phase Duration</span>
                                </div>
                                <p class="text-sm text-blue-600 pt-1"> When oomo opens, we'll share high-level time
                                    estimates for this phase when you sign-in, based on your {{
                                        getPhaseGatingDimensions(results.phase) }} scores</p>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                <!-- Section 4: What You'll Unlock -->
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
                                <p class="text-gray-700">You'll begin with a phase that fits your current state, then
                                    unlock new actions as your system stabilizes.</p>
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

                <!-- Section 5: Save & Return CTA -->
                <Card class="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <CardContent class="text-center p-8">
                        <h2 class="text-xl font-medium text-blue-900 pb-4">Save Your Score & Unlock Your Plan</h2>
                        <p class="text-blue-800 pb-6 max-w-2xl mx-auto">
                            Save your score, and we'll let you know when oomo opens. Come back then to keep
                            learning—with your own system as the textbook.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <Dialog v-model:open="showSaveDialog">
                                <DialogTrigger as-child>
                                    <Button size="lg" class="px-8">
                                        Save Score & Sign-Up for Waitlist
                                    </Button>
                                </DialogTrigger>
                                <DialogContent class="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Save Your Results</DialogTitle>
                                    </DialogHeader>
                                    <div class="space-y-4 py-4">
                                        <p class="text-sm text-gray-600">
                                            Enter your email to save your assessment results and get notified when oomo
                                            opens.
                                        </p>
                                        <div class="space-y-2">
                                            <Label for="email">Email Address</Label>
                                            <Input id="email" v-model="email" type="email" placeholder="your@email.com"
                                                :class="emailError ? 'border-red-500' : ''"
                                                @keyup.enter="handleSaveResults" />
                                            <p v-if="emailError" class="text-sm text-red-600">{{ emailError }}</p>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button @click="handleSaveResults" :disabled="isSaving"
                                            class="w-full sm:w-auto">
                                            <Icon v-if="isSaving" name="lucide:loader"
                                                class="w-4 h-4 mr-2 animate-spin" />
                                            {{ isSaving ? 'Saving...' : 'Save Results' }}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
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
import type { DimensionKey, Phase } from '~/types/assessment'
import { TERRAIN_SCORE_LABELS, COHERENCE_SCORE_LABELS } from '~/types/assessment'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

// Store and reactive data
const showToast = useShowToast()
const assessmentStore = useAssessmentStore()
const showDimensionalScores = ref(false)
const showCoherenceDetails = ref(false)
const showSaveDialog = ref(false)
const email = ref('')
const emailError = ref('')
const isSaving = ref(false)

// Computed properties
const results = computed(() => assessmentStore.getResults())
const phaseInfo = computed(() => {
    if (results.value) {
        return assessmentStore.getPhaseInfo[results.value.phase]
    }
    return null
})

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

const getRelativeTimeDescription = (results: any): string => {
    if (!results.timeEstimate) return "some time";

    const min = results.timeEstimate.min;
    const max = results.timeEstimate.max;

    if (min === max) {
        return `${min} week${min !== 1 ? 's' : ''}`;
    } else {
        return `${min}-${max} weeks`;
    }
}

const getNextPhases = (currentPhase: string) => {
    const phaseOrder = ["0.1", "0.2", "0.3", "0.4", "1"]
    const currentIndex = phaseOrder.indexOf(currentPhase)

    if (currentIndex === -1 || currentIndex >= phaseOrder.length - 1) {
        return []
    }

    const nextPhases = phaseOrder.slice(currentIndex + 1)
    return nextPhases.map(phase => {
        const phaseInfo = assessmentStore.getPhaseInfo[phase as Phase]
        return {
            phase: `${phase} (${phaseInfo?.name || ''})`,
            timeDescription: phase === "1" ? "focuses on advanced integration" : "will prepare you for the next level"
        }
    })
}

const getScoreRevealsMessage = (terrainScore: number): string => {
    // Get the appropriate score label based on terrain score
    let scoreLabel;
    if (terrainScore >= 80) {
        scoreLabel = TERRAIN_SCORE_LABELS["80-100"];
    } else if (terrainScore >= 60) {
        scoreLabel = TERRAIN_SCORE_LABELS["60-79"];
    } else if (terrainScore >= 40) {
        scoreLabel = TERRAIN_SCORE_LABELS["40-59"];
    } else if (terrainScore >= 20) {
        scoreLabel = TERRAIN_SCORE_LABELS["20-39"];
    } else {
        scoreLabel = TERRAIN_SCORE_LABELS["0-19"];
    }

    // Return the description which now contains the full detailed message
    return scoreLabel.description;
}

const getCoherenceMessage = (coherenceScore: number): string => {
    // Get the appropriate coherence score label based on coherence score
    let scoreLabel;
    if (coherenceScore >= 80) {
        scoreLabel = COHERENCE_SCORE_LABELS["80-100"];
    } else if (coherenceScore >= 60) {
        scoreLabel = COHERENCE_SCORE_LABELS["60-79"];
    } else if (coherenceScore >= 40) {
        scoreLabel = COHERENCE_SCORE_LABELS["40-59"];
    } else if (coherenceScore >= 20) {
        scoreLabel = COHERENCE_SCORE_LABELS["20-39"];
    } else {
        scoreLabel = COHERENCE_SCORE_LABELS["0-19"];
    }

    // Return the description from the coherence score labels
    return scoreLabel.description;
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


const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailValue)
}

const saveResults = () => {
    showSaveDialog.value = true
    email.value = ''
    emailError.value = ''
}

const handleSaveResults = async () => {
    // Reset error
    emailError.value = ''

    // Validate email
    if (!email.value.trim()) {
        emailError.value = 'Email is required'
        return
    }

    if (!validateEmail(email.value.trim())) {
        emailError.value = 'Please enter a valid email address'
        return
    }

    // Set saving state
    isSaving.value = true

    try {
        // Call the store action to save results
        const success = await assessmentStore.storeAssessmentResults(email.value.trim())

        if (success) {
            showSaveDialog.value = false
            showToast({
                title: 'Results Saved',
                description: 'Your assessment results have been saved successfully. You will be notified when oomo opens.',
            })
        } else {
            emailError.value = "Failed to save your results. Try again or contact support if issue persists"
        }
    } finally {
        isSaving.value = false
    }
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