const expect = require('expect')

const lib = require('@/lib')
const {
  queryStringIncludeToModelsInclude,
  getRPCServiceAddress,
  standardizeParameterString,
} = lib

const assert = require('assert')

describe('lib', () => {

  describe('standardizeParameterString', () => {
    it('lowercases a [mixed] case string', () => {
      expect(standardizeParameterString('ETHEREUM')).toBe('ethereum')
      expect(standardizeParameterString('Bitcoin')).toBe('bitcoin')
      expect(standardizeParameterString('bitcoin ')).toBe('bitcoin')
    })
  })

  describe('queryStringIncludeToModelsInclude', () => {
    it('produces include syntax', () => {
      // TODO - models mock
      const models = {
        EthereumTx: 'EthereumTx',
        EthereumBlock: 'EthereumBlock',
        EthereumMethod: 'EthereumMethod',
        BitcoinTx: 'BitcoinTx',
        BitcoinBlock: 'BitcoinBlock',
      }

      expect(Array.isArray(queryStringIncludeToModelsInclude())).toBe(true)
      expect(queryStringIncludeToModelsInclude({ models, include: '' })).toEqual([])
      expect(queryStringIncludeToModelsInclude({ models })).toEqual([])
      expect(queryStringIncludeToModelsInclude({ models, include: 'Tx' })).toEqual(['EthereumTx'])
      expect(queryStringIncludeToModelsInclude({ models, include: 'Block' })).toEqual(['EthereumBlock'])
      expect(queryStringIncludeToModelsInclude({ chain: 'ethereum', models, include: 'Tx' })).toEqual(['EthereumTx'])
      expect(queryStringIncludeToModelsInclude({ chain: 'ethereum', models, include: ['Tx', 'Method'] })).toEqual(['EthereumTx', 'EthereumMethod'])
      expect(queryStringIncludeToModelsInclude({ chain: 'bitcoin', models, include: 'Tx' })).toEqual(['BitcoinTx'])
    })
  })

  describe('getRPCServiceAddress', () => {
    it('returns rpc address based on chain and network', () => {
      process.env.ETHEREUM_RINKEBY_RPC_SVC_ADDR = 'https://ethereum.rinkeby'
      process.env.ETHEREUM_MAINNET_RPC_SVC_ADDR = 'https://ethereum.mainnet'
      process.env.BITCOIN_TESTNET_RPC_SVC_ADDR = 'https://ethereum.testnet'
      process.env.BITCOIN_MAINNET_RPC_SVC_ADDR = 'https://ethereum.mainnet'

      assert.equal(getRPCServiceAddress(), process.env.ETHEREUM_RINKEBY_RPC_SVC_ADDR)
      assert.equal(getRPCServiceAddress({ chain: 'ethereum', network: 'rinkeby' }), process.env.ETHEREUM_RINKEBY_RPC_SVC_ADDR)
      assert.equal(getRPCServiceAddress({ chain: 'ethereum', network: 'mainnet' }), process.env.ETHEREUM_MAINNET_RPC_SVC_ADDR)
      assert.equal(getRPCServiceAddress({ chain: 'bitcoin', network: 'testnet' }), process.env.BITCOIN_TESTNET_RPC_SVC_ADDR)
      assert.equal(getRPCServiceAddress({ chain: 'bitcoin', network: 'mainnet' }), process.env.BITCOIN_MAINNET_RPC_SVC_ADDR)
    })
  })

})
