describe("Erc721-methods - Ethereum Rinkeby", () => {
 it("ERC721 token balance", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/0x6A3Cd6a4f7288a43921Ff88796cb75D9e36A8b9A/balance`,
    qs: {
     tokenAddress: "0xde30ffcf679896f119dec2c0aa330638e1d97526",
     type: "erc721",
     apiKey: "58fc282a-498f-4695-88ac-f694fa98df9d",
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
    )}/api/v1/tokens/0xA0C0Fc0a9F63e06c798591633587003ad75DdA2f/id`,
    qs: {
     tokenAddress: "0x05c07cf797e3dc2422e833f7d2f7e53510e24218",
     apiKey: "58fc282a-498f-4695-88ac-f694fa98df9d",
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
    )}/api/v1/tokens/0x408bd85004D9f70e333c46745e93b7D175762b0d/owner`,
    qs: {
     tokenAddress: "0x05c07cf797e3dc2422e833f7d2f7e53510e24218",
     id: "1",
     apiKey: "58fc282a-498f-4695-88ac-f694fa98df9d",
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
    )}/api/v1/tokens/0xb08efdD94a2b705a12272Ae985Bc293d75aB70c9/name`,
    qs: {
     tokenAddress: "0xde30ffcf679896f119dec2c0aa330638e1d97526",
     apiKey: "58fc282a-498f-4695-88ac-f694fa98df9d",
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
    )}/api/v1/tokens/0xb08efdD94a2b705a12272Ae985Bc293d75aB70c9/symbol`,
    qs: {
     tokenAddress: "0xde30ffcf679896f119dec2c0aa330638e1d97526",
     apiKey: "58fc282a-498f-4695-88ac-f694fa98df9d",
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
    )}/api/v1/tokens/0xb08efdD94a2b705a12272Ae985Bc293d75aB70c9/supply`,
    qs: {
     tokenAddress: "0xde30ffcf679896f119dec2c0aa330638e1d97526",
     apiKey: "58fc282a-498f-4695-88ac-f694fa98df9d",
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
    )}/api/v1/tokens/0xb08efdD94a2b705a12272Ae985Bc293d75aB70c9/contract`,
    qs: {
     tokenAddress: "0xde30ffcf679896f119dec2c0aa330638e1d97526",
     apiKey: "58fc282a-498f-4695-88ac-f694fa98df9d",
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
    )}/api/v1/tokens/0xb08efdD94a2b705a12272Ae985Bc293d75aB70c9/uri`,
    qs: {
     tokenAddress: "0xde30ffcf679896f119dec2c0aa330638e1d97526",
     id: "5",
     apiKey: "58fc282a-498f-4695-88ac-f694fa98df9d",
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
    )}/api/v1/tokens/0xb08efdD94a2b705a12272Ae985Bc293d75aB70c9/approved`,
    qs: {
     tokenAddress: "0xde30ffcf679896f119dec2c0aa330638e1d97526",
     id: "5",
     apiKey: "58fc282a-498f-4695-88ac-f694fa98df9d",
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("result");
   });
 });
});
