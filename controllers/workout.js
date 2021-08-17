const db = require("../models");
const router = require("express").Router();

//get all workouts
router.get("/workouts", async (req, res) => {
  try {
   const workouts = await db.Workout.aggregate([{
      $addFields:{
        totalDuration:{
          $sum: `$exercises.duration`
        }
      }
    }])
    // const workouts = await db.Workout.find({});
    // await workouts.forEach((workout) => {
    //   let total = 0;
    //   workout.exercises.forEach((exercise) => {
    //     total += exercise.duration;
    //   });
    //   workout.totalDuration = total;
    // });
    res.json(workouts);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// add exercise to workout
router.put("/workouts/:id", async (req, res) => {
  try {
    const newEx = await db.Workout.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { totalDuration: req.body.duration },
        $push: { exercises: req.body },
      }
    );
    res.json(newEx);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//create workout
router.post("/workouts", async (req, res) => {
  try {
    const newWorkout = await db.Workout.create(req.body);
    res.json(newWorkout);
  } catch (err) {
    console.log(err);
    re.json(err);
  }
});

router.get("/workouts/range", async (req, res) => {
  try {
    const workoutRange = await db.Workout.aggregate([{
      $addFields:{
        totalDuration:{
          $sum: `$exercises.duration`
        }
      }
    }]).sort({_id:-1}).limit(7)
    // const workoutRange = await db.Workout.find({});
    // await workoutRange.forEach((workout) => {
    //     let total = 0;
    //     workout.exercises.forEach((exercise) => {
    //       total += exercise.duration;
    //     });
    //     workout.totalDuration = total;
    //   });
    res.json(workoutRange);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
