describe("Erc721-methods - Ethereum Rinkeby", () => {
 it("ERC721 token balance", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("senderAddress1")}/balance`,
    qs: {
     tokenAddress: Cypress.config("tokenAddress1"),
     type: "erc721",
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("balance");
   });
 });
 it("ERC721 token id address", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("senderAddress2")}/id`,
    qs: {
     tokenAddress: Cypress.config('tokenAddress2'),
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("result");
   });
 });
 it("ERC721 token owner", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("senderAddress3")}/owner`,
    qs: {
     tokenAddress: Cypress.config('tokenAddress2'),
     id: "1",
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("result");
   });
 });
 it("ERC721 token name", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("senderAddress4")}/name`,
    qs: {
     tokenAddress: Cypress.config('tokenAddress1'),
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("result");
   });
 });
 it("ERC721 token symbol", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("senderAddress4")}/symbol`,
    qs: {
     tokenAddress: Cypress.config('tokenAddress1'),
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("result");
   });
 });
 it("ERC721 token total supply", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("senderAddress4")}/supply`,
    qs: {
     tokenAddress: Cypress.config('tokenAddress1'),
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("result");
   });
 });
 it("ERC721 token contract owner address", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("senderAddress4")}/contract`,
    qs: {
     tokenAddress: Cypress.config('tokenAddress1'),
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("result");
   });
 });
 it("ERC721 token uri", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("senderAddress4")}/uri`,
    qs: {
     tokenAddress: Cypress.config('tokenAddress1'),
     id: "5",
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("result");
   });
 });
 it("ERC721 token id approved", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("senderAddress4")}/approved`,
    qs: {
     tokenAddress: Cypress.config('tokenAddress1'),
     id: "5",
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("result");
   });
 });
});
