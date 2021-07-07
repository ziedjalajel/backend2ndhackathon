"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "GymClasses",
      "classTypeId",
      Sequelize.INTEGER,
      {
        allowNull: false,
        references: {
          model: {
            tableName: "ClassTypes",
          },
          key: "id",
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("GymClasses", "classTypeId");
  },
};
