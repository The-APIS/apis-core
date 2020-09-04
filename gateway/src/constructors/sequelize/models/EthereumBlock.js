'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EthereumBlock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EthereumBlock.init({
    difficulty: DataTypes.INTEGER,
    extraData: DataTypes.STRING,
    gasLimit: DataTypes.STRING,
    blockGasUsed: DataTypes.STRING,
    blockHash: DataTypes.STRING,
    blockLogsBloom: DataTypes.STRING,
    miner: DataTypes.STRING,
    mixHash: DataTypes.STRING,
    blockNonce: DataTypes.INTEGER,
    blockNumber: DataTypes.INTEGER,
    parentHash: DataTypes.STRING,
    receiptsRoot: DataTypes.STRING,
    sha3Uncles: DataTypes.STRING,
    size: DataTypes.INTEGER,
    stateRoot: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    totalDifficulty: DataTypes.STRING,
    transactionsRoot: DataTypes.STRING,
    uncles: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'EthereumBlock',
  });
  return EthereumBlock;
};