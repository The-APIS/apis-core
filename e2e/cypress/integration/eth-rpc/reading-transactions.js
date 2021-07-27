describe('Ethereum RPC - Reading transactions', () => {
 it('get transaction by block', () => {
   cy.request({
    method :'POST',
    url : `${Cypress.config('baseUrl')}/api/v1/rpc/ethereum`,
    qs : { 
     'apiKey' : Cypress.config("apisCoreApiKey"),
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
    'apiKey' : Cypress.config("apisCoreApiKey"),
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
