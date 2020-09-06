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
    version: DataTypes.STRING,
    locktime: DataTypes.STRING,
    txHash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BitcoinTx',
  });
  return BitcoinTx;
};