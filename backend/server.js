const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const router = express.Router();
const session = require("express-session");

const app = express();

// Define allowed origins
const allowedOrigins = [
  "https://todo-task-gules-sigma.vercel.app",
  "https://todo-task-3w21f383j-prasanths-projects-1c782ce1.vercel.app",
  // Add more allowed origins if necessary
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// Allow all origins during development (be cautious in production)
app.use(cors(corsOptions));

// Handle OPTIONS requests for preflight
app.options("*", cors(corsOptions));

const PORT = process.env.PORT || 5000;

dotenv.config({ path: ".env" });

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using https
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    // On success, the req.user object will contain both the user and the token
    res.json({ token: req.user.token });
    res.redirect("/dashboard");
  }
);

// Connect to MongoDB

// Set strictQuery to true or false to suppress the warning
mongoose.set("strictQuery", true); // or false, depending on your preference

mongoose
  .connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
