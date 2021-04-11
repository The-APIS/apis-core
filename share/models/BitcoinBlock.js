'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BitcoinBlock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BitcoinBlock.init({
    hash: {
      // The unique, identifying block hash
      type: DataTypes.STRING,
      unique: true,
    },
    confirmations: {
      // The number of block confirmations (confirmed blocks after this block)
      type: DataTypes.INTEGER,
    },
    strippedsize: {
      type: DataTypes.INTEGER,
    },
    size: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    version: {
      type: DataTypes.INTEGER,
    },
    versionHex: {
      type: DataTypes.STRING,
    },
    merkleroot: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.DATE,
    },
    mediantime: {
      type: DataTypes.DATE,
    },
    nonce: {
      type: DataTypes.BIGINT,
      unique: true,
    },
    bits: {
      type: DataTypes.STRING,
    },
    difficulty: {
      type: DataTypes.INTEGER,
    },
    chainwork: {
      type: DataTypes.STRING,
    },
    nTx: {
      type: DataTypes.INTEGER,
    },
    nextblockhash: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'BitcoinBlock',
  });
  return BitcoinBlock;
};
