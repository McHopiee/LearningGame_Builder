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

        .stars {
            position: fixed;
            inset: 0;
            overflow: hidden;
            z-index: 0;
        }

        .star {
            position: absolute;
            width: 2px; height: 2px;
            background: white;
            border-radius: 50%;
            animation: twinkle 3s infinite;
        }

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
            position: relative; /* Changed from absolute to occupy space */
            width: 100%;
            background: linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95));
            backdrop-filter: blur(10px);
            padding: 20px;
            border-bottom: 2px solid rgba(6,182,212,0.3);
            z-index: 50;
            flex-shrink: 0; /* Prevents header from squishing */
        }

        .title-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 8px;
        }

        .title-icon {
            width: 32px; height: 32px;
            display: flex; align-items: center; justify-content: center;
            font-size: 24px;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(6,182,212,0.5)); }
            50% { transform: scale(1.05); filter: drop-shadow(0 0 20px rgba(6,182,212,0.8)); }
        }

        .title {
            color: #06b6d4;
            font-size: 28px; 
            font-weight: 900; 
            text-transform: uppercase;
            letter-spacing: 4px;
            text-shadow: 0 0 20px rgba(6,182,212,0.5);
        }

        .subtitle {
            text-align: center;
            color: rgba(103,232,249,0.7);
            font-size: 12px;
            letter-spacing: 0.8px;
            font-family: 'Courier New', monospace;
        }

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

        .cell { 
            border: 1px solid rgba(6,182,212,0.08);
            border-radius: 2px;
        }

        .wall { 
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        }

        .path { 
            background: rgba(30, 41, 59, 0.3); 
        }

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

        @keyframes playerPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.8); transform: scale(1); }
            50% { box-shadow: 0 0 30px rgba(6,182,212,1); transform: scale(1.05); }
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

        .sector.completed { 
            background: linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(5,150,105,0.3) 100%);
            color: #10b981;
        }

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

        /* Modal Styles */
        .question-modal {
            display: none; 
            position: absolute; 
            inset: 0;
            background: rgba(2,6,23,0.95); 
            backdrop-filter: blur(10px);
            z-index: 100; 
            justify-content: center; 
            align-items: center;
        }

        .question-modal.active { display: flex; }

        .question-card {
            background: linear-gradient(135deg, rgba(30,41,59,0.95), rgba(51,65,85,0.95));
            backdrop-filter: blur(20px);
            border-radius: 24px; 
            border: 2px solid rgba(6,182,212,0.5); 
            padding: 40px; 
            max-width: 600px; 
            width: 90%;
            box-shadow: 0 0 60px rgba(6,182,212,0.3);
            position: relative;
        }

        .question-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
        }

        .sector-badge {
            width: 56px; height: 56px;
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            color: white; font-size: 24px; font-weight: 900;
        }

        .sector-info h2 { color: #06b6d4; font-size: 24px; font-weight: 900; }
        .sector-info p { color: rgba(103,232,249,0.7); font-size: 13px; font-family: 'Courier New', monospace; }

        .question-content {
            margin: 24px 0;
            padding: 24px;
            background: rgba(2,6,23,0.5);
            border-radius: 16px;
            border: 1px solid rgba(6,182,212,0.3);
        }

        .question-type {
            color: #fbbf24; font-weight: 900; font-size: 13px;
            margin-bottom: 12px; display: flex; align-items: center; gap: 8px;
        }

        .question-text { color: #e2e8f0; font-size: 16px; line-height: 1.6; }

        .progress-indicators { display: flex; gap: 8px; margin-bottom: 24px; }
        .progress-bar { height: 6px; flex: 1; border-radius: 3px; background: rgba(51,65,85,0.5); }
        .progress-bar.active { background: #06b6d4; }
        .progress-bar.completed { background: rgba(16,185,129,0.6); }

        .question-nav { display: flex; gap: 12px; }

        .btn { 
            flex: 1; padding: 16px 24px; border: none; border-radius: 12px; 
            cursor: pointer; text-transform: uppercase; font-weight: 900;
        }

        .btn-next { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; }
        .btn-complete { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; }

        @media (max-width: 768px) {
            .title { font-size: 20px; }
            .maze { max-height: 400px; }
        }
    </style>
</head>
<body>
    <!-- Stars background -->
    <div class="stars" id="stars"></div>

    <div class="container">
        <!-- Header is now part of the flow -->
        <div class="title-section">
            <div class="title-header">
                <div class="title-icon">🚀</div>
                <div class="title">Station Navigation</div>
            </div>
            <div class="subtitle">Cadet Training Protocol // Sector Clearance Required</div>
        </div>

        <div class="maze-container">
            <div class="maze" id="maze"></div>
            <div class="controls-hint">
                Use arrow keys to navigate • Reach sector checkpoints to begin training
            </div>
        </div>

        <!-- Question Modal -->
        <div class="question-modal" id="questionModal">
            <div class="question-card">
                <div class="question-header">
                    <div class="sector-badge"><span id="sectorNumber">1</span></div>
                    <div class="sector-info">
                        <h2 id="sectorTitle">SECTOR 1</h2>
                        <p id="sectorName">Navigation Deck</p>
                    </div>
                </div>

                <div class="progress-indicators" id="progressIndicators">
                    <div class="progress-bar"></div>
                    <div class="progress-bar"></div>
                    <div class="progress-bar"></div>
                </div>

                <div class="question-content">
                    <div class="question-type" id="questionType">
                        <span>📡</span><span id="questionTypeText">Navigation Systems</span>
                    </div>
                    <div class="question-text" id="questionText">Configure robot navigation protocols</div>

                    <!-- CODE RUNNER -->
                    <div id="codeRunner" style="display:none; margin-top:16px;">
                        <textarea id="codeInput" rows="5" style="width:100%; border-radius:8px; padding:10px; font-family:monospace; background: #020617; color: #06b6d4; border: 1px solid #06b6d4;">// write code here</textarea>
                        <button id="runCodeBtn" style="margin-top:10px; padding:10px 14px; border-radius:8px; cursor:pointer; background: #06b6d4; color: white; border: none; font-weight: bold;">Run Code</button>
                        <pre id="codeOutput" style="margin-top:10px; background:#020617; color: #e2e8f0; padding:10px; border-radius:8px; border: 1px solid rgba(6,182,212,0.3); font-size: 12px; min-height: 40px;"></pre>
                    </div>
                </div>

                <div class="question-nav">
                    <button class="btn btn-next" id="nextBtn">Next Module →</button>
                    <button class="btn btn-complete" id="backBtn" style="display: none;">Complete Sector ✓</button>
                </div>
            </div>
        </div>
    </div>

   {% capture teacher_raw %}
    {% include_relative gameteacher.md %}
    {% endcapture %}
    {% assign parts = teacher_raw | split: '---' %}
    {{ parts | slice: 2, parts.size | join: '---' }}

    <script>
        const starsContainer = document.getElementById('stars');
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }

        const maze = document.getElementById('maze');
        const modal = document.getElementById('questionModal');
        const sectorNumber = document.getElementById('sectorNumber');
        const sectorTitle = document.getElementById('sectorTitle');
        const sectorName = document.getElementById('sectorName');
        const questionType = document.getElementById('questionTypeText');
        const questionText = document.getElementById('questionText');
        const nextBtn = document.getElementById('nextBtn');
        const backBtn = document.getElementById('backBtn');
        const codeRunner = document.getElementById('codeRunner');
        const codeInput = document.getElementById('codeInput');
        const codeOutput = document.getElementById('codeOutput');
        const runCodeBtn = document.getElementById('runCodeBtn');

        let currentQuestion = 0;
        let currentSectorNum = 0;
        const completedSectors = new Set();

        const sectorNames = ["Navigation Deck", "Logic Core", "Simulation Bay", "Dock Alpha", "Dock Beta"];

        const questions = [
            { type: "Navigation Systems", text: "Configure robot navigation protocols", icon: "📡" },
            { type: "Programming Task", text: "", icon: "💻" },
            { type: "Logic Core", text: "Program decision algorithms", icon: "⚡" },
            { type: "Programming Task", text: "", icon: "💻" },
            { type: "Simulation Bay", text: "Interactive training module", icon: "🎮" },
            { type: "Programming Task", text: "", icon: "💻" },
            { type: "Dock Access", text: "Final station protocols", icon: "🚀" },
            { type: "Programming Task", text: "", icon: "💻" }
        ];

        const mazeLayout = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [2,1,0,1,4,1,0,1,5,1,0,1,6,1,1],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,1,1,7,1,0,1,1,1,1,1,1,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,1,1,1,1,1,1,8,1,0,1,1,1,0],
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ];

        let playerPos = { x: 0, y: 1 };

        function createMaze() {
            maze.innerHTML = '';
            for (let y = 0; y < mazeLayout.length; y++) {
                for (let x = 0; x < mazeLayout[y].length; x++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    if (mazeLayout[y][x] === 0) cell.classList.add('wall');
                    else if (mazeLayout[y][x] === 1) cell.classList.add('path');
                    else if (mazeLayout[y][x] === 2) { cell.classList.add('path', 'start'); cell.textContent = 'S'; }
                    else if (mazeLayout[y][x] === 3) { cell.classList.add('path', 'end'); cell.textContent = 'E'; }
                    else if (mazeLayout[y][x] >= 4 && mazeLayout[y][x] <= 8) {
                        const sNum = mazeLayout[y][x] - 3;
                        cell.classList.add('path', 'sector');
                        if (completedSectors.has(sNum)) cell.classList.add('completed');
                        cell.textContent = sNum;
                    }
                    if (x === playerPos.x && y === playerPos.y) {
                        const player = document.createElement('div');
                        player.className = 'player';
                        cell.appendChild(player);
                    }
                    maze.appendChild(cell);
                }
            }
        }

        function movePlayer(dx, dy) {
            const newX = playerPos.x + dx;
            const newY = playerPos.y + dy;
            if (newY >= 0 && newY < mazeLayout.length && newX >= 0 && newX < mazeLayout[0].length && mazeLayout[newY][newX] !== 0) {
                const cellValue = mazeLayout[newY][newX];
                if (cellValue >= 4 && cellValue <= 8) {
                    const sNum = cellValue - 3;
                    if (!completedSectors.has(sNum - 1) && sNum > 1) {
                        alert("Complete previous sector first!");
                        return;
                    }
                    if (!completedSectors.has(sNum)) {
                        currentSectorNum = sNum;
                        currentQuestion = 0;
                        initTeacher(sNum, 0);
                    }
                }
                playerPos.x = newX; playerPos.y = newY;
                createMaze();
            }
        }

        function dismissTeacher() {
            document.getElementById('teacher-overlay').style.display = 'none';
            modal.classList.add('active');
            showQuestion();
        }

        function showQuestion() {
            sectorNumber.textContent = currentSectorNum;
            sectorTitle.textContent = `SECTOR ${currentSectorNum}`;
            sectorName.textContent = sectorNames[currentSectorNum - 1] || "Training Module";
            const q = questions[currentQuestion];
            questionType.innerHTML = `<span>${q.icon}</span> ${q.type}`;
            
            if (currentQuestion % 2 === 1) {
                codeRunner.style.display = 'block';
                questionText.style.display = 'none';
                const qTexts = [
                    "Task: Write a procedure `Average(nums)` that returns the mean of list `nums`.",
                    "Task: Write `CountAbove(nums, threshold)` to find values > threshold.",
                    "Task: Write `MaxValue(nums)` that returns the largest value in `nums`.",
                    "Task: Write `ReplaceAll(words, target, replacement)` to swap target for replacement.",
                    "Task: Write `GetEvens(nums)` that returns only even numbers."
                ];
                const codeTemplates = [
                    "function Average(nums) {\n  // your code\n}",
                    "function findMax(arr) {\n  // your code\n}",
                    "function reverseString(str) {\n  // your code\n}",
                    "function isPrime(num) {\n  // your code\n}",
                    "function countVowels(str) {\n  // your code\n}"
                ];
                const qIndex = Math.floor(currentQuestion / 2);
                questionType.innerHTML += `<br><span style="font-size: 14px; color: #e2e8f0; text-transform: none;">${qTexts[qIndex]}</span>`;
                codeInput.value = codeTemplates[qIndex];
            } else {
                codeRunner.style.display = 'none';
                questionText.style.display = 'block';
                questionText.textContent = q.text;
            }

            const bars = document.querySelectorAll('.progress-bar');
            bars.forEach((bar, i) => {
                bar.className = 'progress-bar' + (i === currentQuestion ? ' active' : (i < currentQuestion ? ' completed' : ''));
            });

            nextBtn.style.display = currentQuestion < 2 ? 'block' : 'none';
            backBtn.style.display = currentQuestion === 2 ? 'block' : 'none';
        }

        nextBtn.onclick = () => { currentQuestion++; showQuestion(); };
        backBtn.onclick = () => { modal.classList.remove('active'); completedSectors.add(currentSectorNum); createMaze(); };

        runCodeBtn.onclick = () => {
            try {
                eval(codeInput.value);
                const qIdx = Math.floor(currentQuestion / 2);
                let passed = false;
                if (qIdx === 0 && typeof Average !== 'undefined') passed = Average([1,2,3]) === 2;
                if (qIdx === 1 && typeof findMax !== 'undefined') passed = findMax([1,5,3]) === 5;
                codeOutput.textContent = passed ? "✅ Correct! All tests passed!" : "❌ Tests failed. Check logic.";
            } catch(e) { codeOutput.textContent = "❌ Error: " + e.message; }
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