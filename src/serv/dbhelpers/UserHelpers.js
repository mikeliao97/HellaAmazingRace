import User from '../schemas/users';


exports.checkUserIfNewAndCreate = (id, name) => {
  return new Promise((resolve, reject) => {
    User.findOne({ userId: id, displayName: name })
      .exec((err, found) => {
        if (err) {
          reject(err);
        } else if (!found) {
          var user = new User({
            userId: id,
            displayName: name
          });
          user.save((err, newUser) => {
            err ? reject(err) : resolve('User Saved');
          });
        }
      });
  });
};
