'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: "Genny",
        lastName: "McGuill",
        comedian: false,
        location: "Dayton, Ohio",
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        firstName: "Alphonse",
        lastName: "Geraldine",
        comedian: false,
        location: "Dayton, Ohio",
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        firstName: "Demo",
        lastName: "User",
        comedian: false,
        location: "Dayton, Ohio",
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
    }, {});
  }
};