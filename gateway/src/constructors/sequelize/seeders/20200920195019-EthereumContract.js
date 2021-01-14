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
        slug: 'dai',
        address: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
        type: 'ERC20',
        network: 'rinkeby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'cryptokitties',
        address: '0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF',
        type: 'ERC721',
        network: 'rinkeby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'tusdt',
        address: '0xD92E713d051C37EbB2561803a3b5FBAbc4962431', // https://bybit-exchange.github.io/erc20-faucet/
        type: 'ERC20',
        network: 'rinkeby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'wbtc',
        address: '0x64ed1291fe07ade7bb261c7aa8491e4bc0e8de1c',
        type: 'ERC20',
        network: 'rinkeby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'bnb',
        address: '0xe800da86830a012dbede538f834b3a1fcc9cb642',
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
