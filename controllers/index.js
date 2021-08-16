const express = require('express');
const router = express.Router();
const workoutRoutes = require("./workout")
const homeRoutes = require("./home");

router.use("/api",workoutRoutes);
router.use("/", homeRoutes);

module.exports = router;