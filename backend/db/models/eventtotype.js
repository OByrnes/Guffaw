'use strict';
module.exports = (sequelize, DataTypes) => {
  const eventToType = sequelize.define('eventToType', {
    eventId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER
  }, {});
  eventToType.associate = function(models) {
    // associations can be defined here
  };
  return eventToType;
};