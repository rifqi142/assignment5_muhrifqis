"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.Customer, {
        foreignKey: "adrs_cs_id",
        as: "customer",
      });
    }
  }
  Address.init(
    {
      adrs_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      adrs_cs_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      adrs_street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adrs_city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adrs_state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adrs_postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adrs_createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      adrs_updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "addresses",
      timestamps: true,
      createdAt: "adrs_createdAt",
      updatedAt: "adrs_updatedAt",
    }
  );
  return Address;
};
