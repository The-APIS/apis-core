'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EthereumContract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EthereumContract.init({
    slug: DataTypes.STRING,
    address: DataTypes.STRING,
    type: DataTypes.STRING,
    network: DataTypes.STRING,
    metadata: DataTypes.JSONB,
  }, {
    sequelize,
    modelName: 'EthereumContract',
  });
  return EthereumContract;
};
