'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BitcoinTxOut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BitcoinTxOut.init({
    txHash: DataTypes.STRING,
    value: DataTypes.STRING,
    sequence: DataTypes.STRING,
    script: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BitcoinTxOut',
  });
  return BitcoinTxOut;
};
