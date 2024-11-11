"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      ord_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ord_cs_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "cs_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      ord_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ord_status: {
        type: Sequelize.ENUM("pending", "completed", "cancelled"),
        allowNull: false,
      },
      ord_totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      ord_createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      ord_updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
