"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const customers = [];

    for (let i = 0; i < 15; i++) {
      customers.push({
        cs_fullName: faker.person.fullName(),
        cs_email: faker.internet.email(),
        cs_gender: faker.helpers.arrayElement(["Male", "Female"]),
        cs_birthDate: faker.date.birthdate(),
        cs_createdAt: new Date(),
        cs_updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("customers", customers, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Customers", null, {});
  },
};
