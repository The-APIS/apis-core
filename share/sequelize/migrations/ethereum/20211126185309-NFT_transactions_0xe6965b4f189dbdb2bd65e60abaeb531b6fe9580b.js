'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.sequelize.query(
     `CREATE TABLE NFT_transactions_0xe6965b4f189dbdb2bd65e60abaeb531b6fe9580b (
        id BIGSERIAL PRIMARY KEY,
        BUYER_ADDRESS VARCHAR(42) NOT NULL,
        SELLER_ADDRESS VARCHAR(42) NOT NULL,
        PAYMENT_TOKEN VARCHAR(42) NOT NULL,
        NFT_PRICE VARCHAR(255) NOT NULL,
        NFT_PRICE_XWG_DOUBLE DECIMAL DEFAULT 0,
        NFT_ID VARCHAR(255) NOT NULL,
        TRANSACTION_HASH VARCHAR(200) NOT NULL,
        BLOCK_NUMBER INTEGER NOT NULL,
        TIMESTAMP VARCHAR(42) NOT NULL
      );`
     ); 
    
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.dropTable('NFT_transactions_0xe6965b4f189dbdb2bd65e60abaeb531b6fe9580b');
  }
};
