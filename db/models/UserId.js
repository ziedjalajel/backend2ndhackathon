const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const UserId = sequelize.define(
    "UserId",
    {
      name: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    { sequelize, modelName: "UserId" }
  );
  return UserId;
};
