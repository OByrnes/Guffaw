'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    location: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Venue.associate = function(models) {
    // associations can be defined here
  };
  return Venue;
};