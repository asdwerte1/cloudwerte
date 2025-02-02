const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";
const UNAME = process.env.LOGIN;
const PWORD = process.env.PASSWORD;

app.use(cors());
app.use(express.json());

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    if (username === UNAME && password === PWORD) {
        const token = jwt.sign( { username }, SECRET_KEY, {expiresIn: "1h"});
        return res.json({ token });
    }

    res.status(401).json({ message: " Invalid username or password" });
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) { 
        return res.status(401).json({ message: "Invalid token" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json( { message: "Invalid token" });

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

app.listen(PORT);