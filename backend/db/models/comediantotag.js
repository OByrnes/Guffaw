'use strict';
module.exports = (sequelize, DataTypes) => {
  const ComedianToTag = sequelize.define('ComedianToTag', {
    comedianId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  ComedianToTag.associate = function(models) {
    ComedianToTag.belongsTo(models.Tag, {foreignKey: "tagId"})
    ComedianToTag.belongsTo(models.User, {foreignKey:"comedianId"})
  };
  return ComedianToTag;
};