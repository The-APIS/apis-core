module.exports = {
 up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('APIKey', [{
     api_key: '6948DF80-14BD-4E04-8842-7668D9C001F5',
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
    api_key: '4B8302DA-21AD-401F-AF45-1DFD956B80B5',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
   api_key: '8628FE7C-A4E9-4056-91BD-FD6AA7817E39',
   createdAt: new Date(),
   updatedAt: new Date()
 }  
  ]);
 },
 down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('APIKey', null, {});
 }
};
