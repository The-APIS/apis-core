'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BitcoinTx extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BitcoinTx.init({
    txid: {
      type: DataTypes.STRING,
      unique: true,
    },
    hash: {
      type: DataTypes.STRING,
      unique: true,
    },
    version: {
      type: DataTypes.INTEGER,
    },
    size: {
      type: DataTypes.INTEGER,
    },
    vsize: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    locktime: {
      type: DataTypes.INTEGER,
    },
    vin: {
      type: DataTypes.JSONB,
    },
    vout: {
      type: DataTypes.JSONB,
    },
    hex: {
      type: DataTypes.TEXT,
    },
    blockHash: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'BitcoinTx',
  });
  return BitcoinTx;
};
