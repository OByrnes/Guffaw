'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Venues', [
      {name:"Wiley's Comedy Club",location: "101 Pine Street Dayton, Ohio", type:"comedyClub"},
      {name: "Hookah Bazaar", location: "958 Patterson Rd Dayton, OH 45419", type:"other"},
      {name:"The Barrel House", location: "417 East Third Street Dayton, Ohio 45402", type:"bar" },
      {name:"The Market Bar", location: "101 South Fountain Ave Springfield, Oh", type:"bar"}
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Venues', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
