// ---------- server.js ----------
console.log(" Starting Task Manager backend...");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, "tasks.json");
let tasks = [];
let idCounter = 1;


async function loadData() {
  try {
    if (await fs.pathExists(DATA_FILE)) {
      const raw = await fs.readFile(DATA_FILE, "utf8");
      const parsed = JSON.parse(raw);
      tasks = parsed.tasks || [];
      idCounter =
        parsed.idCounter ||
        (tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1);
      console.log("Loaded tasks from file.");
    } else {
      console.log("No saved data found. Starting fresh.");
    }
  } catch (err) {
    console.error(" Failed to load tasks file:", err.message);
  }
}

async function saveData() {
  try {
    await fs.writeFile(
      DATA_FILE,
      JSON.stringify({ tasks, idCounter }, null, 2)
    );
  } catch (err) {
    console.error("Failed to save tasks:", err.message);
  }
}


tasks.push(
  { id: idCounter++, title: "Buy groceries", description: "Milk, eggs, bread", status: "Pending" },
  { id: idCounter++, title: "Pay bills", description: "Electricity bill", status: "Pending" },
  { id: idCounter++, title: "Read book", description: "Finish chapter 4", status: "Completed" }
);


app.get('/', (req, res) => {
  res.send('Task Manager Backend is runinng');
});

app.get("/tasks", (req, res) => {
  const { status, q } = req.query;
  let result = [...tasks];

  if (status) {
    result = result.filter(
      (t) => t.status.toLowerCase() === status.toLowerCase()
    );
  }
  if (q) {
    const search = q.toLowerCase();
    result = result.filter((t) => t.title.toLowerCase().includes(search));
  }

  res.json(result);
});

// POST /tasks
app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !title.trim())
    return res.status(400).json({ error: "Title required" });

  const newTask = {
    id: idCounter++,
    title: title.trim(),
    description: description ? description.trim() : "",
    status: "Pending",
  };
  tasks.unshift(newTask);
  await saveData();
  res.status(201).json(newTask);
});

// PATCH /tasks/:id
app.patch("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  if (status) task.status = status;
  await saveData();
  res.json(task);
});


app.listen(PORT, async () => {
  await loadData();
  console.log(` Server running at http://localhost:${PORT}`);
});
