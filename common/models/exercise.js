'use strict';

module.exports = function(Exercise) {
  const filter = {
    include: {
      relation: 'exerciseSets',
      scope: {
        include: ['sets', 'session'],
      },
    },
  };

  Exercise.getSets = function(exerciseId, cb) {
    console.log(`ID: ${exerciseId}`);
    Exercise.findById(exerciseId, filter, function(err, instance) {
      if (!instance) {
        cb(err, null);
        return;
      }
      instance = instance.toJSON();
      console.log(instance);
      const exerciseSets = instance['exerciseSets'];
      console.log(exerciseSets);
      cb(null, exerciseSets);
    });
  };
  Exercise.remoteMethod(
    'getSets',
    {
      http: {path: '/getSets', verb: 'get'},
      accepts: {arg: 'id', type: 'string', http: {source: 'query'}},
      returns: {arg: 'exerciseSets', type: 'array'},
    }
  );
};
