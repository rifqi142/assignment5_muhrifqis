"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.belongsTo(models.Customer, {
        foreignKey: "cnt_cs_id",
        as: "customer",
      });
    }
  }
  Contact.init(
    {
      cnt_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cnt_cs_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cnt_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cnt_fax: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cnt_createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      cnt_updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "Contact",
      tableName: "contacts",
      timestamps: true,
      createdAt: "cnt_createdAt",
      updatedAt: "cnt_updatedAt",
    }
  );
  return Contact;
};
