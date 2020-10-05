'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EthereumContract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ EthereumMethod, EthereumTx, ...models }) {
      EthereumContract.hasMany(EthereumTx, {
        foreignKey: {
          name: 'from',
        },
        targetKey: 'address',
        as: 'txFrom',
      })

      EthereumContract.hasMany(EthereumTx, {
        foreignKey: {
          name: 'to',
        },
        targetKey: 'address',
        as: 'txTo',
      })

      EthereumContract.hasMany(EthereumMethod, {
        foreignKey: {
          name: 'contract',
        },
        targetKey: 'address',
      })
    }
  };
  EthereumContract.init({
    slug: DataTypes.STRING,
    address: DataTypes.STRING,
    type: DataTypes.STRING,
    network: DataTypes.STRING,
    metadata: DataTypes.JSONB,
  }, {
    sequelize,
    modelName: 'EthereumContract',
  });
  return EthereumContract;
};
