const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const userRoutes = require("./route/route");
const secretRoutes = require("./route/secret"); 

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

app.use("/api", secretRoutes); 

app.use((req, res) => res.status(404).json({ message: "Route not found." }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error." });
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}.`)
);
