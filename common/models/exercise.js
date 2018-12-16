'use strict';

module.exports = function(Exercise) {
  const filter = {
    include: {
      relation: 'ExerciseSets',
      scope: {
        include: {
          relation: 'Sets',
        },
      },
    },
  };

  Exercise.getSets = function(exerciseId, cb) {
    console.log(`ID: ${exerciseId}`);
    Exercise.findById(exerciseId, filter, function(err, instance) {
      if (!instance) {
        return;
      }
      instance = instance.toJSON();
      const exerciseSets = instance['ExerciseSets'];
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
