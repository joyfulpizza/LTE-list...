const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const FILE = "./players.json";

// Ensure file exists
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
}

// POST: Add player ID if not already stored
app.post("/add", (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: "No ID provided" });
    }

    let players = JSON.parse(fs.readFileSync(FILE));

    if (!players.includes(id)) {
        players.push(id);
        fs.writeFileSync(FILE, JSON.stringify(players, null, 2));
    }

    res.json({ success: true });
});

// GET: Return all stored IDs
app.get("/players", (req, res) => {
    const players = JSON.parse(fs.readFileSync(FILE));
    res.json(players);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
