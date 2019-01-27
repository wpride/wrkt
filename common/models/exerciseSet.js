module.exports = (ExerciseSet) => {
  ExerciseSet.newExerciseSet = (weight, sets, exerciseId, cb) => {
    const todayDate = new Date().setHours(0, 0, 0, 0);
    ExerciseSet.app.models.Session.findOrCreate(
      {
        where: {
          date: todayDate,
        },
      }, {
        date: todayDate,
      }, (err, session) => {
        if (err) {
          cb(err, null);
        }
        ExerciseSet
          .create({ sessionId: session.id, exerciseId })
          .then((exerciseSet) => {
            sets.forEach((reps) => {
              ExerciseSet.app.models.Set.create({
                weight,
                reps,
                exerciseSetId: exerciseSet.id,
              });
            });
            cb(null, session);
          });
      }
    );
  };

  ExerciseSet.remoteMethod(
    'newExerciseSet',
    {
      http: { path: '/newExerciseSet', verb: 'post' },
      accepts: [
        { arg: 'weight', type: 'string' },
        { arg: 'sets', type: 'array' },
        { arg: 'exerciseId', type: 'string' },
      ],
      returns: { arg: 'exerciseSets', type: 'array' },
    }
  );
};
