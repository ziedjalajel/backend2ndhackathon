const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    bookedSlots: {
      type: DataTypes.INTEGER,
    },
    time: {
      type: DataTypes.DATE,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    instructor: {
      type: DataTypes.STRING,
    },
  });
  SequelizeSlugify.slugifyModel(Session, {
    source: ["name"],
  });

  Session.associate = (models) => {
    models.User.hasMany(Session, {
      foreignKey: "userId",
      alloNull: false,
    });

    Session.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Session;
};
