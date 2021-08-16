const db = require("../models");
const router = require("express").Router();

//get all workouts
router.get("/workouts", async (req, res) => {
  try {
    const workouts = await db.Workout.find({});
    res.json(workouts);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// add exercise to workout
router.put("/api/workouts/:id", async (req, res) => {
  try {
    const newEx = await db.Workout.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { totalDuration: req.body.duration },
        $push: { exercises: req.body },
      }
    );
    res.json(newEx)
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//create workout
router.post("/api/workouts", async (req, res) => {
  try {
    const newWorkout = await db.Workout.create(req.body);
    res.json(newWorkout);
  } catch (err) {
    console.log(err);
    re.json(err);
  }
});

module.exports = router;
