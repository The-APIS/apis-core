'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EthereumContract', [
      {
        slug: 'USDC',
        address: '0x7d66cde53cc0a169cae32712fc48934e610aef14',
        type: 'ERC20',
        network: 'rinkeby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'USDT',
        address: '0x1a37dd375096820a5fde14342720102c07100f26',
        type: 'ERC20',
        network: 'rinkeby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EthereumContract', null, {});
  }
};
