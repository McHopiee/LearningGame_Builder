---
layout: base
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

        /* --- BADGE SYSTEM STYLES --- */
        .badge-shelf {
            display: flex;
            gap: 8px;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid rgba(6, 182, 212, 0.2);
            min-height: 40px;
            flex-wrap: wrap;
        }

        .badge-icon-small {
            width: 28px;
            height: 28px;
            background: rgba(6, 182, 212, 0.2);
            border: 1px solid rgba(6, 182, 212, 0.5);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        .badge-award-modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2000;
            background: rgba(15, 23, 42, 0.98);
            backdrop-filter: blur(20px);
            padding: 40px;
            border-radius: 30px;
            border: 2px solid #fbbf24;
            text-align: center;
            box-shadow: 0 0 80px rgba(251, 191, 36, 0.3);
            width: 320px;
        }

        .badge-award-modal h2 { color: #fbbf24; letter-spacing: 2px; margin-bottom: 15px; }
        
        #badgeAwardIconBig { font-size: 70px; margin: 20px 0; display: block; filter: drop-shadow(0 0 15px rgba(251,191,36,0.5)); }

        .flying-badge {
            position: fixed;
            z-index: 3000;
            font-size: 30px;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            pointer-events: none;
        }
        /* --- END BADGE SYSTEM STYLES --- */

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
            display: none; position: absolute; inset: 0; z-index: 90;
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

            /* AI Assistant Robot Styles */
    #help-bot-icon {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        z-index: 999;
        transition: all 0.3s ease;
        border: 2px solid rgba(255, 255, 255, 0.2);
        display: none; /* 默认隐藏，只在答题时显示 */
    }

    #help-bot-icon:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
    }

    #help-bot-icon.pulsing {
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
        100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
    }

   /* Hint Overlay Styles */
    #hint-overlay {
    display: none;
    position: fixed;
    top: 20px;
    right: 20px;
    width: 350px;   
    height: calc(100vh - 40px);
    max-height: 90vh;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(20px);
    border: 2px solid rgba(59, 130, 246, 0.4);
    border-radius: 16px;
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.25);
    z-index: 2;
    overflow-y: auto;
    padding: 0;
}

    #hint-overlay.active {
        display: flex;
    }

    .hint-card {
    width: 100%;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border: none;
    border-radius: 14px;
    padding: 20px;
    position: relative;
    animation: slideRight 0.3s ease-out;
    box-shadow: none;
    height: 100%;
    display: flex;
    flex-direction: column;
}

    @keyframes slideUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    .hint-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 25px;
    }

    .hint-robot-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
    }

    .hint-title {
        color: #60a5fa;
        font-size: 22px;
        font-weight: 700;
        margin: 0;
    }

    .hint-subtitle {
        color: #93c5fd;
        font-size: 14px;
        margin-top: 5px;
        font-family: 'Courier New', monospace;
    }

    .hint-content {
        margin: 25px 0;
    }

    .hint-section {
        background: rgba(30, 41, 59, 0.5);
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 20px;
    }

    .hint-section-title {
        color: #fbbf24;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .hint-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .hint-item {
        color: #e2e8f0;
        padding: 8px 0;
        padding-left: 25px;
        position: relative;
        line-height: 1.5;
    }

    .hint-item:before {
        content: "💡";
        position: absolute;
        left: 0;
        top: 8px;
    }

    .hint-item.unlocked {
        color: #a7f3d0;
    }

    .hint-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        gap: 15px;
    }

    .hint-btn {
        padding: 12px 24px;
        border-radius: 10px;
        border: none;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        flex: 1;
        text-align: center;
    }

    .hint-btn:hover {
        transform: translateY(-2px);
    }

    .hint-btn.primary {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
    }

    .hint-btn.secondary {
        background: rgba(30, 41, 59, 0.8);
        color: #e2e8f0;
        border: 1px solid #4b5563;
    }

    /* Sector Module Progress (Robot / Pseudocode / MCQ) */
        .sector-progress {
            display: flex;
            gap: 10px;
            margin: 10px 0 18px 0;
        }

        .sector-step {
            flex: 1;
            position: relative;
            padding: 10px 12px;
            border-radius: 14px;
            border: 1px solid rgba(6,182,212,0.25);
            background: rgba(2,6,23,0.5);
            color: rgba(103,232,249,0.65);
            font-family: 'Courier New', monospace;
            font-size: 11px;
            letter-spacing: 1px;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .sector-step::before {
            content: "";
            position: absolute;
            left: 0; top: 0; bottom: 0;
            width: 0%;
            background: linear-gradient(90deg, rgba(16,185,129,0.35), rgba(6,182,212,0.25));
            transition: width 220ms ease;
        }

        .sector-step.active {
            color: #e2e8f0;
            border-color: rgba(16,185,129,0.55);
            box-shadow: 0 0 16px rgba(16,185,129,0.18);
        }

        .sector-step.active::before { width: 100%; }

        .sector-step.completed {
            color: #e2e8f0;
            border-color: rgba(16,185,129,0.55);
        }

        .sector-step.completed::before { width: 100%; }

        .sector-step span {
            position: relative; /* keep text above the ::before fill */
            z-index: 1;
        }
    </style>

</head>
<body>
    <div class="stars" id="stars"></div>

    <!-- NEW: CENTERED BADGE POPUP -->
    <div id="badgeAwardModal" class="badge-award-modal">
        <h2 id="badgeAwardTitle">MODULE MASTER!</h2>
        <span id="badgeAwardIconBig">🏆</span>
        <p id="badgeAwardName" style="color: rgba(103,232,249,0.8); font-size: 14px; margin-bottom: 25px;">Logic Training Complete</p>
        <button class="btn btn-blue" id="claimBadgeBtn" style="width: 100%;">Claim Badge</button>
    </div>

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
            
            <!-- NEW: CUMULATIVE BADGE LIST NEAR PROGRESS BAR -->
            <div class="badge-shelf" id="badgeShelf">
                 <span style="color: rgba(103,232,249,0.3); font-size: 9px; letter-spacing: 1px;">EARNED_BADGES: [EMPTY]</span>
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
                <!-- Sector Module Progress -->
                <div class="sector-progress" id="sectorProgress">
                <div class="sector-step" data-step="0"><span>Robot Code</span></div>
                <div class="sector-step" data-step="1"><span>Pseudocode</span></div>
                <div class="sector-step" data-step="2"><span>MCQ</span></div>
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

    <!-- AI Assistant Robot -->
    <div id="help-bot-icon">🤖</div>

    <!-- Hint Overlay -->
    <div id="hint-overlay">
        <div class="hint-card">
            <div class="hint-header">
                <div class="hint-robot-icon">🤖</div>
                <div>
                    <h2 class="hint-title" id="hint-title">AI Assistant</h2>
                    <p class="hint-subtitle" id="hint-subtitle">Available hints for current question</p>
                </div>
            </div>
            
            <div class="hint-content">
                <div class="hint-section">
                    <h3 class="hint-section-title">Current Stop Overview</h3>
                    <p id="hint-overview" style="color: #e2e8f0; line-height: 1.6; margin: 0;"></p>
                </div>
                
                <div class="hint-section">
                    <h3 class="hint-section-title">Step-by-Step Hints</h3>
                    <ul class="hint-list" id="hint-steps"></ul>
                </div>
            </div>
            
            <div class="hint-actions">
                <button class="hint-btn secondary" id="prevHintBtn">← Previous Hint</button>
                <button class="hint-btn primary" id="closeHintBtn">Got It! Continue</button>
                <button class="hint-btn secondary" id="nextHintBtn">Next Hint →</button>
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

    // --- BADGE SYSTEM DATA ---
    let badgesEarned = []; // List of IDs e.g., ["S1-M0"]
    const badgeIcons = ["🤖", "📜", "🧠"]; // Robot, Pseudo, MCQ
    const badgeNames = ["Logic Pilot", "Syntax Architect", "Theory Master"];
    const badgeShelf = document.getElementById('badgeShelf');
    const badgeModal = document.getElementById('badgeAwardModal');
    const claimBtn = document.getElementById('claimBadgeBtn');


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
        // AI Assistant Elements
    const helpBotIcon = document.getElementById('help-bot-icon');
    const hintOverlay = document.getElementById('hint-overlay');
    const hintTitle = document.getElementById('hint-title');
    const hintSubtitle = document.getElementById('hint-subtitle');
    const hintOverview = document.getElementById('hint-overview');
    const hintSteps = document.getElementById('hint-steps');
    const prevHintBtn = document.getElementById('prevHintBtn');
    const nextHintBtn = document.getElementById('nextHintBtn');
    const closeHintBtn = document.getElementById('closeHintBtn');

    // Scoring and Game State
    let moduleAttempts = [0, 0, 0]; 
    const weights = [0.5, 0.3, 0.2]; 
    let currentSectorNum = 0;
    let currentQuestion = 0;
    const completedSectors = new Set();
    let usedAutofill = false; // Track if autofill was used

    const mazeLayout = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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

    // --- NEW: BADGE SYSTEM LOGIC (AP CSP PT REQUIREMENTS) ---

    /**
     * Procedure: awardBadge(sector, module)
     * Handles the logic of selecting the badge, showing the modal, and starting animation.
     */
    function awardBadge(s, m) {
        const id = `S${s}-M${m}`;
        
        // Selection: Check if badge is already earned
        if (badgesEarned.includes(id)) return;

        // Visual setup
        document.getElementById('badgeAwardIconBig').textContent = badgeIcons[m];
        document.getElementById('badgeAwardTitle').textContent = `${badgeNames[m].toUpperCase()} EARNED!`;
        document.getElementById('badgeAwardName').textContent = `Sector ${s} Module Completed Successfully.`;
        
        badgeModal.style.display = 'block';

        claimBtn.onclick = () => {
            badgesEarned.push(id);
            badgeModal.style.display = 'none';
            animateBadgeToShelf(badgeIcons[m]);
            updateBadgeUI(); // Call iteration procedure
            
            // Backend Update (Transactional Data Placeholder)
            updateBackendBadges(id, s, m);
        };
    }

    /**
     * Procedure: updateBadgeUI()
     * Uses Iteration to update the icons in the progress bar area.
     */
    function updateBadgeUI() {
        if (badgesEarned.length === 0) return;
        badgeShelf.innerHTML = ''; // Clear the empty placeholder
        
        // Iteration: Loop through the list of earned badges
        badgesEarned.forEach(badgeId => {
            const m = parseInt(badgeId.split('-M')[1]);
            const el = document.createElement('div');
            el.className = 'badge-icon-small';
            el.textContent = badgeIcons[m];
            el.title = badgeId;
            badgeShelf.appendChild(el);
        });
    }

    /**
     * Procedure: animateBadgeToShelf(icon)
     * Handles the "Fly" animation from center to top shelf.
     */
    function animateBadgeToShelf(icon) {
        const flyer = document.createElement('div');
        flyer.className = 'flying-badge';
        flyer.textContent = icon;
        flyer.style.left = '50%';
        flyer.style.top = '50%';
        flyer.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(flyer);

        const targetRect = badgeShelf.getBoundingClientRect();

        setTimeout(() => {
            flyer.style.left = targetRect.left + (badgesEarned.length * 20) + 'px';
            flyer.style.top = (targetRect.top + 10) + 'px';
            flyer.style.transform = 'scale(0.4)';
            flyer.style.opacity = '0';
        }, 50);

        setTimeout(() => flyer.remove(), 850);
    }

    async function updateBackendBadges(id, s, m) {
        try {
            await fetch(`${robopURI}/api/badges/award`, {
                ...window.authOptions,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ badge_id: id, sector: s, module: m })
            });
        } catch (e) { console.warn("Backend not ready: Mocking badge save."); }
    }

    // --- END BADGE SYSTEM LOGIC ---

    // Teacher Data with hints (provided by Rishabh)
    const teacherData = {
        1: {
            title: "Stop 1: Training",
            msg: "Robot Code: Robot code is a pseudocode-style language with four commands—MOVE_FORWARD(), ROTATE_LEFT(), ROTATE_RIGHT(), and CAN_MOVE(direction)—used to control a robot through a maze. Pseudocode: Use plain-language, step-by-step logic (variables, conditionals, loops, and logical flow) to describe how your algorithm should work before worrying about strict programming syntax. Computational thinking: break the problem into small rules, test your logic, and iterate based on what you observe.",
            hints: [
                [
                    "HINT 1: You need only one command for this task.",
                    "HINT 2: Use the MOVE_FORWARD() command.",
                    "HINT 3: Just write: MOVE_FORWARD()"
                ],
                [
                    "HINT 1: Initialize sum ← 0 before the loop",
                    "HINT 2: FOR EACH num IN nums, do sum ← sum + num",
                    "HINT 3: After loop, RETURN sum / LENGTH(nums)"
                ],
                [
                    "HINT 1: Binary is base-2 number system",
                    "HINT 2: Each digit represents a power of 2",
                    "HINT 3: 1101 = 1×8 + 1×4 + 0×2 + 1×1 = 13"
                ]
            ]
        },
        2: {
            title: "Stop 2: Training",
            msg: "Robot Code: Use simple, readable command blocks to control the robot and debug one movement decision at a time. Pseudocode: In the code runner, write College Board–level pseudocode solutions (conditionals, variables, algorithm development, and logical flow) and notice how different logical choices change the program's behavior as you progress through the maze. Computational thinking: practice structured problem-solving by tracing steps, checking edge cases, and improving your solution until it works.",
            hints: [
                [
                    "HINT 1: This requires a rotation command, not a movement command.",
                    "HINT 2: Use ROTATE_RIGHT() to turn the robot 90 degrees clockwise",
                    "HINT 3: Just write: ROTATE_RIGHT()"
                ],
                [
                    "HINT 1: Initialize count ← 0 before the loop",
                    "HINT 2: FOR EACH value IN nums, check IF value > threshold",
                    "HINT 3: When condition is true, do count ← count + 1",
                    "HINT 4: RETURN count after the loop completes"
                ],
                [
                    "HINT 1: AND logic requires both inputs to be true",
                    "HINT 2: Truth table: true AND true = true, others = false",
                    "HINT 3: Think of it like a strict requirement"
                ]
            ]
        },
        3: {
            title: "Stop 3: Training",
            msg: "Robot Code: Combine multiple commands (MOVE_FORWARD, ROTATE_LEFT, ROTATE_RIGHT) to navigate complex paths and use CAN_MOVE(direction) to check for obstacles before moving. Pseudocode: Apply variables and assignment operators to store values, then use conditional statements (IF-ELSE) to make decisions based on those values in your College Board–style solutions. Computational thinking: identify patterns in the maze, create reusable logic blocks, and test your algorithm with different scenarios to ensure it handles all possible paths.",
            hints: [
                [
                    "HINT 1: You need to move forward twice.",
                    "HINT 2: Use MOVE_FORWARD() two times in a row.",
                    "HINT 3: Write: MOVE_FORWARD() MOVE_FORWARD()"
                ],
                [
                    "HINT 1: Set max ← nums[1] (first element)",
                    "HINT 2: Loop through remaining elements starting at index 2",
                    "HINT 3: IF nums[i] > max, update max ← nums[i]",
                    "HINT 4: RETURN max after checking all elements"
                ],
                [
                    "HINT 1: Abstraction hides complex details",
                    "HINT 2: It focuses on essential features only",
                    "HINT 3: Like using a function without knowing implementation"
                ]
            ]
        },
        4: {
            title: "Stop 4: Training",
            msg: "Robot Code: Master complex navigation by chaining conditional checks with CAN_MOVE() and creating efficient movement sequences. Pseudocode: Implement loops (REPEAT and REPEAT UNTIL) to avoid repetitive code, and combine them with conditionals to create dynamic algorithms that adapt to changing conditions. Computational thinking: analyze the problem systematically, decompose it into smaller sub-problems, and optimize your solution by reducing redundant steps while maintaining correctness.",
            hints: [
                [
                    "HINT 1: This requires two commands in sequence: move, then rotate",
                    "HINT 2: First MOVE_FORWARD(), then ROTATE_LEFT()",
                    "HINT 3: Write: MOVE_FORWARD() ROTATE_LEFT()"
                ],
                [
                    "HINT 1: Use FOR i FROM 1 TO LENGTH(words) for index-based loop",
                    "HINT 2: Check IF words[i] = target",
                    "HINT 3: When match found, set words[i] ← replacement",
                    "HINT 4: RETURN words at the end"
                ],
                [
                    "HINT 1: IP stands for Internet Protocol",
                    "HINT 2: It handles routing of data packets",
                    "HINT 3: Like a postal system for internet data"
                ]
            ]
        },
        5: {
            title: "Stop 5: Training",
            msg: "Robot Code: Apply all four commands strategically to solve the most challenging maze configurations, planning your entire route before executing. Pseudocode: Create comprehensive algorithms using variables, conditionals, loops, and logical operators (AND, OR, NOT) that mirror real AP CSP exam questions. Computational thinking: demonstrate mastery by developing efficient, elegant solutions that show deep understanding of algorithm design, abstraction, and the relationship between pseudocode logic and actual program execution.",
            hints: [
                [
                    "HINT 1: You need to move forward three times.",
                    "HINT 2: Use MOVE_FORWARD() three times in a row.",
                    "HINT 3: Write: MOVE_FORWARD() MOVE_FORWARD() MOVE_FORWARD()"
                ],
                [
                    "HINT 1: Create evens ← empty list before loop",
                    "HINT 2: FOR EACH num IN nums, check IF num MOD 2 = 0",
                    "HINT 3: When num is even, use APPEND(evens, num)",
                    "HINT 4: RETURN evens after processing all numbers"
                ],
                [
                    "HINT 1: Heuristics are rule-of-thumb approaches",
                    "HINT 2: They provide good-enough solutions quickly",
                    "HINT 3: Like estimating instead of calculating exactly"
                ]
            ]
        }
    };

    // AI Assistant State
    let currentHintIndex = 0;
    let currentHintLevel = 0;
        // AI Assistant Functions
    function showHint() {
        if (!modal.classList.contains('active')) return;
        
        const sectorData = teacherData[currentSectorNum];
        if (!sectorData) return;
        
        // Reset hint state
        currentHintIndex = 0;
        currentHintLevel = 0;
        
        // Update hint overlay content
        hintTitle.textContent = `Sector ${currentSectorNum}: AI Assistant`;
        hintSubtitle.textContent = `Question ${currentQuestion + 1} of 3`;
        hintOverview.textContent = sectorData.msg;
        
        // Update hints based on current question
        updateHintDisplay();
        
        // Show overlay
        hintOverlay.classList.add('active');
        
        // Update button states
        updateHintButtons();
    }

    function updateHintDisplay() {
        const sectorData = teacherData[currentSectorNum];
        if (!sectorData || !sectorData.hints[currentQuestion]) return;
        
        const hints = sectorData.hints[currentQuestion];
        hintSteps.innerHTML = '';
        
        hints.forEach((hint, index) => {
            const li = document.createElement('li');
            li.className = `hint-item ${index <= currentHintLevel ? 'unlocked' : ''}`;
            li.textContent = hint;
            hintSteps.appendChild(li);
        });
    }

    function updateHintButtons() {
        const sectorData = teacherData[currentSectorNum];
        if (!sectorData || !sectorData.hints[currentQuestion]) return;
        
        const hints = sectorData.hints[currentQuestion];
        
        // Previous button
        prevHintBtn.disabled = currentHintLevel === 0;
        prevHintBtn.style.opacity = prevHintBtn.disabled ? '0.5' : '1';
        
        // Next button
        nextHintBtn.disabled = currentHintLevel >= hints.length - 1;
        nextHintBtn.style.opacity = nextHintBtn.disabled ? '0.5' : '1';
        
        // Update close button text
        closeHintBtn.textContent = currentHintLevel >= hints.length - 1 ? 
            'Got It! Continue' : 'Hide Hints';
    }

    function nextHint() {
        const sectorData = teacherData[currentSectorNum];
        if (!sectorData || !sectorData.hints[currentQuestion]) return;
        
        const hints = sectorData.hints[currentQuestion];
        if (currentHintLevel < hints.length - 1) {
            currentHintLevel++;
            updateHintDisplay();
            updateHintButtons();
        }
    }

    function prevHint() {
        if (currentHintLevel > 0) {
            currentHintLevel--;
            updateHintDisplay();
            updateHintButtons();
        }
    }

    function closeHint() {
        hintOverlay.classList.remove('active');
        // Reset hint level for next time
        currentHintLevel = 0;
    }

    // Add pulsing animation to bot icon when in question modal
    function updateBotIconVisibility() {
        if (modal.classList.contains('active') && currentQuestion < 3) {
            helpBotIcon.style.display = 'flex';
            helpBotIcon.classList.add('pulsing');
        } else {
            helpBotIcon.style.display = 'none';
            helpBotIcon.classList.remove('pulsing');
        }
}
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
        updateSectorModuleProgress();

        if (currentQuestion === 0) renderRobotSim();
        else if (currentQuestion === 1) await renderPseudoCode();
        else renderMCQ();

        nextBtn.style.display = currentQuestion < 2 ? 'block' : 'none';
        autofillBtn.style.display = currentQuestion < 2 ? 'block' : 'none';
        backBtn.style.display = currentQuestion === 2 ? 'block' : 'none';
        updateBotIconVisibility();
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

                // AWARD BADGE
                awardBadge(currentSectorNum, 0);
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

    function updateSectorModuleProgress() {
        const steps = document.querySelectorAll('#sectorProgress .sector-step');
        steps.forEach((el) => {
            const step = Number(el.dataset.step);
            el.classList.remove('active', 'completed');

            if (step < currentQuestion) el.classList.add('completed');
            if (step === currentQuestion) el.classList.add('active');
        });
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

                // AWARD BADGE
                awardBadge(currentSectorNum, 1);
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

                    // AWARD BADGE
                    awardBadge(currentSectorNum, 2);
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
        updateBotIconVisibility();
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
        updateBotIconVisibility();
    };

    document.addEventListener('keydown', e => {
        if (modal.classList.contains('active')) return;
        if (e.key === 'ArrowUp') movePlayer(0, -1);
        if (e.key === 'ArrowDown') movePlayer(0, 1);
        if (e.key === 'ArrowLeft') movePlayer(-1, 0);
        if (e.key === 'ArrowRight') movePlayer(1, 0);
    });
        // Event Listeners for AI Assistant
    helpBotIcon.addEventListener('click', showHint);
    prevHintBtn.addEventListener('click', prevHint);
    nextHintBtn.addEventListener('click', nextHint);
    closeHintBtn.addEventListener('click', closeHint);

    // Close hint overlay when clicking outside
    hintOverlay.addEventListener('click', (e) => {
        if (e.target === hintOverlay) {
            closeHint();
        }
    });
    // Initialize
    drawMaze();
    updateProgressBar();
    updateBotIconVisibility();
    updateBadgeUI();