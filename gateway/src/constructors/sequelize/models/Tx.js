'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tx extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tx.init({
    txId: DataTypes.STRING,
    blockHash: DataTypes.STRING,
    blockchain: DataTypes.ENUM,
  }, {
    sequelize,
    modelName: 'Tx',
  });
  return Tx;
};
