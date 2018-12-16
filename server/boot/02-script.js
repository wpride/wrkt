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

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  function createSessions() {
    app.models.Session.create([
      {date: new Date(2018, 11, 13)},
      {date: new Date(2018, 11, 11)},
      {date: new Date(2018, 11, 10)},
      {date: new Date(2018, 11, 06)},
      {date: new Date(2018, 11, 05)},
      {date: new Date(2018, 11, 04)},
      {date: new Date(2018, 10, 30)},
      {date: new Date(2018, 10, 27)},
      {date: new Date(2018, 10, 26)},
      {date: new Date(2018, 10, 20)},
      {date: new Date(2018, 10, 17)},
      {date: new Date(2018, 10, 16)},
      {date: new Date(2018, 10, 14)},
      {date: new Date(2018, 10, 12)},
      {date: new Date(2018, 10, 07)},
      {date: new Date(2018, 10, 05)},
      {date: new Date(2018, 10, 02)},
      {date: new Date(2018, 9, 31)},
      {date: new Date(2018, 9, 29)},
      {date: new Date(2018, 9, 26)},
      {date: new Date(2018, 9, 24)},
      {date: new Date(2018, 9, 23)},
      {date: new Date(2018, 9, 19)},
      {date: new Date(2018, 9, 16)},
      {date: new Date(2018, 9, 15)},
      {date: new Date(2018, 9, 11)},
      {date: new Date(2018, 9, 10)},
      {date: new Date(2018, 9, 8)},
      {date: new Date(2018, 9, 4)},
      {date: new Date(2018, 9, 2)},
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
          {name: 'Dip', muscleGroupId: chest.id},
          {name: 'Chin Up', muscleGroupId: back.id},
          {name: 'Deadlift', muscleGroupId: back.id},
          {name: 'DB Row', muscleGroupId: back.id},
          {name: 'BB Row', muscleGroupId: back.id},
          {name: 'BB Shrug', muscleGroupId: back.id},
          {name: 'DB Curl', muscleGroupId: back.id},
          {name: 'DB Shrug', muscleGroupId: back.id},
          {name: 'Squat', muscleGroupId: legs.id},
          {name: 'Leg Curl', muscleGroupId: legs.id},
          {name: 'Lunge', muscleGroupId: legs.id},
        ]).then(function(exercises) {
          const [
            bbBenchExercise, dbBenchExercise, shoulderPress, dip,
            chinUp, deadlift, dbRow, bbRow, bbShrug, dbCurl, dbShrug,
            squat, legCurl, lunge] = exercises;
          function createExerciseSet(session, exercise, weight, repss) {
            app.models.ExerciseSet.create({sessionId: session.id, exerciseId: exercise.id}).then(function(exerciseSet) {
              repss.forEach(function(reps) {
                app.models.Set.create({weight, reps, exerciseSetId: exerciseSet.id});
              });
            });
          }

          function getSessionByDate(date) {
            return sessions.find(session => session.date.getTime() == date.getTime());
          }

          // Back
          var session = getSessionByDate(new Date(2018, 11, 13));
          createExerciseSet(session, chinUp, 35, [6, 6, 6, 6, 5]);

          session = getSessionByDate(new Date(2018, 11, 10));
          createExerciseSet(session, chinUp, 30, [7, 7, 7, 7, 6]);
          createExerciseSet(session, dbRow, 60, [12, 15, 15, 15]);
          createExerciseSet(session, bbShrug, 155, [15, 15, 15]);
          createExerciseSet(session, dbCurl, 25, [10, 10, 10, 5]);

          session = getSessionByDate(new Date(2018, 11, 4));
          createExerciseSet(session, bbRow, 185, [5, 5, 6, 7, 6]);
          createExerciseSet(session, chinUp, 20, [7, 7, 7, 6]);
          createExerciseSet(session, bbShrug, 145, [15, 16, 12, 12, 12, 10]);
          createExerciseSet(session, dbCurl, 35, [6, 5]);

          session = getSessionByDate(new Date(2018, 10, 30));
          createExerciseSet(session, chinUp, 30, [10, 10, 10, 6]);

          session = getSessionByDate(new Date(2018, 10, 26));
          createExerciseSet(session, deadlift, 245, [7, 7, 7, 7, 5]);
          createExerciseSet(session, chinUp, 0, [10, 10, 9, 7, 5]);
          createExerciseSet(session, dbShrug, 70, [11]);
          createExerciseSet(session, dbCurl, 30, [8, 8]);

          session = getSessionByDate(new Date(2018, 10, 20));
          createExerciseSet(session, chinUp, 20, [7, 7, 7, 8, 6]);
          createExerciseSet(session, dbShrug, 50, [16, 16]);

          session = getSessionByDate(new Date(2018, 10, 17));
          createExerciseSet(session, bbRow, 175, [6, 6, 7, 6, 6]);
          createExerciseSet(session, bbShrug, 175, [12, 12, 11, 7]);
          createExerciseSet(session, chinUp, 0, [10, 10, 9, 5]);
          createExerciseSet(session, dbCurl, 25, [10, 10, 9]);

          session = getSessionByDate(new Date(2018, 10, 12));
          createExerciseSet(session, chinUp, 0, [10, 10, 10, 8, 7]);

          session = getSessionByDate(new Date(2018, 10, 5));
          createExerciseSet(session, deadlift, 225, [10, 10, 10, 8, 10]);
          createExerciseSet(session, bbShrug, 135, [15, 15, 15, 12]);
          createExerciseSet(session, chinUp, 0, [10, 10, 7, 6]);
          createExerciseSet(session, dbCurl, 35, [5, 5, 6, 6]);

          session = getSessionByDate(new Date(2018, 9, 29));
          createExerciseSet(session, chinUp, 35, [5, 5, 5, 5, 5]);
          createExerciseSet(session, bbRow, 155, [8, 8, 9, 9, 9]);
          createExerciseSet(session, bbShrug, 175, [10, 10, 10]);
          createExerciseSet(session, dbCurl, 30, [9, 9]);
          createExerciseSet(session, dbShrug, 60, [12, 13]);

          session = getSessionByDate(new Date(2018, 9, 23));
          createExerciseSet(session, deadlift, 295, [4, 4, 4, 4, 4]);
          createExerciseSet(session, chinUp, 0, [10, 10, 8, 8]);
          createExerciseSet(session, dbShrug, 70, [9, 9, 8, 8]);
          createExerciseSet(session, dbCurl, 25, [9, 9, 10]);

          session = getSessionByDate(new Date(2018, 9, 15));
          createExerciseSet(session, chinUp, 30, [6, 6, 6, 6, 4]);
          createExerciseSet(session, bbRow, 135, [12, 12, 12, 12, 12]);
          createExerciseSet(session, bbShrug, 155, [10, 10, 10]);
          createExerciseSet(session, dbCurl, 30, [7, 8, 9]);

          session = getSessionByDate(new Date(2018, 9, 8));
          createExerciseSet(session, deadlift, 275, [6, 6, 6, 5, 4]);
          createExerciseSet(session, chinUp, 0, [9, 9, 9, 6]);
          createExerciseSet(session, bbShrug, 145, [12, 12, 12, 10]);
          createExerciseSet(session, dbCurl, 30, [8, 8, 8]);

          session = getSessionByDate(new Date(2018, 9, 2));
          createExerciseSet(session, chinUp, 30, [5, 5, 5, 5, 5]);
          createExerciseSet(session, dbRow, 70, [8, 8, 8, 10]);
          createExerciseSet(session, bbShrug, 145, [9, 9, 9, 8]);
          createExerciseSet(session, dbCurl, 27.5, [9, 9, 8]);

          // Chest
          session = getSessionByDate(new Date(2018, 11, 13));
          createExerciseSet(session, dbBenchExercise, 75, [12, 11]);

          session = getSessionByDate(new Date(2018, 11, 11));
          createExerciseSet(session, dbBenchExercise, 100, [4, 4, 4, 4, 4]);
          createExerciseSet(session, shoulderPress, 45, [13, 13, 11]);

          session = getSessionByDate(new Date(2018, 11, 05));
          createExerciseSet(session, bbBenchExercise, 225, [5, 5, 5, 5, 5]);
          createExerciseSet(session, shoulderPress, 60, [6, 6, 6, 6, 4]);

          session = getSessionByDate(new Date(2018, 10, 27));
          createExerciseSet(session, dbBenchExercise, 85, [7, 7, 7, 6, 5]);
          createExerciseSet(session, shoulderPress, 55, [7, 7, 7, 7, 7]);

          session = getSessionByDate(new Date(2018, 10, 20));
          createExerciseSet(session, dbBenchExercise, 65, [12, 12, 12, 12, 12]);
          createExerciseSet(session, shoulderPress, 50, [10, 10, 7]);

          session = getSessionByDate(new Date(2018, 10, 16));
          createExerciseSet(session, dbBenchExercise, 90, [6, 6, 6, 6]);
          createExerciseSet(session, shoulderPress, 45, [12, 12, 12]);

          session = getSessionByDate(new Date(2018, 10, 7));
          createExerciseSet(session, bbBenchExercise, 225, [4, 4, 4, 4, 4]);
          createExerciseSet(session, shoulderPress, 40, [13, 15, 15, 13]);

          session = getSessionByDate(new Date(2018, 9, 31));
          createExerciseSet(session, dbBenchExercise, 75, [10, 10, 10, 10, 7]);
          createExerciseSet(session, shoulderPress, 60, [5, 5, 5, 6]);

          session = getSessionByDate(new Date(2018, 9, 24));
          createExerciseSet(session, dbBenchExercise, 60, [12, 12, 12, 11, 11]);
          createExerciseSet(session, shoulderPress, 55, [6, 6, 6, 6, 6, 6]);
          createExerciseSet(session, dip, 0, [15, 15, 12]);

          session = getSessionByDate(new Date(2018, 9, 16));
          createExerciseSet(session, bbBenchExercise, 205, [5, 5, 5, 5]);
          createExerciseSet(session, shoulderPress, 50, [9, 9, 9, 8, 7]);
          createExerciseSet(session, dip, 0, [12, 12, 12, 12]);

          session = getSessionByDate(new Date(2018, 9, 10));
          createExerciseSet(session, bbBenchExercise, 185, [8, 8, 8, 8]);
          createExerciseSet(session, shoulderPress, 45, [8, 10, 11, 11, 11]);
          createExerciseSet(session, dip, 0, [10, 10]);

          session = getSessionByDate(new Date(2018, 9, 4));
          createExerciseSet(session, bbBenchExercise, 225, [3, 3, 3, 3]);
          createExerciseSet(session, shoulderPress, 35, [12, 15, 10]);
          createExerciseSet(session, dip, 0, [12, 12, 10]);

          // Leg
          session = getSessionByDate(new Date(2018, 11, 13));
          createExerciseSet(session, squat, 155, [7, 7, 7, 7, 7]);

          session = getSessionByDate(new Date(2018, 11, 6));
          createExerciseSet(session, squat, 135, [9, 9, 9, 10, 9, 8, 8]);
          createExerciseSet(session, legCurl, 120, [12, 12, 12, 10]);

          session = getSessionByDate(new Date(2018, 10, 30));
          createExerciseSet(session, squat, 225, [3, 3, 3, 3]);

          session = getSessionByDate(new Date(2018, 10, 14));
          createExerciseSet(session, squat, 185, [5, 5, 5, 5]);

          session = getSessionByDate(new Date(2018, 10, 2));
          createExerciseSet(session, squat, 175, [5, 5, 5, 5, 5]);
          createExerciseSet(session, lunge, 60, [12, 12, 12]);

          session = getSessionByDate(new Date(2018, 9, 26));
          createExerciseSet(session, squat, 165, [5, 5, 5, 5, 5]);

          session = getSessionByDate(new Date(2018, 9, 19));
          createExerciseSet(session, squat, 155, [6, 6, 6, 6, 6]);

          session = getSessionByDate(new Date(2018, 9, 11));
          createExerciseSet(session, squat, 185, [4, 4, 4, 4, 4]);
        });
      });
    });
  }

  var fs = require('fs');
  if (fs.existsSync('mydata.json')) {
    console.log('mydata exists, skipping');
  } else {
    createSessions();
  }
};
