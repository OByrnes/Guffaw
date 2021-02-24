'use strict';
module.exports = (sequelize, DataTypes) => {
  const eventToTag = sequelize.define('eventToTag', {
    eventId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  eventToTag.associate = function(models) {
    // associations can be defined here
  };
  return eventToTag;
};