"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Customer, {
        foreignKey: "ord_cs_id",
        as: "customer",
      });
    }
  }
  Order.init(
    {
      ord_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ord_cs_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ord_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ord_status: {
        type: DataTypes.ENUM("Pending", "Completed", "Cancelled"),
        allowNull: false,
      },
      ord_totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      ord_createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      ord_updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      timestamps: true,
      createdAt: "ord_createdAt",
      updatedAt: "ord_updatedAt",
    }
  );
  return Order;
};
