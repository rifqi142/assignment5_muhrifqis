"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const addresses = [];

    for (let i = 0; i < 15; i++) {
      addresses.push({
        adrs_cs_id: faker.number.int({ min: 1, max: 15 }),
        adrs_street: faker.location.street(),
        adrs_city: faker.location.city(),
        adrs_state: faker.location.state(),
        adrs_postalCode: faker.location.zipCode(),
        adrs_createdAt: new Date(),
        adrs_updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("addresses", addresses, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("addresses", null, {});
  },
};
