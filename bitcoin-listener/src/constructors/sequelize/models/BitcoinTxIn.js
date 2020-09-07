'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BitcoinTxIn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BitcoinTxIn.init({
    hash: DataTypes.STRING,
    index: DataTypes.STRING,
    script: DataTypes.STRING,
    sequence: DataTypes.STRING,
    witness: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BitcoinTxIn',
  });
  return BitcoinTxIn;
};