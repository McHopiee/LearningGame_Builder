---
layout: default
title: Maze - Homescreen
authors: Anika, Cyrus, Rishabh, Jaynee, Lillian, Avantika
permalink: /learninggame/home
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Station Navigation - Full Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
         body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%);
            height: 100vh; width: 100vw; display: flex; 
            justify-content: center; align-items: center;
            overflow: hidden; position: relative;
        }

        .stars { position: fixed; inset: 0; overflow: hidden; z-index: 0; }
        .star { position: absolute; width: 2px; height: 2px; background: white; border-radius: 50%; animation: twinkle 3s infinite; }

        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }

        body::before {
            content: ''; position: fixed; top: 10%; left: 10%; width: 500px; height: 500px;
            background: radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%);
            filter: blur(80px); z-index: 0;
        }

        body::after {
            content: ''; position: fixed; bottom: 10%; right: 10%; width: 500px; height: 500px;
            background: radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%);
            filter: blur(80px); z-index: 0;
        }

        .container {
            position: relative; width: 90vw; max-width: 900px; height: 90vh; max-height: 850px;
            background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(20px);
            border-radius: 24px; border: 2px solid rgba(6,182,212,0.4);
            box-shadow: 0 0 60px rgba(6,182,212,0.25); overflow: hidden;
            z-index: 1; display: flex; flex-direction: column;
        }

        .title-section {
            position: relative; width: 100%; background: rgba(15,23,42,0.95);
            padding: 15px 20px; border-bottom: 2px solid rgba(6,182,212,0.3);
            z-index: 50; flex-shrink: 0;
        }

        .title-header { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 6px; }
        .title { color: #06b6d4; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: 4px; }
        .subtitle { text-align: center; color: rgba(103,232,249,0.7); font-size: 12px; font-family: 'Courier New', monospace; }

        /* Progress Bar Styles */
        .progress-bar-container {
            background: rgba(2, 6, 23, 0.6);
            padding: 12px 20px;
            border-radius: 12px;
            margin: 8px 20px;
            border: 1px solid rgba(6,182,212,0.2);
            flex-shrink: 0;
        }

        .progress-header {
            font-size: 10px;
            color: #06b6d4;
            letter-spacing: 3px;
            margin-bottom: 6px;
            font-weight: 700;
            text-transform: uppercase;
        }

        .progress-main {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 8px;
        }

        .progress-percentage {
            font-size: 32px;
            font-weight: 900;
            color: #10b981;
            min-width: 70px;
            transition: all 0.5s ease;
        }

        .progress-status {
            font-size: 11px;
            color: rgba(103,232,249,0.6);
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .progress-boxes {
            display: flex;
            gap: 6px;
            margin-bottom: 8px;
        }

        .progress-box {
            width: 20px;
            height: 20px;
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid rgba(6,182,212,0.3);
            border-radius: 3px;
            transition: all 0.3s ease;
        }

        .progress-box.completed {
            background: #10b981;
            border-color: #10b981;
            box-shadow: 0 0 10px rgba(16,185,129,0.5);
        }

        .progress-stats {
            display: flex;
            justify-content: space-between;
            gap: 15px;
        }

        .stat-item {
            text-align: center;
            flex: 1;
        }

        .stat-value {
            font-size: 18px;
            font-weight: 900;
            color: #06b6d4;
            display: block;
            margin-bottom: 4px;
            transition: all 0.3s ease;
        }

        .stat-label {
            font-size: 9px;
            color: rgba(103,232,249,0.5);
            letter-spacing: 1.5px;
            text-transform: uppercase;
        }

        .maze-container {
            flex-grow: 1; 
            width: 100%; 
            display: flex; 
            flex-direction: column;
            justify-content: center; 
            align-items: center; 
            padding: 12px 20px 20px 20px;
            min-height: 0;
            overflow: hidden;
        }

        .maze {
            width: 100%; 
            max-width: 750px;
            height: auto;
            aspect-ratio: 15 / 11;
            max-height: 550px;
            background: rgba(2, 6, 23, 0.5); 
            backdrop-filter: blur(10px);
            border-radius: 20px; 
            border: 2px solid rgba(16,185,129,0.4);
            display: grid; 
            grid-template-columns: repeat(15, 1fr); 
            grid-template-rows: repeat(11, 1fr);
            padding: 8px; 
            gap: 3px; 
            margin: 0 auto;
        }

        .cell { border: 1px solid rgba(6,182,212,0.08); border-radius: 2px; position: relative; }
        .wall { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); }
        .path { background: rgba(30, 41, 59, 0.3); }
        .player {
            background: radial-gradient(circle, #06b6d4 0%, #3b82f6 100%);
            border-radius: 50%; box-shadow: 0 0 20px rgba(6,182,212,0.8);
            width: 80%; height: 80%; margin: 10%; z-index: 20; position: absolute;
        }
        .sector {
            background: linear-gradient(135deg, rgba(251,191,36,0.3) 0%, rgba(217,119,6,0.3) 100%);
            border-radius: 50%; display: flex; justify-content: center; align-items: center;
            color: #fbbf24; font-weight: 900; font-size: 14px; width: 90%; height: 90%; margin: 5%;
        }
        .completed { background: #10b981 !important; color: white; }
        .start { background: rgba(16,185,129,0.3); color: #10b981; }
        .end { background: rgba(168,85,247,0.3); color: #a855f7; }

        .controls-hint {
            color: rgba(103,232,249,0.6);
            font-size: 11px;
            margin-top: 10px;
            text-align: center;
            font-family: 'Courier New', monospace;
        }

        .question-modal {
            display: none; position: absolute; inset: 0; z-index: 100;
            justify-content: center; align-items: center;
            background: rgba(2, 6, 23, 0.92); backdrop-filter: blur(14px);
        }
        .question-modal.active { display: flex; }
        .question-card { width: min(720px, 92vw); background: #1e293b; border: 1px solid #06b6d4; border-radius: 24px; padding: 30px; position: relative; }
        
        .robot-grid {
            display: grid; grid-template-columns: repeat(5, 45px); grid-template-rows: repeat(5, 45px);
            gap: 4px; background: #0f172a; padding: 10px; border-radius: 8px; margin: 10px auto; justify-content: center;
        }
        .r-cell { width: 45px; height: 45px; background: rgba(30, 41, 59, 0.5); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .r-wall { background: #ef4444; }

        textarea { width: 100%; height: 120px; background: #020617; color: #06b6d4; border: 1px solid #06b6d4; padding: 10px; font-family: monospace; border-radius: 8px; }
        .btn { padding: 12px 20px; border-radius: 12px; border: none; cursor: pointer; font-weight: 900; transition: all 0.2s ease; }
        .btn:hover { transform: translateY(-2px); }
        .btn-blue { background: #06b6d4; color: white; }
        .btn-check { background: #fbbf24; color: black; width: 100%; margin-top: 10px; }
        .btn-autofill { background: #a855f7; color: white; }
        
        #feedback { margin-top: 10px; font-weight: 800; text-align: center; min-height: 20px; }

        .summary-card { text-align: left; color: #e2e8f0; }
        .summary-row { display: flex; justify-content: space-between; margin: 10px 0; border-bottom: 1px solid rgba(148,163,184,0.1); padding-bottom: 5px; }
        .badge-display { font-size: 48px; text-align: center; margin: 20px 0; color: #fbbf24; text-shadow: 0 0 20px rgba(251,191,36,0.4); }
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

        <!-- Progress Bar Component -->
        <div class="progress-bar-container">
            <div class="progress-header">STATION_INTEGRITY_MAP</div>
            <div class="progress-main">
                <div class="progress-percentage" id="progressPercentage">0%</div>
                <div class="progress-status" id="progressStatus">PROTOCOL_SYNCED</div>
            </div>
            <div class="progress-boxes" id="progressBoxes">
                <div class="progress-box"></div>
                <div class="progress-box"></div>
                <div class="progress-box"></div>
                <div class="progress-box"></div>
                <div class="progress-box"></div>
                <div class="progress-box"></div>
                <div class="progress-box"></div>
                <div class="progress-box"></div>
                <div class="progress-box"></div>
                <div class="progress-box"></div>
                <div class="progress-box"></div>
                <div class="progress-box"></div>
                <div class="progress-box"></div>
                <div class="progress-box"></div>
                <div class="progress-box"></div>
            </div>
            <div class="progress-stats">
                <div class="stat-item">
                    <span class="stat-value" id="statSectors">0/5</span>
                    <span class="stat-label">SECTORS</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value" id="statLocked">5</span>
                    <span class="stat-label">LOCKED</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value" id="statConnected">CONNECTED</span>
                    <span class="stat-label">DATABASE</span>
                </div>
            </div>
        </div>

        <div class="maze-container">
            <div class="maze" id="maze"></div>
            <div class="controls-hint">Use arrow keys to navigate • Reach sector checkpoints</div>
        </div>

        <div class="question-modal" id="questionModal">
            <div class="question-card">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                    <div id="sectorBadge" style="background: #fbbf24; width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold;">1</div>
                    <div>
                        <h2 id="mTitle" style="color: #06b6d4; text-transform: uppercase;">Sector 1</h2>
                        <p id="mSubtitle" style="color: rgba(103,232,249,0.7); font-family: monospace; font-size: 12px;">Navigation Task</p>
                    </div>
                </div>

                <div id="moduleContent"></div>
                <div id="feedback"></div>

                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="btn btn-blue" id="nextBtn">Next Module →</button>
                    <button class="btn btn-autofill" id="autofillBtn">✨ Autofill</button>
                    <button class="btn" id="backBtn" style="display:none; background: #10b981; color: white;">Calculate Results</button>
                </div>
            </div>
        </div>
    </div>

<script type="module">
    // Import API configuration
    import { getRobopURI, fetchOptions } from '{{ "/assets/js/api/config.js" | relative_url }}?v=20260123_1';

    const robopURI = await getRobopURI();

    // Existing robop endpoints (used by autofill)
    const API_URL = `${robopURI}/api/robop`;

    // NEW pseudocode question bank endpoints
    const PSEUDOCODE_BANK_URL = `${robopURI}/api/pseudocode_bank`;

    window.API_URL = API_URL;
    window.PSEUDOCODE_BANK_URL = PSEUDOCODE_BANK_URL;
    window.authOptions = fetchOptions;

    // Track the currently fetched pseudocode question (per sector run)
    let currentPseudo = {
        level: null,
        question_id: null,
        question: null
    };


    // Star Field Initialization
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        starsContainer.appendChild(star);
    }

    const mazeEl = document.getElementById('maze');
    const modal = document.getElementById('questionModal');
    const mContent = document.getElementById('moduleContent');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    const autofillBtn = document.getElementById('autofillBtn');

    // Scoring and Game State
    let moduleAttempts = [0, 0, 0]; 
    const weights = [0.5, 0.3, 0.2]; 
    let currentSectorNum = 0;
    let currentQuestion = 0;
    const completedSectors = new Set();
    let usedAutofill = false; // Track if autofill was used

    const mazeLayout = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [2,1,1,1,4,1,1,1,5,1,1,1,6,1,1], 
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0], 
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [0,1,1,1,7,1,1,1,1,1,1,1,1,1,0], 
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [0,1,1,1,1,1,1,1,8,1,1,1,1,1,0], 
        [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,3], 
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    let playerPos = { x: 0, y: 1 };
    const robotLevels = {
        1: { start: [0,0], goal: [4,4], walls: [[1,1],[1,2],[3,3]] },
        2: { start: [0,4], goal: [4,0], walls: [[2,0],[2,1],[2,2]] },
        3: { start: [2,0], goal: [2,4], walls: [[1,2],[2,2],[3,2]] },
        4: { start: [0,0], goal: [4,0], walls: [[0,1],[1,1],[2,1]] },
        5: { start: [0,2], goal: [4,2], walls: [[2,1],[2,2],[2,3]] }
    };

    // Progress Bar Update Function
    function updateProgressBar() {
        const totalSectors = 5;
        const completedCount = completedSectors.size;
        const percentage = Math.round((completedCount / totalSectors) * 100);
        
        document.getElementById('progressPercentage').textContent = `${percentage}%`;
        document.getElementById('statSectors').textContent = `${completedCount}/5`;
        document.getElementById('statLocked').textContent = `${5 - completedCount}`;
        
        const boxes = document.querySelectorAll('.progress-box');
        const boxesPerSector = 3; // 15 boxes / 5 sectors = 3 boxes per sector
        
        boxes.forEach((box, index) => {
            const sectorIndex = Math.floor(index / boxesPerSector);
            if (sectorIndex < completedCount) {
                box.classList.add('completed');
            } else {
                box.classList.remove('completed');
            }
        });
    }

    function drawMaze() {
        mazeEl.innerHTML = '';
        mazeLayout.forEach((row, y) => {
            row.forEach((val, x) => {
                const cell = document.createElement('div');
                cell.className = 'cell ' + (val === 0 ? 'wall' : 'path');
                if (val === 2) { cell.textContent = 'S'; cell.classList.add('start'); }
                if (val === 3) { cell.textContent = 'E'; cell.classList.add('end'); }
                if (val >= 4 && val <= 8) {
                    const sNum = val - 3;
                    cell.textContent = sNum;
                    cell.classList.add('sector');
                    if (completedSectors.has(sNum)) cell.classList.add('completed');
                }
                if (x === playerPos.x && y === playerPos.y) {
                    const p = document.createElement('div'); p.className = 'player';
                    cell.appendChild(p);
                }
                mazeEl.appendChild(cell);
            });
        });
    }

    async function showQuestion() {
        document.getElementById('sectorBadge').textContent = currentSectorNum;
        document.getElementById('mTitle').textContent = `Sector ${currentSectorNum}`;
        feedback.textContent = '';
        nextBtn.disabled = true;
        nextBtn.style.opacity = "0.5";

        if (currentQuestion === 0) renderRobotSim();
        else if (currentQuestion === 1) await renderPseudoCode();
        else renderMCQ();

        nextBtn.style.display = currentQuestion < 2 ? 'block' : 'none';
        autofillBtn.style.display = currentQuestion < 2 ? 'block' : 'none';
        backBtn.style.display = currentQuestion === 2 ? 'block' : 'none';
    }

    function renderRobotSim() {
        const level = robotLevels[currentSectorNum];
        mContent.innerHTML = `
            <div class="robot-sim-container">
                <p style="color: #e2e8f0; margin-bottom: 10px; font-size: 14px;">Program the robot. Reach ⭐. Avoid 🟥.</p>
                <div class="robot-grid" id="rg"></div>
                <textarea id="rcInput">robot.MoveForward();</textarea>
                <button class="btn btn-check" id="runSimBtn">Execute Command</button>
            </div>
        `;
        document.getElementById('runSimBtn').onclick = runRobotSim;
        updateRobotGrid(level.start, 0);
    }

    async function runRobotSim() {
        moduleAttempts[0]++;
        const code = document.getElementById('rcInput').value;
        const level = robotLevels[currentSectorNum];
        let rPos = [...level.start];
        let dir = 0; 
        const commands = [];
        const robot = { 
            MoveForward: (n=1) => { for(let i=0; i<n; i++) commands.push('MOVE'); }, 
            TurnRight: () => commands.push('RIGHT'), 
            TurnLeft: () => commands.push('LEFT') 
        };
        try {
            eval(code);
            for (const cmd of commands) {
                await new Promise(r => setTimeout(r, 400));
                if (cmd === 'MOVE') { 
                    if (dir === 0) rPos[0]++; 
                    else if (dir === 1) rPos[1]++; 
                    else if (dir === 2) rPos[0]--; 
                    else rPos[1]--; 
                }
                else if (cmd === 'RIGHT') dir = (dir + 1) % 4;
                else if (cmd === 'LEFT') dir = (dir + 3) % 4;
                updateRobotGrid(rPos, dir);
                if (rPos[0]<0||rPos[0]>4||rPos[1]<0||rPos[1]>4||level.walls.some(w=>w[0]===rPos[0]&&w[1]===rPos[1])) {
                    feedback.textContent = "💥 Crash! Resetting...";
                    feedback.style.color = "#ef4444";
                    setTimeout(()=>updateRobotGrid(level.start, 0), 1000); return;
                }
            }
            if (rPos[0] === level.goal[0] && rPos[1] === level.goal[1]) {
                feedback.style.color = "#10b981"; 
                feedback.textContent = "✅ Goal reached!";
                nextBtn.disabled = false; 
                nextBtn.style.opacity = "1";
            } else { 
                feedback.style.color = "#fbbf24";
                feedback.textContent = "⚠️ Short of target. Try again."; 
            }
        } catch(e) { 
            feedback.style.color = "#ef4444";
            feedback.textContent = "❌ Syntax Error."; 
        }
    }

    function updateRobotGrid(pos, dir) {
        const grid = document.getElementById('rg');
        if (!grid) return; 
        grid.innerHTML = '';
        const level = robotLevels[currentSectorNum];
        const icons = ["▶️", "🔽", "◀️", "🔼"];
        for (let y=0; y<5; y++) {
            for (let x=0; x<5; x++) {
                const c = document.createElement('div'); 
                c.className = 'r-cell';
                if (level.walls.some(w => w[0] === x && w[1] === y)) c.classList.add('r-wall');
                if (x === level.goal[0] && y === level.goal[1]) c.textContent = '⭐';
                if (x === pos[0] && y === pos[1]) c.textContent = icons[dir];
                grid.appendChild(c);
            }
        }
    }

    async function fetchRandomPseudocodeQuestion(levelNum) {
        // levelNum should be 1..5
        const url = `${window.PSEUDOCODE_BANK_URL}/random?level=${encodeURIComponent(levelNum)}`;

        const res = await fetch(url, {
            ...window.authOptions,
            method: "GET"
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data.success) {
            const msg = data.message || `Failed to fetch pseudocode question for level ${levelNum}`;
            throw new Error(msg);
        }

        return data; // {success, level, question, question_id}
    }

        async function renderPseudoCode() {
        // Map sector (1..5) to difficulty level (1..5)
        const levelNum = currentSectorNum;

        // Show loading UI immediately
        mContent.innerHTML = `
            <p style="color:#e2e8f0; margin-bottom:10px;">Fetching a random pseudocode question (Level ${levelNum})...</p>
            <div style="margin-top:10px; background:#020617; padding:10px; border-radius:8px; font-family:monospace; font-size:12px; color:#06b6d4;">
                Loading...
            </div>
        `;

        try {
            const data = await fetchRandomPseudocodeQuestion(levelNum);

            currentPseudo.level = data.level;           // e.g. "level3"
            currentPseudo.question_id = data.question_id;
            currentPseudo.question = data.question;

            mContent.innerHTML = `
                <div style="color:#e2e8f0; margin-bottom:10px; font-size:14px;">
                    <div style="color: rgba(103,232,249,0.7); font-family: monospace; font-size: 12px; margin-bottom: 6px;">
                        Level: ${data.level} • Question ID: ${data.question_id}
                    </div>
                    <div style="font-weight:800; color:#fbbf24; margin-bottom:8px;">Prompt</div>
                    <div style="background: rgba(2,6,23,0.6); border: 1px solid rgba(6,182,212,0.25); padding: 12px; border-radius: 10px; line-height: 1.35;">
                        ${data.question}
                    </div>
                </div>

                <textarea id="pcCode" placeholder="Write your pseudocode here..."></textarea>

                <button class="btn btn-check" id="validateBtn">Generate + Check Answer</button>

                <div id="pcExport" style="margin-top:10px; background:#020617; padding:10px; border-radius:8px; font-family:monospace; font-size:12px; color:#06b6d4; white-space:pre-wrap;">
                Exported code will appear here after you check.
                </div>

                <div id="pcOutput" style="margin-top:10px; background:#020617; padding:10px; border-radius:8px; font-family:monospace; font-size:12px; color:#06b6d4; white-space:pre-wrap;">
                Checker output will appear here.
                </div>

            `;

            document.getElementById("validateBtn").onclick = generateAndCheckPseudo;

        } catch (err) {
            console.error("Pseudocode bank fetch failed:", err);
            feedback.style.color = "#ef4444";
            feedback.textContent = `❌ ${err.message}`;

            mContent.innerHTML = `
                <p style="color:#e2e8f0; margin-bottom:10px;">Could not load a question for Level ${levelNum}.</p>
                <div style="margin-top:10px; background:#020617; padding:10px; border-radius:8px; font-family:monospace; font-size:12px; color:#06b6d4;">
                    Check that your backend is running and that /api/pseudocode_bank/random works.
                </div>
            `;
        }
    }


    function pseudoToExport(codeRaw) {
        // Very lightweight "export": turns pseudocode-ish lines into a JS-ish skeleton.
        // Not meant to run. It's for display + debugging student logic.
        let code = (codeRaw || "").trim();

        // Normalize arrows and common pseudocode tokens
        code = code.replaceAll("←", "=");
        code = code.replaceAll("≠", "!=");

        const lines = code.split("\n").map(l => l.trim()).filter(Boolean);

        const out = [];
        out.push("// Exported from pseudocode (display-only)");
        out.push("// Not executed. Used for checking structure.\n");
        out.push("function solution() {");

        for (let line of lines) {
            const lower = line.toLowerCase();

            // map common pseudocode patterns to readable JS-ish comments
            if (lower.startsWith("input")) out.push(`  // ${line}`);
            else if (lower.startsWith("display") || lower.startsWith("print") || lower.startsWith("output")) out.push(`  // ${line}`);
            else if (lower.startsWith("if")) out.push(`  // ${line}`);
            else if (lower.startsWith("else")) out.push(`  // ${line}`);
            else if (lower.startsWith("for") || lower.startsWith("while") || lower.startsWith("repeat") || lower.startsWith("loop")) out.push(`  // ${line}`);
            else if (lower.startsWith("return")) out.push(`  // ${line}`);
            else out.push(`  // ${line}`);
        }

        out.push("}\n");
        out.push("solution();");
        return out.join("\n");
    }

    async function generateAndCheckPseudo() {
        moduleAttempts[1]++;

        const code = document.getElementById("pcCode")?.value || "";
        const exportBox = document.getElementById("pcExport");
        const output = document.getElementById("pcOutput");

        // Basic minimum
        if (code.trim().length < 10) {
            feedback.style.color = "#fbbf24";
            feedback.textContent = "⚠️ Write a bit more pseudocode before checking.";
            if (exportBox) exportBox.textContent = "Exported code will appear here after you check.";
            if (output) output.textContent = "Not enough content yet.";
            return;
        }

        // 1) Export view
        const exported = pseudoToExport(code);
        if (exportBox) exportBox.textContent = exported;

        // 2) Call backend checker
        feedback.style.color = "#06b6d4";
        feedback.textContent = "⏳ Checking your answer...";

        try {
            const res = await fetch(`${window.PSEUDOCODE_BANK_URL}/grade`, {
                ...window.authOptions,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question_id: currentPseudo.question_id,
                    level: currentPseudo.level,
                    pseudocode: code
                })
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok || !data.success) {
                const msg = data.message || "Checker failed.";
                feedback.style.color = "#ef4444";
                feedback.textContent = `❌ ${msg}`;
                if (output) output.textContent = `Server error: ${msg}`;
                return;
            }

            if (data.passed) {
                feedback.style.color = "#10b981";
                feedback.textContent = "✅ Correct (meets the prompt requirements).";
                if (output) {
                    output.textContent =
                        `PASS ✅\n` +
                        `Question: ${data.question_id} (${data.level})\n` +
                        `${data.notes}`;
                }
                nextBtn.disabled = false;
                nextBtn.style.opacity = "1";
            } else {
                feedback.style.color = "#fbbf24";
                feedback.textContent = "⚠️ Not quite. Fix what’s missing and check again.";
                if (output) {
                    const missingList = (data.missing || []).map(m => `- ${m}`).join("\n");
                    output.textContent =
                        `FAIL ❌\n` +
                        `Missing:\n${missingList}\n\n` +
                        `Tip: Add the missing parts, then re-check.`;
                }
                nextBtn.disabled = true;
                nextBtn.style.opacity = "0.5";
            }
        } catch (err) {
            console.error(err);
            feedback.style.color = "#ef4444";
            feedback.textContent = "❌ Error connecting to checker.";
            if (output) output.textContent = "Network error calling /api/pseudocode_bank/grade";
        }
    }



    function renderMCQ() {
        const qs = [
            {q:"What is 1101 in binary?", a:["13","11"], c:0},
            {q:"What is AND logic?", a:["Both true","One true"], c:0},
            {q:"What is Abstraction?", a:["Hide detail","Show all"], c:0},
            {q:"What is IP Protocol?", a:["Routing","Website"], c:0},
            {q:"What are Heuristics?", a:["Rule of thumb","Perfect solution"], c:0}
        ][currentSectorNum-1];
        mContent.innerHTML = `<p style="color:white; margin-bottom:15px; font-size:16px;">${qs.q}</p>`;
        qs.a.forEach((opt, i) => {
            const b = document.createElement('button'); 
            b.className = 'btn'; 
            b.style = "background:#334155; color:white; margin-bottom:5px; width:100%; text-align:left;";
            b.textContent = opt;
            b.onclick = () => { 
                moduleAttempts[2]++; 
                if (i === qs.c) { 
                    feedback.style.color="#10b981"; 
                    feedback.textContent="✅ Correct!"; 
                    backBtn.disabled=false; 
                    backBtn.style.opacity="1"; 
                } else { 
                    feedback.style.color="#ef4444";
                    feedback.textContent="❌ Try again."; 
                } 
            };
            mContent.appendChild(b);
        });
    }

    // AUTOFILL FUNCTIONALITY
    autofillBtn.onclick = async () => {
        try {
            usedAutofill = true; // Mark that autofill was used
            feedback.textContent = '⏳ Fetching answer...';
            feedback.style.color = '#06b6d4';
            
            const response = await fetch(`${window.API_URL}/autofill`, {
                ...window.authOptions,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sector_id: currentSectorNum,
                    question_num: currentQuestion
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch answer');
            }

            const data = await response.json();
            
            if (data.success) {
                if (currentQuestion === 0) {
                    document.getElementById('rcInput').value = data.answer;
                    feedback.textContent = '✨ Answer filled! Click "Execute Command" to run.';
                    feedback.style.color = '#a855f7';
                } else if (currentQuestion === 1) {
                    document.getElementById('pcCode').value = data.answer;
                    feedback.textContent = '✨ Answer filled! Click "Validate" to check.';
                    feedback.style.color = '#a855f7';
                } else if (currentQuestion === 2) {
                    const buttons = mContent.querySelectorAll('.btn');
                    if (buttons[data.answer]) {
                        buttons[data.answer].click();
                        feedback.textContent = '✨ Correct answer selected!';
                        feedback.style.color = '#10b981';
                    }
                }
            } else {
                feedback.textContent = '❌ ' + (data.message || 'Failed to get answer');
                feedback.style.color = '#ef4444';
            }
        } catch (error) {
            console.error('Autofill error:', error);
            feedback.textContent = '❌ Error connecting to server';
            feedback.style.color = '#ef4444';
        }
    };

    backBtn.onclick = async () => {
        let finalScore, earnedBadge;
        
        if (usedAutofill) {
            // If autofill was used, automatically give 0 score and Participant badge
            finalScore = 0;
            earnedBadge = "Participant";
        } else {
            // Normal scoring calculation
            let weightedSum = 0;
            const pts = moduleAttempts.map(a => Math.max(1, 6 - a));
            for (let i=0; i<3; i++) weightedSum += (pts[i]/5) * weights[i];
            finalScore = weightedSum * 100;
            const badgeRules = [{name: "Gold", threshold: 95}, {name: "Silver", threshold: 80}, {name: "Bronze", threshold: 65}, {name: "Participant", threshold: 0}];
            earnedBadge = "Participant";
            for (let r of badgeRules) { 
                if (finalScore >= r.threshold) { 
                    earnedBadge = r.name; 
                    break; 
                } 
            }
        }
        
        mContent.innerHTML = `
            <div class="summary-card">
                <h3 style="color:#fbbf24; margin-bottom:10px;">SECTOR RESULTS</h3>
                ${usedAutofill ? '<p style="color:#a855f7; margin-bottom:10px; text-align:center;">⚠️ Autofill was used - Participant badge awarded</p>' : ''}
                <div class="summary-row"><span>Total Score:</span><span>${Math.round(finalScore)}%</span></div>
                <div class="badge-display">${earnedBadge === "Gold" ? "🥇" : earnedBadge === "Silver" ? "🥈" : earnedBadge === "Bronze" ? "🥉" : "🎖️"}<div style="font-size:14px;">${earnedBadge} Badge</div></div>
                <button class="btn btn-blue" id="finalCloseBtn" style="width:100%">Continue</button>
            </div>`;
        document.getElementById('finalCloseBtn').onclick = closeSector;
    };

    function closeSector() {
        modal.classList.remove('active');
        completedSectors.add(currentSectorNum);
        drawMaze();
        updateProgressBar();
    }

    function movePlayer(dx, dy) {
        const nx = playerPos.x + dx, ny = playerPos.y + dy;
        if (ny >= 0 && ny < mazeLayout.length && nx >= 0 && nx < mazeLayout[0].length && mazeLayout[ny][nx] !== 0) {
            playerPos.x = nx; 
            playerPos.y = ny;
            drawMaze();
            const val = mazeLayout[ny][nx];
            if (val >= 4 && val <= 8) {
                const sNum = val - 3;
                if (sNum > 1 && !completedSectors.has(sNum - 1)) {
                    alert("⚠️ Complete previous sector first!");
                    return; 
                }
                currentSectorNum = sNum; 
                currentQuestion = 0; 
                moduleAttempts = [0, 0, 0];
                usedAutofill = false; // Reset autofill flag for new sector
                setTimeout(() => { 
                    modal.classList.add('active'); 
                    showQuestion(); 
                }, 100);
            } else if (val === 3) {
                alert("🎉 Congratulations! You've reached the end!");
            }
        }
    }

    nextBtn.onclick = () => { 
        currentQuestion++; 
        showQuestion(); 
    };

    document.addEventListener('keydown', e => {
        if (modal.classList.contains('active')) return;
        if (e.key === 'ArrowUp') movePlayer(0, -1);
        if (e.key === 'ArrowDown') movePlayer(0, 1);
        if (e.key === 'ArrowLeft') movePlayer(-1, 0);
        if (e.key === 'ArrowRight') movePlayer(1, 0);
    });

    // Initialize
    drawMaze();
    updateProgressBar();
</script>
</body>
</html>