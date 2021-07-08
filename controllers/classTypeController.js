// Database
const { ClassType, GymClass } = require("../db/models");

exports.classTypetFetch = async (classTypeId, next) => {
  try {
    const classType = await ClassType.findByPk(classTypeId);
    return classType;
  } catch (error) {
    next(error);
  }
};

exports.classTypeList = async (req, res, next) => {
  try {
    const classTypes = await ClassType.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(classTypes);
  } catch (error) {
    next(error);
  }
};

// exports.classTypeDetail = async (req, res, next) => {
//   try {
//     const foundType = await ClassType.findByPk(req.params.classTypeId);
//     if (foundType) {
//       res.json(foundType);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

exports.classTypeDetail = async (req, res) => res.json(req.classType);

exports.classTypeCreate = async (req, res, next) => {
  try {
    // if (req.gymClass.userId !== req.user.id) {
    //   throw {
    //     status: 401,
    //     message: "you can't add coockies to a classes that not yours",
    //   };
    // }

    // req.body.gymClassId = req.gymClass.id;
    const newClassType = await ClassType.create(req.body);
    res.status(201).json(newClassType);
  } catch (error) {
    next(error);
  }
};
exports.gymClassCreate = async (req, res, next) => {
  try {
    req.body.classTypeId = req.classType.id;

    const newGymClass = await GymClass.create(req.body);
    res.status(201).json(newGymClass);
  } catch (error) {
    next(error);
  }
};
