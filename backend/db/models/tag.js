'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tagText: { 
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {});
  Tag.associate = function(models) {
    Tag.hasMany(models.ComedianToTag, {foreignKey: "tagId"})
    Tag.hasMany(models.eventToTag, {foreignKey: "eventId"})
    Tag.belongsToMany(models.User, {through: "ComedianToTag", otherKey: "comedianId", foreignKey: "tagId"})
    Tag.belongsToMany(models.Event, {through: "EventToTag", otherKey: "eventId", foreignKey: "tagId"})
  };
  return Tag;
};