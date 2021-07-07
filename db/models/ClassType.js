const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const ClassType = sequelize.define("ClassType", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
  });
  SequelizeSlugify.slugifyModel(ClassType, {
    source: ["name"],
  });
  return ClassType;
};
