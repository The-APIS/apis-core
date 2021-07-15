describe('Unified - Ethereum Rinkeby', () => {
  it('Create Wallet', () => {
    cy.request('POST', `${Cypress.config('baseUrl')}/api/v1/wallets?apiKey=dfa7f9ea-b0e1-4029-8df8-fe0308ce1af7&chain=ethereum&network=rinkeby`, {
      chain: "ethereum",
      network: "rinkeby",
    }).should((response) => {
      expect(response.body).to.have.property('address')
      expect(response.body).to.have.property('privateKey')
    })
  })
})

