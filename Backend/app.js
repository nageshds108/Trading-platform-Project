const express = require("express");
const app = express();

app.set("trust proxy", 1); // ✅ REQUIRED for Render

require("dotenv").config();
const mongoose = require("mongoose");

const { Postions } = require("./Models/PositionModel");
const { Holdings } = require("./Models/HoldingModel");
const Order = require("./Models/OrderModel");
const User = require("./Models/UserModel");

const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");

// -------------------- MIDDLEWARE --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------- CORS --------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://trading-platform-project-dashboard.onrender.com",
    ],
    credentials: true,
  })
);

// -------------------- DATABASE --------------------
const MONGO_URL =
  process.env.MongoURL || "mongodb://127.0.0.1:27017/trading";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// -------------------- SESSION STORE (SAFE) --------------------
let store;

try {
  // v4 / v5 (ESM or CJS)
  if (MongoStore?.create) {
    store = MongoStore.create({ mongoUrl: MONGO_URL });
  }
  // default export (some builds)
  else if (MongoStore?.default?.create) {
    store = MongoStore.default.create({ mongoUrl: MONGO_URL });
  }
  // v3 legacy
  else if (typeof MongoStore === "function") {
    store = MongoStore(session)({ url: MONGO_URL });
  } else {
    console.warn("⚠️ Falling back to MemoryStore");
  }
} catch (err) {
  console.error("❌ MongoStore init failed, using MemoryStore:", err);
}

// -------------------- SESSION --------------------
app.use(
  session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 🔥 Render
      sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
    },
  })
);

// -------------------- AUTH MIDDLEWARE --------------------
function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

// -------------------- ROUTES --------------------
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ---------- SIGNUP ----------
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email, password required" });
    }

    const existing = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();

    req.session.userId = user._id;

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
});

// ---------- LOGIN ----------
app.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.session.userId = user._id;
    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

// ---------- LOGOUT ----------
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

// ---------- ME ----------
app.get("/me", async (req, res) => {
  if (!req.session.userId) return res.json({ user: null });
  const user = await User.findById(req.session.userId).select(
    "username email"
  );
  res.json({ user });
});

// ---------- PROTECTED ----------
app.get("/positions", requireAuth, async (req, res) => {
  res.json(await Postions.find());
});

app.get("/holdings", requireAuth, async (req, res) => {
  res.json(await Holdings.find());
});

// -------------------- SERVER --------------------
const PORT = process.env.Port || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
