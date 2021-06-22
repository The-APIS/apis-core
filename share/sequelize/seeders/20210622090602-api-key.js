module.exports = {
 up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('APIKey', [{
     uid: '6948DF80-14BD-4E04-8842-7668D9C001F5',
     api_key: '100',
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
    uid: '4B8302DA-21AD-401F-AF45-1DFD956B80B5',
    api_key: '200',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
   uid: '8628FE7C-A4E9-4056-91BD-FD6AA7817E39',
   api_key: '300',
   createdAt: new Date(),
   updatedAt: new Date()
 }  
  ]);
 },
 down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('APIKey', null, {});
 }
};


