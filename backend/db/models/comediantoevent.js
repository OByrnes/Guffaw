'use strict';
module.exports = (sequelize, DataTypes) => {
  const comedianToEvent = sequelize.define('comedianToEvent', {
    comedianId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  comedianToEvent.associate = function(models) {
    // associations can be defined here
  };
  return comedianToEvent;
};