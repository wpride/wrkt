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
  Session.remoteMethod(
    'getSets',
    {
      http: {path: '/getSets', verb: 'get'},
      accepts: {arg: 'id', type: 'string', http: {source: 'query'}},
      returns: {arg: 'exerciseSets', type: 'array'},
    }
  );
};
