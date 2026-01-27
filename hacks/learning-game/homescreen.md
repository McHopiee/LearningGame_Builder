---
layout: default
title: Maze - Homescreen
authors: Anika, Cyrus, Rishabh, Jaynee, Lillian
permalink: /learninggame/home
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Station Navigation</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
         body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%);
            height: 100vh;
            width: 100vw;
            display: flex; 
            justify-content: center; /* Center the container horizontally */
            align-items: center;     /* Center the container vertically */
            overflow: hidden;
            position: relative;
        }

        /* Animated stars background */
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }

        .stars { position: fixed; inset: 0; overflow: hidden; z-index: 0; }
        .star { position: absolute; width: 2px; height: 2px; background: white; border-radius: 50%; animation: twinkle 3s infinite; }


         /* Ambient glow effects */
        body::before {
            content: '';
            position: fixed;
            top: 10%; left: 10%;
            width: 500px; height: 500px;
            background: radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%);
            filter: blur(80px);
            z-index: 0;
        }

        body::after {
            content: '';
            position: fixed;
            bottom: 10%; right: 10%;
            width: 500px; height: 500px;
            background: radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%);
            filter: blur(80px);
            z-index: 0;
        }

          .container {
            position: relative; 
            width: 90vw;
            max-width: 850px;
            height: 85vh;
            max-height: 750px;
            background: rgba(15, 23, 42, 0.85); 
            backdrop-filter: blur(20px);
            border-radius: 24px; 
            border: 2px solid rgba(6,182,212,0.4);
            box-shadow: 0 0 60px rgba(6,182,212,0.25); 
            overflow: hidden;
            z-index: 1;
            /* Flex column ensures header is on top and maze is below */
            display: flex; 
            flex-direction: column;
        }

        .title-section {
            position: relative;
            width: 100%;
            background: linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95));
            backdrop-filter: blur(10px);
            padding: 20px;
            border-bottom: 2px solid rgba(6,182,212,0.3);
            z-index: 50;
            flex-shrink: 0;
        }

        .title-header { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px; }
        .title { color: #06b6d4; font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: 4px; }
        .subtitle { text-align: center; color: rgba(103,232,249,0.7); font-size: 12px; font-family: 'Courier New', monospace; }

          .maze-container {
            flex-grow: 1; /* Takes up all remaining space below header */
            width: 100%; 
            display: flex; 
            flex-direction: column;
            justify-content: center; /* Centering the maze inside */
            align-items: center;
            padding: 20px;
        }

        .maze {
            width: 100%;
            max-width: 750px;
            height: 100%;
            max-height: 500px;
            background: rgba(2, 6, 23, 0.5);
            backdrop-filter: blur(10px);
            border-radius: 20px; 
            border: 2px solid rgba(16,185,129,0.4);
            box-shadow: inset 0 0 30px rgba(16,185,129,0.1);
            display: grid; 
            grid-template-columns: repeat(15, 1fr); 
            grid-template-rows: repeat(11, 1fr);
            padding: 8px;
            gap: 2px;
            margin: 0 auto; /* Extra insurance for horizontal centering */
        }

        .cell { border: 1px solid rgba(6,182,212,0.08); border-radius: 2px; }
         .wall { 
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        }

        .path { background: rgba(30, 41, 59, 0.3); }
        .player {
            background: radial-gradient(circle, #06b6d4 0%, #3b82f6 100%);
            border-radius: 50%; 
            box-shadow: 0 0 20px rgba(6,182,212,0.8);
            position: relative; 
            z-index: 20;
            animation: playerPulse 1.5s infinite;
            /* Use percentages to keep it centered in the cell */
            width: 80%;
            height: 80%;
            margin: 10%;
        }
        .sector {
            background: linear-gradient(135deg, rgba(251,191,36,0.3) 0%, rgba(217,119,6,0.3) 100%);
            border-radius: 50%; 
            display: flex; 
            justify-content: center; 
            align-items: center;
            color: #fbbf24; 
            font-weight: 900; 
            font-size: 12px;
            width: 90%; height: 90%;
            margin: 5%;
            z-index: 10;
            position: relative;
            overflow: hidden;
        }


        .sector::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .completed { background: #10b981 !important; color: white; }

        .start, .end { 
            border-radius: 50%; 
            display: flex; 
            justify-content: center; 
            align-items: center;
            font-size: 12px;
            font-weight: 900;
            width: 90%; height: 90%;
            margin: 5%;
        }

        .start { 
            background: rgba(16,185,129,0.3);
            color: #10b981;
            box-shadow: 0 0 15px rgba(16,185,129,0.5);
        }

        .end { 
            background: rgba(168,85,247,0.3);
            color: #a855f7;
            box-shadow: 0 0 15px rgba(168,85,247,0.5);
        }

        .controls-hint {
            margin-top: 15px;
            text-align: center;
            color: rgba(6,182,212,0.6);
            font-size: 12px;
            font-family: 'Courier New', monospace;
        }

        /* Robot Simulator Specific Styles */
        .robot-sim-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px 0;
        }
        .robot-grid {
            display: grid;
            grid-template-columns: repeat(5, 45px);
            grid-template-rows: repeat(5, 45px);
            gap: 4px;
            background: #0f172a;
            padding: 10px;
            border-radius: 8px;
            border: 2px solid #334155;
        }
        .r-cell {
            width: 45px; height: 45px;
            background: rgba(30, 41, 59, 0.5);
            border-radius: 4px;
            display: flex; align-items: center; justify-content: center;
            font-size: 24px;
        }
        .r-wall { background: #ef4444; border: 1px solid #7f1d1d; }

        /* Modal Overrides */
        .question-modal {
            display: none;
            position: absolute;
            inset: 0;
            z-index: 100;
            justify-content: center;
            align-items: center;

            /* high-tech dark glass */
            background:
                radial-gradient(circle at 30% 20%, rgba(6,182,212,0.12), transparent 55%),
                radial-gradient(circle at 70% 80%, rgba(168,85,247,0.10), transparent 55%),
                rgba(2, 6, 23, 0.92);

            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
        }

        .question-modal.active { display: flex; }

        /* Modal shell */
        .question-card {
            width: min(720px, 92vw);
            max-height: min(82vh, 760px);
            overflow: hidden;

            border-radius: 22px;
            border: 1px solid rgba(6,182,212,0.35);
            background: linear-gradient(180deg, rgba(15,23,42,0.92), rgba(2,6,23,0.92));
            box-shadow:
                0 0 0 1px rgba(6,182,212,0.15),
                0 30px 90px rgba(0,0,0,0.55),
                0 0 55px rgba(6,182,212,0.18);

            position: relative;
            transform: translateY(8px) scale(0.99);
            opacity: 0;
            animation: modalIn 220ms ease-out forwards;
        }

        @keyframes modalIn {
            to { transform: translateY(0) scale(1); opacity: 1; }
        }

        /* Subtle grid overlay for “tech” feel */
        .question-card::before {
            content: "";
            position: absolute;
            inset: 0;
            background:
                linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
            background-size: 26px 26px;
            opacity: 0.35;
            pointer-events: none;
        }

        /* Top glow accent */
        .question-card::after {
            content: "";
            position: absolute;
            left: 10%;
            top: -40px;
            width: 80%;
            height: 80px;
            background: radial-gradient(circle, rgba(6,182,212,0.25), transparent 65%);
            filter: blur(10px);
            pointer-events: none;
        }

        /* Header area */
        .modal-header {
            position: relative;
            z-index: 1;
            padding: 18px 20px 14px;
            border-bottom: 1px solid rgba(148,163,184,0.18);
            background: linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.75));
        }

        .modal-header-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
        }

        .badge-wrap {
            display: flex;
            align-items: center;
            gap: 14px;
            min-width: 0;
        }

        .sector-badge {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            display: grid;
            place-items: center;
            font-weight: 900;
            letter-spacing: 0.5px;

            color: #06121a;
            background: linear-gradient(135deg, rgba(251,191,36,1), rgba(245,158,11,1));
            box-shadow: 0 0 0 1px rgba(251,191,36,0.35), 0 10px 25px rgba(251,191,36,0.18);
        }

        .modal-titles { min-width: 0; }

        .modal-title {
            margin: 0;
            color: #67e8f9;
            font-size: 18px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2.2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .modal-subtitle {
            margin-top: 4px;
            color: rgba(148,163,184,0.85);
            font-family: 'Courier New', monospace;
            font-size: 12px;
        }

        /* Header “status chip” (optional, but looks nice) */
        .status-chip {
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
        .status-dot {
            width: 8px; height: 8px;
            border-radius: 50%;
            background: #06b6d4;
            box-shadow: 0 0 10px rgba(6,182,212,0.65);
        }

        /* Body */
        .modal-body {
            position: relative;
            z-index: 1;
            padding: 18px 20px 16px;
            overflow: auto;
            max-height: calc(min(82vh, 760px) - 140px);
        }

        /* Feedback */
        #feedback {
            margin-top: 12px;
            font-weight: 800;
            text-align: center;
            min-height: 20px;
        }

        /* Footer */
        .modal-footer {
            position: relative;
            z-index: 1;
            padding: 14px 20px 18px;
            border-top: 1px solid rgba(148,163,184,0.18);
            background: rgba(2,6,23,0.55);
        }

        .modal-actions {
            display: flex;
            gap: 10px;
        }

        /* Buttons (unify look) */
        .btn {
            border: none;
            border-radius: 14px;
            padding: 12px 14px;
            font-weight: 900;
            letter-spacing: 0.4px;
            cursor: pointer;
            transition: transform 140ms ease, box-shadow 140ms ease, opacity 140ms ease;
        }

        .btn:active { transform: translateY(1px) scale(0.99); }

        .btn-next {
            flex: 1;
            color: #06121a;
            background: linear-gradient(135deg, #06b6d4, #3b82f6);
            box-shadow: 0 12px 30px rgba(6,182,212,0.18);
        }

        .btn-next:hover { box-shadow: 0 16px 40px rgba(6,182,212,0.24); }

        .btn-complete {
            flex: 1;
            color: #052012;
            background: linear-gradient(135deg, #10b981, #22c55e);
            box-shadow: 0 12px 30px rgba(16,185,129,0.18);
        }

        .btn-complete:hover { box-shadow: 0 16px 40px rgba(16,185,129,0.24); }

        .btn-check {
            width: 100%;
            color: #06121a;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            box-shadow: 0 12px 30px rgba(251,191,36,0.16);
            }
        .btn-check:hover { box-shadow: 0 16px 40px rgba(251,191,36,0.22); }


        /* Textareas inside modal (polished) */
        .question-card textarea {
            width: 100%;
            background: rgba(2, 6, 23, 0.9);
            color: #67e8f9;
            border: 1px solid rgba(6,182,212,0.35);
            border-radius: 14px;
            padding: 12px 12px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            outline: none;
            box-shadow: inset 0 0 0 1px rgba(2,6,23,0.35);
        }

        .question-card textarea:focus {
            border-color: rgba(6,182,212,0.65);
            box-shadow: 0 0 0 3px rgba(6,182,212,0.18);
        }

        /* Robot grid + code output panel polish (optional but matches theme) */
        .robot-grid {
            border: 1px solid rgba(148,163,184,0.2);
            background: rgba(2,6,23,0.75);
        }

        #pcOutput {
            border-radius: 14px !important;
            background: rgba(2,6,23,0.75) !important;
            border: 1px solid rgba(148,163,184,0.18) !important;
        }
    </style>
</head>
<body>
    <div class="stars" id="stars"></div>

    <div class="container">
        <div class="title-section">
            <div class="title-header">
                <div class="title-icon">🚀</div>
                <div class="title">Station Navigation</div>
            </div>
            <div class="subtitle">Cadet Training Protocol // Sector Clearance Required</div>
        </div>

        <div class="maze-container">
            <div class="maze" id="maze"></div>
            <div class="controls-hint">Use arrow keys to navigate • Reach sector checkpoints</div>
        </div>

        <!-- Question Modal -->
        <div class="question-modal" id="questionModal">
            <div class="question-card">
                <div class="modal-header">
                <div class="modal-header-row">
                    <div class="badge-wrap">
                    <div class="sector-badge" id="sectorBadge">1</div>
                    <div class="modal-titles">
                        <h2 class="modal-title" id="mTitle">Sector 1</h2>
                        <p class="modal-subtitle" id="mSubtitle">Navigation Task</p>
                    </div>
                    </div>

                    <div class="status-chip">
                    <span class="status-dot"></span>
                    <span>SECURE SESSION</span>
                    </div>
                </div>
                </div>

                <div class="modal-body">
                <div id="moduleContent">
                    <!-- Dynamic Module Content -->
                </div>

                <div id="feedback"></div>
                </div>

                <div class="modal-footer">
                <div class="modal-actions">
                    <button class="btn btn-next" id="nextBtn">Next Module →</button>
                    <button class="btn btn-complete" id="backBtn" style="display:none;">Complete Sector ✓</button>
                </div>
                </div>
            </div>
            </div>
    </div>

   {% capture teacher_raw %}{% include_relative gameteacher.md %}{% endcapture %}
    {% assign parts = teacher_raw | split: '---' %}
    {{ parts | slice: 2, parts.size | join: '---' }}

    <script>
        // Star Field
        const starsContainer = document.getElementById('stars');
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            starsContainer.appendChild(star);
        }

        const maze = document.getElementById('maze');
        const modal = document.getElementById('questionModal');
        const mContent = document.getElementById('moduleContent');
        const feedback = document.getElementById('feedback');
        const nextBtn = document.getElementById('nextBtn');
        const backBtn = document.getElementById('backBtn');
        // ===== Progress Lock System (ADD) =====
        const sectorProgress = {}; // { sectorNum: { passed: [bool,bool,bool] } }

        function ensureSector(sectorNum) {
            if (!sectorProgress[sectorNum]) {
                sectorProgress[sectorNum] = { passed: [false, false, false] }; // 3 modules
            }
            return sectorProgress[sectorNum];
        }

        function isModulePassed(sectorNum, moduleIndex) {
            return ensureSector(sectorNum).passed[moduleIndex] === true;
        }

        function setModulePassed(sectorNum, moduleIndex, passed) {
            ensureSector(sectorNum).passed[moduleIndex] = passed === true;
            updateNavButtons();
        }

        function updateNavButtons() {
            if (!currentSectorNum) return;

            const p = ensureSector(currentSectorNum).passed;

            // NEXT only appears if current module is passed and there is a next module
            if (currentQuestion < 2 && p[currentQuestion]) {
                nextBtn.style.display = 'block';
                nextBtn.disabled = false;
                nextBtn.style.opacity = "1";
                nextBtn.style.cursor = "pointer";
            } else {
                nextBtn.style.display = currentQuestion < 2 ? 'block' : 'none';
                nextBtn.disabled = true;
                nextBtn.style.opacity = "0.5";
                nextBtn.style.cursor = "not-allowed";
            }

            // COMPLETE only appears on last module and only if last module passed
            if (currentQuestion === 2 && p[2]) {
                backBtn.style.display = 'block';
                backBtn.disabled = false;
                backBtn.style.opacity = "1";
                backBtn.style.cursor = "pointer";
            } else {
                backBtn.style.display = currentQuestion === 2 ? 'block' : 'none';
                backBtn.disabled = true;
                backBtn.style.opacity = "0.5";
                backBtn.style.cursor = "not-allowed";
            }
        }
        // ===== End Progress Lock System =====


        let currentQuestion = 0;
        let currentSectorNum = 0;
        const completedSectors = new Set();

        const mazeLayout = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[2,1,0,1,4,1,0,1,5,1,0,1,6,1,1],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,1,1,7,1,0,1,1,1,1,1,1,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,1,1,1,1,1,1,8,1,0,1,1,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,3],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ];

        let playerPos = { x: 0, y: 1 };

        // Simulator Configs
        const robotLevels = {
            1: { start: [0,0], goal: [4,4], walls: [[1,1],[1,2],[3,3]] },
            2: { start: [0,4], goal: [4,0], walls: [[2,0],[2,1],[2,2],[2,3]] },
            3: { start: [2,0], goal: [2,4], walls: [[1,2],[2,2],[3,2]] },
            4: { start: [0,0], goal: [4,0], walls: [[0,1],[1,1],[2,1],[3,1]] },
            5: { start: [0,2], goal: [4,2], walls: [[2,1],[2,2],[2,3]] }
        };

        function createMaze() {
            maze.innerHTML = '';
            mazeLayout.forEach((row, y) => {
                row.forEach((val, x) => {
                    const cell = document.createElement('div');
                    cell.className = 'cell ' + (val === 0 ? 'wall' : 'path');
                    if (val === 2) { cell.textContent = 'S'; cell.classList.add('path', 'start'); }
                    if (val === 3) { cell.textContent = 'E'; cell.classList.add('path', 'end'); }
                    if (val >= 4 && val <= 8) {
                        const sNum = val - 3;
                        cell.classList.add('sector');
                        if (completedSectors.has(sNum)) cell.classList.add('completed');
                        cell.textContent = sNum;
                    }
                    if (x === playerPos.x && y === playerPos.y) {
                        const p = document.createElement('div'); p.className = 'player';
                        cell.appendChild(p);
                    }
                    maze.appendChild(cell);
                });
            });
        }

        function showQuestion() {
            ensureSector(currentSectorNum);

            document.getElementById('sectorBadge').textContent = currentSectorNum;
            document.getElementById('mTitle').textContent = `Sector ${currentSectorNum}`;
            feedback.textContent = '';

            // Render module
            if (currentQuestion === 0) {
                renderRobotSim();
            } else if (currentQuestion === 1) {
                renderPseudoCode();
            } else {
                renderMCQ();
            }

            // Buttons should reflect lock state for this module
            updateNavButtons();
        }


        function renderRobotSim() {
            const level = robotLevels[currentSectorNum];
            mContent.innerHTML = `
                <div class="robot-sim-container">
                    <p style="color: #e2e8f0; margin-bottom: 10px; font-size: 14px;">Task: Program the robot to reach the star. Avoid red obstacles.</p>
                    <div class="robot-grid" id="robotGrid"></div>
                    <textarea id="robotInput">robot.MoveForward();</textarea>
                    <button class="btn btn-check" onclick="runRobotSim()">Check Path</button>
                </div>
            `;
            setModulePassed(currentSectorNum, 0, false);
            updateRobotGrid(level.start, 0);
        }

        function updateRobotGrid(pos, dir) {
            const grid = document.getElementById('robotGrid');
            if (!grid) return;
            grid.innerHTML = '';
            const level = robotLevels[currentSectorNum];
            const icons = ["▶️", "🔽", "◀️", "🔼"];
            for (let y = 0; y < 5; y++) {
                for (let x = 0; x < 5; x++) {
                    const c = document.createElement('div');
                    c.className = 'r-cell';
                    if (level.walls.some(w => w[0] === x && w[1] === y)) c.classList.add('r-wall');
                    if (x === level.goal[0] && y === level.goal[1]) c.textContent = '⭐';
                    if (x === pos[0] && y === pos[1]) c.textContent = icons[dir];
                    grid.appendChild(c);
                }
            }
        }

        window.runRobotSim = async function() {
            const code = document.getElementById('robotInput').value;
            const level = robotLevels[currentSectorNum];
            let pos = [...level.start];
            let dir = 0; // 0:E, 1:S, 2:W, 3:N
            const commands = [];

            const robot = {
                MoveForward: (n = 1) => { for(let i=0; i<n; i++) commands.push('MOVE'); },
                TurnRight: () => commands.push('RIGHT'),
                TurnLeft: () => commands.push('LEFT')
            };

            try {
                eval(code);
                feedback.style.color = "#fbbf24";
                feedback.textContent = "Executing sequence...";
                
                for (const cmd of commands) {
                    await new Promise(r => setTimeout(r, 400));
                    if (cmd === 'MOVE') {
                        if (dir === 0) pos[0]++; else if (dir === 1) pos[1]++; else if (dir === 2) pos[0]--; else pos[1]--;
                    } else if (cmd === 'RIGHT') dir = (dir + 1) % 4;
                    else if (cmd === 'LEFT') dir = (dir + 3) % 4;

                    updateRobotGrid(pos, dir);

                    if (pos[0] < 0 || pos[0] > 4 || pos[1] < 0 || pos[1] > 4 || level.walls.some(w => w[0] === pos[0] && w[1] === pos[1])) {
                        feedback.style.color = "#ef4444";
                        feedback.textContent = "Oops! Robot crashed. Try again.";
                        setModulePassed(currentSectorNum, 0, false);
                        setTimeout(() => updateRobotGrid(level.start, 0), 1000);
                        return;
                    }
                }

                if (pos[0] === level.goal[0] && pos[1] === level.goal[1]) {
                    feedback.style.color = "#10b981";
                    feedback.textContent = "Success! Goal reached. ✅ Module unlocked.";
                    setModulePassed(currentSectorNum, 0, true); // UNLOCK next module
                } else {
                    feedback.style.color = "#ef4444";
                    feedback.textContent = "Oops! Not at the star. Try again.";
                    setModulePassed(currentSectorNum, 0, false);
                    setTimeout(() => updateRobotGrid(level.start, 0), 1000);
                }

            } catch(e) { feedback.textContent = "Syntax Error in code."; }
        };

       function renderPseudoCode() {
            const configs = [
                {
                    text: "Complete the `Average` procedure: calculate the sum then return the mean (sum divided by total count).",
                    template: "function Average(nums) {\n  let sum = 0;\n  for (let n of nums) {\n    sum += n;\n  }\n  // Fill in the blank: Divide sum by the number of items in the list (nums.length)\n  return sum / _________;\n}"
                },
                {
                    text: "Complete `CountAbove`: increment the `count` variable if the number `n` is greater than the threshold `t`.",
                    template: "function CountAbove(nums, t) {\n  let count = 0;\n  for (let n of nums) {\n    if (n > t) {\n      // Fill in the blank: increment count by 1\n      ________ += 1;\n    }\n  }\n  return count;\n}"
                },
                {
                    text: "Complete `MaxValue`: if the current number `n` is greater than `max`, update `max` to be that number.",
                    template: "function MaxValue(nums) {\n  let max = nums[0];\n  for (let n of nums) {\n    if (n > max) {\n      // Fill in the blank below\n      max = ________;\n    }\n  }\n  return max;\n}"
                },
                {
                    text: "Complete `ReplaceAll`: set the current list item `list[i]` to the replacement word `rep`.",
                    template: "function ReplaceAll(list, target, rep) {\n  for (let i = 0; i < list.length; i++) {\n    if (list[i] === target) {\n      // Fill in the blank below\n      list[i] = ________;\n    }\n  }\n  return list;\n}"
                },
                {
                    text: "Complete `GetEvens`: a number is even if the remainder when divided by 2 is 0.",
                    template: "function GetEvens(nums) {\n  let evens = [];\n  for (let n of nums) {\n    // Check if even using modulo (%) \n    if (n % 2 === ________) {\n      evens.push(n);\n    }\n  }\n  return evens;\n}"
                }
            ];

            const currentTask = configs[currentSectorNum - 1];

            mContent.innerHTML = `
                <p style="color: #e2e8f0; margin-bottom:10px; font-size: 14px;">${currentTask.text}</p>
                <textarea id="pcCode" spellcheck="false" style="height: 180px; width: 100%; font-family: monospace; padding: 10px; background: #020617; color: #06b6d4; border: 1px solid #06b6d4; border-radius: 8px;">${currentTask.template}</textarea>
                <button class="btn btn-check" onclick="checkPseudo()" style="background: #fbbf24; color: black; margin-top: 10px; width: 100%; font-weight: 900; padding: 10px; border-radius: 8px; border: none; cursor: pointer;">Validate Logic</button>
                <div id="pcOutput" style="margin-top: 10px; padding: 10px; background: #020617; border: 1px solid #334155; border-radius: 5px; font-family: monospace; font-size: 12px; color: #94a3b8; min-height: 60px; white-space: pre-wrap;">Console output...</div>
            `;
        }

        window.checkPseudo = () => {
            const userCode = document.getElementById('pcCode').value;
            const outputDiv = document.getElementById('pcOutput');
            
            // Testing configurations: input is ALWAYS an array of arguments to be spread
            const testConfigs = [
                { name: "Average", args: [[10, 20, 30, 40]], expected: 25 },
                { name: "CountAbove", args: [[1, 5, 10, 2, 8], 4], expected: 3 },
                { name: "MaxValue", args: [[5, 12, 3, 9]], expected: 12 },
                { name: "ReplaceAll", args: [["apple", "pear", "apple"], "apple", "peach"], expected: ["peach", "pear", "peach"] },
                { name: "GetEvens", args: [[1, 2, 3, 4, 5, 6]], expected: [2, 4, 6] }
            ];

            const task = testConfigs[currentSectorNum - 1];

            try {
                // This converts the string function into a callable object
                const testFunc = eval(`(${userCode})`);
                
                if (typeof testFunc !== 'function') {
                    throw new Error("Invalid function format. Keep the 'function Name(param) { ... }' structure.");
                }

                // Run the user's code with the test arguments
                const result = testFunc(...task.args);
                
                const resStr = JSON.stringify(result);
                const expStr = JSON.stringify(task.expected);

                outputDiv.innerHTML = `> Running tests for ${task.name}...\n> Input: ${JSON.stringify(task.args)}\n> Received: ${resStr}\n> Expected: ${expStr}`;

                if (resStr === expStr) {
                    outputDiv.style.borderColor = "#10b981";
                    feedback.style.color = "#10b981";
                    feedback.textContent = "✅ Logic Passed! Tests successful. Module unlocked.";
                    setModulePassed(currentSectorNum, 1, true);

                } else {
                    outputDiv.style.borderColor = "#ef4444";
                    feedback.style.color = "#ef4444";
                    feedback.textContent = "❌ Result mismatch. Check your math/logic.";
                    setModulePassed(currentSectorNum, 1, false);
                }

            } catch (e) {
                outputDiv.style.borderColor = "#ef4444";
                outputDiv.innerHTML = `> Runtime Error:\n${e.message}\n\nTip: For Sector 1, make sure to use 'nums.length' to divide.`;
                feedback.style.color = "#ef4444";
                feedback.textContent = "❌ Error in Pseudocode.";
                setModulePassed(currentSectorNum, 1, false);
            }
        };

        function renderMCQ() {
            const questions = [
                { q: "What is binary 1101?", a: ["13", "11", "9"], c: 0 },
                { q: "Which logic gate needs both True?", a: ["OR", "AND", "NOT"], c: 1 },
                { q: "What hides complexity?", a: ["Abstraction", "Selection", "Iteration"], c: 0 },
                { q: "Packet routing protocol?", a: ["HTTP", "IP", "SMTP"], c: 1 },
                { q: "Fast 'good enough' answer?", a: ["Linear Search", "Binary Search", "Heuristics"], c: 2 }
            ];
            const q = questions[currentSectorNum-1];
            mContent.innerHTML = `<p style="color:white; margin-bottom:15px;">${q.q}</p>`;
            q.a.forEach((opt, i) => {
                const b = document.createElement('button');
                b.className = 'btn';
                b.style = "background: #334155; color: white; margin-bottom: 5px; width: 100%; text-align: left;";
                b.textContent = opt;
                b.onclick = () => {
                    if (i === q.c) {
                        feedback.style.color = "#10b981";
                        feedback.textContent = "✅ Correct! Sector can now be completed.";
                        setModulePassed(currentSectorNum, 2, true);
                    } else {
                        feedback.style.color = "#ef4444";
                        feedback.textContent = "❌ Try again.";
                        setModulePassed(currentSectorNum, 2, false);
                    }
                };

                mContent.appendChild(b);
            });

            setModulePassed(currentSectorNum, 2, false);
            updateNavButtons();

        }

        function movePlayer(dx, dy) {
            const nx = playerPos.x + dx, ny = playerPos.y + dy;
            if (ny >= 0 && ny < mazeLayout.length && nx >= 0 && nx < mazeLayout[0].length && mazeLayout[ny][nx] !== 0) {
                const val = mazeLayout[ny][nx];
                if (val >= 4 && val <= 8) {
                    const sNum = val - 3;
                    if (!completedSectors.has(sNum - 1) && sNum > 1) return;
                    if (!completedSectors.has(sNum)) {
                        currentSectorNum = sNum; currentQuestion = 0;
                        initTeacher(sNum, 0);
                    }
                }
                playerPos.x = nx; playerPos.y = ny;
                createMaze();
            }
        }

        window.dismissTeacher = () => {
            document.getElementById('teacher-overlay').style.display = 'none';
            modal.classList.add('active');
            showQuestion();
        };

        nextBtn.onclick = () => {
            if (!isModulePassed(currentSectorNum, currentQuestion)) {
                feedback.style.color = "#ef4444";
                feedback.textContent = "❌ You must get the correct answer to unlock the next module.";
                updateNavButtons();
                return;
            }
            currentQuestion++;
            showQuestion();
        };

        backBtn.onclick = () => {
            if (!isModulePassed(currentSectorNum, 2)) {
                feedback.style.color = "#ef4444";
                feedback.textContent = "❌ Finish the final question correctly to complete the sector.";
                updateNavButtons();
                return;
            }
            modal.classList.remove('active');
            completedSectors.add(currentSectorNum);
            createMaze();
        };

        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active') || document.getElementById('teacher-overlay')?.style.display === 'flex') return;
            if (e.key === 'ArrowUp') movePlayer(0, -1);
            if (e.key === 'ArrowDown') movePlayer(0, 1);
            if (e.key === 'ArrowLeft') movePlayer(-1, 0);
            if (e.key === 'ArrowRight') movePlayer(1, 0);
        });

        createMaze();
    </script>
</body>
</html>