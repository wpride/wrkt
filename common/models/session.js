module.exports = (Session) => {
  const filter = {
    include: {
      relation: 'exerciseSets',
      scope: {
        include: ['sets', 'exercise'],
      },
    },
  };

  Session.getSets = (sessionId, callback) => {
    Session.findById(sessionId, filter, (err, instance) => {
      if (!instance) {
        callback(err, null);
        return;
      }
      const instanceJson = instance.toJSON();
      const { exerciseSets } = instanceJson;
      callback(null, exerciseSets);
    });
  };
  Session.newSession = function (date, sets, cb) {
    Session.findOrCreate(
      {
        where: {
          date,
        },
      }, {
        date,
      }, (err, session) => {
        if (err) {
          cb(err, null);
        }
        Session.app.models.ExerciseSet
          .create(sets.map(set => ({ sessionId: session.id, exerciseId: set.exerciseId })))
          .then((exerciseSets) => {
            Session.app.models.Set.create([exerciseSets.map((exerciseSet, index) => {
              const set = sets[index];
              return [set.sets.map(reps => ({
                weight: set.weight,
                reps,
                exerciseSetId: exerciseSet.id,
              }))];
            })]).then((sets, error) => {
              if (error) {
                cb(error, null);
                return;
              }
              cb(null, session);
            });
          });
      }
    );
  };
  Session.remoteMethod(
    'getSets',
    {
      http: { path: '/getSets', verb: 'get' },
      accepts: { arg: 'id', type: 'string', http: { source: 'query' } },
      returns: { arg: 'exerciseSets', type: 'array' },
    }
  );
  Session.remoteMethod(
    'newSession',
    {
      http: { path: '/newSession', verb: 'post' },
      accepts: [
        { arg: 'date', type: 'string' },
        { arg: 'sets', type: 'array' },
      ],
      returns: { arg: 'session', type: 'array' },
    }
  );
};
