describe("Unified - Ethereum Rinkeby", () => {
 it("Create Wallet", () => {
  cy
   .request({
    method: "POST",
    url: `${Cypress.config("baseUrl")}/api/v1/wallets`,
    qs: {
     apiKey: "dfa7f9ea-b0e1-4029-8df8-fe0308ce1af7",
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
     apiKey: "dfa7f9ea-b0e1-4029-8df8-fe0308ce1af7",
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
     apiKey: "dfa7f9ea-b0e1-4029-8df8-fe0308ce1af7",
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
     apiKey: "58fc282a-498f-4695-88ac-f694fa98df9d",
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
      minter: "0xb08efdD94a2b705a12272Ae985Bc293d75aB70c9",
      account: "0xb08efdD94a2b705a12272Ae985Bc293d75aB70c9",
      initialSupply: "10000000000000000000000000",
     },
     sender: "0xb08efdD94a2b705a12272Ae985Bc293d75aB70c9",
     privateKey:
      "6143bba50362ca9f80d1148a33aafd5789a5d97e8e4501837f8eadad48627e98",
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
     apiKey: "58fc282a-498f-4695-88ac-f694fa98df9d",
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
     sender: "0xb08efdD94a2b705a12272Ae985Bc293d75aB70c9",
     privateKey:
      "6143bba50362ca9f80d1148a33aafd5789a5d97e8e4501837f8eadad48627e98",
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
     apiKey: "58fc282a-498f-4695-88ac-f694fa98df9d",
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
     sender: "0xb08efdD94a2b705a12272Ae985Bc293d75aB70c9",
     privateKey:
      "6143bba50362ca9f80d1148a33aafd5789a5d97e8e4501837f8eadad48627e98",
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
    )}/api/v1/tokens/0x0c623F6164Fca9a5d146917a93497E5946CC7340/balance`,
    qs: {
     tokenAddress: "0xB904c75e1B615B93bcb4f089322E0c12464900fc",
     type: "erc20",
     apiKey: "58fc282a-498f-4695-88ac-f694fa98df9d",
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
 it("ERC1155 token balance", () => {
  cy
   .request({
    method: "GET",
    url: `${Cypress.config(
     "baseUrl"
    )}/api/v1/tokens/0x6A3Cd6a4f7288a43921Ff88796cb75D9e36A8b9A/erc1155/balance`,
    qs: {
     tokenAddress: "0x85c95902239797b69beab4e617411fb94981a2a9",
     type: "erc1155",
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
});
