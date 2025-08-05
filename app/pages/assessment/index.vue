<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Progress Header -->
        <div class="border-b bg-white border-gray-200 px-6 py-4">
            <div class="max-w-4xl mx-auto">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-4">
                        <span class="text-sm text-gray-600">
                            Question {{ assessmentStore.currentQuestion + 1 }} of {{ assessmentStore.getTotalQuestions
                            }}
                        </span>
                        <span class="text-xs text-gray-500">
                            {{ answeredCount }} answered
                        </span>
                    </div>
                    <div class="flex items-center space-x-2 text-sm text-gray-500">
                        <Icon name="lucide:clock" class="w-4 h-4" />
                        <span>{{ timeRemaining }} min remaining</span>
                    </div>
                </div>
                <div class="w-full rounded-full h-2 bg-gray-200">
                    <div class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        :style="{ width: `${assessmentStore.getProgressPercentage}%` }" />
                </div>
            </div>
        </div>

        <!-- Question Content -->
        <div class="max-w-3xl mx-auto px-6 py-8">
            <Transition name="question" mode="out-in">
                <div :key="assessmentStore.currentQuestion"
                    class="rounded-lg shadow-sm border bg-white border-gray-200 p-8">
                    <!-- Question Section - Fixed Height -->
                    <div class="min-h-[150px] flex items-center mb-8">
                        <h2 class="text-2xl font-light leading-relaxed text-gray-900 w-full">
                            {{ currentQuestion.text }}
                        </h2>
                    </div>

                    <!-- Choices Section - Consistent Layout -->
                    <div class="space-y-3">
                        <button v-for="(option, index) in likertOptions" :key="index" @click="handleAnswer(index)"
                            class="w-full p-4 text-left border-2 rounded-md transition-all"
                            :class="getOptionClasses(index)">
                            <div class="flex items-center justify-between">
                                <span>{{ option }}</span>
                                <Icon v-if="selectedAnswer === index" name="linemd:confirm-circle"
                                    class="w-5 h-5 text-blue-600" />
                            </div>
                        </button>
                    </div>
                </div>
            </Transition>

            <!-- Error Message -->
            <div v-if="assessmentStore.error" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <div class="flex items-center space-x-2">
                    <Icon name="lucide:alert-circle" class="w-5 h-5 text-red-500" />
                    <p class="text-red-700 text-sm">{{ assessmentStore.error }}</p>
                </div>
            </div>

            <!-- Navigation Controls -->
            <div
                class="flex items-center justify-between mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <button @click="goToPrevious" :disabled="assessmentStore.currentQuestion === 0"
                    class="flex items-center space-x-2 px-4 py-2 rounded-md transition-colors" :class="assessmentStore.currentQuestion === 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'">
                    <Icon name="lucide:arrow-left" class="w-4 h-4" />
                    <span>Previous</span>
                </button>

                <div class="text-sm text-gray-500">
                    Select an answer to continue
                </div>

                <button @click="goToNext" :disabled="selectedAnswer === null"
                    class="flex items-center space-x-2 px-4 py-2 rounded-md transition-colors" :class="selectedAnswer === null
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'">
                    <span>Next</span>
                    <Icon name="lucide:arrow-right" class="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useAssessmentStore } from '~/stores/assessment'
import { LIKERT_OPTIONS } from '~/types/assessment'

// Store and reactive data
const assessmentStore = useAssessmentStore()
const selectedAnswer = ref<number | null>(null)
const autoAdvanceTimeout = ref<NodeJS.Timeout | null>(null)

// Computed properties
const currentQuestion = computed(() => assessmentStore.getCurrentQuestion)
const likertOptions = computed(() => LIKERT_OPTIONS)

const timeRemaining = computed(() => {
    const totalQuestions = assessmentStore.getTotalQuestions
    const remaining = totalQuestions - assessmentStore.currentQuestion
    const timePerQuestion = 4 / totalQuestions // 4 minutes total for 25 questions
    return Math.ceil(remaining * timePerQuestion)
})

const answeredCount = computed(() => {
    return assessmentStore.getAllResponses().size
})

// Methods
const getOptionClasses = (index: number) => {
    if (selectedAnswer.value === index) {
        return 'border-blue-500 bg-blue-50 text-blue-900'
    }
    return 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-900'
}

const handleAnswer = (answerIndex: number) => {
    selectedAnswer.value = answerIndex

    // Save response to store
    assessmentStore.setResponse(currentQuestion.value.id, answerIndex)

    // Clear any error messages when answering
    if (assessmentStore.error) {
        assessmentStore.error = null
    }

    // Clear any existing timeout
    if (autoAdvanceTimeout.value) {
        clearTimeout(autoAdvanceTimeout.value)
    }

    // Auto-advance after 300ms delay
    autoAdvanceTimeout.value = setTimeout(() => {
        goToNext()
    }, 300)
}

const goToNext = () => {
    if (selectedAnswer.value !== null) {
        // Clear timeout if manually advancing
        if (autoAdvanceTimeout.value) {
            clearTimeout(autoAdvanceTimeout.value)
            autoAdvanceTimeout.value = null
        }

        if (assessmentStore.currentQuestion < assessmentStore.getTotalQuestions - 1) {
            assessmentStore.nextQuestion()
        } else {
            // Assessment complete - validate and navigate to results
            const success = assessmentStore.completeAssessment()
            if (success) {
                navigateTo('/assessment/results')
            } else {
                // Handle validation error - could show error message or navigate to first unanswered question
                const unanswered = assessmentStore.getUnansweredQuestions()
                if (unanswered.length > 0) {
                    // Navigate to first unanswered question
                    const firstUnansweredIndex = assessmentStore.getAllQuestions.findIndex(q => q.id === unanswered[0])
                    if (firstUnansweredIndex !== -1) {
                        assessmentStore.setCurrentQuestion(firstUnansweredIndex)
                    }
                }
            }
        }
    }
}

const goToPrevious = () => {
    if (assessmentStore.currentQuestion > 0) {
        // Clear any auto-advance timeout
        if (autoAdvanceTimeout.value) {
            clearTimeout(autoAdvanceTimeout.value)
            autoAdvanceTimeout.value = null
        }

        assessmentStore.previousQuestion()
    }
}

// Watch for question changes to update selected answer
watch(() => assessmentStore.currentQuestion, () => {
    // Load existing response for this question
    const existingResponse = assessmentStore.getResponse(currentQuestion.value.id)
    selectedAnswer.value = existingResponse !== undefined ? existingResponse : null

    // Clear any pending auto-advance
    if (autoAdvanceTimeout.value) {
        clearTimeout(autoAdvanceTimeout.value)
        autoAdvanceTimeout.value = null
    }

    // Clear any error messages when navigating
    if (assessmentStore.error) {
        assessmentStore.error = null
    }
})

// Initialize on mount
onMounted(() => {
    // Load from storage first to restore any previous state
    assessmentStore.loadFromStorage()

    // If assessment is already complete, redirect to results
    if (assessmentStore.isComplete && assessmentStore.results) {
        navigateTo('/assessment/results')
        return
    }

    // Load existing response for current question
    const existingResponse = assessmentStore.getResponse(currentQuestion.value.id)
    selectedAnswer.value = existingResponse !== undefined ? existingResponse : null

    // Start assessment if not already started
    if (!assessmentStore.startTime) {
        assessmentStore.startAssessment()
    }
})

// Cleanup on unmount
onUnmounted(() => {
    if (autoAdvanceTimeout.value) {
        clearTimeout(autoAdvanceTimeout.value)
    }
})
</script>

<style scoped>
/* Question transition animations */
.question-enter-active,
.question-leave-active {
    transition: all 0.2s ease-in-out;
}

.question-enter-from {
    opacity: 0;
}

.question-leave-to {
    opacity: 0;
}

.question-enter-to,
.question-leave-from {
    opacity: 1;
}
</style>