'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    venueId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    recurring: DataTypes.BOOLEAN
  }, {});
  Event.associate = function(models) {

    Event.belongsToMany(models.User, {through: "FanToEvent", foreignKey: "eventId", otherKey: "userId"})
    Event.belongsToMany(models.User, {through: "ComediansToEvent", foreignKey: "eventId", otherKey: "userId"})
    Event.belongsToMany(models.Type, {through: "eventToType", foreignKey: "eventId", otherKey: "typeId"})
    Event.belongsToMany(models.Tag, {through: "EventToTag", foreignKey: "eventId", otherKey: "TagId"})
  };
  return Event;
};