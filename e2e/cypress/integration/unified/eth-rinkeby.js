describe('Unified - Ethereum Rinkeby', () => {
  it('Create Wallet', () => {
    cy.request('POST', `${Cypress.config('baseUrl')}/api/v1/wallets`, {
      chain: "ethereum",
      network: "rinkeby",
    }).should((response) => {
      expect(response.body).to.have.property('address')
      expect(response.body).to.have.property('privateKey')
    })
  })
})

