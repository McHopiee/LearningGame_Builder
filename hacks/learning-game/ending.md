---
layout: base
title: Maze - Ending Page
authors: Rishabh
permalink: /learninggame/ending/
disable_login_script: true
---

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
    .chat-panel { display: flex; flex-direction: column; gap: 10px; }
    .chat-log { min-height: 180px; max-height: 260px; overflow-y: auto; background: rgba(2, 6, 23, 0.6); border: 1px solid rgba(148, 163, 184, 0.25); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 8px; font-size: 13px; }
    .chat-bubble { padding: 8px 10px; border-radius: 10px; max-width: 90%; line-height: 1.4; }
    .chat-user { background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); align-self: flex-end; color: #bfdbfe; }
    .chat-ai { background: rgba(16, 185, 129, 0.18); border: 1px solid rgba(16, 185, 129, 0.35); align-self: flex-start; color: #bbf7d0; white-space: pre-line; }
    .chat-input { display: flex; gap: 8px; }
    .chat-input input { flex: 1; background: #0f172a; color: #e2e8f0; border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 10px; padding: 10px 12px; font-size: 13px; }
    .role-badges { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0 12px; }
    .role-badge { font-size: 12px; padding: 6px 10px; border-radius: 999px; border: 1px solid rgba(148, 163, 184, 0.35); background: rgba(30, 41, 59, 0.7); color: #e2e8f0; cursor: pointer; }
    .role-badge.active { border-color: rgba(16, 185, 129, 0.6); box-shadow: 0 0 10px rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.2); color: #d1fae5; }
  </style>
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
        <div class="helper-text">Paste corrected code only. Sentences will be rejected.</div>
        <div>
          <textarea id="debugAnswer" placeholder="Paste corrected code here..."></textarea>
          <div class="btn-row">
            <button class="btn btn-primary" id="submitDebug">Submit Fix</button>
            <button class="btn btn-ghost" id="clearDebug">Clear</button>
          </div>
          <div class="status" id="debugStatus"></div>
        </div>
      </div>

      <div class="card" style="grid-column: 1 / -1;">
        <h3>💬 Hint Coach Chatbot</h3>
        <p class="helper-text">ChatGPT provides 3 short hints first, then reveals the answer. If you paste code, it can run it in a sandbox and report output.</p>
        <p class="helper-text">Guardrail: The answer is revealed only after 3 hints.</p>
        <div class="chat-panel">
          <div class="chat-log" id="chatLog">
            <div class="chat-bubble chat-ai">ChatGPT: Tell me the level and what you think the bug is.</div>
          </div>
          <div class="chat-input">
            <input id="chatInput" type="text" placeholder="Ask for help (e.g., 'Where is the bug?')" />
            <button class="btn btn-primary" id="sendChat">Send</button>
          </div>
        </div>
      </div>

      <div class="card" style="grid-column: 1 / -1;">
        <h3>🔗 System Summary (Many-to-Many)</h3>
        <p class="helper-text">One player can earn many badges, and one badge can be earned by many different players. That creates a many-to-many relationship, so a Player Badges table is used to track which players have earned which badges.</p>
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
      var chatLog = byId('chatLog');
      var chatInput = byId('chatInput');
      var sendChat = byId('sendChat');

      function safeGetItem(key, fallback) {
        try { return localStorage.getItem(key); } catch (e) { return fallback; }
      }

      function safeSetItem(key, value) {
        try { localStorage.setItem(key, value); } catch (e) { }
      }

      var DEBUG_PROBLEMS = {
        beginner: [
          {
            id: 'b1',
            title: 'Beginner #1: Missing Colon',
            code: "def greet(name)\n    print('Hello ' + name)\n\ngreet('Ada')",
            prompt: 'Fix the syntax error and paste the corrected code.',
            expectedKeywords: ['colon', 'syntax', 'print', 'greet'],
            expectedOutput: "Hello Ada",
            hints: [
              'Look at the function definition line for missing syntax.',
              'Python needs a colon after function headers.',
              'Make sure the print line is indented under the function.'
            ],
            answer: "def greet(name):\n    print('Hello ' + name)\n\ngreet('Ada')"
          }
        ],
        intermediate: [
          {
            id: 'i1',
            title: 'Intermediate #1: Off-by-One Loop',
            code: "nums = [2, 4, 6, 8]\nfor i in range(0, len(nums)):\n    print(nums[i])\nprint('done')",
            prompt: 'The loop should skip the first item and print only 4, 6, 8. Paste corrected code.',
            expectedKeywords: ['range', 'start', 'index', 'loop', 'skip'],
            expectedOutput: "4\n6\n8\ndone",
            hints: [
              'The loop currently starts at index 0.',
              'To skip the first item, start the range at 1.',
              'Keep the end as len(nums) so you still include the last item.'
            ],
            answer: "nums = [2, 4, 6, 8]\nfor i in range(1, len(nums)):\n    print(nums[i])\nprint('done')"
          }
        ],
        hard: [
          {
            id: 'h1',
            title: 'Hard #1: Guard the Empty List',
            code: "def average(scores):\n    total = 0\n    for s in scores:\n        total += s\n    return total / len(scores)\n\nprint(average([]))",
            prompt: 'Handle the empty-list edge case and paste corrected code.',
            expectedKeywords: ['empty', 'len', 'zero', 'edge', 'return'],
            expectedOutput: "0",
            hints: [
              'Division by zero happens when the list is empty.',
              'Check len(scores) before dividing.',
              'Return 0 or None for the empty case.'
            ],
            answer: "def average(scores):\n    if not scores:\n        return 0\n    total = 0\n    for s in scores:\n        total += s\n    return total / len(scores)\n\nprint(average([]))"
          }
        ]
      };

      var selectedDebugLevel = safeGetItem('learninggame_debug_level', '') || '';
      var debugStarted = false;
      var currentDebugProblem = null;

      function getDebugBadges() {
        return JSON.parse(safeGetItem('learninggame_debug_badges', '[]') || '[]');
      }

      function saveDebugBadges(badges) {
        safeSetItem('learninggame_debug_badges', JSON.stringify(badges));
      }

      function renderDebugBadges() {
        var badges = getDebugBadges();
        badgeStatus.textContent = badges.length ? ('Badges earned: ' + badges.length + ' (' + badges.join(', ') + ')') : 'Badges: none';
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
        chatHintCount = 0;
        safeSetItem('learninggame_debug_level', selectedDebugLevel);
        loadDebugProblem(selectedDebugLevel);
        setDebugLockState(false);
        debugStatus.className = 'status ok';
        debugStatus.textContent = 'Challenge started: ' + selectedDebugLevel + '.';
        if (startDebug) startDebug.textContent = 'Restart Level';
      }

      function validateDebugAnswer(answer) {
        if (!currentDebugProblem) return false;
        var text = String(answer || '').toLowerCase();
        return isLikelyCode(text);
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

      function appendChatBubble(text, type) {
        var bubble = document.createElement('div');
        bubble.className = 'chat-bubble ' + type;
        bubble.textContent = text;
        chatLog.appendChild(bubble);
        chatLog.scrollTop = chatLog.scrollHeight;
      }

      var currentChatRole = 'chatgpt';
      var chatHintCount = 0;
      function rolePrefix() {
        return 'ChatGPT:';
      }

      function isLikelyCode(text) {
        if (!text) return false;
        var t = text.toLowerCase();
        return (t.indexOf('def ') >= 0 || t.indexOf('print(') >= 0 || t.indexOf('for ') >= 0 || t.indexOf('return ') >= 0 || t.indexOf(':\n') >= 0);
      }

      function getHintOrAnswer() {
        if (!currentDebugProblem) {
          return rolePrefix() + ' Start a level and click Start Challenge so I can give hints.';
        }
        var hints = currentDebugProblem.hints || [];
        if (chatHintCount < 3 && chatHintCount < hints.length) {
          var hint = hints[chatHintCount];
          chatHintCount += 1;
          return rolePrefix() + ' Hint ' + chatHintCount + ' of 3: ' + hint;
        }
        return rolePrefix() + ' Answer (code):\n' + (currentDebugProblem.answer || 'No answer available.');
      }

      function runPythonRequest(code, callback) {
        fetch('http://127.0.0.1:5001/api/run-python', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: code })
        })
          .then(function (response) {
            return response.json().then(function (data) {
              return { ok: response.ok, data: data };
            });
          })
          .then(function (result) {
            if (!result.ok || !result.data) {
              callback({ ok: false, error: 'Execution failed.' });
              return;
            }
            if (!result.data.ok) {
              callback({ ok: false, error: result.data.error || 'Execution failed.', data: result.data });
              return;
            }
            callback({ ok: true, data: result.data });
          })
          .catch(function () {
            callback({ ok: false, error: 'Failed to reach the Python runner.' });
          });
      }

      function runPythonCode(code, callback) {
        runPythonRequest(code, function (result) {
          if (!result.ok) {
            callback(rolePrefix() + ' ' + result.error);
            return;
          }
          var stdout = result.data.stdout || '';
          var stderr = result.data.stderr || '';
          var replyParts = [];
          if (stdout.trim()) replyParts.push('Output:\n' + stdout.trim());
          if (stderr.trim()) replyParts.push('Error:\n' + stderr.trim());
          if (!replyParts.length) replyParts.push('No output.');
          callback(rolePrefix() + ' ' + replyParts.join('\n'));
        });
      }

      function chatbotReply(message) {
        var text = String(message || '').toLowerCase();
        if (isLikelyCode(text)) {
          return rolePrefix() + ' Running your code...';
        }
        if (!selectedDebugLevel) {
          return rolePrefix() + ' Select a level first, then ask for a hint.';
        }
        return getHintOrAnswer();
      }

      for (var i = 0; i < debugLevelButtons.length; i += 1) {
        debugLevelButtons[i].addEventListener('click', function (event) {
          selectedDebugLevel = event.currentTarget.dataset.level || '';
          updateLevelStatus();
          debugStatus.className = 'status';
          debugStatus.textContent = '';
          debugStarted = false;
          chatHintCount = 0;
          setDebugLockState(true);
          setDebugProblem(null);
          if (startDebug) startDebug.textContent = 'Start Challenge';
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
            debugStatus.textContent = 'Paste your corrected code before submitting.';
            return;
          }
          if (!isLikelyCode(answer)) {
            debugStatus.className = 'status err';
            debugStatus.textContent = 'Code only. Please paste corrected Python code.';
            return;
          }
          debugStatus.className = 'status';
          debugStatus.textContent = 'Running code...';
          runPythonRequest(answer, function (result) {
            if (!result.ok) {
              debugStatus.className = 'status err';
              debugStatus.textContent = result.error || 'Execution failed.';
              return;
            }
            var stderr = result.data.stderr || '';
            if (stderr.trim()) {
              debugStatus.className = 'status err';
              debugStatus.textContent = 'Error: ' + stderr.trim();
              return;
            }
            var expected = currentDebugProblem && currentDebugProblem.expectedOutput ? String(currentDebugProblem.expectedOutput).trim() : '';
            var actual = (result.data.stdout || '').trim();
            if (expected && actual !== expected) {
              debugStatus.className = 'status err';
              debugStatus.textContent = 'Output mismatch. Expected:\n' + expected + '\nGot:\n' + (actual || '(no output)');
              return;
            }
            debugStatus.className = 'status ok';
            debugStatus.textContent = 'Correct ✅ Output matches. Badge earned for this level.';
            completeDebugLevel();
          });
        });
      }

      if (clearDebug) {
        clearDebug.addEventListener('click', function () {
          if (debugAnswer) debugAnswer.value = '';
          debugStatus.textContent = '';
          debugStatus.className = 'status';
        });
      }

      if (sendChat) {
        sendChat.addEventListener('click', function () {
          var message = chatInput.value.trim();
          if (!message) return;
          appendChatBubble(message, 'chat-user');
          chatInput.value = '';
          if (isLikelyCode(message)) {
            appendChatBubble(chatbotReply(message), 'chat-ai');
            runPythonCode(message, function (reply) {
              appendChatBubble(reply, 'chat-ai');
            });
            return;
          }
          appendChatBubble(chatbotReply(message), 'chat-ai');
        });
      }

      updateLevelStatus();
      renderDebugBadges();
      setDebugLockState(true);
      setDebugProblem(null);
    })();
</script>
