'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EthereumContract', [
      {
        slug: 'usdc',
        address: '0x7d66cde53cc0a169cae32712fc48934e610aef14',
        type: 'ERC20',
        network: 'rinkeby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'usdt',
        address: '0x1a37dd375096820a5fde14342720102c07100f26',
        type: 'ERC20',
        network: 'rinkeby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'cryptokitties',
        address: '0x16baf0de678e52367adc69fd067e5edd1d33e3bf',
        type: 'ERC721',
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
