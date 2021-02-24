'use strict';
module.exports = (sequelize, DataTypes) => {
  const fanToEvent = sequelize.define('fanToEvent', {
    fanId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER
  }, {});
  fanToEvent.associate = function(models) {
    // associations can be defined here
  };
  return fanToEvent;
};