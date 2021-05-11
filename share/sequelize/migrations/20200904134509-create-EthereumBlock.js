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
        type: Sequelize.STRING,
      },
      extraData: {
        type: Sequelize.TEXT,
      },
      gasLimit: {
        type: Sequelize.INTEGER,
      },
      blockGasUsed: {
        type: Sequelize.STRING,
      },
      hash: {
        type: Sequelize.STRING,
        unique: true,
      },
      logsBloom: {
        type: Sequelize.TEXT,
      },
      miner: {
        type: Sequelize.STRING,
      },
      mixHash: {
        type: Sequelize.STRING,
      },
      nonce: {
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      parentHash: {
        type: Sequelize.STRING,
        unique: true,
      },
      receiptsRoot: {
        type: Sequelize.STRING,
      },
      sha3Uncles: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.INTEGER,
      },
      stateRoot: {
        type: Sequelize.STRING,
      },
      timestamp: {
        type: Sequelize.DATE,
      },
      totalDifficulty: {
        type: Sequelize.STRING,
      },
      transactionsRoot: {
        type: Sequelize.STRING,
      },
      uncles: {
        type: Sequelize.JSONB,
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
