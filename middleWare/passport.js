const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");
const bcrypt = require("bcrypt");
const { User } = require("../db/models");

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
    if (Date.now() > payload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findByPk(payload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username } });
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    return done(null, passwordsMatch ? user : false);
  } catch (error) {
    done(error);
  }
});
