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
    Exercise.findById(exerciseId, filter, function(err, instance) {
      if (!instance) {
        cb(err, null);
        return;
      }
      instance = instance.toJSON();
      const exerciseSets = instance['exerciseSets'];
      const sortedSets = exerciseSets.sort(function(a, b) {
        return new Date(a.session.date) < new Date(b.session.date);
      });
      cb(null, sortedSets);
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
