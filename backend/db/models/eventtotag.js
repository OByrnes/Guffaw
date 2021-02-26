'use strict';
module.exports = (sequelize, DataTypes) => {
  const eventToTag = sequelize.define('eventToTag', {
    eventId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  eventToTag.associate = function(models) {
    eventToTag.belongsTo(models.Event, {foreignKey: "eventId"})
    eventToTag.belongsTo(models.Tag, {foreignKey: "tagId"})

  };
  return eventToTag;
};