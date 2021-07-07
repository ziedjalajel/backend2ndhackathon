const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Gym = sequelize.define("Gym", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    ownername: {
      type: DataTypes.STRING,
    },
  });
  SequelizeSlugify.slugifyModel(Gym, {
    source: ["name"],
  });
  return Gym;
};
