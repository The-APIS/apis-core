'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EthereumMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EthereumMethod.init({
    contract: DataTypes.STRING,
    method: DataTypes.STRING,
    params: DataTypes.JSONB,
    txHash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EthereumMethod',
  });
  return EthereumMethod;
};
