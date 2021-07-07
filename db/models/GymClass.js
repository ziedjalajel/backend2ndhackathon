const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const GymClass = sequelize.define("GymClass", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
    },
  });
  //ToDo date in sessions
  SequelizeSlugify.slugifyModel(GymClass, {
    source: ["name"],
  });

  GymClass.associate = (models) => {
    models.ClassType.hasMany(GymClass, {
      foreignKey: "classTypeId",
      alloNull: false,
    });

    GymClass.belongsTo(models.ClassType, { foreignKey: "classTypeId" });
  };

  return GymClass;
};
