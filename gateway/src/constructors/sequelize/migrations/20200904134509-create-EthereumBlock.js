'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EthereumBlock', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      difficulty: {
        type: Sequelize.INTEGER
      },
      extraData: {
        type: Sequelize.STRING
      },
      gasLimit: {
        type: Sequelize.STRING
      },
      blockGasUsed: {
        type: Sequelize.STRING
      },
      blockHash: {
        type: Sequelize.STRING,
        unique: true,
      },
      blockLogsBloom: {
        type: Sequelize.STRING
      },
      miner: {
        type: Sequelize.STRING
      },
      mixHash: {
        type: Sequelize.STRING
      },
      blockNonce: {
        type: Sequelize.INTEGER
      },
      blockNumber: {
        type: Sequelize.INTEGER
      },
      parentHash: {
        type: Sequelize.STRING,
        unique: true,
      },
      receiptsRoot: {
        type: Sequelize.STRING
      },
      sha3Uncles: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.INTEGER
      },
      stateRoot: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.DATE
      },
      totalDifficulty: {
        type: Sequelize.STRING
      },
      transactionsRoot: {
        type: Sequelize.STRING
      },
      uncles: {
        type: Sequelize.JSONB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EthereumBlock');
  }
};
