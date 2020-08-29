'use strict';
module.exports = (sequelize, DataTypes) => {
  const ContactMessage = sequelize.define('ContactMessage', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    additional_info: DataTypes.TEXT
  }, {});
  ContactMessage.associate = function(models) {
    // associations can be defined here
  };
  return ContactMessage;
};
