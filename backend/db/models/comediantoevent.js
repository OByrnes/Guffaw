'use strict';
module.exports = (sequelize, DataTypes) => {
  const comedianToEvent = sequelize.define('comedianToEvent', {
    comedianId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  comedianToEvent.associate = function(models) {
    comedianToEvent.belongsTo(models.User, {foreignKey: "comedianId"})
    comedianToEvent.belongsTo(models.Event, {foreignKey: "eventId"})
  };
  return comedianToEvent;
};