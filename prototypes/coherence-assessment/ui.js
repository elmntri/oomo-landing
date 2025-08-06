import React, { useState } from "react";
import {
  ChevronRight,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";

const TerrainCoherenceAssessment = () => {
  const [currentView, setCurrentView] = useState("landing"); // landing, assessment, results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime] = useState(Date.now());
  const [isDarkMode, setIsDarkMode] = useState(false);

  const questions = [
    {
      question:
        "How often do you feel bloated, heavy, or sluggish after eating?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "How often do you have at least one complete, satisfying bowel movement per day?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        'How often do you feel your digestion is "stuck" or incomplete?',
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "Do you experience puffiness, swelling, or facial bloating in the morning?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question: "How often do you feel overheated or flushed without sweating?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "Do you feel congested (sinus, chest, lymph) even when you're not sick?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "How often do you push through fatigue or discomfort to meet deadlines or obligations?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "Do you feel guilt or anxiety when resting, even when your body is asking for it?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        'How often do you ignore body signals (hunger, pain, tiredness) to stay productive or "on plan"?',
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "How often do you find yourself overcommitting despite knowing it will drain you?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "Do you find it difficult to slow down or stop, even when your body is clearly asking for rest?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "How well do you adapt to sudden shifts in temperature (e.g., going from indoors to cold outdoors)?",
      options: ["Very Poorly", "Poorly", "Moderately", "Well", "Very Well"],
    },
    {
      question: "What happens if you skip or delay a meal by a few hours?",
      options: [
        "Feel Terrible",
        "Feel Poor",
        "Feel OK",
        "Feel Fine",
        "No Impact",
      ],
    },
    {
      question:
        "After moderate physical activity or stress, how quickly do you bounce back to baseline?",
      options: [
        "Very Slowly",
        "Slowly",
        "Moderately",
        "Quickly",
        "Very Quickly",
      ],
    },
    {
      question:
        "How do you typically feel the day after intense activity or social engagement?",
      options: [
        "Completely Drained",
        "Very Tired",
        "Somewhat Tired",
        "Fine",
        "Energized",
      ],
    },
    {
      question:
        "How easily can you switch between intense focus and deep relaxation within a day?",
      options: ["Very Difficult", "Difficult", "Moderate", "Easy", "Very Easy"],
    },
    {
      question:
        "How often do you feel physically stiff or locked up when waking or after sitting?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "Do massages, foam rolling, or stretching feel unusually uncomfortable, painful, or blocked (beyond normal soreness)?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "How well do you adjust to new environments physically (e.g., beds, chairs, postures)?",
      options: ["Very Poorly", "Poorly", "Moderately", "Well", "Very Well"],
    },
    {
      question:
        "After prolonged sitting or stillness, how do you feel when trying to move or stand up?",
      options: [
        "Very Stiff/Painful",
        "Stiff",
        "Slightly Stiff",
        "Fine",
        "Loose/Mobile",
      ],
    },
    {
      question:
        "How easily can you drop into a deep sigh or relaxed breath without forcing it?",
      options: ["Very Difficult", "Difficult", "Moderate", "Easy", "Very Easy"],
    },
    {
      question:
        "How refreshed do you feel after a full night's sleep (7–9 hours)?",
      options: ["Very Poor", "Poor", "Moderate", "Good", "Excellent"],
    },
    {
      question:
        "After 20–30 minutes in natural sunlight, how does your energy respond?",
      options: [
        "Gets Worse",
        "No Change",
        "Slight Boost",
        "Good Boost",
        "Strong Boost",
      ],
    },
    {
      question:
        "How resilient are you when facing back-to-back stressors (work, social, travel)?",
      options: ["Very Poor", "Poor", "Moderate", "Good", "Excellent"],
    },
    {
      question:
        "How often do you feel your energy crash midday, even after a full night of sleep?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "How often do you rely on caffeine, sugar, or stimulants to function or feel alert?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "Do you naturally feel sleepy after sunset if you're not using artificial light?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "How well does your daily energy follow a steady rhythm — rising in the morning, peaking mid-day, and tapering at night?",
      options: ["Very Poorly", "Poorly", "Moderately", "Well", "Very Well"],
    },
    {
      question:
        "How consistently do you get exposure to early morning sunlight before 9am?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "How often do you feel \"stuck\" — like your body or mind can't get going, even when you're trying?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "How often do you fall back into old patterns even after making progress with routines or healing?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "Do you find it hard to fully complete healing cycles or feel like your progress keeps resetting?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "How often are you under artificial light or in front of screens after sunset?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "How frequently do you feel disconnected from natural environments (sunlight, fresh air, barefoot contact)?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
    {
      question:
        "How noisy, chaotic, or stimulating is your day-to-day environment (traffic, EMFs, people, pressure)?",
      options: ["Very Low", "Low", "Moderate", "High", "Very High"],
    },
    {
      question:
        "Do you frequently travel, cross time zones, or experience inconsistent sleep-wake timing?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Almost Always"],
    },
  ];

  const handleAnswer = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));

    // Auto-advance to next question after a brief delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentView("results");
      }
    }, 300);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentView("results");
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getTimeRemaining = () => {
    const totalQuestions = questions.length;
    const remaining = totalQuestions - currentQuestion;
    const timePerQuestion = 8 / totalQuestions; // 8 minutes total for 36 questions
    return Math.ceil(remaining * timePerQuestion);
  };

  const calculateScores = () => {
    // Placeholder scoring logic
    const terrainScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const coherenceScore = Math.floor(Math.random() * 40) + 50; // 50-90
    const docScore = Math.floor(Math.random() * 30) + 70; // 70-100

    return { terrainScore, coherenceScore, docScore };
  };

  const getProgressPercent = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  if (currentView === "landing") {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-slate-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-xl mx-auto px-6 py-12 text-center">
          <div
            className={`rounded-lg shadow-sm border p-12 ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Dark Mode Toggle */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-md transition-colors ${
                  isDarkMode
                    ? "bg-slate-700 text-yellow-400 hover:bg-slate-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>
            <h1
              className={`text-3xl font-light mb-8 ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Start your Terrain Coherence Assessment
            </h1>
            <button
              onClick={() => setCurrentView("assessment")}
              className={`px-8 py-3 rounded-md transition-colors flex items-center space-x-2 mx-auto ${
                isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <span>Start Assessment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "assessment") {
    const question = questions[currentQuestion];
    const isAnswered = answers[currentQuestion] !== undefined;

    return (
      <div
        className={`min-h-screen ${isDarkMode ? "bg-slate-900" : "bg-gray-50"}`}
      >
        {/* Progress Header */}
        <div
          className={`border-b px-6 py-4 ${
            isDarkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center space-x-2 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>{getTimeRemaining()} min remaining</span>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-md transition-colors ${
                    isDarkMode
                      ? "bg-slate-700 text-yellow-400 hover:bg-slate-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {isDarkMode ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div
              className={`w-full rounded-full h-2 ${
                isDarkMode ? "bg-slate-700" : "bg-gray-200"
              }`}
            >
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercent()}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div
            className={`rounded-lg shadow-sm border p-8 ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h2
              className={`text-2xl font-light mb-8 leading-relaxed ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {question.question}
            </h2>

            {question.type === "text" ? (
              <div className="space-y-6">
                <textarea
                  value={answers[currentQuestion] || ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Share any additional context that might help us understand your current state..."
                  className={`w-full h-32 p-4 border rounded-md focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDarkMode
                      ? "bg-slate-700 border-slate-600 text-gray-100 placeholder-gray-400 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                  }`}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-4 text-left border-2 rounded-md transition-all ${
                      answers[currentQuestion] === option
                        ? isDarkMode
                          ? "border-blue-500 bg-blue-900/20 text-blue-100"
                          : "border-blue-500 bg-blue-50 text-blue-900"
                        : isDarkMode
                        ? "border-slate-600 hover:border-slate-500 hover:bg-slate-700 text-gray-200"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-900"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {answers[currentQuestion] === option && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div
              className={`flex items-center justify-between mt-8 pt-6 border-t ${
                isDarkMode ? "border-slate-700" : "border-gray-200"
              }`}
            >
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  currentQuestion === 0
                    ? isDarkMode
                      ? "text-gray-600 cursor-not-allowed"
                      : "text-gray-400 cursor-not-allowed"
                    : isDarkMode
                    ? "text-gray-300 hover:text-gray-100 hover:bg-slate-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Select an answer to continue
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "results") {
    const scores = calculateScores();

    return (
      <div
        className={`min-h-screen py-12 ${
          isDarkMode ? "bg-slate-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div
            className={`rounded-lg shadow-sm border p-8 ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Dark Mode Toggle */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-md transition-colors ${
                  isDarkMode
                    ? "bg-slate-700 text-yellow-400 hover:bg-slate-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Headline Section */}
            <div
              className={`text-center mb-8 pb-8 border-b ${
                isDarkMode ? "border-slate-700" : "border-gray-200"
              }`}
            >
              <h1
                className={`text-3xl font-light mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Your Terrain Assessment Results
              </h1>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                Your current biological terrain and recommended starting phase
              </p>
            </div>

            {/* Composite Terrain Snapshot */}
            <div className="mb-8">
              <h2
                className={`text-lg font-medium mb-6 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Composite Terrain Snapshot
              </h2>

              <div className="space-y-4 mb-6">
                <div
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    isDarkMode ? "border-slate-600" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div>
                      <div
                        className={`font-medium ${
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        Terrain Score: {scores.terrainScore}/100
                      </div>
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <em>Moderate reserves:</em> There's capacity, but
                        fragility remains.
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    isDarkMode ? "border-slate-600" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div>
                      <div
                        className={`font-medium ${
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        Coherence Score: {scores.coherenceScore}/100
                      </div>
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <em>Fragmented rhythms:</em> Timing and signal alignment
                        not yet stabilized.
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    isDarkMode ? "border-slate-600" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div>
                      <div
                        className={`font-medium ${
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        DOC Score: {scores.docScore}/100
                      </div>
                      <div
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <em>Limited flexibility:</em> Your system resists
                        challenge until exits improve.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                These scores reflect where your body is ready to begin — not
                where you wish it were. Most breakdowns happen when coherence is
                forced prematurely.
              </p>
            </div>

            {/* Recommended Starting Phase */}
            <div className="mb-8">
              <h2
                className={`text-lg font-medium mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Recommended Starting Phase: Phase 0 — Foundation
              </h2>
              <p
                className={`mb-4 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Most plans start too late. Yours starts where your body actually
                is. You've got some capacity — but the system isn't yet cleared,
                aligned, or phase-synchronized.
              </p>
              <p
                className={`mb-4 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Before rebuilding energy or pushing adaptation, your terrain
                needs space to release, reset, and unlock.
              </p>
              <p
                className={`font-medium ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Phase 0 is not a protocol — it's a physiological reset.
              </p>
            </div>

            {/* Phase 0 Focus Areas */}
            <div className="mb-8">
              <h2
                className={`text-lg font-medium mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Phase 0 Focus Areas
              </h2>
              <p
                className={`text-sm mb-6 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                These are the biophysical bottlenecks holding back true
                coherence:
              </p>

              <div className="space-y-4">
                <div
                  className={`p-4 border rounded-lg ${
                    isDarkMode ? "border-slate-600" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`font-medium mb-2 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Exit Pathways
                  </div>
                  <div
                    className={`text-sm mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Bile flow, digestion, elimination, and fascia drainage
                  </div>
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    → Mitochondria can't signal properly if waste and toxins
                    aren't moving. Coherence begins with flow.
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-lg ${
                    isDarkMode ? "border-slate-600" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`font-medium mb-2 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Override Patterns
                  </div>
                  <div
                    className={`text-sm mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Signal suppression, trauma loops, and false resilience
                  </div>
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    → Nervous system override distorts circadian and redox
                    rhythms. You can't entrain if you can't feel.
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-lg ${
                    isDarkMode ? "border-slate-600" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`font-medium mb-2 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Tissue Flexibility
                  </div>
                  <div
                    className={`text-sm mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Fascia pliability, microcirculation, movement-induced flow
                  </div>
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    → Structural stagnation = energetic stagnation. Unlocking
                    fascia improves redox, hydration, and exits.
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-lg ${
                    isDarkMode ? "border-slate-600" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`font-medium mb-2 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Input Quality
                  </div>
                  <div
                    className={`text-sm mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Environmental load (EMFs, artificial light), dietary clutter
                    (seed oils, additives)
                  </div>
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    → You can't build phase stability in a noisy signal field.
                    Foundation starts by clearing what blocks rhythm.
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Phase Terrain Progression */}
            <div className="mb-8">
              <h2
                className={`text-lg font-medium mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                5-Phase Terrain Progression
              </h2>
              <div className="space-y-3 mb-4">
                <div
                  className={`flex items-center p-4 border rounded-lg ${
                    isDarkMode
                      ? "border-blue-500 bg-blue-900/20"
                      : "border-blue-300 bg-blue-50"
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                    0
                  </div>
                  <div>
                    <div
                      className={`font-medium ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Phase 0 – Foundation
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Clear exits, reduce override, unlock fascia
                    </div>
                  </div>
                </div>
                <div
                  className={`flex items-center p-4 border rounded-lg ${
                    isDarkMode ? "border-slate-600" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4 ${
                      isDarkMode
                        ? "bg-slate-600 text-gray-300"
                        : "bg-gray-300 text-white"
                    }`}
                  >
                    1
                  </div>
                  <div>
                    <div
                      className={`font-medium ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Phase 1 – Coherence
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Build rhythm, entrain timing, stabilize redox
                    </div>
                  </div>
                </div>
                <div
                  className={`flex items-center p-4 border rounded-lg ${
                    isDarkMode ? "border-slate-600" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4 ${
                      isDarkMode
                        ? "bg-slate-600 text-gray-300"
                        : "bg-gray-300 text-white"
                    }`}
                  >
                    2
                  </div>
                  <div>
                    <div
                      className={`font-medium ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Phase 2 – Amplitude
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Expand adaptive range, introduce variability
                    </div>
                  </div>
                </div>
                <div
                  className={`flex items-center p-4 border rounded-lg ${
                    isDarkMode ? "border-slate-600" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4 ${
                      isDarkMode
                        ? "bg-slate-600 text-gray-300"
                        : "bg-gray-300 text-white"
                    }`}
                  >
                    3
                  </div>
                  <div>
                    <div
                      className={`font-medium ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Phase 3 – Replenishment
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Deep restoration of reserves and structure
                    </div>
                  </div>
                </div>
                <div
                  className={`flex items-center p-4 border rounded-lg ${
                    isDarkMode ? "border-slate-600" : "border-gray-200"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-4 ${
                      isDarkMode
                        ? "bg-slate-600 text-gray-300"
                        : "bg-gray-300 text-white"
                    }`}
                  >
                    4
                  </div>
                  <div>
                    <div
                      className={`font-medium ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Phase 4 – Oscillation
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Peak resilience, dynamic antifragility
                    </div>
                  </div>
                </div>
              </div>
              <p
                className={`text-sm italic ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Phase 0 is the terrain your mitochondria wish you'd started
                with.
              </p>
            </div>

            {/* Your Personalized Plan */}
            <div className="mb-8">
              <h2
                className={`text-lg font-medium mb-4 ${
                  isDarkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Your Personalized Plan (Next Step)
              </h2>
              <p
                className={`mb-4 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                We've translated your terrain signals into a coherence-aligned
                action plan, customized for your phase.
              </p>
              <p
                className={`mb-4 font-medium ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                What you'll get after unlocking:
              </p>
              <div
                className={`rounded-lg p-4 ${
                  isDarkMode ? "bg-slate-700" : "bg-gray-50"
                }`}
              >
                <div
                  className={`text-sm space-y-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <div>
                    • Exact actions mapped to your terrain state (Phase 0.1–0.4)
                  </div>
                  <div>
                    • What not to do (no premature fasting, detox, or
                    oscillation)
                  </div>
                  <div>
                    • Signals to watch for as you prepare for Phase 1 entry
                  </div>
                  <div>
                    • Explanations grounded in quantum biology, not vague
                    wellness advice
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div
              className={`text-center pt-6 border-t ${
                isDarkMode ? "border-slate-700" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => window.open("/dashboard", "_blank")}
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>Unlock My Terrain Plan</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <p
                className={`text-sm mt-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <em>Your next phase isn't a protocol. It's a recalibration.</em>
                <br />
                Let's build from foundation — not fatigue.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TerrainCoherenceAssessment;
