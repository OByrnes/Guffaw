'use strict';
module.exports = (sequelize, DataTypes) => {
  const eventToType = sequelize.define('eventToType', {
    eventId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER
  }, {});
  eventToType.associate = function(models) {
    eventToType.belongsTo(models.Event, {foreignKey: "eventId"})
    eventToType.belongsTo(models.Type, {foreignKey: "typeId"})
  };
  return eventToType;
};