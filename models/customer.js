"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order, {
        foreignKey: "ord_cs_id",
        as: "orders",
      });
      Customer.hasMany(models.Address, {
        foreignKey: "adrs_cs_id",
        as: "addresses",
      });
      Customer.hasMany(models.Contact, {
        foreignKey: "cnt_cs_id",
        as: "contacts",
      });
    }
  }
  Customer.init(
    {
      cs_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cs_fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cs_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cs_gender: {
        type: DataTypes.ENUM("Male", "Female"),
        allowNull: false,
      },
      cs_birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cs_is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      cs_createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      cs_updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "customers",
      timestamps: true,
      createdAt: "cs_createdAt",
      updatedAt: "cs_updatedAt",
    }
  );
  return Customer;
};
