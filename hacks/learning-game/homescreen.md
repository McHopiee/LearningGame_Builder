---
layout: base
title: Maze - Homescreen
authors: Anika, Cyrus, Rishabh, Jaynee, Lillian
permalink: /learninggame/home
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Futuristic Maze Challenge</title>
    <!-- CSS is mostly the same, terminology updated to Stop -->
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0a0e27 0%, #1a1a3e 100%);
            height: 100vh;
            display: flex; justify-content: center; align-items: center;
            overflow: hidden;
        }
        .container {
            position: relative; width: 95vw; max-width: 1000px; height: 95vh; max-height: 700px;
            background: rgba(15, 23, 42, 0.8); border-radius: 20px; border: 2px solid #3b82f6;
            box-shadow: 0 0 50px rgba(59, 130, 246, 0.3); overflow: hidden;
        }
        .title {
            position: absolute; top: 15px; left: 50%; transform: translateX(-50%);
            color: #60a5fa; font-size: 24px; font-weight: bold; text-transform: uppercase;
            letter-spacing: 3px; z-index: 50;
        }
        .maze-container {
            width: 100%; height: 100%; padding: 60px 20px 20px 20px;
            display: flex; justify-content: center; align-items: center;
        }
        .maze {
            position: relative; width: 100%; max-width: 800px; height: 100%; max-height: 600px;
            background: rgba(30, 41, 59, 0.5); border-radius: 15px; border: 3px solid #4ade80;
            display: grid; grid-template-columns: repeat(15, 1fr); grid-template-rows: repeat(11, 1fr);
        }
        .cell { border: 1px solid rgba(59, 130, 246, 0.1); }
        .wall { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); }
        .path { background: rgba(30, 41, 59, 0.3); }
        .player {
            background: radial-gradient(circle, #60a5fa 0%, #3b82f6 100%);
            border-radius: 50%; box-shadow: 0 0 15px rgba(96, 165, 250, 0.8);
            position: relative; z-index: 20;
        }
        .stop {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            border-radius: 50%; display: flex; justify-content: center; align-items: center;
            color: white; font-weight: bold; font-size: 12px; z-index: 10;
        }
        .stop.completed { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
        .start { background: #4ade80; border-radius: 50%; display: flex; justify-content: center; align-items: center; }
        .end { background: #ef4444; border-radius: 50%; display: flex; justify-content: center; align-items: center; }

        /* Modal Styles */
        .question-modal {
            display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(10, 14, 39, 0.95); z-index: 100; justify-content: center; align-items: center;
        }
        .question-modal.active { display: flex; }
        .question-card {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            border-radius: 20px; border: 2px solid #3b82f6; padding: 30px; max-width: 500px; width: 90%;
        }
        .btn { padding: 10px 25px; border: none; border-radius: 8px; cursor: pointer; text-transform: uppercase; }
        .btn-next { background: #3b82f6; color: white; }
    </style>
</head>
<body>
    <div class="container">
        <div class="title">Robot Maze Challenge</div>
        <div class="maze-container">
            <div class="maze" id="maze"></div>
        </div>

        <!-- Question Modal -->
        <div class="question-modal" id="questionModal">
            <div class="question-card">
                <div class="question-header">Stop <span id="stopNumber">1</span></div>
                <div class="question-content" style="margin: 20px 0; color: white;">
                    <div class="question-type" id="questionType" style="color: #fbbf24; font-weight: bold;"></div>
                    <div class="question-text" id="questionText" style="margin-top: 10px;"></div>
                </div>
                <div class="question-nav">
                    <button class="btn btn-next" id="nextBtn">Next</button>
                    <button class="btn btn-next" id="backBtn" style="display: none;">Back to Maze</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Integrate Game Teacher Assets -->
    {% include_relative gameteacher.md %}

    <script>
        const maze = document.getElementById('maze');
        const modal = document.getElementById('questionModal');
        const stopNumber = document.getElementById('stopNumber');
        const questionType = document.getElementById('questionType');
        const questionText = document.getElementById('questionText');
        const nextBtn = document.getElementById('nextBtn');
        const backBtn = document.getElementById('backBtn');

        let currentQuestion = 0;
        let currentStopNum = 0;
        const completedStops = new Set();

        const questions = [
            { type: "Robot Code", text: "Question 1 Content" },
            { type: "Pseudo Code", text: "Question 2 Content" },
            { type: "Game Learning", text: "Question 3 Content" }
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
                        cell.classList.add('path', 'stop');
                        cell.textContent = mazeLayout[y][x] - 3;
                    }
                    if (x === playerPos.x && y === playerPos.y) cell.classList.add('player');
                    maze.appendChild(cell);
                }
            }
        }

        // Q3 OVERLAY TRIGGER MODIFICATION
        function dismissTeacher() {
            document.getElementById('teacher-overlay').style.display = 'none';
            modal.classList.add('active'); // Show maze questions after teacher dismiss
            showQuestion();
        }

        function movePlayer(dx, dy) {
            const newX = playerPos.x + dx;
            const newY = playerPos.y + dy;
            if (newY >= 0 && newY < mazeLayout.length && newX >= 0 && newX < mazeLayout[0].length && mazeLayout[newY][newX] !== 0) {
                playerPos.x = newX;
                playerPos.y = newY;
                const cellValue = mazeLayout[newY][newX];
                if (cellValue >= 4 && cellValue <= 8) {
                    const stopNum = cellValue - 3;
                    if (!completedStops.has(stopNum)) {
                        currentStopNum = stopNum;
                        currentQuestion = 0;
                        initTeacher(stopNum, 0); // Trigger Q3 Teacher Overlay
                    }
                }
                createMaze();
            }
        }

        function showQuestion() {
            stopNumber.textContent = currentStopNum;
            questionType.textContent = questions[currentQuestion].type;
            questionText.textContent = questions[currentQuestion].text;
            
            // Q3: Update the hint bot's data for the current question
            if (typeof updateHint === "function") updateHint(currentQuestion);

            if (currentQuestion === questions.length - 1) {
                nextBtn.style.display = 'none';
                backBtn.style.display = 'block';
            } else {
                nextBtn.style.display = 'block';
                backBtn.style.display = 'none';
            }
        }

        nextBtn.addEventListener('click', () => {
            currentQuestion++;
            showQuestion();
        });

        backBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            completedStops.add(currentStopNum);
            createMaze();
        });

        document.addEventListener('keydown', (e) => {
            // Prevent movement if any Q3 or Q1/Q2 overlays are open
            if (modal.classList.contains('active') || document.getElementById('teacher-overlay').style.display === 'flex') return;
            if(e.key === 'ArrowUp') movePlayer(0, -1);
            if(e.key === 'ArrowDown') movePlayer(0, 1);
            if(e.key === 'ArrowLeft') movePlayer(-1, 0);
            if(e.key === 'ArrowRight') movePlayer(1, 0);
        });

        createMaze();
    </script>
</body>
</html>