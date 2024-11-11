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
    const orders = [];

    for (let i = 0; i < 15; i++) {
      orders.push({
        ord_cs_id: faker.number.int({ min: 1, max: 15 }),
        ord_date: faker.date.recent(),
        ord_status: faker.helpers.arrayElement([
          "pending",
          "completed",
          "cancelled",
        ]),
        ord_totalAmount: faker.commerce.price(),
        ord_createdAt: new Date(),
        ord_updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("orders", orders, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Orders", null, {});
  },
};
