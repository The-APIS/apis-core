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
  it('Get wallet', () => {
   cy.request('GET', `${Cypress.config('baseUrl')}/api/v1/wallets?chain=ethereum&network=rinkeby&address=0xCDd0F0eE873195dfed20fc8AE7b11860CaE1799c&apiKey=58fc282a-498f-4695-88ac-f694fa98df9d`)
    .should((response) => {
     expect(response.body).to.have.property('balances')
   })
 })
  it('Get defi-rates', () => {
   cy.request('GET', `${Cypress.config('baseUrl')}/api/v1/ethereum/defi/rates?apiKey=dfa7f9ea-b0e1-4029-8df8-fe0308ce1af7&chain=ethereum&network=rinkeby`)
    .should((response) => {
     expect(response.body).to.have.property('data')
   })
 })
 it('Create ERC20 token', () => {
  cy.request('POST', `${Cypress.config('baseUrl')}/api/v1/tokens?apiKey=58fc282a-498f-4695-88ac-f694fa98df9d&chain=ethereum&network=rinkeby`,
   {
    "chain": "ethereum",
    "network": "rinkeby",
    "type": "APIS_ERC20",
    "token": {
      "name": "The APIS",
      "symbol": "API",
      "minter": "0x0c623F6164Fca9a5d146917a93497E5946CC7340",
      "account": "0x0c623F6164Fca9a5d146917a93497E5946CC7340",
      "initialSupply": "10000000000000000000000000"
    },
    "sender": "0x0c623F6164Fca9a5d146917a93497E5946CC7340",
    "privateKey": "4b414498530f3e4fe8254e7584bcb8176c53d925185a1aaf6d3af88f1d129e74"
  }
  )
   .should((response) => {
    expect(response.body).to.have.property('nonce')
    expect(response.body).to.have.property('gasPrice')
    expect(response.body).to.have.property('data')
  })
})
})

