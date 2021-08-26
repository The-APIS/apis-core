describe("Unified - Ethereum Rinkeby", () => {
 it("Create Wallet", () => {
  cy
   .request({
    method: "POST",
    url: `${Cypress.config("baseUrl")}/api/v1/wallets`,
    qs: {
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
    body: {
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("address");
    expect(response.body).to.have.property("privateKey");
   });
 });

 it("Get wallet", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config("baseUrl")}/api/v1/wallets`,
    qs: {
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
     address: "0xCDd0F0eE873195dfed20fc8AE7b11860CaE1799c",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("balances");
   });
 });
 it("Get defi-rates", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config("baseUrl")}/api/v1/ethereum/defi/rates`,
    qs: {
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("data");
   });
 });
 it("Create ERC20 token", () => {
  cy
   .request({
    method: "POST",
    url: `${Cypress.config("baseUrl")}/api/v1/tokens`,
    qs: {
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
    body: {
     chain: "ethereum",
     network: "rinkeby",
     type: "APIS_ERC20",
     token: {
      name: "The APIS",
      symbol: "API",
      minter: Cypress.config("accountAddress1"),
      account: Cypress.config("accountAddress1"),
      initialSupply: "10000000000000000000000000",
     },
     sender: Cypress.config("accountAddress1"),
     privateKey: Cypress.config("privateKey1"),
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("nonce");
    expect(response.body).to.have.property("gasPrice");
    expect(response.body).to.have.property("data");
   });
 });
 it("Create ERC721 token", () => {
  cy
   .request({
    method: "POST",
    url: `${Cypress.config("baseUrl")}/api/v1/tokens`,
    qs: {
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
    body: {
     chain: "ethereum",
     network: "rinkeby",
     type: "APIS_ERC721",
     token: {
      name: "The APIS",
      symbol: "APIS",
      uri: "erc721 from apis",
     },
     sender: Cypress.config("accountAddress1"),
     privateKey:Cypress.config("privateKey1"),
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("nonce");
    expect(response.body).to.have.property("gasPrice");
    expect(response.body).to.have.property("data");
   });
 });
 it("Create ERC1155 token", () => {
  cy
   .request({
    method: "POST",
    url: `${Cypress.config("baseUrl")}/api/v1/tokens`,
    qs: {
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
    body: {
     chain: "ethereum",
     network: "rinkeby",
     type: "APIS_ERC1155",
     token: {
      name: "TheApis",
      uri: "apis erc 1155",
     },
     sender: Cypress.config("accountAddress1"),
     privateKey: Cypress.config("privateKey1"),
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("nonce");
    expect(response.body).to.have.property("gasPrice");
    expect(response.body).to.have.property("data");
   });
 });

 it("ERC20 token balance", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/${Cypress.config("accountAddress2")}/balance`,
    qs: {
     tokenAddress: Cypress.config("contractAddress3"),
     type: "erc20",
     apiKey: Cypress.config("apisCoreApiKey"),
     chain: "ethereum",
     network: "rinkeby",
    },
   })
   .should((response) => {
    expect(response.body).to.have.property("balance");
   });
 });
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
});
