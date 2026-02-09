const express = require("express");
const app = express();

app.set("trust proxy", 1); 

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const MONGO_URL =
  process.env.MongoURL || "mongodb://127.0.0.1:27017/trading";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

app.use(
  session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
    },
  })
);

function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

app.get("/", (req, res) => {
  res.send("Server is running");
});

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

app.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "identifier and password required" });
    }

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

// ---------- CURRENT USER ----------
app.get("/me", async (req, res) => {
  if (!req.session.userId) {
    return res.json({ user: null });
  }

  const user = await User.findById(req.session.userId).select(
    "username email"
  );

  res.json({ user });
});

// ---------- PROTECTED ROUTES ----------
app.get("/positions", requireAuth, async (req, res) => {
  try {
    const result = await Postions.find();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/holdings", requireAuth, async (req, res) => {
  try {
    const result = await Holdings.find();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- ORDER ----------
app.post("/Order", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (mode === "BUY" && (!price || price <= 0)) {
      return res.status(400).json({ message: "Invalid BUY price" });
    }

    if (mode === "SELL") {
      const holding = await Holdings.findOne({ name });
      if (!holding || holding.qty < qty) {
        return res.status(400).json({ message: "Insufficient holdings" });
      }

      holding.qty -= qty;
      if (holding.qty === 0) {
        await Holdings.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }
    }

    const order = new Order({ name, qty, price, mode });
    await order.save();

    res.status(201).json({ message: "Order placed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order failed" });
  }
});

// ---------- BUY ----------
app.post("/Buy", async (req, res) => {
  try {
    const { name, qty, price } = req.body;

    if (!price || price <= 0) {
      return res.status(400).json({ message: "Invalid price" });
    }

    let holding = await Holdings.findOne({ name });

    if (holding) {
      const total = holding.avg * holding.qty + price * qty;
      holding.qty += qty;
      holding.avg = total / holding.qty;
      holding.price = price;
      await holding.save();
    } else {
      await Holdings.create({
        name,
        qty,
        avg: price,
        price,
      });
    }

    await Order.create({ name, qty, price, mode: "BUY" });

    res.status(201).json({ message: "Buy successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Buy failed" });
  }
});

const PORT = process.env.Port || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
