'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EthereumMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      EthereumBlock,
      EthereumTx,
      EthereumMethod,
      EthereumContract,
      ...models
    }) {
      EthereumMethod.belongsTo(EthereumTx, {
        foreignKey: {
          name: 'txHash',
        },
        targetKey: 'hash',
      })

      EthereumMethod.belongsTo(EthereumContract, {
        foreignKey: {
          name: 'contract',
        },
        targetKey: 'address',
      })
    }
  };
  EthereumMethod.init({
    contract: DataTypes.STRING,
    method: DataTypes.STRING,
    params: DataTypes.JSONB,
    txHash: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'EthereumMethod',
  });
  return EthereumMethod;
};
