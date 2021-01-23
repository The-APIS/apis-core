'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EthereumTx', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      from: {
        type: Sequelize.STRING,
      },
      to: {
        type: Sequelize.STRING,
      },
      transactionIndex: {
        type: Sequelize.INTEGER
      },
      gasPrice: {
        type: Sequelize.STRING
      },
      gas: {
        type: Sequelize.INTEGER
      },
      blockNumber: {
        type: Sequelize.INTEGER
      },
      hash: {
        type: Sequelize.STRING,
        unique: true,
      },
      v: {
        type: Sequelize.STRING
      },
      s: {
        type: Sequelize.STRING
      },
      r: {
        type: Sequelize.STRING
      },
      contractAddress: {
        type: Sequelize.STRING
      },
      cumulativeGasUsed: {
        type: Sequelize.STRING
      },
      gasUsed: {
        type: Sequelize.STRING
      },
      logs: {
        type: Sequelize.STRING
      },
      logsBloom: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      nonce: {
        type: Sequelize.INTEGER
      },
      input: {
        type: Sequelize.TEXT
      },
      balanceTo: {
        type: Sequelize.STRING
      },
      balanceFrom: {
        type: Sequelize.STRING
      },
      blockHash: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('EthereumTx');
  }
};
