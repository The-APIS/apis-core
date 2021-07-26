describe('Ethereum RPC - Reading transactions', () => {
 it('get transaction by block', () => {
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
      "method":"eth_getTransactionByBlockNumberAndIndex",
      "params":["latest", "0x0"],
      "id":0
  }}).should((response) => {
     expect(response.body).to.have.property('jsonrpc', '2.0')
     expect(response.body).to.have.property("result");
   })    
 })
 it('get transaction count by number ', () => {
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
     "method":"eth_getBlockTransactionCountByNumber",
     "params":["latest"],
     "id":0
 }}).should((response) => {
    expect(response.body).to.have.property('jsonrpc', '2.0')
    expect(response.body).to.have.property("result");
  })    
})

})
