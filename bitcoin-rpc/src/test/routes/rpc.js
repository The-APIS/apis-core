const assert = require('assert')
const rpc = require('@/constructors/express/routes/api/v1/rpc')

describe('rpc', () => {
  it('should be a function', () => {
    assert.equal(typeof rpc, 'function')
  })
  describe('makeRPCRequest', () => {
    it('should be a function', () => {
      assert.equal(typeof rpc.makeRPCRequest, 'function')
    })
  })
})
