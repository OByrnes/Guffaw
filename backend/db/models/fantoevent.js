'use strict';
module.exports = (sequelize, DataTypes) => {
  const fanToEvent = sequelize.define('fanToEvent', {
    fanId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  fanToEvent.associate = function(models) {
    fanToEvent.belongsTo(models.User, {foreignKey: "fanId"})
    fanToEvent.belongsTo(models.Event, {foreignKey: "eventId"})
  };
  return fanToEvent;
};