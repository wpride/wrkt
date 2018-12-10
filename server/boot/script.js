module.exports = function(app, cb) {
  class ExerciseSet {
    constructor(session, exercise) {
      this.exerciseSets = createExerciseSet(session, exercise);
      this.addSet = this.addSet.bind(this);
    }

    addSet(weight, reps) {
      app.models.set.create({weight, reps, exerciseSet: shoulderSets});
    }

    addSets(weight, repss) {
      var that = this;
      repss.forEach(function(reps) {
        that.addSet(weight, reps);
      });
    }
  }

  var backGroup = app.models.muscleGroup.create({name: 'Back'});
  var chestGroup = app.models.muscleGroup.create({name: 'Chest'});
  var legGroup = app.models.muscleGroup.create({name: 'Leg'});
  var bbBenchExercise = createExercise('Barbell Bench Press', chestGroup);
  var dbBenchExercise = createExercise('Dumbbell Bench Press', chestGroup);
  var shoulderPress = createExercise('Shoulder Press', chestGroup);

  var session = createSession(new Date(2018, 11, 05));
  var benchSets = new ExerciseSet(session, bbBenchExercise);
  var shoulderSets = new ExerciseSet(session, shoulderPress);

  benchSets.addSets(225, [5, 5, 5, 5, 5]);
  shoulderSets.addSets(60, [6, 6, 6, 6, 4]);

  session = createSession(new Date(2018, 10, 27));
  benchSets = new ExerciseSet(session, dbBenchExercise);
  benchSets.addSets(85, [7, 7, 7, 6, 5]);
  shoulderSets = new ExerciseSet(session, shoulderPress);
  shoulderSets.addSets(55, [7, 7, 7, 7, 7]);

  session = createSession(new Date(2018, 10, 20));
  benchSets = new ExerciseSet(session, dbBenchExercise);
  benchSets.addSets(65, [12, 12, 12, 12, 12]);
  shoulderSets = new ExerciseSet(session, shoulderPress);
  shoulderSets.addSets(50, [10, 10, 7]);

  session = createSession(new Date(2018, 10, 16));
  benchSets = new ExerciseSet(session, dbBenchExercise);
  benchSets.addSets(90, [6, 6, 6, 6]);
  shoulderSets = new ExerciseSet(session, shoulderPress);
  shoulderSets.addSets(45, [12, 12, 12]);

  session = createSession(new Date(2018, 9, 31));
  benchSets = new ExerciseSet(session, bbBenchExercise);
  benchSets.addSets(75, [10, 10, 10, 10, 7]);
  shoulderSets = new ExerciseSet(session, shoulderPress);
  shoulderSets.addSets(40, [13, 15, 15, 15, 13]);

  function createSession(date) {
    return app.models.session.create({date});
  }

  function createExercise(name, muscleGroup) {
    return app.models.exercise.create({name, muscleGroup});
  }

  function createExerciseSet(session, exercise) {
    return app.models.exerciseSet.create({session, exercise});
  }
  app.start();
};
