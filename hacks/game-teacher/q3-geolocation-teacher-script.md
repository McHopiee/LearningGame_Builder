---
layout: post
title: "Q3 Game Teacher Script (Rishabh) – Geolocation Error Handling"
description: "Teacher persona + full dialogue for Q3: adding error handling to the Geolocation API example."
permalink: /hacks/game-teacher/q3-geolocation
comments: false
---

## Q3 Learning Objective
By the end of Q3, the player can **add robust error handling** to `navigator.geolocation.getCurrentPosition(...)` by:
- Providing an **error callback** (or handling rejected permissions),
- Mapping `error.code` to clear, user-friendly messages,
- Handling common failure cases: **permission denied**, **position unavailable**, **timeout**, and **unsupported browser**,
- Offering a **fallback** (retry, manual input, or graceful degradation).

## Teacher Tone / Personality
- **Supportive coach**: calm, clear, never sarcastic.
- **Scaffolded help**: starts with a nudge → then a concrete hint → then a near-solution outline.
- **No answer-dumping**: the teacher gives structure and checkpoints, not copy/paste code.
- **Player-respectful**: assumes the player is capable; celebrates effort and iteration.
- **Short sentences**: optimized for on-screen dialogue boxes.

## Q3 Teaching Script (Intro → Instructions → Post-Question Explanation)

### 1) Intro (when Q3 starts)
**Teacher (Game Teacher):**
1. “Welcome to Q3. This one is about making your code *reliable*, not just ‘working on your laptop.’”
2. “Geolocation is a classic: it can fail for many reasons, and users deserve a clear message.”
3. “Your mission: handle the error cases without crashing, freezing, or confusing the player.”

### 2) Instructions (what the player should do)
**Teacher:**
1. “Step 1: Check if geolocation exists: `if (navigator.geolocation)`.”
2. “Step 2: Pass *two* functions into `getCurrentPosition(success, error, options)`.”
3. “Step 3: In the error callback, inspect `error.code` and show a specific message.”
4. “Step 4: Add a fallback. A retry button, manual input, or a friendly ‘feature unavailable’ state.”

### 3) Optional Hint System (use when player requests help)
**Hint 1 (gentle nudge):**
- “Think: what happens if the user clicks ‘Block’ on location permissions?”

**Hint 2 (more direct):**
- “`getCurrentPosition` supports an error callback. That callback receives an `error` object with `code` + `message`.”

**Hint 3 (near-solution outline):**
- “Handle these codes: `1` permission denied, `2` position unavailable, `3` timeout. Add a default for ‘unknown’.”

### 4) Feedback Dialogue

**On Correct / Complete:**
1. “Nice. That’s real-world defensive programming.”
2. “You didn’t just make it work—you made it explain itself when it fails.”

**On Partially Correct (missing one case):**
1. “You’re close. I see error handling, but one scenario still falls through.”
2. “Check for: unsupported browser OR timeout OR unknown error.”

**On Incorrect / Needs Retry:**
1. “Not quite yet—and that’s fine.”
2. “Goal check: do you have an *error callback* and do you *branch* based on `error.code`?”

### 5) Post-Question Explanation (after the player completes Q3)
**Teacher:**
1. “Here’s the big idea: APIs fail. A lot. Your job is to fail *gracefully*.”
2. “For Geolocation, the most common failures are permissions and timeouts.”
3. “That’s why `getCurrentPosition` gives you an `error` callback and why your UI should give the player a next step.”
4. “In game terms: don’t leave the player stuck. Always provide a clear message and a fallback path.”

### 6) Example Checklist (teacher ‘grading’ rubric)
**Teacher:**
- “✅ Checks `navigator.geolocation` exists”
- “✅ Uses `getCurrentPosition(success, error, options)`”
- “✅ Handles error codes (1/2/3 + default)”
- “✅ Shows user-friendly feedback (not just console logs)”
- “✅ Provides retry or alternate action”

## Optional Implementation Skeleton (for devs integrating into the game)
This is not meant to be copy/pasted verbatim in dialogue—just a reference for what Q3 expects.

```js
function getLocation() {
  if (!navigator.geolocation) {
    showMessage('Geolocation is not supported in this browser.');
    return;
  }

  const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      showPosition(position);
    },
    (error) => {
      switch (error.code) {
        case 1:
          showMessage('Location permission denied. Please enable it in your browser settings.');
          break;
        case 2:
          showMessage('Location unavailable. Try again or check your connection/GPS.');
          break;
        case 3:
          showMessage('Location request timed out. Please try again.');
          break;
        default:
          showMessage('An unknown location error occurred.');
      }
    },
    options
  );
}
```
