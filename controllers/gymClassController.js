// Database
const { GymClass, ClassType } = require("../db/models");

exports.gymClassFetch = async (gymClassId, next) => {
  try {
    const gymClass = await GymClass.findByPk(gymClassId);
    return gymClass;
  } catch (error) {
    next(error);
  }
};

exports.gymClassesList = async (req, res, next) => {
  try {
    const gymClasses = await GymClass.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: ClassType,
        // as: "gymClassTypes",
        attributes: ["name", "slug"],
      },
    });
    res.json(gymClasses);
  } catch (error) {
    next(error);
  }
};

exports.gymClassDetail = async (req, res, next) => {
  try {
    const foundClass = await GymClass.findByPk(req.params.gymClassId);
    if (foundClass) {
      res.json(foundClass);
    }
  } catch (error) {
    next(error);
  }
};
//exports.carsDetail = async (req, res) => {
//   try {
//     const foundCar = await Car.findByPk(req.params.carId);
//     if (foundCar) {
//       res.json(foundCar);
//     } else {
//       res.status(404).json({ message: "Car Not Found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
