---
layout: base
title: Game Teacher Module
authors: Anika, Rishabh, Cyrus
permalink: /learninggame/gameteacher
---

<style>
    #teacher-overlay {
        display: none;
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
        justify-content: center;
        align-items: center;

        /* mission-control glass */
        background:
            radial-gradient(circle at 28% 18%, rgba(6,182,212,0.14), transparent 55%),
            radial-gradient(circle at 75% 80%, rgba(168,85,247,0.12), transparent 55%),
            rgba(2, 6, 23, 0.90);

        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        }

        /* Card shell */
        .teacher-card {
        width: min(680px, 92vw);
        max-height: min(78vh, 720px);
        overflow: hidden;

        position: relative;
        border-radius: 22px;
        border: 1px solid rgba(6,182,212,0.35);
        background: linear-gradient(180deg, rgba(15,23,42,0.92), rgba(2,6,23,0.92));
        box-shadow:
            0 0 0 1px rgba(6,182,212,0.14),
            0 30px 90px rgba(0,0,0,0.55),
            0 0 55px rgba(6,182,212,0.16);

        transform: translateY(10px) scale(0.99);
        opacity: 0;
        animation: teacherIn 220ms ease-out forwards;

        padding: 0; /* We'll use sections inside */
        }

        @keyframes teacherIn {
        to { transform: translateY(0) scale(1); opacity: 1; }
        }

        /* subtle tech grid */
        .teacher-card::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
        background-size: 26px 26px;
        opacity: 0.32;
        pointer-events: none;
        }

        .teacher-card::after {
        content: "";
        position: absolute;
        left: 10%;
        top: -40px;
        width: 80%;
        height: 85px;
        background: radial-gradient(circle, rgba(6,182,212,0.24), transparent 65%);
        filter: blur(10px);
        pointer-events: none;
        }

        /* Header / body / footer structure */
        .teacher-header {
        position: relative;
        z-index: 1;
        padding: 18px 20px 14px;
        background: linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,41,59,0.72));
        border-bottom: 1px solid rgba(148,163,184,0.18);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        }

        .teacher-chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border-radius: 999px;
        border: 1px solid rgba(6,182,212,0.25);
        background: rgba(2,6,23,0.55);
        color: rgba(103,232,249,0.85);
        font-family: 'Courier New', monospace;
        font-size: 11px;
        white-space: nowrap;
        }

        .teacher-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #06b6d4;
        box-shadow: 0 0 10px rgba(6,182,212,0.65);
        }

        .teacher-body {
        position: relative;
        z-index: 1;
        padding: 18px 20px 16px;
        overflow: auto;
        max-height: calc(min(78vh, 720px) - 120px);
        }

        #teacher-title {
        margin: 0;
        color: #67e8f9;
        font-size: 18px;
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 2.2px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        #teacher-msg {
        margin-top: 10px;
        color: rgba(226,232,240,0.92);
        line-height: 1.7;
        font-size: 14px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Footer */
        .teacher-footer {
        position: relative;
        z-index: 1;
        padding: 14px 20px 18px;
        background: rgba(2,6,23,0.55);
        border-top: 1px solid rgba(148,163,184,0.18);
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        }

        /* Polished CTA button */
        .teacher-btn {
        border: none;
        border-radius: 14px;
        padding: 12px 16px;
        font-weight: 900;
        letter-spacing: 0.6px;
        cursor: pointer;
        text-transform: uppercase;
        transition: transform 140ms ease, box-shadow 140ms ease, opacity 140ms ease;
        color: #06121a;
        background: linear-gradient(135deg, #06b6d4, #3b82f6);
        box-shadow: 0 12px 30px rgba(6,182,212,0.18);
        }

.teacher-btn:hover { box-shadow: 0 16px 40px rgba(6,182,212,0.24); }
.teacher-btn:active { transform: translateY(1px) scale(0.99); }

#teacher-title{
  font-size: 20px;
  letter-spacing: 3px;
  font-weight: 900;
  color: #67e8f9;
  text-transform: uppercase;
  margin: 0;
}

#teacher-msg{
  margin: 0;
  color: rgba(226,232,240,0.92);
  font-size: 14px;
  line-height: 1.75;
}

/* A “briefing section” wrapper */
.briefing-wrap{
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Label rows like Objective / Tip */
.briefing-row{
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.briefing-label{
  flex: 0 0 auto;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: rgba(103,232,249,0.85);
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(6,182,212,0.25);
  background: rgba(2,6,23,0.55);
}

.briefing-text{
  flex: 1 1 auto;
  color: rgba(226,232,240,0.92);
}

/* Code “pills” for commands */
.code-pill{
  display: inline-block;
  padding: 3px 8px;
  margin: 0 2px;
  border-radius: 999px;
  border: 1px solid rgba(6,182,212,0.35);
  background: rgba(2,6,23,0.70);
  color: rgba(103,232,249,0.95);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 12px;
  letter-spacing: 0.2px;
  box-shadow: 0 0 0 1px rgba(6,182,212,0.10), 0 10px 24px rgba(6,182,212,0.10);
  white-space: nowrap;
}

/* Slight emphasis style */
.briefing-strong{
  color: rgba(255,255,255,0.95);
  font-weight: 800;
}

    /* Fixed to bottom right of the entire browser window */
    #help-bot-icon {
    position: fixed;
    bottom: 28px;
    right: 28px;
    width: 64px;
    height: 64px;
    border-radius: 18px; /* “squircle” = more modern than a circle */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 3000;

    /* neon glass */
    background: linear-gradient(135deg, rgba(6,182,212,1), rgba(59,130,246,1));
    box-shadow:
        0 18px 45px rgba(6,182,212,0.22),
        0 0 0 1px rgba(6,182,212,0.25);

    transition: transform 180ms ease, box-shadow 180ms ease;
    font-size: 28px;
    }

    #help-bot-icon:hover {
    transform: translateY(-2px) scale(1.06);
    box-shadow:
        0 22px 55px rgba(6,182,212,0.28),
        0 0 0 1px rgba(6,182,212,0.28);
    }

    /* Hint bubble */
    #help-bubble {
    display: none;
    position: fixed;
    bottom: 106px;
    right: 28px;
    width: min(320px, 78vw);
    z-index: 3000;

    border-radius: 18px;
    border: 1px solid rgba(6,182,212,0.30);
    background:
        radial-gradient(circle at 20% 20%, rgba(6,182,212,0.10), transparent 55%),
        rgba(2,6,23,0.88);

    color: rgba(226,232,240,0.95);
    padding: 14px 14px;
    box-shadow:
        0 18px 55px rgba(0,0,0,0.55),
        0 0 0 1px rgba(6,182,212,0.12);

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.5;
    font-size: 13px;

    transform-origin: bottom right;
    animation: bubbleIn 160ms ease-out;
    }

    @keyframes bubbleIn {
    from { opacity: 0; transform: translateY(8px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* little pointer */
    #help-bubble::after {
    content: "";
    position: absolute;
    right: 18px;
    bottom: -8px;
    width: 14px;
    height: 14px;
    background: rgba(2,6,23,0.88);
    border-right: 1px solid rgba(6,182,212,0.25);
    border-bottom: 1px solid rgba(6,182,212,0.25);
    transform: rotate(45deg);
    }
</style>

<!-- Teacher Overlay -->
<div id="teacher-overlay">
  <div class="teacher-card">
    <div class="teacher-header">
      <div>
        <h2 id="teacher-title"></h2>
      </div>
      <div class="teacher-chip">
        <span class="teacher-dot"></span>
        <span>BRIEFING ONLINE</span>
      </div>
    </div>
    <div class="teacher-body">
      <p id="teacher-msg"></p>
    </div>
    <div class="teacher-footer">
      <button onclick="dismissTeacher()" class="teacher-btn">
        Start Training
      </button>
    </div>
  </div>
</div>

<!-- Persistent Global Icon -->
<div id="help-bubble"></div>
<div id="help-bot-icon" onclick="toggleHint()">🤖</div>

<script>
    // CONTENT BY RISHABH | LOGIC BY ANIKA
    const teacherData = {
        1: {
            title: "Stop 1: Training",
            msg: "Stop 1 briefing: Robot Code Basics. Objective: Learn how to give step-by-step commands to move through the maze (MOVE_FORWARD, ROTATE_LEFT/RIGHT) and use CAN_MOVE(direction) to avoid walls. Run your solution, observe what happens, and iterate until the robot reaches the goal.",
            // Each question at this stop has a unique hint
            hints: [
                "Hint for Question 1: Think about basic directional commands!",
                "Hint for Question 2: Moving the robot requires precise steps.",
                "Hint for Question 3: Final check! Review your robot's path."
            ]
        },
        2: {
            title: "Stop 2: Training",
            msg: "Stop 2 briefing: Pseudocode (AP CSP style). Objective: Write clear, College Board–level pseudocode that makes the algorithm work as intended using variables, conditionals, and logical flow. Test your logic in the code runner—small changes in order and conditions can change the outcome.",
            hints: [
                "Hint for Question 1: Pseudo code doesn't need semicolons!",
                "Hint for Question 2: What command draws a circle?",
                "Hint for Question 3: Review the parameters inside the brackets."
            ]
        }
        // Cyrus: Add Stops 3, 4, 5 following this same structure
    };

    let currentStopId = 1;
    let currentQuestionIdx = 0;

    function formatBriefingText(raw) {
        // Escape HTML first (prevents accidental markup injection)
        const escape = (s) =>
            s.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        let text = escape(raw);

        // Turn newlines into <br> if you ever add them
        text = text.replace(/\n/g, "<br>");

        // Highlight code-like tokens:
        // 1) ALL_CAPS_WITH_UNDERSCORES
        text = text.replace(/\b[A-Z]{2,}(?:_[A-Z0-9]+)+\b/g, (m) => `<span class="code-pill">${m}</span>`);

        // 2) FUNCTION_LIKE(direction) patterns such as CAN_MOVE(direction)
        text = text.replace(/\b[A-Z_]{2,}\([^)]+\)/g, (m) => `<span class="code-pill">${m}</span>`);

        // Make "Objective:" look like a labeled row
        const objectiveMatch = text.match(/Objective:\s*(.*)$/i);
        if (objectiveMatch) {
            const objective = objectiveMatch[1];
            // Everything before Objective:
            const before = text.split(/Objective:\s*/i)[0].trim();

            return `
            <div class="briefing-wrap">
                ${before ? `<div class="briefing-text">${before}</div>` : ""}
                <div class="briefing-row">
                <div class="briefing-label">Objective</div>
                <div class="briefing-text">${objective}</div>
                </div>
            </div>
            `;
        }

        // Default: just return styled text
        return `<div class="briefing-wrap"><div class="briefing-text">${text}</div></div>`;
        }

    function initTeacher(stopId, qIdx = 0) {
        currentStopId = stopId;
        currentQuestionIdx = qIdx;
        const data = teacherData[stopId] || {title: `Stop ${stopId}`, msg: "Ready for the next challenge?", hints: ["Keep going!", "You got this!", "Almost done!"]};
        
        // Update Overlay
        document.getElementById('teacher-title').innerText = data.title;
        document.getElementById('teacher-msg').innerHTML = formatBriefingText(data.msg);
        
        // Update Hint Bubble for the current question
        document.getElementById('help-bubble').innerText = data.hints[qIdx] || "Look closely at the code!";
        
        document.getElementById('teacher-overlay').style.display = 'flex';
    }

    function updateHint(qIdx) {
        currentQuestionIdx = qIdx;
        const data = teacherData[currentStopId];
        if (data && data.hints) {
            document.getElementById('help-bubble').innerText = data.hints[qIdx] || "Keep trying!";
        }
    }

    function dismissTeacher() {
        document.getElementById('teacher-overlay').style.display = 'none';
    }

    function toggleHint() {
        const bubble = document.getElementById('help-bubble');
        bubble.style.display = (bubble.style.display === 'none' || bubble.style.display === '') ? 'block' : 'none';
    }
</script>