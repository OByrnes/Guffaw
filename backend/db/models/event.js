'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    venueId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    recurring: DataTypes.BOOLEAN,
    host: DataTypes.INTEGER,
    eventPhoto: DataTypes.STRING,
    ticketed: DataTypes.BOOLEAN,
    price: DataTypes.FLOAT
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.Venue, {foreignKey: "venueId"})
    Event.belongsToMany(models.User, {through: "fanToEvent", foreignKey: "eventId", otherKey: "userId"})
    Event.belongsToMany(models.User, {through: "comedianToEvent", foreignKey: "eventId", otherKey: "comedianId"})
    Event.belongsToMany(models.Type, {through: "eventToType", foreignKey: "eventId", otherKey: "typeId"})
    Event.belongsToMany(models.Tag, {through: "eventToTag", foreignKey: "eventId", otherKey: "tagId"})
    Event.hasMany(models.eventToType, {foreignKey:"eventId"})
    Event.hasMany(models.eventToTag, {foreignKey:"eventId"})
    Event.hasMany(models.comedianToEvent, {foreignKey: "eventId"})
    
  };
  return Event;
};