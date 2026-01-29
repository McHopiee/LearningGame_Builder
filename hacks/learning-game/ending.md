---
layout: default
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
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: radial-gradient(circle at top, #0f172a 0%, #020617 60%, #020617 100%);
      color: #e2e8f0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px;
    }
    .end-container {
      width: min(1100px, 95vw);
      background: rgba(15, 23, 42, 0.88);
      border-radius: 24px;
      border: 1px solid rgba(59, 130, 246, 0.4);
      box-shadow: 0 0 60px rgba(37, 99, 235, 0.25);
      padding: 30px;
      position: relative;
      overflow: hidden;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 20px;
    }
    .title {
      font-size: 28px;
      font-weight: 900;
      color: #60a5fa;
      text-transform: uppercase;
      letter-spacing: 2px;
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
    }
    .card h3 {
      color: #fbbf24;
      margin-bottom: 12px;
      font-size: 16px;
      letter-spacing: 1px;
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
      background: rgba(59, 130, 246, 0.2);
      color: #93c5fd;
      padding: 8px 12px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      width: fit-content;
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
    .status {
      margin-top: 10px;
      min-height: 20px;
      font-weight: 700;
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
  </style>
</head>
<body>
  <div class="end-container">
    <div class="header">
      <div>
        <div class="title">Mission Complete</div>
        <div class="subtitle">End-of-Game Summary // Syncing progress</div>
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
        <div class="code-runner">
          <textarea id="finalAnswer" placeholder="Enter your final algorithm here..."></textarea>
          <div class="btn-row">
            <button class="btn btn-primary" id="submitAnswer">Validate Answer</button>
            <button class="btn btn-ghost" id="clearAnswer">Clear</button>
          </div>
          <div class="status" id="answerStatus"></div>
        </div>
      </div>
    </div>

    <div class="btn-row" style="margin-top: 24px;">
      <a class="btn btn-secondary" href="{{ '/learninggame/home' | relative_url }}">Play Again</a>
      <a class="btn btn-ghost" href="{{ '/' | relative_url }}">Return to Home</a>
      <a class="btn btn-primary" href="{{ '/media/leaderboard' | relative_url }}">View Leaderboard</a>
    </div>
  </div>

  <script>
    const apiBase = window.ENDGAME_API_BASE || ((location.hostname === 'localhost' || location.hostname === '127.0.0.1')
      ? 'http://localhost:3000'
      : 'https://robop.opencodingsociety.com');

    const params = new URLSearchParams(window.location.search);
    const playerId = params.get('playerId') || localStorage.getItem('learninggame_player_id');

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
      Participant: '🎖️'
    };

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
        method: options.method || 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: options.body ? JSON.stringify(options.body) : undefined
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      return res.json();
    }

    function renderBadges(badges) {
      const slots = [1, 2, 3, 4, 5];
      badgeGrid.innerHTML = '';
      slots.forEach((slot) => {
        const badge = badges.find((b) => b.stopId === slot);
        const el = document.createElement('div');
        el.className = 'badge' + (badge ? ' earned' : '');
        el.innerHTML = `
          <div>${badge ? (badgeIcons[badge.badgeName] || '⭐') : '🔒'}</div>
          <strong>Stop ${slot}</strong>
          <span>${badge ? badge.badgeName : 'Not earned'}</span>
        `;
        badgeGrid.appendChild(el);
      });
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
      scorePill.textContent = `Score: ${Number(totalScore).toFixed(1)}%`;
      scoreSummary.innerHTML = `
        <div>Stops completed: <strong>${perStop.length}</strong></div>
        <div>Total score: <strong>${Number(totalScore).toFixed(1)}%</strong></div>
        <div>Last update: <strong>${summary?.updatedAt ? new Date(summary.updatedAt).toLocaleString() : '—'}</strong></div>
      `;
    }

    async function loadData() {
      if (!playerId) {
        showError('Missing player ID. Please restart the game from the home screen.');
        return;
      }
      clearError();
      try {
        const [playerRes, badgesRes, scoreRes] = await Promise.all([
          fetchJson(`${apiBase}/player/${playerId}`),
          fetchJson(`${apiBase}/player/${playerId}/badges`),
          fetchJson(`${apiBase}/player/${playerId}/score`)
        ]);

        renderBadges(badgesRes.badges || []);
        renderAttempts(playerRes.progress || []);
        renderScore(scoreRes.summary, scoreRes.perStop || []);

        if (playerRes.finalAnswer) {
          answerStatus.className = `status ${playerRes.finalAnswer.isCorrect ? 'ok' : 'err'}`;
          answerStatus.textContent = playerRes.finalAnswer.isCorrect ? 'Correct ✅' : 'Incorrect ❌';
        }
      } catch (err) {
        showError('Unable to load game data. Check backend connection.');
      }
    }

    async function refreshScore() {
      if (!playerId) return;
      try {
        const scoreRes = await fetchJson(`${apiBase}/player/${playerId}/score`);
        renderScore(scoreRes.summary, scoreRes.perStop || []);
      } catch (err) {
        // keep silent for polling
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
        const res = await fetchJson(`${apiBase}/player/${playerId}/final-answer`, {
          method: 'POST',
          body: { answer }
        });
        answerStatus.className = `status ${res.isCorrect ? 'ok' : 'err'}`;
        answerStatus.textContent = res.isCorrect ? 'Correct ✅' : `Incorrect ❌ (${res.message})`;
      } catch (err) {
        answerStatus.className = 'status err';
        answerStatus.textContent = 'Validation failed. Try again.';
      }
    });

    document.getElementById('clearAnswer').addEventListener('click', () => {
      document.getElementById('finalAnswer').value = '';
      answerStatus.textContent = '';
      answerStatus.className = 'status';
    });

    loadData();
    setInterval(refreshScore, 5000);
  </script>
</body>
</html>
