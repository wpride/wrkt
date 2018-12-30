'use strict';

module.exports = function(Session) {
  const filter = {
    include: {
      relation: 'exerciseSets',
      scope: {
        include: ['sets', 'exercise'],
      },
    },
  };

  Session.getSets = function(sessionId, cb) {
    Session.findById(sessionId, filter, function(err, instance) {
      if (!instance) {
        cb(err, null);
        return;
      }
      instance = instance.toJSON();
      const exerciseSets = instance['exerciseSets'];
      cb(null, exerciseSets);
    });
  };
  Session.newSession = function(date, sets, cb) {
    Session.findOrCreate(
      {
        where: {
          date: date,
        },
      }, {
        date: date,
      }, function(err, session) {
        if (err) {
          cb(err, null);
        }
        Session.app.models.ExerciseSet
          .create(sets.map((set) => ({sessionId: session.id, exerciseId: set.exerciseId})))
          .then(function(exerciseSets) {
            console.log("ExerciseSets");
            console.log(exerciseSets);
            Session.app.models.Set.create([exerciseSets.map(function(exerciseSet, index) {
              const set = sets[index];
              return [set.sets.map(function(reps) {
                return {
                  weight: set.weight,
                  reps: reps,
                  exerciseSetId: exerciseSet.id,
                };
              })];
            })]).then(function(sets, error) {
              if (error) {
                cb(error, null);
                return;
              }
              cb(null, session);
            });
          }
        );
      }
    );
  };
  Session.remoteMethod(
    'getSets',
    {
      http: {path: '/getSets', verb: 'get'},
      accepts: {arg: 'id', type: 'string', http: {source: 'query'}},
      returns: {arg: 'exerciseSets', type: 'array'},
    }
  );
  Session.remoteMethod(
    'newSession',
    {
      http: {path: '/newSession', verb: 'post'},
      accepts: [
        {arg: 'date', type: 'string'},
        {arg: 'sets', type: 'array'},
      ],
      returns: {arg: 'session', type: 'array'},
    }
  );
};
