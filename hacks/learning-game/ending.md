---
layout: page
title: Maze - Ending Page
authors: Rishabh
permalink: /learninggame/ending/
disable_login_script: true
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
      background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%);
      color: #e2e8f0;
      min-height: 100vh;
      padding: 30px;
    }
    .end-container {
      width: min(1100px, 95vw);
      background: rgba(15, 23, 42, 0.88);
      border-radius: 24px;
      border: 2px solid rgba(59, 130, 246, 0.4);
      box-shadow: 0 0 60px rgba(37, 99, 235, 0.25);
      padding: 30px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid rgba(6,182,212,0.3);
    }
    .title {
      font-size: 28px;
      font-weight: 900;
      color: #06b6d4;
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
    .card h3 { color: #fbbf24; margin-bottom: 12px; font-size: 16px; }
    .helper-text { color: #94a3b8; font-size: 13px; line-height: 1.4; }
    .btn-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
    .btn { padding: 10px 16px; border-radius: 12px; border: none; cursor: pointer; font-weight: 800; text-transform: uppercase; }
    .btn-primary { background: #3b82f6; color: white; }
    .btn-ghost { background: transparent; border: 1px solid rgba(148, 163, 184, 0.3); color: #e2e8f0; }
    .btn-toggle { background: rgba(30, 41, 59, 0.7); color: #e2e8f0; border: 1px solid rgba(148, 163, 184, 0.35); }
    .btn-toggle.active { background: rgba(6, 182, 212, 0.35); border-color: rgba(6, 182, 212, 0.6); color: #e0f2fe; }
    .level-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; border: 1px solid rgba(148, 163, 184, 0.4); background: rgba(15, 23, 42, 0.7); font-size: 12px; }
    .level-pill.active { border-color: rgba(34, 197, 94, 0.6); color: #bbf7d0; }
    .code-block { background: #0f172a; border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 10px; padding: 12px; color: #e2e8f0; font-family: 'Courier New', monospace; font-size: 13px; white-space: pre-wrap; min-height: 120px; margin: 10px 0; }
    textarea { width: 100%; min-height: 140px; background: #0f172a; color: #38bdf8; border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 10px; padding: 12px; font-family: 'Courier New', monospace; font-size: 13px; }
    .status { margin-top: 10px; min-height: 20px; font-weight: 700; }
    .status.ok { color: #22c55e; }
    .status.err { color: #f87171; }
    .locked { opacity: 0.5; pointer-events: none; }
  </style>
</head>
<body>
  <div class="end-container">
    <div class="header">
      <div>
        <div class="title">Maze - Ending Page</div>
        <div class="subtitle">Action-Based Challenges + Debug Track</div>
      </div>
    </div>

    <div class="grid">
      <div class="card" style="grid-column: 1 / -1;">
        <h3>🎯 Action-Based Python Learning Challenges</h3>
        <p class="helper-text">An algorithm processes actions in order, loops once per action, uses decisions, updates a result, and outputs the final result.</p>
      </div>

      <div class="card" style="grid-column: 1 / -1;">
        <h3>🧩 Python “Debug the Code” Challenge</h3>
        <p class="helper-text">Choose a level first, then start the challenge to load a broken code snippet.</p>
      </div>

      <div class="card" style="grid-column: 1 / -1;">
        <h3>Choose Your Debug Level</h3>
        <div class="btn-row" id="debugLevelButtons">
          <button type="button" class="btn btn-toggle" data-level="beginner">🟢 Beginner</button>
          <button type="button" class="btn btn-toggle" data-level="intermediate">🟡 Intermediate</button>
          <button type="button" class="btn btn-toggle" data-level="hard">🔴 Hard</button>
          <button type="button" class="btn btn-primary" id="startDebug">Start Challenge</button>
        </div>
        <div style="margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap;">
          <span class="level-pill" id="levelStatus">Level: not selected</span>
          <span class="level-pill" id="badgeStatus">Badges: none</span>
        </div>
      </div>

      <div class="card" id="debugChallengeCard" style="grid-column: 1 / -1;">
        <h3>Debug the Code (Your Level)</h3>
        <div class="helper-text" id="debugProblemTitle">Select a level, then click Start Challenge to load your problem.</div>
        <pre class="code-block" id="debugCode">No problem loaded yet.</pre>
        <div class="helper-text" id="debugPrompt"></div>
        <div>
          <textarea id="debugAnswer" placeholder="Describe the bug and your fix... (no full solution required)"></textarea>
          <div class="btn-row">
            <button class="btn btn-primary" id="submitDebug">Submit Fix</button>
            <button class="btn btn-ghost" id="clearDebug">Clear</button>
          </div>
          <div class="status" id="debugStatus"></div>
        </div>
      </div>
    </div>
  </div>

  <script>
    (function () {
      function byId(id) { return document.getElementById(id); }

      var debugLevelButtons = document.querySelectorAll('#debugLevelButtons [data-level]');
      var startDebug = byId('startDebug');
      var levelStatus = byId('levelStatus');
      var badgeStatus = byId('badgeStatus');
      var debugProblemTitle = byId('debugProblemTitle');
      var debugCode = byId('debugCode');
      var debugPrompt = byId('debugPrompt');
      var debugStatus = byId('debugStatus');
      var debugAnswer = byId('debugAnswer');
      var submitDebug = byId('submitDebug');
      var clearDebug = byId('clearDebug');
      var debugChallengeCard = byId('debugChallengeCard');

      var DEBUG_PROBLEMS = {
        beginner: [
          {
            id: 'b1',
            title: 'Beginner #1: Missing Colon',
            code: "def greet(name)\n    print('Hello ' + name)\n\ngreet('Ada')",
            prompt: 'Fix the syntax error and explain what the corrected code does.',
            expectedKeywords: ['colon', 'syntax', 'print', 'greet']
          }
        ],
        intermediate: [
          {
            id: 'i1',
            title: 'Intermediate #1: Off-by-One Loop',
            code: "nums = [2, 4, 6, 8]\nfor i in range(0, len(nums)):\n    print(nums[i])\nprint('done')",
            prompt: 'The loop should skip the first item and print only 4, 6, 8. Explain the fix.',
            expectedKeywords: ['range', 'start', 'index', 'loop', 'skip']
          }
        ],
        hard: [
          {
            id: 'h1',
            title: 'Hard #1: Guard the Empty List',
            code: "def average(scores):\n    total = 0\n    for s in scores:\n        total += s\n    return total / len(scores)\n\nprint(average([]))",
            prompt: 'Handle the empty-list edge case and explain why the fix prevents a crash.',
            expectedKeywords: ['empty', 'len', 'zero', 'edge', 'return']
          }
        ]
      };

      var selectedDebugLevel = localStorage.getItem('learninggame_debug_level') || '';
      var debugStarted = false;
      var currentDebugProblem = null;

      function getDebugBadges() {
        return JSON.parse(localStorage.getItem('learninggame_debug_badges') || '[]');
      }

      function saveDebugBadges(badges) {
        localStorage.setItem('learninggame_debug_badges', JSON.stringify(badges));
      }

      function renderDebugBadges() {
        var badges = getDebugBadges();
        badgeStatus.textContent = badges.length ? ('Badges: ' + badges.join(', ')) : 'Badges: none';
      }

      function updateLevelStatus() {
        levelStatus.textContent = selectedDebugLevel ? ('Level: ' + selectedDebugLevel) : 'Level: not selected';
        if (selectedDebugLevel) levelStatus.classList.add('active');
        else levelStatus.classList.remove('active');
        for (var i = 0; i < debugLevelButtons.length; i += 1) {
          var btn = debugLevelButtons[i];
          if (btn.dataset.level === selectedDebugLevel) btn.classList.add('active');
          else btn.classList.remove('active');
        }
      }

      function setDebugLockState(locked) {
        if (debugChallengeCard) {
          if (locked) debugChallengeCard.classList.add('locked');
          else debugChallengeCard.classList.remove('locked');
        }
        if (debugAnswer) debugAnswer.disabled = locked;
        if (submitDebug) submitDebug.disabled = locked;
        if (clearDebug) clearDebug.disabled = locked;
      }

      function setDebugProblem(problem) {
        currentDebugProblem = problem;
        if (debugProblemTitle) debugProblemTitle.textContent = (problem && problem.title) ? problem.title : 'No problem loaded.';
        if (debugCode) debugCode.textContent = (problem && problem.code) ? problem.code : 'No problem loaded yet.';
        if (debugPrompt) debugPrompt.textContent = (problem && problem.prompt) ? problem.prompt : '';
      }

      function loadDebugProblem(level) {
        var problems = DEBUG_PROBLEMS[level] || [];
        var problem = problems[0] || null;
        setDebugProblem(problem);
      }

      function startDebugChallenge() {
        if (!selectedDebugLevel) {
          debugStatus.className = 'status err';
          debugStatus.textContent = 'Choose a level before starting.';
          return;
        }
        debugStarted = true;
        localStorage.setItem('learninggame_debug_level', selectedDebugLevel);
        loadDebugProblem(selectedDebugLevel);
        setDebugLockState(false);
        debugStatus.className = 'status ok';
        debugStatus.textContent = 'Challenge started: ' + selectedDebugLevel + '.';
      }

      function validateDebugAnswer(answer) {
        if (!currentDebugProblem) return false;
        var text = String(answer || '').toLowerCase();
        var hits = 0;
        var keywords = currentDebugProblem.expectedKeywords || [];
        for (var i = 0; i < keywords.length; i += 1) {
          if (text.indexOf(keywords[i]) >= 0) hits += 1;
        }
        if (selectedDebugLevel === 'beginner') return hits >= 2 && text.length > 30;
        if (selectedDebugLevel === 'intermediate') return hits >= 2 && text.length > 40;
        return hits >= 2 && text.length > 50;
      }

      function completeDebugLevel() {
        var badges = getDebugBadges();
        var label = selectedDebugLevel.charAt(0).toUpperCase() + selectedDebugLevel.slice(1);
        if (badges.indexOf(label) === -1) {
          badges.push(label);
          saveDebugBadges(badges);
        }
        renderDebugBadges();
      }

      for (var i = 0; i < debugLevelButtons.length; i += 1) {
        debugLevelButtons[i].addEventListener('click', function (event) {
          selectedDebugLevel = event.currentTarget.dataset.level || '';
          updateLevelStatus();
          debugStatus.className = 'status';
          debugStatus.textContent = '';
          debugStarted = false;
          setDebugLockState(true);
          setDebugProblem(null);
        });
      }

      if (startDebug) startDebug.addEventListener('click', startDebugChallenge);

      if (submitDebug) {
        submitDebug.addEventListener('click', function () {
          if (!debugStarted || !currentDebugProblem) {
            debugStatus.className = 'status err';
            debugStatus.textContent = 'Start the challenge to load a problem first.';
            return;
          }
          var answer = (debugAnswer && debugAnswer.value) ? debugAnswer.value.trim() : '';
          if (!answer) {
            debugStatus.className = 'status err';
            debugStatus.textContent = 'Enter your fix or explanation before submitting.';
            return;
          }
          var ok = validateDebugAnswer(answer);
          if (ok) {
            debugStatus.className = 'status ok';
            debugStatus.textContent = 'Correct ✅ Badge earned for this level.';
            completeDebugLevel();
          } else {
            debugStatus.className = 'status err';
            debugStatus.textContent = 'Not quite. Add clearer debugging reasoning for this level.';
          }
        });
      }

      if (clearDebug) {
        clearDebug.addEventListener('click', function () {
          if (debugAnswer) debugAnswer.value = '';
          debugStatus.textContent = '';
          debugStatus.className = 'status';
        });
      }

      updateLevelStatus();
      renderDebugBadges();
      setDebugLockState(true);
      setDebugProblem(null);
    })();
  </script>
</body>
</html>
          : null;
        const newPlayerId = `player-${safeCrypto ? safeCrypto.randomUUID() : Date.now()}`;
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

    updateLevelStatus();
    renderDebugBadges();
    setDebugLockState(true);
    setDebugProblem(null);

    loadData();
    
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  </script>
</body>
</html>
