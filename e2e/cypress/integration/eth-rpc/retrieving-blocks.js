describe('Ethereum RPC - Retrieving blocks', () => {
  it('blockinfo', () => {
    // expect(true).to.equal(true)
    cy.request({
     method :'POST',
     url : `${Cypress.config('baseUrl')}/api/v1/rpc/ethereum`,
     qs : { 
      'apiKey' : 'dfa7f9ea-b0e1-4029-8df8-fe0308ce1af7',
      'chain' : 'ethereum',
      'network' :'rinkeby',
     },
      body : {
      "jsonrpc": "2.0",
      "method": "eth_getBlockByHash",
      "params": [
        "0xfe88c94d860f01a17f961bf4bdfb6e0c6cd10d3fda5cc861e805ca1240c58553",
        true,
      ],
      "id": 0
    }}).should((response) => {
      expect(response.body).to.have.property('jsonrpc', '2.0')
    })    
  })
  it('block number ', () => {
   cy.request({
    method :'POST',
    url : `${Cypress.config('baseUrl')}/api/v1/rpc/ethereum`,
    qs : { 
     'apiKey' : 'dfa7f9ea-b0e1-4029-8df8-fe0308ce1af7',
     'chain' : 'ethereum',
     'network' :'rinkeby',
    },
     body : {
      "jsonrpc":"2.0",
      "method":"eth_getBlockByNumber",
      "params":["0x6c597f", true],
      "id":0
  }}).should((response) => {
     expect(response.body).to.have.property('jsonrpc', '2.0')
     expect(response.body).to.have.property("result");
   })    
 })

})
