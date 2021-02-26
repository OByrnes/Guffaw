'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const typesArray = ["Open-mic", "Free", "Stand-Up", "Improv", "Family-Friendly", "18+", "21+"]
    const typesArrayObj=[]
    typesArray.forEach(type => typesArrayObj.push({type}))
    return queryInterface.bulkInsert('Types', typesArrayObj, {});
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
    return queryInterface.bulkDelete('Types', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
