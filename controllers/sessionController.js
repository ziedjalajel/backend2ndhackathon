const { Session, User } = require("../db/models");

exports.sessionFetch = async (sessionId, next) => {
  try {
    const session = await Session.findByPk(sessionId);
    return session;
  } catch (error) {
    next(error);
  }
};

exports.sessionList = async (req, res, next) => {
  try {
    const session = await Session.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      //   include: {
      //     model: User,
      //     // as: "sessionTypes",
      //     attributes: ["name", "slug"],
      //   },
    });
    res.json(session);
  } catch (error) {
    next(error);
  }
};

exports.sessionDetail = async (req, res) => res.json(req.session);
