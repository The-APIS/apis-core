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
      txid: {
        type: Sequelize.STRING,
        unique: true,
      },
      hash: {
        type: Sequelize.STRING,
        unique: true,
      },
      version: {
        type: Sequelize.INTEGER,
      },
      size: {
        type: Sequelize.INTEGER,
      },
      vsize: {
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.INTEGER,
      },
      locktime: {
        type: Sequelize.INTEGER,
      },
      vin: {
        type: Sequelize.JSONB,
      },
      vout: {
        type: Sequelize.JSONB,
      },
      hex: {
        type: Sequelize.TEXT,
      },
      blockHash: {
        type: Sequelize.STRING,
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
