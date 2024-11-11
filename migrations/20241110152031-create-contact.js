"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contacts", {
      cnt_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cnt_cs_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "cs_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      cnt_phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnt_fax: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnt_createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      cnt_updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("contacts");
  },
};
