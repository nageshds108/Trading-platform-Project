const express = require("express");
const app = express();
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

const URL = process.env.MongoURL || "mongodb://127.0.0.1:27017/trading";
const port = process.env.Port || 3000;

app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    credentials: true,
  })
);

let main= async()=>{
  try{
    await mongoose.connect(URL)
    console.log("Connected to MongoDB")
  } catch(error){
    console.log("Connection Error: " + error)
  }
}
main()

app.use(
  (function () {
    let storeInstance;
    try {
      if (MongoStore && typeof MongoStore.create === "function") {
        storeInstance = MongoStore.create({ mongoUrl: URL });
      } else if (typeof MongoStore === "function") {
        storeInstance = MongoStore(session)({ url: URL });
      } else if (MongoStore && MongoStore.default && typeof MongoStore.default.create === "function") {
        storeInstance = MongoStore.default.create({ mongoUrl: URL });
      } else {
        console.warn("connect-mongo: create() not found, using default MemoryStore");
      }
    } catch (err) {
      console.error("Failed to initialize MongoStore, using MemoryStore:", err);
    }

    return session({
      secret: process.env.SESSION_SECRET || "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: storeInstance,
      cookie: { 
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      },
    });
  })()
);

function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email and password are required" });
    }

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      if (existing.username === username) return res.status(400).json({ message: "Username already exists" });
      if (existing.email === email) return res.status(400).json({ message: "Email already exists" });
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();

    req.session.userId = user._id;
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ message: "Signup failed" });
      }
      res.status(201).json({ message: "Signup successful" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier = username or email
    if (!identifier || !password) return res.status(400).json({ message: "identifier and password required" });

    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!user) return res.status(400).json({ message: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    req.session.userId = user._id;
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ message: "Login failed" });
      }
      res.json({ message: "Login successful" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

app.get("/me", async (req, res) => {
  if (!req.session || !req.session.userId) return res.status(200).json({ user: null });
  const user = await User.findById(req.session.userId).select("username email");
  res.json({ user });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/positions", requireAuth, async(req, res)=>{
  try{
    let result = await Postions.find()
    res.json(result)
    console.log(result)
  } catch(error){
    res.status(500).json({error: error.message})
  }
})

app.get("/holdings", requireAuth, async(req, res)=>{
  try{
    let result = await Holdings.find()
    res.json(result)
  } catch(error){
    res.status(500).json({error: error.message})
  }
})


app.post("/Order", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (mode === "BUY") {
      if (price === undefined || price === null || Number(price) <= 0) {
        return res.status(400).json({ message: "Price is required for BUY and must be greater than 0" });
      }
    }

    if (mode === "SELL") {
      const holding = await Holdings.findOne({ name: name });
      if (!holding) {
        return res.status(400).json({ message: "No holdings found for this stock" });
      }

      if (holding.qty < qty) {
        return res.status(400).json({ message: "Insufficient quantity in holdings" });
      }

      const newQty = holding.qty - qty;
      if (newQty > 0) {
        holding.qty = newQty;
        holding.price = price; 
        await holding.save();
      } else {
        await Holdings.deleteOne({ _id: holding._id });
      }
    }

    const order = new Order({
      name,
      qty,
      price,
      mode,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order failed" });
  }
});

app.post("/Buy", async (req, res) => {
  try {
    const { name, qty, price } = req.body;

    if (price === undefined || price === null || Number(price) <= 0) {
      return res.status(400).json({ message: "Price is required for BUY and must be greater than 0" });
    }

    let holding = await Holdings.findOne({ name: name });

    if (holding) {
      const existingTotal = holding.avg * holding.qty;
      const incomingTotal = price * qty;
      const newQty = holding.qty + qty;
      const newAvg = (existingTotal + incomingTotal) / newQty;

      holding.qty = newQty;
      holding.avg = newAvg;
      holding.price = price; 

      await holding.save();
    } else {
      const newHolding = new Holdings({
        name,
        qty,
        avg: price,
        price,
      });
      await newHolding.save();
    }

    const order = new Order({ name, qty, price, mode: "BUY" });
    await order.save();

    res.status(201).json({ message: "Buy placed and holdings updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Buy failed" });
  }
});






// // app.get("/postionsI", async (req, res) => {
//  const positions = [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];

//   try{
//     await Postions.insertMany(positions);
//     res.send("Positions inserted successfully");
//   } catch(error){
//     res.send("Error: " + error);
//   }
// // });

// // app.get("/holdingsI", async (req, res) => {
//  const holdings = [
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
// ];

//   try{
//     await Holdings.insertMany(holdings);
//     res.send("Holdings inserted successfully");
//   } catch(error){
//     res.send("Error: " + error);
//   }
// });







app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});