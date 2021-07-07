// Database
const { Gym, User } = require("../db/models");

exports.gymFetch = async (gymId, next) => {
  try {
    const gym = await Gym.findByPk(gymId);
    return gym;
  } catch (error) {
    next(error);
  }
};

exports.gymCreate = async (req, res, next) => {
  try {
    const isAdmin = await User.findAll({
      where: { isAdmin: true },
    });
    if (isAdmin) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      }

      const newGym = await Gym.create(req.body);
      res.status(201).json(newGym);
    }
  } catch (error) {
    next(error);
  }
};

exports.gymList = async (req, res, next) => {
  try {
    const gyms = await Gym.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      //   include: [
      //     {
      //       model: Product,
      //       as: "products",
      //       attributes: ["id"],
      //     },
      //   ],
    });
    res.json(gyms);
  } catch (error) {
    next(error);
  }
};

exports.gymDetail = async (req, res) => res.json(req.gym);

// exports.productCreate = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/${req.file.path}`;
//     }
//     req.body.gymId = req.gym.id;
//     const newProduct = await Product.create(req.body);
//     res.status(201).json(newProduct);
//   } catch (error) {
//     next(error);
//   }
// };
exports.createOwner = async (req, res, next) => {
  try {
    const isAdmin = await User.findAll({
      where: { isAdmin: true },
    });
    if (isAdmin) {
      const newGym = await User.create(req.body);
      // req.body.type === "owner";
      // await User.type.update("owner")
      res.status(201).json(newGym);
    }
  } catch (error) {
    next(error);
  }
};
