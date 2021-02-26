'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      venueId: {
        type: Sequelize.INTEGER,
        references:{model: {tableName: "Venues"}}
      },
      date: {
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING(125),
        allowNull: false
      },
      eventPhoto: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      recurring: {
        type: Sequelize.BOOLEAN
      },
      host:{
        type: Sequelize.INTEGER,
        references: {model:{tableName: "Users"}}
      },
      ticketed:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      price:{
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('Events');
  }
};