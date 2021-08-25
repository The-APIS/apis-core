describe("Erc721-methods - Ethereum Rinkeby", () => {
 it("ERC721 token balance", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("accountAddress2")}/balance`,
    qs: {
     tokenAddress: Cypress.config("contractAddress1"),
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
    )}/api/v1/tokens/${Cypress.config("accountAddress2")}/id`,
    qs: {
     tokenAddress: Cypress.config('contractAddress1'),
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
    )}/api/v1/tokens/${Cypress.config("accountAddress2")}/owner`,
    qs: {
     tokenAddress: Cypress.config('contractAddress1'),
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
    )}/api/v1/tokens/${Cypress.config("accountAddress2")}/name`,
    qs: {
     tokenAddress: Cypress.config('contractAddress1'),
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
    )}/api/v1/tokens/${Cypress.config("accountAddress2")}/symbol`,
    qs: {
     tokenAddress: Cypress.config('contractAddress1'),
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
    )}/api/v1/tokens/${Cypress.config("accountAddress2")}/supply`,
    qs: {
     tokenAddress: Cypress.config('contractAddress1'),
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
    )}/api/v1/tokens/${Cypress.config("accountAddress2")}/contract`,
    qs: {
     tokenAddress: Cypress.config('contractAddress1'),
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
    )}/api/v1/tokens/${Cypress.config("accountAddress2")}/uri`,
    qs: {
     tokenAddress: Cypress.config('contractAddress1'),
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
 it("ERC721 token id approved", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("accountAddress2")}/approved`,
    qs: {
     tokenAddress: Cypress.config('contractAddress1'),
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
});
