const db = require("../models");
const router = require("express").Router();


//get all workouts
router.get("/api/workouts", (req, res) => {});

// add exercise to workout
router.put("/api/workouts/:id", (req, res) => {});

//create workout
router.post("/api/workouts", (req, res) => {});

module.exports = router;