---
layout: base
title: Maze - Final Summary
authors: Rishabh
permalink: /learninggame/final-summary/
disable_login_script: true
---

<div class="end-summary">
  <div class="summary-header">
    <div>
      <h1>Final Stop Summary</h1>
      <p class="subtitle">Loading player progress from the backend…</p>
    </div>
    <div class="status-pill" id="liveStatus">Live</div>
  </div>

  <div class="summary-grid">
    <div class="card" id="summaryLoading">
      <h2>Loading…</h2>
      <p>Fetching player, badges, and score data.</p>
    </div>

    <div class="card hidden" id="summaryError">
      <h2>Error</h2>
      <p id="errorMessage">Unable to load data.</p>
    </div>

    <div class="card hidden" id="playerCard">
      <h2>Player</h2>
      <div class="row"><span>Name:</span> <strong id="playerName">-</strong></div>
      <div class="row"><span>ID:</span> <strong id="playerId">-</strong></div>
      <div class="row"><span>Class:</span> <strong id="playerClass">-</strong></div>
      <div class="row"><span>Joined:</span> <strong id="playerCreated">-</strong></div>
    </div>

    <div class="card hidden" id="scoreCard">
      <h2>Score Summary</h2>
      <div class="row"><span>Total Score:</span> <strong id="totalScore">0</strong></div>
      <div class="row"><span>Last Updated:</span> <strong id="scoreUpdated">-</strong></div>
    </div>

    <div class="card hidden" id="badgeCard">
      <h2>Badges Earned (5 total)</h2>
      <div class="badge-grid" id="badgeGrid"></div>
    </div>

    <div class="card hidden" id="attemptsCard">
      <h2>Attempts & Completion</h2>
      <table>
        <thead>
          <tr>
            <th>Stop</th>
            <th>Attempts</th>
            <th>Score</th>
            <th>Completed At</th>
          </tr>
        </thead>
        <tbody id="attemptRows"></tbody>
      </table>
    </div>
  </div>
</div>

<style>
  .end-summary {
    width: min(1100px, 95vw);
    margin: 24px auto;
    padding: 24px;
    background: rgba(15, 23, 42, 0.85);
    border-radius: 22px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    color: #e2e8f0;
  }
  .summary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.25);
    padding-bottom: 16px;
    margin-bottom: 20px;
  }
  .summary-header h1 { margin: 0; font-size: 24px; }
  .subtitle { color: #94a3b8; margin: 6px 0 0; }
  .status-pill {
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(34, 197, 94, 0.2);
    border: 1px solid rgba(34, 197, 94, 0.6);
    color: #bbf7d0;
    font-weight: 700;
  }
  .summary-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  .card {
    background: rgba(2, 6, 23, 0.7);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 14px;
    padding: 16px;
  }
  .card h2 { margin-top: 0; font-size: 16px; color: #fbbf24; }
  .row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
  .badge-grid { display: grid; gap: 10px; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
  .badge {
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(59, 130, 246, 0.4);
    border-radius: 12px;
    padding: 10px;
    font-size: 13px;
  }
  .badge.missing { opacity: 0.5; border-style: dashed; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { text-align: left; padding: 8px 6px; border-bottom: 1px solid rgba(148, 163, 184, 0.2); }
  th { color: #94a3b8; font-weight: 600; }
  .hidden { display: none; }
</style>

<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
<script>
  (function () {
    var API_BASE = window.location.protocol + '//' + window.location.hostname + ':3000';
    var params = new URLSearchParams(window.location.search);
    var playerId = localStorage.getItem('learninggame_player_id') || localStorage.getItem('player_id') || params.get('playerId') || params.get('id');
    if (playerId) {
      try { localStorage.setItem('learninggame_player_id', playerId); } catch (e) { }
    }

    var summaryLoading = document.getElementById('summaryLoading');
    var summaryError = document.getElementById('summaryError');
    var errorMessage = document.getElementById('errorMessage');
    var playerCard = document.getElementById('playerCard');
    var scoreCard = document.getElementById('scoreCard');
    var badgeCard = document.getElementById('badgeCard');
    var attemptsCard = document.getElementById('attemptsCard');
    var liveStatus = document.getElementById('liveStatus');

    var playerName = document.getElementById('playerName');
    var playerIdEl = document.getElementById('playerId');
    var playerClass = document.getElementById('playerClass');
    var playerCreated = document.getElementById('playerCreated');
    var totalScore = document.getElementById('totalScore');
    var scoreUpdated = document.getElementById('scoreUpdated');
    var badgeGrid = document.getElementById('badgeGrid');
    var attemptRows = document.getElementById('attemptRows');

    function setLoading(isLoading) {
      if (isLoading) {
        summaryLoading.classList.remove('hidden');
      } else {
        summaryLoading.classList.add('hidden');
      }
    }

    function setError(message) {
      summaryError.classList.remove('hidden');
      errorMessage.textContent = message;
    }

    function showCards() {
      playerCard.classList.remove('hidden');
      scoreCard.classList.remove('hidden');
      badgeCard.classList.remove('hidden');
      attemptsCard.classList.remove('hidden');
    }

    function formatDate(value) {
      if (!value) return '-';
      var date = new Date(value);
      if (isNaN(date.getTime())) return value;
      return date.toLocaleString();
    }

    function fetchJson(url) {
      return fetch(url).then(function (res) {
        if (!res.ok) throw new Error('Request failed (' + res.status + ')');
        return res.json();
      });
    }

    function renderBadges(badges) {
      var allBadges = ['Stop 1 Badge', 'Stop 2 Badge', 'Stop 3 Badge', 'Stop 4 Badge', 'Stop 5 Badge'];
      var earnedMap = {};
      (badges || []).forEach(function (badge) {
        earnedMap[badge.badgeName] = badge;
      });
      badgeGrid.innerHTML = '';
      allBadges.forEach(function (name) {
        var badge = earnedMap[name];
        var div = document.createElement('div');
        div.className = 'badge' + (badge ? '' : ' missing');
        div.innerHTML = '<strong>' + name + '</strong><br>' + (badge ? 'Earned: ' + formatDate(badge.earnedAt) : 'Not earned');
        badgeGrid.appendChild(div);
      });
    }

    function renderAttempts(items) {
      attemptRows.innerHTML = '';
      if (!items || !items.length) {
        var emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="4">No attempts recorded yet.</td>';
        attemptRows.appendChild(emptyRow);
        return;
      }
      items.forEach(function (item) {
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + item.stopId + '</td>' +
          '<td>' + item.attempts + '</td>' +
          '<td>' + item.score + '</td>' +
          '<td>' + formatDate(item.completedAt) + '</td>';
        attemptRows.appendChild(row);
      });
    }

    function updateUI(playerData, badgeData, scoreData) {
      playerName.textContent = (playerData.player && playerData.player.display_name) || 'Unknown';
      playerIdEl.textContent = (playerData.player && playerData.player.id) || playerId;
      playerClass.textContent = (playerData.player && playerData.player.character_class) || '-';
      playerCreated.textContent = formatDate(playerData.player && playerData.player.created_at);

      totalScore.textContent = (scoreData.summary && scoreData.summary.totalScore != null) ? scoreData.summary.totalScore : 0;
      scoreUpdated.textContent = formatDate(scoreData.summary && scoreData.summary.updatedAt);

      renderBadges(badgeData.badges || []);
      renderAttempts(scoreData.perStop || []);
    }

    function loadAll() {
      if (!playerId) {
        setLoading(false);
        setError('Missing player id. Start the game to generate one.');
        return;
      }
      setLoading(true);
      summaryError.classList.add('hidden');

      var safeId = encodeURIComponent(playerId);
      Promise.all([
        fetchJson(API_BASE + '/player/' + safeId),
        fetchJson(API_BASE + '/player/' + safeId + '/badges'),
        fetchJson(API_BASE + '/player/' + safeId + '/score')
      ])
        .then(function (results) {
          updateUI(results[0], results[1], results[2]);
          showCards();
        })
        .catch(function (err) {
          setError('Failed to load player data from backend. ' + (err && err.message ? err.message : ''));
        })
        .finally(function () {
          setLoading(false);
        });
    }

    function setupLiveUpdates() {
      try {
        var socket = io(API_BASE, { transports: ['websocket'] });
        socket.on('connect', function () {
          liveStatus.textContent = 'Live';
        });
        socket.on('stateUpdate', function () {
          loadAll();
        });
        socket.on('disconnect', function () {
          liveStatus.textContent = 'Offline';
        });
      } catch (e) {
        liveStatus.textContent = 'Offline';
      }
    }

    loadAll();
    setupLiveUpdates();
    setInterval(loadAll, 15000);
  })();
</script>
