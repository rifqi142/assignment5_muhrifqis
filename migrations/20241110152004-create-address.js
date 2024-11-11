"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("addresses", {
      adrs_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      adrs_cs_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "cs_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      adrs_street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adrs_city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adrs_state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adrs_postalCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adrs_createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      adrs_updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("addresses");
  },
};
