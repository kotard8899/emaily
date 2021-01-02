const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
    scope: ['profile', 'email'] // 要求獲得的資訊
    })
  );
  
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
    );

  app.get('/api/logout', (req, res) => {
    req.logout(); // function attached by passport
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
