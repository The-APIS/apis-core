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
      hash: {
        type: Sequelize.STRING,
        unique: true,
      },
      confirmations: {
        type: Sequelize.INTEGER,
      },
      strippedsize: {
        type: Sequelize.INTEGER,
      },
      size: {
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.INTEGER,
      },
      height: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      version: {
        type: Sequelize.INTEGER,
      },
      versionHex: {
        type: Sequelize.STRING,
      },
      merkleroot: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.DATE,
      },
      mediantime: {
        type: Sequelize.DATE,
      },
      nonce: {
        type: Sequelize.BIGINT,
        unique: true,
      },
      bits: {
        type: Sequelize.STRING,
      },
      difficulty: {
        type: Sequelize.STRING,
      },
      chainwork: {
        type: Sequelize.STRING,
      },
      nTx: {
        type: Sequelize.INTEGER,
      },
      nextblockhash: {
        type: Sequelize.STRING,
        unique: true,
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
