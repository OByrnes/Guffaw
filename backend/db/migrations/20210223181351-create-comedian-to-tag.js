'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ComedianToTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comedianId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model: {tableName: "Users"}}
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: {tableName: "Tags"}}
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
    return queryInterface.dropTable('ComedianToTags');
  }
};