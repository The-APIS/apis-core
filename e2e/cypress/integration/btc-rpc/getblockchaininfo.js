describe('BTC RPC', () => {
  it.skip('Can get blockinfo', () => {
    cy.request('POST', `${Cypress.config('baseUrl')}/api/v1/rpc/bitcoin?apiKey=dfa7f9ea-b0e1-4029-8df8-fe0308ce1af7`, {
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
