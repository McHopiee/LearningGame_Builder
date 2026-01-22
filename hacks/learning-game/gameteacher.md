---
layout: base
title: Game Teacher Module
authors: Anika, Rishabh, Cyrus
permalink: /learninggame/gameteacher
---

<style>
    /* UI DESIGN BY ANIKA - Positioned to the entire screen */
    #teacher-overlay {
        display: none; 
        position: fixed; /* Fixed to viewport */
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 14, 39, 0.95);
        z-index: 2000;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(10px);
    }

    .teacher-card {
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        border: 2px solid #3b82f6;
        border-radius: 15px;
        padding: 30px;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 0 40px rgba(59, 130, 246, 0.4);
    }

    /* Fixed to bottom right of the entire browser window */
    #help-bot-icon {
        position: fixed; 
        bottom: 30px;
        right: 30px;
        width: 65px;
        height: 65px;
        background: #3b82f6;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 3000;
        box-shadow: 0 0 25px rgba(59, 130, 246, 0.6);
        transition: 0.3s;
        font-size: 30px;
    }

    #help-bot-icon:hover { transform: scale(1.1) rotate(10deg); }

    #help-bubble {
        display: none;
        position: fixed;
        bottom: 110px;
        right: 30px;
        background: white;
        color: #0f172a;
        padding: 15px;
        border-radius: 12px;
        max-width: 250px;
        z-index: 3000;
        border: 2px solid #3b82f6;
        box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        font-family: sans-serif;
        line-height: 1.4;
    }
</style>

<!-- Teacher Overlay -->
<div id="teacher-overlay">
    <div class="teacher-card">
        <h2 id="teacher-title" style="color: #60a5fa; margin-bottom: 15px; font-family: 'Segoe UI', sans-serif;"></h2>
        <p id="teacher-msg" style="color: white; line-height: 1.6; margin-bottom: 20px; font-family: 'Segoe UI', sans-serif;"></p>
        <button onclick="dismissTeacher()" style="padding: 12px 25px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; text-transform: uppercase;">Start Training</button>
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
            msg: "Stop 1 briefing: Robot Code Basics. Objective: learn how to give step-by-step commands to move through the maze (MOVE_FORWARD, ROTATE_LEFT/RIGHT) and use CAN_MOVE(direction) to avoid walls. Run your solution, observe what happens, and iterate until the robot reaches the goal.",
            // Each question at this stop has a unique hint
            hints: [
                "Hint for Question 1: Think about basic directional commands!",
                "Hint for Question 2: Moving the robot requires precise steps.",
                "Hint for Question 3: Final check! Review your robot's path."
            ]
        },
        2: {
            title: "Stop 2: Training",
            msg: "Stop 2 briefing: Pseudocode (AP CSP style). Objective: write clear, College Board–level pseudocode that makes the algorithm work as intended using variables, conditionals, and logical flow. Test your logic in the code runner—small changes in order and conditions can change the outcome.",
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

    function initTeacher(stopId, qIdx = 0) {
        currentStopId = stopId;
        currentQuestionIdx = qIdx;
        const data = teacherData[stopId] || {title: `Stop ${stopId}`, msg: "Ready for the next challenge?", hints: ["Keep going!", "You got this!", "Almost done!"]};
        
        // Update Overlay
        document.getElementById('teacher-title').innerText = data.title;
        document.getElementById('teacher-msg').innerText = data.msg;
        
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