'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    name: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    type: {type: DataTypes.STRING},
    websiteUrl: {
      type: DataTypes.STRING
    }
  }, {});
  Venue.associate = function(models) {
    Venue.hasMany(models.Event, {foreignKey: "venueId"})
  };
  return Venue;
};