'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Venues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(125),
        allowNull: false
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull:false
      },
      type: {
        type: Sequelize.ENUM("bar","brewery","comedyClub","restaurant","other","coffeeShop"),
        allowNull: false
      },
      websiteUrl: {
        type: Sequelize.STRING,

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Venues');
  }
};