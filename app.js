const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const session = require('express-session');

const FileStore = require('session-file-store')(session);

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const indexRouter = require('./routes/api');

const app = express();

app.use(session({
  store: new FileStore(),
  secret: 'secret',
  resave: false,
  saveUninitialized: true
})
);

app.use(passport.initialize());
app.use(passport.session());

const user = {
  id: '1',
  email: 'test@email.com',
  password: 'password'
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const _user = user.id === id ? user: false
  done(null, _user);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
}, (email, password, done) => {
  if(email === user.email && password === user.password) {
    return done(null, user)
  } else {
    return done(null, false)
  }
})
);

passport.use(new JWTStrategy({
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'jwt_secret'
}, (jwt_payload, done) => {
  if(user.id === jwt_payload.user._id) {
    return done (null, user)
  } else {
    return done(null, false, {
      message: 'Token not matched'
    })
  }
})
);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'client/build'))); // в папке client выполнить yarn build

app.use('/api', indexRouter);

app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname + 'client/build/index.html'))
})


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
