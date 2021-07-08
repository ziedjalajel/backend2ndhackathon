const { User, Session } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.userFetch = async (userId, next) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    next(error);
  }
};
exports.userList = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Session,
        // as: "gymClassTypes",
        attributes: ["name", "slug"],
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signin = (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};
const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
    userId: user.userId,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  return token;
};
exports.userDetail = async (req, res) => res.json(req.user);

exports.sessionCreate = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;

    const newSessions = await Session.create(req.body);
    res.status(201).json(newSessions);
  } catch (error) {
    next(error);
  }
};
