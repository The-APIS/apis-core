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
      transactionIndex: {
        type: Sequelize.STRING
      },
      input: {
        type: Sequelize.STRING
      },
      gasPrice: {
        type: Sequelize.STRING
      },
      gas: {
        type: Sequelize.STRING
      },
      blockNumber: {
        type: Sequelize.INTEGER
      },
      txHash: {
        type: Sequelize.STRING,
        unique: true,
      },
      v: {
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
      sender: {
        type: Sequelize.STRING
      },
      recipient: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      nonce: {
        type: Sequelize.INTEGER
      },
      blockNumber: {
        type: Sequelize.INTEGER
      },
      txHash: {
        type: Sequelize.STRING
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
