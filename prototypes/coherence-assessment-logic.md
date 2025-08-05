Eric Sun For your review

Michael Chen Head start on looking at formulas, but wait for your discussion with Eric

1. Changes/Impacts

- 25 questions (I don’t mind an open-ended one as #26, we have ways to use it), most users <4min
- Terrain precision up to 93, phase onboarding precision up to 96
- One question can impact multiple dimensions (Reasons: Less survey time, anti-overfitting, anti-gaming, anti-reverse engineering)
- Each question still weighted the same (Reasons: Precision gain is not worth complexity)
- Question list is not randomized (Reasons: ChatGPT feels strongly about anchoring, different than MBTI)
- Headings are removed (Reasons: User off auto-pilot, anti-gaming, anti-reverse engineering)
- Some questions are reverse Likert (Reasons: User off auto-pilot, anti-gaming)

---

2. Questions

1. How often do you feel bloated, heavy, or sluggish after eating? (D1, Normal)
1. How often do you have at least one complete, satisfying bowel movement per day? (D1, Reverse)
1. How often do you feel your digestion is "stuck" or incomplete? (D1, D7, Normal)
1. How often do you experience puffiness, swelling, or facial bloating in the morning? (D1, Normal)
1. How often do you feel overheated or flushed without sweating? (D1, D5, Normal)
1. How often do you feel congested (sinus, chest, lymph) even when you're not sick? (D1, D8, Normal)
1. How often do you push through fatigue or discomfort to meet deadlines or obligations? (D2, Normal)
1. How often do you feel guilt or anxiety when resting, even when your body is asking for it? (D2, D7, Normal)
1. How often do you stay up late or skip meals to finish tasks, even when you know it throws off your rhythm? (D2, D6, Normal)
1. How well do you maintain steady energy when you skip or delay a meal by a few hours? (D3, D5, Reverse)
1. How often do you struggle to bounce back after moderate physical activity or stress? (D3, D5, Normal)
1. How often do you feel depleted the next day after intense work or social demands? (D3, D2, Normal)
1. How often do you feel stress gets stuck in your body as tightness, aches, or shutdown during prolonged stressful periods? (D4, D2, D7, Normal)
1. How often do massages, foam rolling, or stretching feel unusually uncomfortable or blocked (beyond normal soreness)? (D4, Normal)
1. How often do you feel physically unsettled or uncomfortable when adjusting to new environments (e.g., beds, chairs, postures)? (D4, D6, Normal)
1. How often can you release areas of tension in your body (e.g., belly, hips, chest) just through breath or awareness—without needing to move or stretch? (D4, D2, Reverse)
1. How often do you feel like your body stays locked or tense long after stress has passed—even when you try to unwind it? (D4, D2, D7, Normal)
1. How often do you wake up tired or unrefreshed—regardless of how long you slept? (D5, Normal)
1. How often do you feel noticeably more energized after 20–30 minutes in natural sunlight? (D5, D8, Reverse)
1. How often do you feel your energy crash midday, regardless of how well you slept? (D5, Normal)
1. How often do you rely on caffeine, sugar, or stimulants to function or feel alert? (D5, Normal)
1. If you dim or reduce artificial lights after sunset, how often do you naturally feel sleepy within 1–2 hours? (D6, Reverse)
1. How often does your daily energy follow a steady rhythm—rising in the morning, peaking mid-day, and tapering at night? (D6, Reverse)
1. How consistently do you get exposure to early morning sunlight before 9am? (D6, D8, Reverse)
1. How often do you feel your day-to-day environment is noisy, chaotic, or overly stimulating (traffic, EMFs, people, pressure)? (D8, Normal)

---

3. Terrain Coherence Assessment Questions

Likert Scale:
Never = 0
Rarely = 1
Sometimes = 2
Often = 3
Almost Always = 4

Reverse-Scored Items:
Invert: 4 → 0, 3 → 1, 2 → 2, 1 → 3, 0 → 4

---

Dimension Label Question IDs
D1 Exit Readiness 1, 2, 3, 4, 5, 6
D2 Mental Override 7, 8, 9, 12, 13, 16, 17
D3 Oscillatory Capacity 10, 11, 12
D4 Terrain Flexibility 13, 14, 15, 16, 17
D5 Charge Reserve 5, 10, 11, 18, 19, 20, 21
D6 Coherence Synchrony 9, 15, 22, 23, 24
D7 Stuckness Pattern 3, 8, 13, 17
D8 Environmental Load 6, 19, 24, 25

---

5. How to Calculate Score

- Be clear on normal vs. reverse scored questions (labeled on every question)
- Calculate dimensional (D1-D8) scores by taking total scored, and dividing by total possible & normalizing to 100
  - e.g. A user that scores 1 on every question in D1 would be 6/24, normalized on 100 scale to 25
- Terrain score (94 precision) weights 4 dimensions: D1 (30%), D2 (25%), D4 (25%), D5 (20%)
- Coherence score (83 precision) weights 2 dimensions: D2 (50%), D6 (50%)
- Scores can be calculated for OC (D3) and DOC (D2-D5) but we don’t need them now

---

6. How to Assign Phase

(Note: Updated 8/5 - 3 dimensions instead of 1, threshold changed to 63)

63 is good balance of not being too strict, but being cognizant of weak fallback mechanisms in MVP

Formula:

if min(D1, D8, D5) <= 63:
phase = "0.1"
elif min(D1, D4, D6) <= 63:
phase = "0.2"
elif min(D2, D7, D3) <= 63:
phase = "0.3"
elif min(D4, D7, D6) <= 63:
phase = "0.4"
else:
phase = "1"

---

7. How to Estimate Time (For Phase Completion)

(Note: Updated 8/5 - Calculate Multiplier independently for input into Terrain Results Page)

(Note: Dx is now the minimum of the 3 dimensional subscores for each phase - see Section 7c)

a. Phase Time:

Phase_Time = Base_Time x Multiplier

Multiplier = (1 + (80 – Dx) / 30 )²

b. Variable Definitions:

- Phase_Time = Estimated time (in weeks) for that specific Phase 0 subphase
- Base_Time = The minimum possible duration under ideal conditions (score ≥ 80)
- Dx = Minimum (of 3) calculated dimensional subscores (scaled 0–100) for the subphase’s gating dimension

Subphase Dimensions Base Time (weeks)
0.1 (Exits) D1, D8, D5 2.5
0.2 (Fascia) D4, D1, D6 2
0.3 (Override) D2, D3, D7 1.5
0.4 (Charge) D5, D6, D7 2

Dx Score Multiplier 0.1 Phase Time (Base 2.5)
80+ 1.0 2.5 weeks
70 (1 + 0.33)² ≈ 1.78 4.45 weeks
60 (1 + 0.67)² ≈ 2.78 6.95 weeks
50 (1 + 1.0)² = 4.0 10 weeks
40 (1 + 1.33)² ≈ 5.4 13.5 weeks
30 (1 + 1.67)² ≈ 7.4 18.5 weeks

This aligns with real-world expectations:

- People with TS 30 often take 3–5 months to clear exits (Phase 0.1)
- People at 80+ move in 2–3 weeks

e. Convert Phase Time Result to a Range

This approach creates consistent bands based on terrain uncertainty — wider for low scores, tighter for high scores.

Phase Time (weeks) Category Display Range Rule
≤ 3 Fast Show ±0.5 weeks
≤ 6 Average Show ±1 week
≤ 10 Slow Show ±2 weeks
≤ 15 Extended Show ±3 weeks

> 15 Deep collapse Show –3 to +4 weeks (capped)

Round to the nearest whole week for UI clarity.

---

Output Metric Precision (%)
Phase Assignment 96
Terrain Score (TS) 94
Coherence Score (CS) 83
Oscillatory Capacity 83
DOC Proxy 69
Phase Timing Estimate 76
Anti-Gaming Robustness 92
Total Dimensional Balance 89
Overall Composite Precision 91

---

---

User Type Time per Q Total Time
Fast ~3–4 sec 1.5–2 minutes
Average ~6–8 sec 2.5–3.5 minutes
Slow ~10–15 sec 4–6 minutes

Most users will finish in under 4 minutes.

---

10. Quintile Labels

These are just ChatGPT’s suggestions

Range Label Meaning
0–19 ⚠️ System Stalled Deeply impaired exits, override, or charge. Likely Phase 0.1 only.
20–39 🪨 Blocked Terrain Some movement possible, but terrain is rigid, burdened, or low-charge.
40–59 🌿 Starting to Open Key exits or signals are beginning to respond. Active re-alignment needed.
60–79 🌱 Gaining Ground Terrain is loosening; ready for deeper pattern work and early rhythm.
80–100 🌳 Stable & Responsive Structural and signaling coherence is present. Likely ready for Phase 1.

Range Label Meaning
0–19 🌘 Disconnected Severely fragmented rhythms; likely misaligned from light, food, and sleep.
20–39 🌀 Desynchronized Some patterns exist, but timing is unstable or overridden.
40–59 🌗 Re-patterning Daily rhythms are forming, but still fragile or inconsistent.
60–79 🌖 Aligning Rhythm and override are stabilizing — signal flow is clearer.
80–100 🌕 Synchronized Biological clocks and energetic cycles are coherent and aligned.
