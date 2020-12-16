describe('BTC RPC', () => {
  it('Can get blockinfo', () => {
    cy.request('POST', `${Cypress.config('baseUrl')}/api/v1/rpc/bitcoin`, {
        "jsonrpc": "1.0",
        "id": "apis-core",
        "method": "getblockchaininfo",
        "params": []
    }).should((response) => {
      expect(response.body).to.have.property('result')
      expect(response.body).to.have.property('error')
      expect(response.body).to.have.property('id')
    })
  })
})
