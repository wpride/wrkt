module.exports = function(app, cb) {
  var backGroup = app.models.muscleGroup.create({name: 'Back'});
  var chestGroup = app.models.muscleGroup.create({name: 'Chest'});
  var legGroup = app.models.muscleGroup.create({name: 'Leg'});
  var benchExercise = createExercise('Dumbbell Bench Press', chestGroup);
  var shoulderPress = createExercise('Shoulder Press', chestGroup);

  var session = createSession(new Date(2018, 11, 27));

  var exerciseSet = createExerciseSet(session, benchExercise);

  app.models.set.create({weight: 85, reps: 7, exerciseSet});
  app.models.set.create({weight: 85, reps: 7, exerciseSet});
  app.models.set.create({weight: 85, reps: 7, exerciseSet});
  app.models.set.create({weight: 85, reps: 6, exerciseSet});
  app.models.set.create({weight: 85, reps: 5, exerciseSet});

  var shoulderSet = createExerciseSet(session, shoulderPress);

  app.models.set.create({weight: 55, reps: 7, shoulderSets});
  app.models.set.create({weight: 55, reps: 7, shoulderSets});
  app.models.set.create({weight: 55, reps: 7, shoulderSets});
  app.models.set.create({weight: 55, reps: 7, shoulderSets});
  app.models.set.create({weight: 55, reps: 7, shoulderSets});
  session = createSession(new Date(2018, 11, 20));

  exerciseSet = createExerciseSet(session, benchExercise);

  app.models.set.create({weight: 65, reps: 12, exerciseSet});
  app.models.set.create({weight: 65, reps: 12, exerciseSet});
  app.models.set.create({weight: 65, reps: 12, exerciseSet});
  app.models.set.create({weight: 65, reps: 12, exerciseSet});
  app.models.set.create({weight: 65, reps: 12, exerciseSet});

  var shoulderSets = createExerciseSet(session, shoulderPress);

  app.models.set.create({weight: 50, reps: 10, shoulderSets});
  app.models.set.create({weight: 50, reps: 10, shoulderSets});
  app.models.set.create({weight: 50, reps: 7, shoulderSets});

  function createSession(date) {
    return app.models.session.create({date});
  }

  function createExercise(name, muscleGroup) {
    return app.models.exercise.create({name, muscleGroup});
  }

  function createExerciseSet(session, exercise) {
    var shoulderSets = app.models.exerciseSet.create({session, exercise});
  }

  app.start();
};
