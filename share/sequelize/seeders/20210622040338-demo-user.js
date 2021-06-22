'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('User', [{
     firstName: 'John',
     lastName: 'Doe',
     email: 'example@example.com',
     createdAt: new Date(),
     updatedAt: new Date()
   }]);
 },
 down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('User', null, {});
 }
};