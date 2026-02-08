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

    .video-panel {
        margin: 18px 0 16px;
        padding: 14px;
        border-radius: 12px;
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid rgba(59, 130, 246, 0.35);
        text-align: left;
    }

    .video-header {
        color: #93c5fd;
        font-weight: 600;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        margin-bottom: 10px;
        font-family: 'Segoe UI', sans-serif;
    }

    .video-frame {
        background: rgba(2, 6, 23, 0.7);
        border-radius: 10px;
        padding: 14px;
        min-height: 110px;
        color: #e2e8f0;
        font-size: 14px;
        line-height: 1.5;
        font-family: 'Segoe UI', sans-serif;
        border: 1px solid rgba(59, 130, 246, 0.2);
    }

    .video-player {
        width: 100%;
        border-radius: 10px;
        margin-bottom: 10px;
        border: 1px solid rgba(59, 130, 246, 0.35);
        background: rgba(2, 6, 23, 0.7);
    }

    .video-status {
        color: #cbd5f5;
        font-size: 12px;
        margin-bottom: 10px;
        font-family: 'Segoe UI', sans-serif;
    }

    .video-controls {
        display: flex;
        gap: 8px;
        margin-top: 10px;
    }

    .video-controls button {
        flex: 1;
        padding: 8px 10px;
        background: #1e40af;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
    }

    .video-controls button:hover { background: #1d4ed8; }

    .progress-bar {
        margin-top: 10px;
        height: 6px;
        background: rgba(148, 163, 184, 0.25);
        border-radius: 999px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #3b82f6, #60a5fa);
        transition: width 0.25s ease;
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
        <div class="video-panel">
            <div class="video-header">Step-by-step Video</div>
            <div id="video-status" class="video-status">Generating video...</div>
            <video id="teacher-video" class="video-player" controls playsinline muted></video>
            <div id="video-step-text" class="video-frame">Loading steps...</div>
            <div class="video-controls">
                <button id="video-play" onclick="toggleVideo()">Play</button>
                <button onclick="prevStep()">Prev</button>
                <button onclick="nextStep()">Next</button>
            </div>
            <div class="progress-bar">
                <div id="video-progress" class="progress-fill"></div>
            </div>
        </div>
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
            msg: "Robot Code: Robot code is a pseudocode-style language with four commands—MOVE_FORWARD(), ROTATE_LEFT(), ROTATE_RIGHT(), and CAN_MOVE(direction)—used to control a robot through a maze. Pseudocode: Use plain-language, step-by-step logic (variables, conditionals, loops, and logical flow) to describe how your algorithm should work before worrying about strict programming syntax. Computational thinking: break the problem into small rules, test your logic, and iterate based on what you observe.",
            // Each question at this stop has a unique hint
            hints: [
                "Hint for Question 1: Think about basic directional commands!",
                "Hint for Question 2: Moving the robot requires precise steps.",
                "Hint for Question 3: Final check! Review your robot's path."
            ],
            videoSteps: [
                "Step 1 — Identify the goal: describe what the robot must accomplish in the maze using plain language.",
                "Step 2 — Pick commands: list MOVE_FORWARD(), ROTATE_LEFT(), ROTATE_RIGHT(), and CAN_MOVE(direction).",
                "Step 3 — Draft pseudocode: write each movement as a short, ordered line.",
                "Step 4 — Explain the logic: say why each move is needed and test one step at a time."
            ]
        },
        2: {
            title: "Stop 2: Training",
            msg: "Robot Code: Use simple, readable command blocks to control the robot and debug one movement decision at a time. Pseudocode: In the code runner, write College Board–level pseudocode solutions (conditionals, variables, algorithm development, and logical flow) and notice how different logical choices change the program’s behavior as you progress through the maze. Computational thinking: practice structured problem-solving by tracing steps, checking edge cases, and improving your solution until it works.",
            hints: [
                "Hint for Question 1: Pseudo code doesn't need semicolons!",
                "Hint for Question 2: What command draws a circle?",
                "Hint for Question 3: Review the parameters inside the brackets."
            ],
            videoSteps: [
                "Step 1 — Write a clean outline: start with INPUT/OUTPUT and the first action.",
                "Step 2 — Add a condition: use IF/ELSE to choose the next move.",
                "Step 3 — Track a variable: store direction or steps to make decisions consistent.",
                "Step 4 — Debug aloud: explain each branch and adjust the logic when it fails."
            ]
        },
        3: {
            title: "Stop 3: Training",
            msg: "Robot Code: Combine multiple commands (MOVE_FORWARD, TURN_LEFT, TURN_RIGHT) to navigate complex paths and use CAN_MOVE(direction) to check for obstacles before moving. Pseudocode: Apply variables and assignment operators to store values, then use conditional statements (IF-ELSE) to make decisions based on those values in your College Board–style solutions. Computational thinking: identify patterns in the maze, create reusable logic blocks, and test your algorithm with different scenarios to ensure it handles all possible paths.",
            hints: [
                
            ],
            videoSteps: [
                "Step 1 — Spot a pattern: find a repeated movement sequence.",
                "Step 2 — Create a block: group those commands into a reusable chunk.",
                "Step 3 — Guard with CAN_MOVE(): check the path before each move.",
                "Step 4 — Explain the choice: narrate why each branch is safe."
            ]
        },
        4: {
            title: "Stop 4: Training",
            msg: "Robot Code: Master complex navigation by chaining conditional checks with CAN_MOVE() and creating efficient movement sequences. Pseudocode: Implement loops (REPEAT and REPEAT UNTIL) to avoid repetitive code, and combine them with conditionals to create dynamic algorithms that adapt to changing conditions. Computational thinking: analyze the problem systematically, decompose it into smaller sub-problems, and optimize your solution by reducing redundant steps while maintaining correctness.",
            hints: [
                
            ],
            videoSteps: [
                "Step 1 — Add a loop: REPEAT a block instead of duplicating lines.",
                "Step 2 — Mix with IF: decide inside the loop when to turn.",
                "Step 3 — Use REPEAT UNTIL: stop when the goal condition is true.",
                "Step 4 — Explain efficiency: show how fewer lines do more work."
            ]
        },
        5: {
            title: "Stop 5: Training",
            msg: "Robot Code: Apply all four commands strategically to solve the most challenging maze configurations, planning your entire route before executing. Pseudocode: Create comprehensive algorithms using variables, conditionals, loops, and logical operators (AND, OR, NOT) that mirror real AP CSP exam questions. Computational thinking: demonstrate mastery by developing efficient, elegant solutions that show deep understanding of algorithm design, abstraction, and the relationship between pseudocode logic and actual program execution.",
            hints: [
               
            ],
            videoSteps: [
                "Step 1 — Plan the full route: outline the algorithm at a high level.",
                "Step 2 — Add logic operators: AND/OR/NOT for complex decisions.",
                "Step 3 — Validate edge cases: explain how the code handles dead ends.",
                "Step 4 — Refactor: shorten the solution without changing behavior."
            ]
        }
    };

    let currentStopId = 1;
    let currentQuestionIdx = 0;
    let currentStepIdx = 0;
    let videoTimer = null;
    const videoIntervalMs = 4500;
    let videoRecorder = null;
    let videoGenerationTimer = null;
    let videoStream = null;
    let videoCanvas = null;
    let videoObjectUrl = null;
    const stepVideoMs = 2600;

    function initTeacher(stopId, qIdx = 0) {
        currentStopId = stopId;
        currentQuestionIdx = qIdx;
        const data = teacherData[stopId] || {title: `Stop ${stopId}`, msg: "Ready for the next challenge?", hints: ["Keep going!", "You got this!", "Almost done!"]};
        
        // Update Overlay
        document.getElementById('teacher-title').innerText = data.title;
        document.getElementById('teacher-msg').innerText = data.msg;
        
        // Update Hint Bubble for the current question
        document.getElementById('help-bubble').innerText = data.hints[qIdx] || "Look closely at the code!";

        loadVideoSteps(data.videoSteps || [
            "Step 1 — Read the problem and restate it in simple words.",
            "Step 2 — Draft the pseudocode in short, ordered lines.",
            "Step 3 — Explain each line and why it exists.",
            "Step 4 — Test with a small example and refine."
        ]);
        
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
        stopVideo();
        stopGeneratedVideo();
    }

    function toggleHint() {
        const bubble = document.getElementById('help-bubble');
        bubble.style.display = (bubble.style.display === 'none' || bubble.style.display === '') ? 'block' : 'none';
    }

    function loadVideoSteps(steps) {
        currentStepIdx = 0;
        window.currentVideoSteps = steps;
        renderStep();
        stopVideo();
        generateStepVideo(steps);
    }

    function renderStep() {
        const steps = window.currentVideoSteps || [];
        const stepText = steps[currentStepIdx] || "No steps available.";
        document.getElementById('video-step-text').innerText = stepText;
        updateProgress();
    }

    function updateProgress() {
        const steps = window.currentVideoSteps || [];
        const progress = steps.length > 1 ? (currentStepIdx / (steps.length - 1)) * 100 : 0;
        document.getElementById('video-progress').style.width = `${progress}%`;
    }

    function nextStep() {
        const steps = window.currentVideoSteps || [];
        if (!steps.length) return;
        currentStepIdx = (currentStepIdx + 1) % steps.length;
        renderStep();
    }

    function prevStep() {
        const steps = window.currentVideoSteps || [];
        if (!steps.length) return;
        currentStepIdx = (currentStepIdx - 1 + steps.length) % steps.length;
        renderStep();
    }

    function toggleVideo() {
        const playBtn = document.getElementById('video-play');
        if (videoTimer) {
            stopVideo();
            playBtn.innerText = 'Play';
        } else {
            playBtn.innerText = 'Pause';
            videoTimer = setInterval(nextStep, videoIntervalMs);
        }
    }

    function stopVideo() {
        const playBtn = document.getElementById('video-play');
        if (videoTimer) {
            clearInterval(videoTimer);
            videoTimer = null;
        }
        if (playBtn) {
            playBtn.innerText = 'Play';
        }
    }

    function stopGeneratedVideo() {
        if (videoGenerationTimer) {
            clearTimeout(videoGenerationTimer);
            videoGenerationTimer = null;
        }
        if (videoRecorder && videoRecorder.state !== 'inactive') {
            videoRecorder.stop();
        }
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            videoStream = null;
        }
        const videoEl = document.getElementById('teacher-video');
        if (videoEl && videoEl.srcObject) {
            videoEl.srcObject = null;
        }
        if (videoObjectUrl) {
            URL.revokeObjectURL(videoObjectUrl);
            videoObjectUrl = null;
        }
    }

    function generateStepVideo(steps) {
        const statusEl = document.getElementById('video-status');
        const videoEl = document.getElementById('teacher-video');

        if (!HTMLCanvasElement.prototype.captureStream) {
            statusEl.innerText = 'Video not supported in this browser.';
            return;
        }

        stopGeneratedVideo();

        statusEl.innerText = 'Generating video...';
        videoEl.removeAttribute('src');
        videoEl.load();

        videoCanvas = document.createElement('canvas');
        videoCanvas.width = 640;
        videoCanvas.height = 360;
        const ctx = videoCanvas.getContext('2d');

        function wrapText(text, x, y, maxWidth, lineHeight) {
            const words = text.split(' ');
            let line = '';
            let currentY = y;
            for (let i = 0; i < words.length; i++) {
                const testLine = `${line}${words[i]} `;
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && i > 0) {
                    ctx.fillText(line, x, currentY);
                    line = `${words[i]} `;
                    currentY += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, x, currentY);
        }

        function drawFrame(stepIdx) {
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, videoCanvas.width, videoCanvas.height);

            ctx.fillStyle = '#60a5fa';
            ctx.font = '700 20px Segoe UI, sans-serif';
            ctx.fillText('Game Teacher — Step-by-step', 24, 40);

            ctx.fillStyle = '#e2e8f0';
            ctx.font = '600 16px Segoe UI, sans-serif';
            ctx.fillText(`Step ${stepIdx + 1} of ${steps.length}`, 24, 72);

            ctx.fillStyle = '#e2e8f0';
            ctx.font = '500 16px Segoe UI, sans-serif';
            wrapText(steps[stepIdx] || 'No steps available.', 24, 120, 592, 24);

            const progress = steps.length > 1 ? (stepIdx / (steps.length - 1)) : 0;
            ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
            ctx.fillRect(24, 310, 592, 10);
            ctx.fillStyle = '#3b82f6';
            ctx.fillRect(24, 310, 592 * progress, 10);
        }

        drawFrame(0);
        videoStream = videoCanvas.captureStream(30);

        if (window.MediaRecorder) {
            let mimeType = 'video/webm;codecs=vp9';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/webm;codecs=vp8';
            }
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/webm';
            }

            const chunks = [];
            videoRecorder = new MediaRecorder(videoStream, { mimeType });
            videoRecorder.ondataavailable = event => {
                if (event.data && event.data.size > 0) {
                    chunks.push(event.data);
                }
            };
            videoRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: mimeType });
                videoObjectUrl = URL.createObjectURL(blob);
                videoEl.src = videoObjectUrl;
                statusEl.innerText = 'Video ready.';
            };

            videoRecorder.start();
        } else {
            videoEl.srcObject = videoStream;
            videoEl.muted = true;
            videoEl.play().catch(() => {});
            statusEl.innerText = 'Live preview (recording unsupported).';
        }

        let stepIdx = 0;
        const stepInterval = setInterval(() => {
            stepIdx += 1;
            if (stepIdx >= steps.length) {
                clearInterval(stepInterval);
                return;
            }
            drawFrame(stepIdx);
        }, stepVideoMs);

        const totalDuration = Math.max(steps.length, 1) * stepVideoMs + 500;
        videoGenerationTimer = setTimeout(() => {
            clearInterval(stepInterval);
            if (videoRecorder && videoRecorder.state !== 'inactive') {
                videoRecorder.stop();
            }
        }, totalDuration);
    }
</script>