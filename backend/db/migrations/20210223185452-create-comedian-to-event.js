'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comedianToEvents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comedianId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {model:{tableName:"Users"}}
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{model:{tableName:"Events"}}
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
    return queryInterface.dropTable('comedianToEvents');
  }
};