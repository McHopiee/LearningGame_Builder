const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "1mb" }));

const dataDir = path.join(__dirname, "data");
fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, "learninggame.sqlite");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    display_name TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS stop_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id TEXT NOT NULL,
    stop_id INTEGER NOT NULL,
    attempts INTEGER NOT NULL,
    score REAL NOT NULL,
    completed_at TEXT NOT NULL,
    UNIQUE(player_id, stop_id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS badges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id TEXT NOT NULL,
    stop_id INTEGER NOT NULL,
    badge_name TEXT NOT NULL,
    earned_at TEXT NOT NULL,
    UNIQUE(player_id, stop_id, badge_name)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS score_summary (
    player_id TEXT PRIMARY KEY,
    total_score REAL NOT NULL,
    updated_at TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS final_answers (
    player_id TEXT PRIMARY KEY,
    answer TEXT NOT NULL,
    is_correct INTEGER NOT NULL,
    checked_at TEXT NOT NULL
  )`);
});

const run = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function (err) {
    if (err) reject(err);
    else resolve({ id: this.lastID, changes: this.changes });
  });
});

const get = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => {
    if (err) reject(err);
    else resolve(row);
  });
});

const all = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) reject(err);
    else resolve(rows);
  });
});

async function ensurePlayer(id, displayName = null) {
  await run("INSERT OR IGNORE INTO players (id, display_name) VALUES (?, ?)", [id, displayName]);
}

function normalizeAnswer(answer) {
  return (answer || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[;,.]/g, "")
    .trim();
}

function validateFinalAnswer(answer) {
  const normalized = normalizeAnswer(answer);
  if (!normalized) return { isCorrect: false, reason: "Answer is empty." };

  const mustHave = ["can_move", "move_forward", "rotate", "if", "repeat"];
  const hits = mustHave.filter((token) => normalized.includes(token));
  if (hits.length >= 4) {
    return { isCorrect: true, reason: "Matches required algorithm structure." };
  }

  return { isCorrect: false, reason: "Missing required control flow or movement commands." };
}

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/player/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ensurePlayer(id);

    const player = await get("SELECT id, display_name, created_at FROM players WHERE id = ?", [id]);
    const progress = await all(
      "SELECT stop_id AS stopId, attempts, score, completed_at AS completedAt FROM stop_progress WHERE player_id = ? ORDER BY stop_id",
      [id]
    );
    const finalAnswer = await get(
      "SELECT answer, is_correct AS isCorrect, checked_at AS checkedAt FROM final_answers WHERE player_id = ?",
      [id]
    );

    res.json({ player, progress, finalAnswer: finalAnswer || null });
  } catch (err) {
    res.status(500).json({ error: "Failed to load player data.", details: err.message });
  }
});

app.get("/player/:id/badges", async (req, res) => {
  try {
    const { id } = req.params;
    await ensurePlayer(id);
    const badges = await all(
      "SELECT stop_id AS stopId, badge_name AS badgeName, earned_at AS earnedAt FROM badges WHERE player_id = ? ORDER BY stop_id",
      [id]
    );
    res.json({ badges });
  } catch (err) {
    res.status(500).json({ error: "Failed to load badges.", details: err.message });
  }
});

app.get("/player/:id/score", async (req, res) => {
  try {
    const { id } = req.params;
    await ensurePlayer(id);
    const summary = await get(
      "SELECT total_score AS totalScore, updated_at AS updatedAt FROM score_summary WHERE player_id = ?",
      [id]
    );
    const perStop = await all(
      "SELECT stop_id AS stopId, score, attempts, completed_at AS completedAt FROM stop_progress WHERE player_id = ? ORDER BY stop_id",
      [id]
    );
    res.json({ summary: summary || null, perStop });
  } catch (err) {
    res.status(500).json({ error: "Failed to load score.", details: err.message });
  }
});

app.post("/player/:id/progress", async (req, res) => {
  try {
    const { id } = req.params;
    const { stopId, attempts, score, badgeName, displayName } = req.body || {};

    if (!stopId || attempts == null || score == null) {
      return res.status(400).json({ error: "stopId, attempts, and score are required." });
    }

    await ensurePlayer(id, displayName || null);
    const completedAt = new Date().toISOString();

    await run(
      `INSERT INTO stop_progress (player_id, stop_id, attempts, score, completed_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(player_id, stop_id)
       DO UPDATE SET attempts = excluded.attempts, score = excluded.score, completed_at = excluded.completed_at`,
      [id, stopId, attempts, score, completedAt]
    );

    if (badgeName) {
      await run(
        "INSERT OR IGNORE INTO badges (player_id, stop_id, badge_name, earned_at) VALUES (?, ?, ?, ?)",
        [id, stopId, badgeName, completedAt]
      );
    }

    const totalRow = await get("SELECT AVG(score) AS avgScore FROM stop_progress WHERE player_id = ?", [id]);
    const totalScore = totalRow?.avgScore ? Number(totalRow.avgScore.toFixed(2)) : 0;
    await run(
      `INSERT INTO score_summary (player_id, total_score, updated_at)
       VALUES (?, ?, ?)
       ON CONFLICT(player_id)
       DO UPDATE SET total_score = excluded.total_score, updated_at = excluded.updated_at`,
      [id, totalScore, completedAt]
    );

    res.json({ success: true, totalScore, completedAt });
  } catch (err) {
    res.status(500).json({ error: "Failed to save progress.", details: err.message });
  }
});

app.post("/player/:id/final-answer", async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body || {};

    await ensurePlayer(id);
    const check = validateFinalAnswer(answer);
    const checkedAt = new Date().toISOString();

    await run(
      `INSERT INTO final_answers (player_id, answer, is_correct, checked_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(player_id)
       DO UPDATE SET answer = excluded.answer, is_correct = excluded.is_correct, checked_at = excluded.checked_at`,
      [id, answer || "", check.isCorrect ? 1 : 0, checkedAt]
    );

    res.json({ isCorrect: check.isCorrect, message: check.reason, checkedAt });
  } catch (err) {
    res.status(500).json({ error: "Failed to validate answer.", details: err.message });
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const items = await all(
      "SELECT player_id AS playerId, total_score AS totalScore, updated_at AS updatedAt FROM score_summary ORDER BY total_score DESC LIMIT 25"
    );
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: "Failed to load leaderboard.", details: err.message });
  }
});

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  const id = uuidv4();
  socket.emit("id", id);
  socket.on("update", (data) => {
    console.log(data);
    io.emit("stateUpdate", data);
  });

  socket.on("disconnect", () => {
    io.emit("disconnection", id);
  });
});

server.listen(3000, () => {
  console.log("LearningGame API running on port 3000");
});