"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("Sessions", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
      },
      bookedSlots: {
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.DATE,
      },
      slug: {
        type: Sequelize.STRING,
        unique: true,
      },
      instructor: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Sessions");
  },
};
