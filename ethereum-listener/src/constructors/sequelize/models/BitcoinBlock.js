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
    version: DataTypes.INTEGER,
    prevHash: DataTypes.STRING,
    merkleRoot: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    bits: DataTypes.STRING,
    nonce: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BitcoinBlock',
  });
  return BitcoinBlock;
};
