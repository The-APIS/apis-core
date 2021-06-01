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
    difficulty: DataTypes.STRING,
    extraData: DataTypes.TEXT,
    gasLimit: DataTypes.INTEGER,
    blockGasUsed: DataTypes.STRING,
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logsBloom: DataTypes.TEXT,
    miner: DataTypes.STRING,
    mixHash: DataTypes.STRING,
    nonce: DataTypes.STRING,
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parentHash: DataTypes.STRING,
    receiptsRoot: DataTypes.STRING,
    sha3Uncles: DataTypes.STRING,
    size: DataTypes.INTEGER,
    stateRoot: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    totalDifficulty: DataTypes.STRING,
    transactionsRoot: DataTypes.STRING,
    uncles: DataTypes.JSONB,
  }, {
    sequelize,
    modelName: 'EthereumBlock',
  });
  return EthereumBlock;
};
