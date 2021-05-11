'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EthereumContract', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      slug: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      network: {
        type: Sequelize.STRING,
      },
      metadata: {
        type: Sequelize.JSONB,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    }, {
      indexes: [{
        unique: true,
        fields: ['address', 'network'],
      }, {
        unique: true,
        fields: ['slug', 'network'],
      }],
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EthereumContract');
  }
};
