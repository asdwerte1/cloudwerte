const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";
const UNAME = process.env.LOGIN;
const PWORD = process.env.PASSWORD;
const ENV_FILE_PATH = path.join(__dirname, ".env");

app.use(cors({
    origin: "http://localhost:3080",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

const reloadEnv = () => {
    require("dotenv").config();
}

app.post("/api/login", (req, res) => {
    reloadEnv();
    const PWORD = process.env.PASSWORD;

    const { username, password } = req.body;
    if (username === UNAME && password === PWORD) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ token });
    }

    res.status(401).json({ message: " Invalid username or password" });
});

app.post("/api/changePassword", (req, res) => {
    reloadEnv();
    const PWORD = process.env.PASSWORD;
    const { oldPassword, newPassword1 } = req.body;

    if (oldPassword !== PWORD) {
        res.status(401).json({ message: "Invalid current password" });
    }

    try {
        let envContent = fs.readFileSync(ENV_FILE_PATH, "utf8");
        let updated = false;
        let newLines = envContent.split("\n").map((line) => {
            if (line.startsWith("PASSWORD=")) {
                updated = true;
                return `PASSWORD=${newPassword1}`;
            }
            return line;
        });

        if (!updated) { 
            newLines.push(`PASSWORD=${newPassword1}`); 
        }        

        fs.writeFileSync(ENV_FILE_PATH, newLines.join("\n"));
        reloadEnv();

        res.json({ message: "Password updated successfully."});
    } catch (error) {
        res.status(500).json({ message: "Failed to update password"});
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Invalid token" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        req.user = user;
        next();
    });
};

app.get("/api/containers", authenticateToken, (req, res) => {
    fs.readFile("containers.json", "utf-8", (err, data) => {
        if (err) return res.status(500).json({ message: "Error reading containers file" });
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, '0.0.0.0');