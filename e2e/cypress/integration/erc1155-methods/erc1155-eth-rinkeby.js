describe("Erc1155-methods - Ethereum Rinkeby", () => {
 it("ERC1155 token balance", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("accountAddress2")}/erc1155/balance`,
    qs: {
     tokenAddress: Cypress.config("contractAddress2"),
     type: "erc1155",
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
 it("ERC1155 token contract owner", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("accountAddress2")}/erc1155/contract`,
    qs: {
     tokenAddress: Cypress.config("contractAddress2"),
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("result");
   });
 });
 it("ERC1155 get token uri", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("accountAddress2")}/erc1155/uri`,
    qs: {
     tokenAddress: Cypress.config("contractAddress2"),
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
 it("ERC1155 set token uri", () => {
  cy
   .request({
    method: "POST",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("accountAddress1")}/erc1155/uri`,
    qs: {
     tokenAddress: Cypress.config("contractAddress2"),
     uri: "Apis erc1155 token test",
     privateKey: Cypress.config("privateKey1"),
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("result");
   });
 });
 // it("ERC1155 token mint ", () => {
 //  cy
 //   .request({
 //    method: "POST",
 //    url: `${Cypress.config(
 //     "baseUrl"
 //    )}/api/v1/tokens/0x0c623F6164Fca9a5d146917a93497E5946CC7340/erc1155/mint`,
 //    qs: {
 //     tokenAddress: "0x05d80fe3f107de275b2451b751d83a69e6ed5d67",
 //     id: "1",
 //     amount :"10",
 //     data : "testing",
 //     privateKey:
 //      "4b414498530f3e4fe8254e7584bcb8176c53d925185a1aaf6d3af88f1d129e74",
 //      toAddress : "0xb08efdD94a2b705a12272Ae985Bc293d75aB70c9",
 //     apiKey: Cypress.config("apisCoreApiKey"),
 //     chain: "ethereum",
 //     network: "rinkeby",
 //    },
 //   })
 //   .should((response) => {
 //    expect(response.body).to.have.property("result");
 //   });
 // });
 // it("ERC1155 token mint batch ", () => {
 //  cy
 //   .request({
 //    method: "POST",
 //    url: `${Cypress.config(
 //     "baseUrl"
 //    )}/api/v1/tokens/0x408bd85004D9f70e333c46745e93b7D175762b0d/erc1155/mint/batch`,
 //    qs: {
 //     tokenAddress: "0x7cf0db63f982452511295ea90788e0423ef2a8b0",
 //     ids: "1,2",
 //     amounts :"10,10",
 //     data : "testing",
 //     privateKey: "475769e52afb2f8d56fe0e3cee75ea20379dfb7910e3aa56ce00ec409f6ecca7",
 //     toAddress : "0xA0C0Fc0a9F63e06c798591633587003ad75DdA2f",
 //     apiKey: Cypress.config("apisCoreApiKey"),
 //     chain: "ethereum",
 //     network: "rinkeby",
 //    },
 //   })
 //   .should((response) => {
 //    expect(response.body).to.have.property("result");
 //   });
 // });
 // it("ERC1155 token transfer ", () => {
 //  cy
 //   .request({
 //    method: "POST",
 //    url: `${Cypress.config(
 //     "baseUrl"
 //    )}/api/v1/tokens/0xA0C0Fc0a9F63e06c798591633587003ad75DdA2f/erc1155/transfer`,
 //    qs: {
 //     tokenAddress: "0x7cf0db63f982452511295ea90788e0423ef2a8b0",
 //     id: "1",
 //     amount :"5",
 //     data : "testing",
 //     privateKey:
 //      "ccdd1bdd60b5d349ba40ea949274203225837ab06b7a8991a5aa3ba2e2c60c81",
 //      toAddress : "0x389412Bf008091d108C15E3E691F9b7c5D51EB1f",
 //     apiKey: Cypress.config("apisCoreApiKey"),
 //     chain: "ethereum",
 //     network: "rinkeby",
 //    },
 //   })
 //   .should((response) => {
 //    expect(response.body).to.have.property("result");
 //   });
 // });
 // it("ERC1155 token transfer batch ", () => {
 //  cy
 //   .request({
 //    method: "POST",
 //    url: `${Cypress.config(
 //     "baseUrl"
 //    )}/api/v1/tokens/0xA0C0Fc0a9F63e06c798591633587003ad75DdA2f/erc1155/transfer/batch`,
 //    qs: {
 //     tokenAddress: "0x7cf0db63f982452511295ea90788e0423ef2a8b0",
 //     ids: "1,2",
 //     amounts :"1,1",
 //     data : "testing",
 //     privateKey:
 //      "ccdd1bdd60b5d349ba40ea949274203225837ab06b7a8991a5aa3ba2e2c60c81",
 //      toAddress : "0x389412Bf008091d108C15E3E691F9b7c5D51EB1f",
 //     apiKey: Cypress.config("apisCoreApiKey"),
 //     chain: "ethereum",
 //     network: "rinkeby",
 //    },
 //   })
 //   .should((response) => {
 //    expect(response.body).to.have.property("result");
 //   });
 // });
 // it("ERC1155 token burn", () => {
 //  cy
 //   .request({
 //    method: "GET",
 //    url: `${Cypress.config(
 //     "baseUrl"
 //    )}/api/v1/tokens/0xA0C0Fc0a9F63e06c798591633587003ad75DdA2f/erc1155/burn`,
 //    qs: {
 //     tokenAddress: "0x7cf0db63f982452511295ea90788e0423ef2a8b0",
 //     id: "1",
 //     privateKey:"ccdd1bdd60b5d349ba40ea949274203225837ab06b7a8991a5aa3ba2e2c60c81",
 //     value :"1",
 //     apiKey: Cypress.config("apisCoreApiKey"),
 //     chain: "ethereum",
 //     network: "rinkeby",
 //    },
 //   })
 //   .should((response) => {
 //    expect(response.body).to.have.property("result");
 //   });
 // });
 // it("ERC1155 token burn batch", () => {
 //  cy
 //   .request({
 //    method: "GET",
 //    url: `${Cypress.config(
 //     "baseUrl"
 //    )}/api/v1/tokens/0xA0C0Fc0a9F63e06c798591633587003ad75DdA2f/erc1155/burn/batch`,
 //    qs: {
 //     tokenAddress: "0x7cf0db63f982452511295ea90788e0423ef2a8b0",
 //     id: "1,2",
 //     privateKey:"ccdd1bdd60b5d349ba40ea949274203225837ab06b7a8991a5aa3ba2e2c60c81",
 //     value :"1,1",
 //     apiKey: Cypress.config("apisCoreApiKey"),
 //     chain: "ethereum",
 //     network: "rinkeby",
 //    },
 //   })
 //   .should((response) => {
 //    expect(response.body).to.have.property("result");
 //   });
 // });
});
