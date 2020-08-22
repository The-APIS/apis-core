const assert = require('assert')
const Commands = require('@/constructors/express/routes/api/v1/Commands')

describe('Commands', () => {
  it('should be a function', () => {
    assert.equal(typeof Commands, 'function')
  })
  describe('makeRPCRequest', () => {
    it('should be a function', () => {
      assert.equal(typeof Commands.makeRPCRequest, 'function')
    })
  })
})
