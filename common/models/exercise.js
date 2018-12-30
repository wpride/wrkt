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
        const aDate = new Date(a.session.date);
        const bDate = new Date(b.session.date);
        return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
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
