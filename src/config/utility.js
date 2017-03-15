exports.isLoggedIn = (req, res, next) => {
  console.log(req.user);
  if (req.url ==='/') {
    next();
  } else if (req.user) {
    next();
  } else {
    console.log('not logged in');
    res.redirect('/');
  }
}