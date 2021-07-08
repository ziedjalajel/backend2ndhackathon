"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Sessions", "userId", Sequelize.INTEGER, {
      allowNull: false,
      references: {
        model: {
          tableName: "Users",
        },
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Sessions", "userId");
  },
};
