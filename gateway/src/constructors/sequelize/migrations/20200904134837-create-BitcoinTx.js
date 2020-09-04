'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BitcoinTx', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderAddress: {
        type: Sequelize.STRING,
      },
      recipientAddress: {
        type: Sequelize.STRING,
      },
      version: {
        type: Sequelize.STRING
      },
      locktime: {
        type: Sequelize.STRING
      },
      txHash: {
        type: Sequelize.STRING,
        unique: true,
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
    await queryInterface.dropTable('BitcoinTx');
  }
};
