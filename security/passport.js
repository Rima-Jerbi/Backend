const UserModel = require("../model/user");

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "123564895";

module.exports = (passport) => {
    passport.use(
      new JwtStrategy(opts, function (jwt_payload, done) {
        UserModel.findOne({ _id: jwt_payload.id })
          .then(user => {
            if (user) {
              return done(null, user);
            } else {
              return done(null, false);
              // ou vous pouvez créer un nouveau compte
            }
          })
          .catch(err => {
            return done(err, false);
          });
      })
    );
  };
  
