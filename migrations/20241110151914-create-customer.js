"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customers", {
      cs_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cs_fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cs_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      cs_gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cs_birthDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cs_is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      cs_createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      cs_updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("customers");
  },
};
