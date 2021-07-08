"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "userId", Sequelize.INTEGER, {
      allowNull: false,
      references: {
        model: {
          tableName: "UserIds",
        },
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "userId");
  },
};
