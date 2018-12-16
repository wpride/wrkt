'use strict';

module.exports = function(Exercise) {
  const filter = {
    include: {
      relation: 'ExerciseSets',
      scope: {
        include: ['Sets', 'Session'],
      },
    },
  };

  Exercise.getSets = function(exerciseId, cb) {
    console.log(`ID: ${exerciseId}`);
    Exercise.findById(exerciseId, filter, function(err, instance) {
      console.log(`Instance: ${instance}`);
      cb(null, instance);
    });
  };
  Exercise.remoteMethod(
    'getSets',
    {
      http: {path: '/getSets', verb: 'get'},
      accepts: {arg: 'id', type: 'string', http: {source: 'query'}},
      returns: {arg: 'name', type: 'string'},
    }
  );
};
