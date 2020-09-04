'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BitcoinBlock', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      version: {
        type: Sequelize.INTEGER
      },
      prevHash: {
        type: Sequelize.STRING
      },
      merkleRoot: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.DATE
      },
      bits: {
        type: Sequelize.STRING
      },
      nonce: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('BitcoinBlock');
  }
};
