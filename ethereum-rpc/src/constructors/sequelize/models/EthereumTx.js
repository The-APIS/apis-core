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
    static associate({ EthereumBlock, ...models }) {
      EthereumTx.belongsTo(EthereumBlock, {
        foreignKey: {
          name: 'blockNumber',
        },
        targetKey: 'number',
      })
    }
  };
  EthereumTx.init({
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    transactionIndex: DataTypes.INTEGER,
    gasPrice: DataTypes.STRING,
    gas: DataTypes.INTEGER,
    blockNumber: DataTypes.INTEGER,
    hash: DataTypes.STRING,
    v: DataTypes.STRING,
    s: DataTypes.STRING,
    r: DataTypes.STRING,
    contractAddress: DataTypes.STRING,
    cumulativeGasUsed: DataTypes.STRING,
    gasUsed: DataTypes.STRING,
    logs: DataTypes.STRING,
    logsBloom: DataTypes.STRING,
    status: DataTypes.STRING,
    value: DataTypes.STRING,
    nonce: DataTypes.INTEGER,
    input: DataTypes.TEXT,
    balanceTo: DataTypes.STRING,
    balanceFrom: DataTypes.STRING,
    blockHash: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'EthereumTx',
  });
  return EthereumTx;
};
