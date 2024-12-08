const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/secret", authenticateToken, (req, res) => {
  res.json({ message: "Here is the super secret data!" });
});

module.exports = router;
