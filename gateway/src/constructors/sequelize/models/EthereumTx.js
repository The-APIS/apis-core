'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EthereumTx extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EthereumTx.init({
    transactionIndex: DataTypes.STRING,
    input: DataTypes.STRING,
    gasPrice: DataTypes.STRING,
    gas: DataTypes.STRING,
    blockNumber: DataTypes.INTEGER,
    txHash: DataTypes.STRING,
    v: DataTypes.STRING,
    r: DataTypes.STRING,
    contractAddress: DataTypes.STRING,
    cumulativeGasUsed: DataTypes.STRING,
    gasUsed: DataTypes.STRING,
    logs: DataTypes.STRING,
    logsBloom: DataTypes.STRING,
    status: DataTypes.STRING,
    sender: DataTypes.STRING,
    recipient: DataTypes.STRING,
    value: DataTypes.STRING,
    nonce: DataTypes.INTEGER,
    blockNumber: DataTypes.INTEGER,
    txHash: DataTypes.STRING,
    balanceTo: DataTypes.STRING,
    balanceFrom: DataTypes.STRING,
    blockHash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EthereumTx',
  });
  return EthereumTx;
};
