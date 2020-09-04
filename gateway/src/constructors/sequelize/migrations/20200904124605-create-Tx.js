'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`CREATE TYPE 'Blockchain' AS ENUM('Etheruem', 'Bitcoin');`);
    await queryInterface.createTable('Tx', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      txId: {
        type: Sequelize.STRING,
        unique: 'TxBlockChain',
      },
      blockHash: {
        type: Sequelize.STRING,
        unique: 'TxBlockChain',
      },
      blockchain: {
        type: Sequelize.ENUM('Etheruem', 'Bitcoin'),
        unique: 'TxBlockChain',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tx');
    await queryInterface.sequelize.query(`DROP TYPE 'Blockchain';`);
  }
};
