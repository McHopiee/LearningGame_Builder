---
layout: page
title: Maze - Ending Page
authors: Rishabh
permalink: /learninggame/ending/
---

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mission Complete</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    html, body {
      height: auto !important;
      min-height: 100% !important;
      overflow-y: auto !important;
      overscroll-behavior-y: auto;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%);
      color: #e2e8f0;
      min-height: 100vh;
      display: block;
      padding: 30px;
      position: relative;
      overflow-y: auto !important;
      overflow-x: hidden !important;
    }

    main, .page-content, .wrapper, .container, #main {
      height: auto !important;
      max-height: none !important;
      overflow: visible !important;
    }
    
    .stars { 
      position: fixed; 
      inset: 0; 
      overflow: hidden; 
      z-index: 0; 
    }
    
    .star { 
      position: absolute; 
      width: 2px; 
      height: 2px; 
      background: white; 
      border-radius: 50%; 
      animation: twinkle 3s infinite; 
    }
    
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
    
    body::before {
      content: ''; 
      position: fixed; 
      top: 10%; 
      left: 10%; 
      width: 500px; 
      height: 500px;
      background: radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%);
      filter: blur(80px); 
      z-index: 0;
    }

    body::after {
      content: ''; 
      position: fixed; 
      bottom: 10%; 
      right: 10%; 
      width: 500px; 
      height: 500px;
      background: radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%);
      filter: blur(80px); 
      z-index: 0;
    }
    
    .end-container {
      width: min(1100px, 95vw);
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      border: 2px solid rgba(59, 130, 246, 0.4);
      box-shadow: 0 0 60px rgba(37, 99, 235, 0.25);
      padding: 30px;
      position: relative;
      overflow: hidden;
      z-index: 1;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid rgba(6,182,212,0.3);
    }
    .title-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .title-icon {
      font-size: 32px;
    }
    .title {
      font-size: 28px;
      font-weight: 900;
      color: #06b6d4;
      text-transform: uppercase;
      letter-spacing: 4px;
    }
    .subtitle {
      color: rgba(148, 163, 184, 0.9);
      font-size: 14px;
      font-family: 'Courier New', monospace;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .card {
      background: rgba(2, 6, 23, 0.7);
      border: 1px solid rgba(148, 163, 184, 0.25);
      border-radius: 16px;
      padding: 18px;
      transition: all 0.3s ease;
    }
    .card:hover {
      border-color: rgba(6, 182, 212, 0.4);
      box-shadow: 0 0 20px rgba(6, 182, 212, 0.15);
      transform: translateY(-2px);
    }
    .card h3 {
      color: #fbbf24;
      margin-bottom: 12px;
      font-size: 16px;
      letter-spacing: 1px;
    }
    .helper-text {
      color: #94a3b8;
      font-size: 13px;
      margin: -4px 0 12px;
      line-height: 1.4;
    }
    .badge-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
      text-align: center;
    }
    .badge {
      background: rgba(30, 41, 59, 0.8);
      border: 1px dashed rgba(148, 163, 184, 0.4);
      padding: 12px;
      border-radius: 12px;
      font-size: 20px;
      min-height: 70px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;
      justify-content: center;
    }
    .badge span {
      font-size: 11px;
      color: #94a3b8;
    }
    .badge.earned {
      border-color: rgba(34, 197, 94, 0.6);
      box-shadow: 0 0 14px rgba(34, 197, 94, 0.3);
      animation: badgePulse 2s ease-in-out infinite;
    }
    
    @keyframes badgePulse {
      0%, 100% { box-shadow: 0 0 14px rgba(34, 197, 94, 0.3); }
      50% { box-shadow: 0 0 24px rgba(34, 197, 94, 0.5); }
    }
    .attempts-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    .attempts-table th,
    .attempts-table td {
      border-bottom: 1px solid rgba(148, 163, 184, 0.2);
      padding: 8px 4px;
      text-align: left;
    }
    .attempts-table th {
      color: #93c5fd;
      font-weight: 700;
    }
    .score-summary {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 15px;
    }
    .score-pill {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3));
      color: #93c5fd;
      padding: 10px 18px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      width: fit-content;
      font-weight: 900;
      font-size: 18px;
      border: 1px solid rgba(6, 182, 212, 0.4);
      box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);
    }
    .code-runner {
      background: #020617;
      border: 1px solid rgba(59, 130, 246, 0.35);
      border-radius: 12px;
      padding: 14px;
    }
    textarea {
      width: 100%;
      min-height: 140px;
      background: #0f172a;
      color: #38bdf8;
      border: 1px solid rgba(59, 130, 246, 0.4);
      border-radius: 10px;
      padding: 12px;
      font-family: 'Courier New', monospace;
      font-size: 13px;
    }
    .btn-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 16px;
    }
    .btn {
      padding: 10px 16px;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      font-weight: 800;
      text-transform: uppercase;
    }
    .btn-primary { background: #3b82f6; color: white; }
    .btn-secondary { background: #10b981; color: white; }
    .btn-ghost { background: transparent; border: 1px solid rgba(148, 163, 184, 0.3); color: #e2e8f0; }
    .btn:hover { opacity: 0.9; transform: translateY(-1px); transition: all 0.2s; }
    
    .status {
      margin-top: 10px;
      min-height: 20px;
      font-weight: 700;
      white-space: pre-line;
    }
    .status.ok { color: #22c55e; }
    .status.err { color: #f87171; }
    .loader {
      padding: 14px;
      background: rgba(15, 23, 42, 0.9);
      border-radius: 10px;
      text-align: center;
      font-size: 14px;
      border: 1px solid rgba(59, 130, 246, 0.3);
    }
    .error-banner {
      background: rgba(248, 113, 113, 0.15);
      border: 1px solid rgba(248, 113, 113, 0.4);
      color: #fecaca;
      padding: 12px;
      border-radius: 10px;
      margin-bottom: 12px;
      display: none;
    }
    .coach-steps {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 8px;
    }
    .coach-step {
      background: rgba(2, 6, 23, 0.6);
      border: 1px solid rgba(148, 163, 184, 0.25);
      border-radius: 10px;
      padding: 10px 12px;
      font-size: 13px;
      line-height: 1.4;
      color: #e2e8f0;
      opacity: 0.5;
      transition: all 0.2s ease;
    }
    .coach-step.active {
      opacity: 1;
      border-color: rgba(34, 197, 94, 0.6);
      box-shadow: 0 0 14px rgba(34, 197, 94, 0.2);
    }
    .chat-panel {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .chat-log {
      min-height: 180px;
      max-height: 260px;
      overflow-y: auto;
      background: rgba(2, 6, 23, 0.6);
      border: 1px solid rgba(148, 163, 184, 0.25);
      border-radius: 12px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 13px;
    }
    .chat-bubble {
      padding: 8px 10px;
      border-radius: 10px;
      max-width: 90%;
      line-height: 1.4;
    }
    .chat-user {
      background: rgba(59, 130, 246, 0.2);
      border: 1px solid rgba(59, 130, 246, 0.4);
      align-self: flex-end;
      color: #bfdbfe;
    }
    .chat-ai {
      background: rgba(16, 185, 129, 0.18);
      border: 1px solid rgba(16, 185, 129, 0.35);
      align-self: flex-start;
      color: #bbf7d0;
      white-space: pre-line;
    }
    .chat-input {
      display: flex;
      gap: 8px;
    }
    .chat-input input {
      flex: 1;
      background: #0f172a;
      color: #e2e8f0;
      border: 1px solid rgba(59, 130, 246, 0.4);
      border-radius: 10px;
      padding: 10px 12px;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="stars" id="stars"></div>

  <div class="end-container">
    <div class="header">
      <div>
        <div class="title-header">
          <div class="title-icon">🏆</div>
          <div class="title">Mission Complete</div>
        </div>
        <div class="subtitle">End-of-Game Summary // Syncing Progress</div>
      </div>
      <div class="score-pill" id="scorePill">Score: --</div>
    </div>

    <div class="error-banner" id="errorBanner"></div>

    <div class="grid">
      <div class="card">
        <h3>Earned Badges</h3>
        <div class="badge-grid" id="badgeGrid">
          <div class="loader">Loading badges...</div>
        </div>
      </div>

      <div class="card">
        <h3>Attempts &amp; Timestamps</h3>
        <div id="attemptsWrap">
          <div class="loader">Loading attempts...</div>
        </div>
      </div>

      <div class="card">
        <h3>Score Summary</h3>
        <div class="score-summary" id="scoreSummary">
          <div class="loader">Loading score...</div>
        </div>
      </div>

      <div class="card" style="grid-column: 1 / -1;">
        <h3>Final Code Answer</h3>
        <p class="helper-text">To earn the mastery, you need to do the following:
You begin by deciding what the final result should represent. You gather every action the player made in the order they happened.
You then create a loop that runs once for each action. Each time the loop runs, you read the current action, determine what it means, and update the final result. Make sure the loop should run one action to get the badge.
You continue looping until there are no actions left. When the loop ends, you output the final result
</p>
        <div class="code-runner">
          <textarea id="finalAnswer" placeholder="Enter your final algorithm here..."></textarea>
          <div class="btn-row">
            <button class="btn btn-primary" id="submitAnswer">Validate Answer</button>
            <button class="btn btn-ghost" id="clearAnswer">Clear</button>
          </div>
          <div class="status" id="answerStatus"></div>
        </div>
      </div>

      <div class="card">
        <h3>Step-by-Step Coach</h3>
        <p class="helper-text">This replaces full code examples. Follow the steps like a mini video script to build your own solution.</p>
        <div class="coach-steps" id="coachSteps"></div>
        <div class="btn-row">
          <button class="btn btn-secondary" id="startCoach">▶ Start Steps</button>
          <button class="btn btn-ghost" id="resetCoach">⏹ Reset</button>
        </div>
      </div>

      <div class="card">
        <h3>AI Help Chat</h3>
        <p class="helper-text">Ask for hints or feedback. The AI will guide you without giving away the full answer.</p>
        <div class="chat-panel">
          <div class="chat-log" id="chatLog"></div>
          <div class="chat-input">
            <input id="chatInput" type="text" placeholder="Ask for help (e.g., 'How do I add a loop?')" />
            <button class="btn btn-primary" id="sendChat">Send</button>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-row" style="margin-top: 24px;">
      <button class="btn btn-secondary" id="playAgainBtn">🔄 Play Again</button>
      <a class="btn btn-ghost" href="{{ '/' | relative_url }}">🏠 Return to Home</a>
      <a class="btn btn-primary" href="{{ '/media/leaderboard' | relative_url }}">🏆 View Leaderboard</a>
    </div>
  </div>

  <script type="module">
    import { getRobopURI, fetchOptions } from '{{ "/assets/js/api/config.js" | relative_url }}?v=20260128_1';

    const robopURI = await getRobopURI();
    const API_URL = `${robopURI}/api/robop`;
    
    // Backend endgame API
    const endgameApiBase = `${robopURI}/api/endgame`;
    let backendAvailable = true;
    
    window.ENDGAME_API_BASE = endgameApiBase;
    window.API_URL = API_URL;
    window.authOptions = fetchOptions;

    const params = new URLSearchParams(window.location.search);
    let playerId = params.get('playerId') || localStorage.getItem('learninggame_player_id');
    // For demo/testing, use a known player ID that exists in backend
    // The backend seeds a demo player with ID 1
    if (!playerId) {
      playerId = 1; // Use the seeded demo player
      localStorage.setItem('learninggame_player_id', playerId);
      console.log('Using demo player ID:', playerId);
    }

    // Star Field Initialization
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      starsContainer.appendChild(star);
    }

    const badgeGrid = document.getElementById('badgeGrid');
    const attemptsWrap = document.getElementById('attemptsWrap');
    const scoreSummary = document.getElementById('scoreSummary');
    const scorePill = document.getElementById('scorePill');
    const errorBanner = document.getElementById('errorBanner');
    const answerStatus = document.getElementById('answerStatus');

    const badgeIcons = {
      Gold: '🥇',
      Silver: '🥈',
      Bronze: '🥉',
      Participant: '🎖️',
      Master: '🏅',
      Final: '🏅'
    };

    function normalizeStopId(value) {
      if (value === 'final' || value === 'Final') return 'final';
      if (value === 6 || value === '6') return 'final';
      const num = Number(value);
      return Number.isFinite(num) ? num : value;
    }

    function showError(message) {
      errorBanner.textContent = message;
      errorBanner.style.display = 'block';
    }

    function clearError() {
      errorBanner.style.display = 'none';
      errorBanner.textContent = '';
    }

    async function fetchJson(url, options = {}) {
      const res = await fetch(url, {
        ...window.authOptions,
        method: options.method || 'GET',
        headers: { 
          'Content-Type': 'application/json',
          ...(window.authOptions.headers || {})
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
      }
      return res.json();
    }

    async function tryFetchBackend(url, options = {}) {
      if (!backendAvailable) return null;
      try {
        const res = await fetch(url, options);
        if (!res.ok) return null;
        return res.json();
      } catch (err) {
        backendAvailable = false;
        return null;
      }
    }

    function renderBadges(badges) {
      const slots = [
        { id: 1, label: 'Stop 1' },
        { id: 2, label: 'Stop 2' },
        { id: 3, label: 'Stop 3' },
        { id: 4, label: 'Stop 4' },
        { id: 5, label: 'Stop 5' },
        { id: 'final', label: 'Final' }
      ];
      badgeGrid.innerHTML = '';
      slots.forEach((slot) => {
        const badge = badges.find((b) => normalizeStopId(b.stopId) === slot.id);
        const el = document.createElement('div');
        el.className = 'badge' + (badge ? ' earned' : '');
        el.innerHTML = `
          <div>${badge ? (badgeIcons[badge.badgeName] || '⭐') : '🔒'}</div>
          <strong>${slot.label}</strong>
          <span>${badge ? badge.badgeName : 'Not earned'}</span>
        `;
        badgeGrid.appendChild(el);
      });
    }

    function mergeBadges(primary, secondary) {
      const map = new Map();
      (secondary || []).forEach((b) => map.set(b.stopId, b));
      (primary || []).forEach((b) => map.set(b.stopId, b));
      return Array.from(map.values());
    }

    function renderAttempts(progress) {
      if (!progress.length) {
        attemptsWrap.innerHTML = '<div class="loader">No attempts recorded yet.</div>';
        return;
      }
      const rows = progress.map((item) => `
        <tr>
          <td>Stop ${item.stopId}</td>
          <td>${item.attempts}</td>
          <td>${item.score.toFixed(1)}%</td>
          <td>${new Date(item.completedAt).toLocaleString()}</td>
        </tr>
      `).join('');
      attemptsWrap.innerHTML = `
        <table class="attempts-table">
          <thead>
            <tr>
              <th>Stop</th>
              <th>Attempts</th>
              <th>Score</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }

    function renderScore(summary, perStop) {
      const totalScore = summary?.totalScore ?? 0;
      const avgScore = perStop.length > 0 
        ? perStop.reduce((sum, p) => sum + (p.score || 0), 0) / perStop.length 
        : totalScore;
      
      scorePill.textContent = `Total Score: ${Number(avgScore).toFixed(1)}%`;
      
      const completedCount = perStop.length;
      const totalStops = 5;
      const completionRate = ((completedCount / totalStops) * 100).toFixed(0);
      
      scoreSummary.innerHTML = `
        <div style="display: flex; justify-content: space-between;">
          <span>Stops Completed:</span>
          <strong style="color: #10b981;">${completedCount} / ${totalStops}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Completion Rate:</span>
          <strong style="color: #fbbf24;">${completionRate}%</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Average Score:</span>
          <strong style="color: #06b6d4;">${Number(avgScore).toFixed(1)}%</strong>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 10px; border-top: 1px solid rgba(148, 163, 184, 0.2);">
          <span>Last Updated:</span>
          <strong style="font-size: 11px;">${summary?.updatedAt ? new Date(summary.updatedAt).toLocaleString() : new Date().toLocaleString()}</strong>
        </div>
      `;
    }

    async function loadData() {
      console.log('Loading data for player:', playerId);
      clearError();
      
      // First, always load and display localStorage data
      const localProgress = JSON.parse(localStorage.getItem('learninggame_progress') || '{}');
      const progressArray = Object.values(localProgress).sort((a, b) => a.stopId - b.stopId);
      const savedAnswerRaw = localStorage.getItem('learninggame_final_answer');
      const savedAnswer = savedAnswerRaw ? JSON.parse(savedAnswerRaw) : null;
      
      console.log('Local progress:', progressArray);
      
      // Render localStorage data immediately
      let localBadges = [];
      if (progressArray.length > 0) {
        localBadges = progressArray.map(p => ({
          stopId: p.stopId,
          badgeName: p.badgeName || 'Earned',
          score: p.score
        }));
        if (savedAnswer?.isCorrect) {
          localBadges.push({ stopId: 'final', badgeName: 'Master', score: 100 });
        }
        renderBadges(localBadges);
        renderAttempts(progressArray);
        
        const totalScore = progressArray.reduce((sum, p) => sum + (p.score || 0), 0) / progressArray.length;
        renderScore({ 
          totalScore, 
          updatedAt: progressArray[progressArray.length - 1]?.completedAt || new Date().toISOString() 
        }, progressArray);
      } else {
        // Show empty state with placeholders
        renderBadges([]);
        attemptsWrap.innerHTML = '<div style="padding: 14px; color: #94a3b8; text-align: center;">No progress yet. Start the maze to earn badges!</div>';
        renderScore({ totalScore: 0, updatedAt: new Date().toISOString() }, []);
      }
      
      // Then try to fetch from backend (non-blocking)
      if (backendAvailable) {
        console.log(`Fetching from backend: ${endgameApiBase}/player/${playerId}/score`);
        const scoreRes = await tryFetchBackend(`${endgameApiBase}/player/${playerId}/score`);
        
        if (scoreRes && scoreRes.success) {
          console.log('Backend response:', scoreRes);
          
          // Update badges from backend
          if (scoreRes.earned_badges && scoreRes.earned_badges.length > 0) {
            const backendBadges = scoreRes.earned_badges.map(b => ({
              stopId: b.badge_id,
              badgeName: b.badge_name,
              score: 100,
              attempts: b.attempts
            }));
            console.log('Updating with backend badges:', backendBadges);
            renderBadges(mergeBadges(localBadges, backendBadges));
          }
          
          // Update attempts from backend
          if (scoreRes.attempts_by_badge && scoreRes.attempts_by_badge.length > 0) {
            const backendAttempts = scoreRes.attempts_by_badge.map(b => ({
              stopId: b.badge_id,
              attempts: b.attempts,
              score: 100,
              completedAt: b.timestamp
            }));
            console.log('Updating with backend attempts:', backendAttempts);
            renderAttempts(backendAttempts);
          }
          
          // Update score display
          const totalBadges = scoreRes.earned_badges?.length || 0;
          const avgScore = totalBadges > 0 ? 100 : 0;
          renderScore({ 
            totalScore: avgScore, 
            updatedAt: new Date().toISOString() 
          }, scoreRes.attempts_by_badge || []);
        } else {
          console.log('No backend data or player not found');
        }
      }

      // Check for saved final answer
      if (savedAnswerRaw) {
        try {
          const answerData = savedAnswer;
          document.getElementById('finalAnswer').value = answerData.answer || '';
          if (answerData.isCorrect !== undefined) {
            answerStatus.className = `status ${answerData.isCorrect ? 'ok' : 'err'}`;
            if (answerData.isCorrect) {
              answerStatus.textContent = 'Correct ✅';
            } else {
              answerStatus.textContent = `Incorrect ❌${answerData.message ? ` ${answerData.message}` : ''}`;
            }
          }
        } catch (e) {
          console.warn('Failed to parse saved answer:', e);
        }
      }
    }

    function generateAiFeedback(answer, checks, backendMessage = '') {
      const steps = [];
      if (!checks.hasFunction) steps.push('Define a function name that describes the task. Example pattern: name(input) { ... }');
      if (!checks.hasConditional) steps.push('Add decision logic: when a condition is true do A, otherwise do B.');
      if (!checks.hasLoop) steps.push('Repeat over steps: use a loop to handle each item one-by-one.');
      if (!checks.hasMinimumLength) steps.push('Add clear, ordered steps so the algorithm is complete.');

      if (steps.length === 0) {
        steps.push('Clarify your steps with sequence, selection, and iteration.');
      }

      const header = 'AI feedback: Your answer is incorrect.';
      const detail = backendMessage ? `Backend says: ${backendMessage}` : 'Missing required algorithm elements.';
      const guide = steps.map((step, index) => `${index + 1}. ${step}`).join('\n');
      const miniScript = [
        'Mini walkthrough (no full code):',
        '1) Name the function and list inputs.',
        '2) Start a loop to process each step.',
        '3) Inside the loop, use if/else to choose what to do.',
        '4) Update a result variable.',
        '5) Return the result at the end.'
      ].join('\n');

      return `${header}\n${detail}\nStep-by-step fix:\n${guide}\n\n${miniScript}`;
    }

    const coachSteps = [
      'Step 1: Pick a function name that explains the goal (e.g., evaluateMoves, calculateScore).',
      'Step 2: Decide what input data your function needs (like a list of steps).',
      'Step 3: Start a loop to process each item in order.',
      'Step 4: Use an if/else decision inside the loop to handle different cases.',
      'Step 5: Update a result variable (score, count, path).',
      'Step 6: Return the result at the end.'
    ];

    const coachContainer = document.getElementById('coachSteps');
    let coachIndex = 0;
    let coachTimer = null;

    function renderCoachSteps(activeIndex = -1) {
      coachContainer.innerHTML = '';
      coachSteps.forEach((step, index) => {
        const el = document.createElement('div');
        el.className = `coach-step${index === activeIndex ? ' active' : ''}`;
        el.textContent = step;
        coachContainer.appendChild(el);
      });
    }

    function startCoachSteps() {
      clearInterval(coachTimer);
      coachIndex = 0;
      renderCoachSteps(coachIndex);
      coachTimer = setInterval(() => {
        coachIndex += 1;
        if (coachIndex >= coachSteps.length) {
          clearInterval(coachTimer);
          renderCoachSteps(coachSteps.length - 1);
          return;
        }
        renderCoachSteps(coachIndex);
      }, 1600);
    }

    function resetCoachSteps() {
      clearInterval(coachTimer);
      coachIndex = 0;
      renderCoachSteps(-1);
    }

    renderCoachSteps(-1);

    const chatLog = document.getElementById('chatLog');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');

    function appendChatBubble(text, type) {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${type}`;
      bubble.textContent = text;
      chatLog.appendChild(bubble);
      chatLog.scrollTop = chatLog.scrollHeight;
    }

    const GEMINI_API_KEY = window.GEMINI_API_KEY || 'AIzaSyA9IdSK4fMKRC0PSpm3BaoCBJRH2htIc4c';
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
    const MAX_CHAT_TURNS = 8;
    const chatHistory = [];

    function addChatHistory(role, text) {
      chatHistory.push({ role, text });
      if (chatHistory.length > MAX_CHAT_TURNS * 2) {
        chatHistory.splice(0, chatHistory.length - MAX_CHAT_TURNS * 2);
      }
    }

    function buildChatContext() {
      const progress = JSON.parse(localStorage.getItem('learninggame_progress') || '{}');
      const finalAnswer = JSON.parse(localStorage.getItem('learninggame_final_answer') || '{}');
      const progressList = Object.values(progress)
        .map(p => `${p.stopId}: ${p.badgeName || 'N/A'} (${p.score || 0})`)
        .slice(0, 6)
        .join(', ');
      const savedAnswerPreview = finalAnswer.answer ? finalAnswer.answer.slice(0, 120) : '';
      return [
        `PlayerId: ${playerId || 'unknown'}`,
        `Progress: ${progressList || 'no progress yet'}`,
        `Final answer preview: ${savedAnswerPreview || 'none'}`,
        'Rules: give hints and steps, not full code.'
      ].join('\n');
    }

    let aiFallbackIndex = 0;
    const aiFallbacks = [
      'Tell me your goal in one sentence (e.g., "count safe steps" or "calculate score"). I will break it into steps.',
      'Try this structure: define inputs → loop through steps → decide with if/else → update result → return.',
      'Share the parts you already have (function, loop, conditional). I will fill the missing piece.',
      'If you want an example, I can give a pseudo-code outline without full code.'
    ];

    function aiFallbackReply(userText) {
      const text = String(userText || '').toLowerCase();
      if (text.includes('example') || text.includes('code')) {
        return 'I can’t give full code, but here’s a safe outline: function name + inputs → loop through items → if/else decision → update a result → return it.';
      }
      if (text.includes('loop')) {
        return 'Pick a loop type (for/while). Decide what repeats and when to stop. Example: repeat for each step in a list.';
      }
      if (text.includes('if') || text.includes('condition')) {
        return 'Use if/else to choose between two actions. Write the condition in plain English first, then translate it.';
      }
      if (text.includes('function')) {
        return 'Start with a clear function name and inputs. Then add the loop and decision logic inside.';
      }
      if (text.includes('score') || text.includes('result')) {
        return 'Create a result variable before the loop, update it inside, and return it after the loop.';
      }
      if (text.includes('help') || text.includes('hint')) {
        return 'Tell me which part is missing: function, loop, or conditional. I will guide just that part.';
      }
      const reply = aiFallbacks[aiFallbackIndex % aiFallbacks.length];
      aiFallbackIndex += 1;
      return reply;
    }

    async function aiReply(userText) {
      if (!GEMINI_API_KEY) {
        return aiFallbackReply(userText);
      }

      const systemPrompt = [
        'You are Maze Mentor, a friendly programming coach for students.',
        'Base your help on the player\'s journey (their progress, choices, and attempts).',
        'Ask focused questions that reference what they did or learned, not generic prompts.',
        'Give short, clear guidance and step-by-step hints.',
        'Do not provide full solutions or full code; use outlines or pseudocode.',
        'Ask one clarifying question if needed.',
        'Keep responses under 6 sentences.'
      ].join(' ');

      const context = buildChatContext();
      const contents = [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nContext:\n${context}` }] },
        ...chatHistory.map(item => ({ role: item.role, parts: [{ text: item.text }] }))
      ];

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 240
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return reply || aiFallbackReply(userText);
    }

    async function refreshScore() {
      if (!playerId) return;
      try {
        const scoreRes = await tryFetchBackend(`${endgameApiBase}/player/${playerId}/score`);
        
        if (scoreRes && scoreRes.success) {
          const totalBadges = scoreRes.earned_badges?.length || 0;
          const avgScore = totalBadges > 0 ? 100 : 0;
          renderScore({ 
            totalScore: avgScore, 
            updatedAt: new Date().toISOString() 
          }, scoreRes.attempts_by_badge || []);
        }
      } catch (err) {
        // Fallback to localStorage
        const localProgress = JSON.parse(localStorage.getItem('learninggame_progress') || '{}');
        const progressArray = Object.values(localProgress).sort((a, b) => a.stopId - b.stopId);
        if (progressArray.length > 0) {
          const totalScore = progressArray.reduce((sum, p) => sum + (p.score || 0), 0) / progressArray.length;
          renderScore({ totalScore, updatedAt: new Date().toISOString() }, progressArray);
        }
      }
    }

    document.getElementById('submitAnswer').addEventListener('click', async () => {
      const answer = document.getElementById('finalAnswer').value.trim();
      if (!answer) {
        answerStatus.className = 'status err';
        answerStatus.textContent = 'Enter your final answer before validating.';
        return;
      }
      answerStatus.className = 'status';
      answerStatus.textContent = 'Checking...';
      
      try {
        // Try backend validation first
        let isCorrect = false;
        let message = '';
        let aiFeedback = '';
        
        try {
          if (!backendAvailable) throw new Error('Backend unavailable');
          console.log('Submitting to backend:', `${endgameApiBase}/player/${playerId}/final-check`);
          const res = await tryFetchBackend(`${endgameApiBase}/player/${playerId}/final-check`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer })
          });
          if (!res) throw new Error('Backend response unavailable');
          
          isCorrect = res.correct || false;
          if (!isCorrect) {
            const steps = Array.isArray(res.steps) && res.steps.length
              ? res.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')
              : '';
            const baseMessage = res.message || 'Answer is incorrect.';
            message = steps ? `${baseMessage}\nStep-by-step fix:\n${steps}` : baseMessage;
          } else {
            message = res.message || '';
          }
          console.log('Backend validation result:', res);
        } catch (backendError) {
          console.warn('Backend validation unavailable, using client-side validation:', backendError);
          
          // Simple client-side validation as fallback
          // Check for common algorithm patterns
          const checks = {
            hasLoop: /for\s+each|foreach|for|while/.test(answer.toLowerCase()),
            hasConditional: /if|switch|case/.test(answer.toLowerCase()),
            hasFunction: /function|=>|\(.*\)\s*{|procedure\s+\w+/i.test(answer),
            hasMinimumLength: answer.length > 50
          };
          
          isCorrect = checks.hasLoop && checks.hasConditional && checks.hasFunction && checks.hasMinimumLength;
          message = isCorrect ? 'Valid algorithm structure detected' : 'Algorithm should include loops, conditionals, and function definition';
          if (!isCorrect) {
            aiFeedback = generateAiFeedback(answer, checks);
          }
        }

        if (!isCorrect && !aiFeedback) {
          const checks = {
            hasLoop: /for\s+each|foreach|for|while/.test(answer.toLowerCase()),
            hasConditional: /if|switch|case/.test(answer.toLowerCase()),
            hasFunction: /function|=>|\(.*\)\s*{|procedure\s+\w+/i.test(answer),
            hasMinimumLength: answer.length > 50
          };
          aiFeedback = generateAiFeedback(answer, checks, message);
        }
        
        // Save to localStorage
        localStorage.setItem('learninggame_final_answer', JSON.stringify({
          answer,
          isCorrect,
          message: aiFeedback || message,
          timestamp: new Date().toISOString()
        }));
        
        answerStatus.className = `status ${isCorrect ? 'ok' : 'err'}`;
        if (isCorrect) {
          answerStatus.textContent = 'Correct ✅';
        } else {
          answerStatus.textContent = `Incorrect ❌ ${aiFeedback || message}`;
        }
        
        // Update final score in localStorage if correct
        if (isCorrect) {
          const progress = JSON.parse(localStorage.getItem('learninggame_progress') || '{}');
          progress.final = {
            stopId: 'final',
            score: 100,
            attempts: 1,
            badgeName: 'Master',
            completedAt: new Date().toISOString()
          };
          localStorage.setItem('learninggame_progress', JSON.stringify(progress));
          
          // Refresh display
          setTimeout(() => loadData(), 500);
        }
      } catch (err) {
        console.error('Validation error:', err);
        answerStatus.className = 'status err';
        answerStatus.textContent = 'Validation failed. Try again.';
      }
    });

    document.getElementById('clearAnswer').addEventListener('click', () => {
      document.getElementById('finalAnswer').value = '';
      answerStatus.textContent = '';
      answerStatus.className = 'status';
    });

    document.getElementById('startCoach').addEventListener('click', startCoachSteps);
    document.getElementById('resetCoach').addEventListener('click', resetCoachSteps);

    async function handleSendChat() {
      if (!chatInput || !chatLog) return;
      const message = chatInput.value.trim();
      if (!message) return;
      appendChatBubble(message, 'chat-user');
      chatInput.value = '';
      try {
        addChatHistory('user', message);
        const typingBubble = appendChatBubble('Thinking...', 'chat-ai');
        const reply = await aiReply(message);
        addChatHistory('model', reply);
        typingBubble.textContent = reply;
      } catch (e) {
        const fallback = aiFallbackReply(message);
        appendChatBubble(fallback, 'chat-ai');
      }
    }

    if (chatLog && chatInput && sendChat) {
      appendChatBubble('Hi! Tell me your goal and I will guide the steps (no full code).', 'chat-ai');
      sendChat.addEventListener('click', handleSendChat);
      chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          handleSendChat();
        }
      });
    }

    document.getElementById('playAgainBtn').addEventListener('click', () => {
      if (confirm('This will reset your progress and start a new game. Continue?')) {
        // Clear game progress but keep player ID
        localStorage.removeItem('learninggame_progress');
        localStorage.removeItem('learninggame_final_answer');
        localStorage.removeItem('learninggame_last_end');
        
        // Generate new player ID for new session
        const newPlayerId = `player-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`;
        localStorage.setItem('learninggame_player_id', newPlayerId);
        
        // Redirect to game start
        window.location.href = '{{ "/learninggame/home" | relative_url }}';
      }
    });

    function forceScroll() {
      const html = document.documentElement;
      if (html) {
        html.style.setProperty('overflow-y', 'auto', 'important');
        html.style.setProperty('overflow-x', 'hidden', 'important');
        html.style.setProperty('height', 'auto', 'important');
        html.style.setProperty('max-height', 'none', 'important');
      }
      if (document.body) {
        document.body.style.setProperty('overflow-y', 'auto', 'important');
        document.body.style.setProperty('overflow-x', 'hidden', 'important');
        document.body.style.setProperty('height', 'auto', 'important');
        document.body.style.setProperty('max-height', 'none', 'important');
        document.body.style.setProperty('position', 'static', 'important');
      }
    }

    forceScroll();
    window.addEventListener('load', forceScroll);
    const scrollFixInterval = setInterval(forceScroll, 500);
    setTimeout(() => clearInterval(scrollFixInterval), 4000);

    loadData();
    setInterval(refreshScore, 5000);
    
    // Debug helper: Add test data button (remove in production)
    if (location.search.includes('debug')) {
      const debugBtn = document.createElement('button');
      debugBtn.textContent = '🧪 Add Test Data';
      debugBtn.className = 'btn btn-ghost';
      debugBtn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999;';
      debugBtn.onclick = () => {
        const testData = {
          1: { stopId: 1, score: 95, attempts: 2, badgeName: 'Gold', completedAt: new Date(Date.now() - 3600000).toISOString() },
          2: { stopId: 2, score: 87, attempts: 3, badgeName: 'Silver', completedAt: new Date(Date.now() - 3000000).toISOString() },
          3: { stopId: 3, score: 92, attempts: 1, badgeName: 'Gold', completedAt: new Date(Date.now() - 2400000).toISOString() },
          4: { stopId: 4, score: 78, attempts: 4, badgeName: 'Bronze', completedAt: new Date(Date.now() - 1800000).toISOString() },
          5: { stopId: 5, score: 88, attempts: 2, badgeName: 'Silver', completedAt: new Date(Date.now() - 1200000).toISOString() }
        };
        localStorage.setItem('learninggame_progress', JSON.stringify(testData));
        location.reload();
      };
      document.body.appendChild(debugBtn);
    }
  </script>
</body>
</html>
