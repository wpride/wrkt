module.exports = function(app) {
  class ExerciseSet {
    constructor(session, exercise) {
      this.exerciseSets = createExerciseSet(session, exercise);
      this.addSet = this.addSet.bind(this);
    }

    addSet(weight, reps) {
    }

    addSets(weight, repss) {
      var that = this;
    }
  }

  function createSessions() {
    console.log("Creating...");
    app.models.Session.create([
      {date: new Date(2018, 11, 05)},
      {date: new Date(2018, 10, 27)},
      {date: new Date(2018, 10, 20)},
      {date: new Date(2018, 10, 16)},
      {date: new Date(2018, 9, 31)},
    ]).then(function(data) {
      const sessions = data;
      app.models.MuscleGroup.create([
        {name: 'Chest'},
        {name: 'Back'},
        {name: 'Legs'},
      ]).then(function(mgs) {
        const [chest, back, legs] = mgs;
        console.log(chest);
        app.models.Exercise.create([
          {name: 'Barbell Bench Press', muscleGroupId: chest.id},
          {name: 'Dumbbell Bench Press', muscleGroupId: chest.id},
          {name: 'Shoulder Press', muscleGroupId: chest.id},
        ]).then(function(exercises) {
          const [bbBenchExercise, dbBenchExercise, shoulderPress] = exercises;
          function createExerciseSet(session, exercise, weight, repss) {
            app.models.ExerciseSet.create({sessionId: session.id, exerciseId: exercise.id}).then(function(exerciseSet) {
              repss.forEach(function(reps) {
                app.models.Set.create({weight, reps, exerciseSetId: exerciseSet.id});
              });
            });
          }

          var session = sessions[0];

          createExerciseSet(session, bbBenchExercise, 225, [5, 5, 5, 5, 5]);
          createExerciseSet(session, shoulderPress, 60, [6, 6, 6, 6, 4]);

          session = sessions[1];
          createExerciseSet(session, dbBenchExercise, 85, [7, 7, 7, 6, 5]);
          createExerciseSet(session, shoulderPress, 55, [7, 7, 7, 7, 7]);

          session = sessions[2];
          createExerciseSet(session, dbBenchExercise, 65, [12, 12, 12, 12, 12]);
          createExerciseSet(session, shoulderPress, 50, [10, 10, 7]);

          session = sessions[3];
          createExerciseSet(session, dbBenchExercise, 90, [6, 6, 6, 6]);
          createExerciseSet(session, shoulderPress, 45, [12, 12, 12]);

          session = sessions[4];
          createExerciseSet(session, dbBenchExercise, 75, [10, 10, 10, 10, 7]);
          createExerciseSet(session, shoulderPress, 40, [13, 15, 15, 15, 13]);
        });
      });
    });
  }

  createSessions();
};
