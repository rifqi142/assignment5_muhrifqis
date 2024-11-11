"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const contacts = [];

    for (let i = 0; i < 15; i++) {
      contacts.push({
        cnt_cs_id: faker.number.int({ min: 1, max: 15 }),
        cnt_phone: faker.phone.number(),
        cnt_fax: faker.phone.number(),
        cnt_createdAt: new Date(),
        cnt_updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("contacts", contacts, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("contacts", null, {});
  },
};
