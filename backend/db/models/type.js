'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    type: DataTypes.STRING
  }, {});
  Type.associate = function(models) {
    Type.belongsToMany(models.Event, {through: "EventToType", otherKey: "eventId", foreignKey: "typeId"})
  };
  return Type;
};