---
layout: base
title: Maze - Homescreen
authors: Fill out
permalink: /learninggame/home
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Futuristic Maze Challenge</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0a0e27 0%, #1a1a3e 100%);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        .container {
            position: relative;
            width: 95vw;
            max-width: 1000px;
            height: 95vh;
            max-height: 700px;
            background: rgba(15, 23, 42, 0.8);
            border-radius: 20px;
            border: 2px solid #3b82f6;
            box-shadow: 0 0 50px rgba(59, 130, 246, 0.3);
            overflow: hidden;
        }

        .title {
            position: absolute;
            top: 15px;
            left: 50%;
            transform: translateX(-50%);
            color: #60a5fa;
            font-size: 24px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 3px;
            text-shadow: 0 0 20px rgba(96, 165, 250, 0.6);
            z-index: 50;
        }

        .maze-container {
            width: 100%;
            height: 100%;
            padding: 60px 20px 20px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .maze {
            position: relative;
            width: 100%;
            max-width: 800px;
            height: 100%;
            max-height: 600px;
            background: rgba(30, 41, 59, 0.5);
            border-radius: 15px;
            border: 3px solid #4ade80;
            box-shadow: 0 0 30px rgba(74, 222, 128, 0.2);
            display: grid;
            grid-template-columns: repeat(15, 1fr);
            grid-template-rows: repeat(11, 1fr);
        }

        .cell {
            border: 1px solid rgba(59, 130, 246, 0.1);
        }

        .wall {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        }

        .path {
            background: rgba(30, 41, 59, 0.3);
        }

        .player {
            background: radial-gradient(circle, #60a5fa 0%, #3b82f6 100%);
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(96, 165, 250, 0.8);
            position: relative;
            z-index: 20;
        }

        .checkpoint {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
            border: 2px solid #fbbf24;
            box-shadow: 0 0 15px rgba(251, 191, 36, 0.6);
            position: relative;
            z-index: 10;
        }

        .checkpoint.completed {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border-color: #34d399;
            box-shadow: 0 0 15px rgba(52, 211, 153, 0.6);
        }

        .start {
            background: #4ade80;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #0a0e27;
            font-weight: bold;
            font-size: 12px;
            border: 2px solid #22c55e;
            box-shadow: 0 0 15px rgba(74, 222, 128, 0.6);
        }

        .end {
            background: #ef4444;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
            border: 2px solid #dc2626;
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
        }

        .question-modal {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 14, 39, 0.95);
            z-index: 100;
            justify-content: center;
            align-items: center;
        }

        .question-modal.active {
            display: flex;
        }

        .question-card {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            border-radius: 20px;
            border: 2px solid #3b82f6;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 0 50px rgba(59, 130, 246, 0.4);
        }

        .question-header {
            color: #60a5fa;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .question-content {
            background: rgba(15, 23, 42, 0.6);
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 20px;
            min-height: 150px;
            border: 1px solid #475569;
        }

        .question-type {
            color: #fbbf24;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .question-text {
            color: #e2e8f0;
            font-size: 14px;
            line-height: 1.6;
        }

        .question-nav {
            display: flex;
            justify-content: center;
            gap: 15px;
        }

        .btn {
            padding: 10px 25px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .btn-next {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }

        .btn-next:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
        }

        .btn-back {
            background: linear-gradient(135deg, #64748b 0%, #475569 100%);
            color: white;
            box-shadow: 0 0 20px rgba(100, 116, 139, 0.4);
        }

        .btn-back:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 30px rgba(100, 116, 139, 0.6);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="title">Maze Challenge</div>
        
        <div class="maze-container">
            <div class="maze" id="maze"></div>
        </div>

        <div class="question-modal" id="questionModal">
            <div class="question-card">
                <div class="question-header">Checkpoint <span id="checkpointNumber">1</span></div>
                <div class="question-content">
                    <div class="question-type" id="questionType"></div>
                    <div class="question-text" id="questionText"></div>
                </div>
                <div class="question-nav">
                    <button class="btn btn-next" id="nextBtn">Next</button>
                    <button class="btn btn-back" id="backBtn" style="display: none;">Back to Maze</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        const maze = document.getElementById('maze');
        const modal = document.getElementById('questionModal');
        const checkpointNumber = document.getElementById('checkpointNumber');
        const questionType = document.getElementById('questionType');
        const questionText = document.getElementById('questionText');
        const nextBtn = document.getElementById('nextBtn');
        const backBtn = document.getElementById('backBtn');

        let currentQuestion = 0;
        let currentCheckpointNum = 0;
        const completedCheckpoints = new Set();

        const questions = [
            { type: "Robot Code", text: "" },
            { type: "Pseudo Code", text: "" },
            { type: "Game Learning", text: "" }
        ];

        // Maze layout: 0 = wall, 1 = path, 2 = start, 3 = end, 4-8 = checkpoints
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
        const checkpointPositions = {
            4: { x: 4, y: 1 },
            5: { x: 8, y: 1 },
            6: { x: 12, y: 1 },
            7: { x: 4, y: 5 },
            8: { x: 8, y: 7 }
        };

        function createMaze() {
            maze.innerHTML = '';
            for (let y = 0; y < mazeLayout.length; y++) {
                for (let x = 0; x < mazeLayout[y].length; x++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.dataset.x = x;
                    cell.dataset.y = y;

                    if (mazeLayout[y][x] === 0) {
                        cell.classList.add('wall');
                    } else if (mazeLayout[y][x] === 1) {
                        cell.classList.add('path');
                    } else if (mazeLayout[y][x] === 2) {
                        cell.classList.add('path', 'start');
                        cell.textContent = 'S';
                    } else if (mazeLayout[y][x] === 3) {
                        cell.classList.add('path', 'end');
                        cell.textContent = 'E';
                    } else if (mazeLayout[y][x] >= 4 && mazeLayout[y][x] <= 8) {
                        cell.classList.add('path', 'checkpoint');
                        cell.textContent = mazeLayout[y][x] - 3;
                        cell.dataset.checkpoint = mazeLayout[y][x] - 3;
                    }

                    if (x === playerPos.x && y === playerPos.y) {
                        cell.classList.add('player');
                    }

                    maze.appendChild(cell);
                }
            }
        }

        function movePlayer(dx, dy) {
            const newX = playerPos.x + dx;
            const newY = playerPos.y + dy;

            if (newY >= 0 && newY < mazeLayout.length && 
                newX >= 0 && newX < mazeLayout[0].length && 
                mazeLayout[newY][newX] !== 0) {
                
                playerPos.x = newX;
                playerPos.y = newY;

                const cellValue = mazeLayout[newY][newX];
                if (cellValue >= 4 && cellValue <= 8) {
                    const checkpointNum = cellValue - 3;
                    if (!completedCheckpoints.has(checkpointNum)) {
                        currentCheckpointNum = checkpointNum;
                        currentQuestion = 0;
                        showQuestion();
                    }
                }

                createMaze();
            }
        }

        function showQuestion() {
            modal.classList.add('active');
            checkpointNumber.textContent = currentCheckpointNum;
            questionType.textContent = questions[currentQuestion].type;
            questionText.textContent = questions[currentQuestion].text;

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
            if (currentQuestion < questions.length) {
                showQuestion();
            }
        });

        backBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            completedCheckpoints.add(currentCheckpointNum);
            createMaze();
        });

        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) return;

            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    movePlayer(0, -1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    movePlayer(0, 1);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    movePlayer(-1, 0);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    movePlayer(1, 0);
                    break;
            }
        });

        createMaze();
    </script>
</body>
</html>