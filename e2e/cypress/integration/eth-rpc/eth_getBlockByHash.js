describe('Ethereum RPC', () => {
  it('blockinfo', () => {
    // expect(true).to.equal(true)
    cy.request('POST', `${Cypress.config('baseUrl')}/api/v1/rpc/ethereum?apiKey=dfa7f9ea-b0e1-4029-8df8-fe0308ce1af7&chain=ethereum&network=rinkeby`, {
      "jsonrpc": "2.0",
      "method": "eth_getBlockByHash",
      "params": [
        "0xfe88c94d860f01a17f961bf4bdfb6e0c6cd10d3fda5cc861e805ca1240c58553",
        true,
      ],
      "id": 0
    }).should((response) => {
      expect(response.body).to.have.property('jsonrpc', '2.0')
    })

    // {
    //   "jsonrpc": "2.0",
    //   "id": 0,
    //   "result": {
    //     "difficulty": "0x100b31023ed2",
    //     "extraData": "0xd783010305844765746887676f312e352e31856c696e7578",
    //     "gasLimit": "0x47e7c4",
    //     "gasUsed": "0x5208",
    //     "hash": "0xfe88c94d860f01a17f961bf4bdfb6e0c6cd10d3fda5cc861e805ca1240c58553",
    //     "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    //     "miner": "0x2a65aca4d5fc5b5c859090a6c34d164135398226",
    //     "mixHash": "0x17db873659d3938b2d5c440346bd4bfb96edf7d530d2bec5bcac1e446ee04ef6",
    //     "nonce": "0xba2714fcac22fdf7",
    //     "number": "0x11b833",
    //     "parentHash": "0xba745db421ed045fbd585c3e7b5f1c4a99c16a685e3dbcfce23c62792fbf768b",
    //     "receiptsRoot": "0x8ceffdd4c4d11552cc83206b338e06fe47b3f6c16cea2e800122cfd71d19d72c",
    //     "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    //     "size": "0x291",
    //     "stateRoot": "0xa93f33607056faddce781cdcb0e17fff937c4539f6635a659580b772a8a97dc7",
    //     "timestamp": "0x56e98bdb",
    //     "totalDifficulty": "0x858cf2126358e2a5",
    //     "transactions": [
    //       {
    //         "blockHash": "0xfe88c94d860f01a17f961bf4bdfb6e0c6cd10d3fda5cc861e805ca1240c58553",
    //         "blockNumber": "0x11b833",
    //         "from": "0x151255dd9e38e44db38ea06ec66d0d113d6cbe37",
    //         "gas": "0x15f90",
    //         "gasPrice": "0x4a817c800",
    //         "hash": "0xc70e17785c9da3f8dea32af52f521db6d50e31e9946c41c633af515919b07d75",
    //         "input": "0x",
    //         "nonce": "0x11d2",
    //         "to": "0x57a7d593523cc3acb942f892a19ee400031c5b14",
    //         "transactionIndex": "0x0",
    //         "value": "0x1c1af67adc5d3c00",
    //         "v": "0x1c",
    //         "r": "0x9c9e2538fcbf2488acb1e72a44186c9cb6d1747d13e96a9bbdff470916dbca3a",
    //         "s": "0xcebcbb32b1ff86d5ad25c310ea07316578dd5599da34024703f6ae416955214"
    //       }
    //     ],
    //     "transactionsRoot": "0xe20e5116f7b274420ff6a937dd6c9d548352237a5d869b613cb050d8391cce65",
    //     "uncles": []
    //   }
    // }

  })
})
