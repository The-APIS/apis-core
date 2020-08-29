'use strict';
module.exports = (sequelize, DataTypes) => {
  const Quote = sequelize.define('Quote', {
    name: DataTypes.STRING,
    company_name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    varieties: DataTypes.JSON,
    info: DataTypes.JSON,
    additional_info: DataTypes.TEXT,
    preferred_datetime: DataTypes.DATE
  }, {});
  Quote.associate = function(models) {
    // associations can be defined here
  };
  return Quote;
};
