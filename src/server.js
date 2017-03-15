'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
// import Mongoose from './serv/dbconfig';
import Mongoose from 'mongoose';
import Races from './serv/schemas/races';
import User from './serv/schemas/users';
import Results from './serv/schemas/results';
import passport from 'passport';

var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
  clientID: '630724287121611',
  clientSecret: '39b0e9bbb91cdb757f264099dff78b0b',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
},
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const app = new Express();
const server = new Server(app);

// Configure view engine to render EJS templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'static')));

app.use(passport.initialize());
app.use(passport.session());
// app.get('*', (req, res) => {
//   match(
//     { routes, location: req.url },
//     (err, redirectLocation, renderProps) => {

//       if (err) {
//         return res.status(500).send(err.message);
//       }

//       if (redirectLocation) {
//         return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//       }

//       let markup;
//       if (renderProps) {
//         markup = renderToString(<RouterContext {...renderProps}/>);
//       } else {
//         markup = renderToString(<NotFoundPage/>);
//         res.status(404);
//       }

//       return res.render('index', { markup });
//     }
//   );
// });

app.get('/',
  function(req, res) {
    res.render('index', { user: req.user });
  });


// Authentication paths
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    // res.redirect('landing');
    res.render('landing');
  });


// Server initialization
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port}`);
});
