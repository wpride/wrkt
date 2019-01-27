module.exports = (Exercise) => {
  const filter = {
    include: {
      relation: 'exerciseSets',
      scope: {
        include: ['sets', 'session'],
      },
    },
  };

  Exercise.getSets = (exerciseId, callback) => {
    Exercise.findById(exerciseId, filter, (err, instance) => {
      if (!instance) {
        callback(err, null);
        return;
      }
      instance = instance.toJSON();
      const { exerciseSets } = instance;
      const sortedSets = exerciseSets.sort((a, b) => {
        const aDate = new Date(a.session.date);
        const bDate = new Date(b.session.date);
        if (aDate > bDate) {
          return -1;
        }
        if (aDate < bDate) {
          return 1;
        }
        return 0;
      });
      callback(null, sortedSets);
    });
  };
  Exercise.remoteMethod(
    'getSets',
    {
      http: { path: '/getSets', verb: 'get' },
      accepts: { arg: 'id', type: 'string', http: { source: 'query' } },
      returns: { arg: 'exerciseSets', type: 'array' },
    }
  );
};
