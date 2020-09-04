'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BitcoinTxIn', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      txHash: {
        type: Sequelize.STRING
      },
      index: {
        type: Sequelize.STRING
      },
      script: {
        type: Sequelize.STRING
      },
      sequence: {
        type: Sequelize.STRING
      },
      witness: {
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
    await queryInterface.dropTable('BitcoinTxIn');
  }
};
