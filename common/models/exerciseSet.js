'use strict';

module.exports = function(ExerciseSet) {
  ExerciseSet.newExerciseSet = function(weight, sets, exerciseId, cb) {
    const todayDate = new Date().setHours(0, 0, 0, 0);
    ExerciseSet.app.models.Session.findOrCreate(
      {
        where: {
          date: todayDate,
        },
      }, {
        date: todayDate,
      }, function(err, session) {
        if (err) {
          cb(err, null);
        }
        ExerciseSet
          .create({sessionId: session.id, exerciseId: exerciseId})
          .then(function(exerciseSet) {
            sets.forEach(function(reps) {
              ExerciseSet.app.models.Set.create({
                weight: weight,
                reps: reps,
                exerciseSetId: exerciseSet.id,
              });
            });
            cb(null, session);
          }
        );
      }
    );
  };

  ExerciseSet.remoteMethod(
    'newExerciseSet',
    {
      http: {path: '/newExerciseSet', verb: 'post'},
      accepts: [
        {arg: 'weight', type: 'string'},
        {arg: 'sets', type: 'array'},
        {arg: 'exerciseId', type: 'string'},
      ],
      returns: {arg: 'exerciseSets', type: 'array'},
    }
  );
};
