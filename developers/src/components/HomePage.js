import React from 'react';
import axios from 'axios';
import qs from 'query-string';
import { Layout, Button, Row, Col, Divider, Empty } from 'antd';
import ReactJson from 'react-json-view'


const { Header, Footer, Content } = Layout;


const theGraphUSDCSubgraphQuery = `{
  users(first: 5) {
    id
    address
    balance
    transactionCount
  }
}`


const theGraphUSDCUserSubgraphResponse = {
  "data": {
    "users": [
      {
        "address": "0x0000000000000000000000000000000000000000",
        "balance": "-4214390461680200",
        "id": "0x0000000000000000000000000000000000000000",
        "transactionCount": 17676
      },
      {
        "address": "0x0000000000000000000000000000000000000001",
        "balance": "6001238067",
        "id": "0x0000000000000000000000000000000000000001",
        "transactionCount": 7
      },
      {
        "address": "0x00000000000000000000000000000000000002a9",
        "balance": "2265000000",
        "id": "0x00000000000000000000000000000000000002a9",
        "transactionCount": 1
      },
      {
        "address": "0x0000000000000000000000000000000000000bac",
        "balance": "1003000000",
        "id": "0x0000000000000000000000000000000000000bac",
        "transactionCount": 1
      },
      {
        "address": "0x000000000000000000000000000000000000dead",
        "balance": "5467",
        "id": "0x000000000000000000000000000000000000dead",
        "transactionCount": 3
      }
    ]
  }
}

const demo4ResultExample = {
  "nonce": 0,
  "gasPrice": {
    "type": "BigNumber",
    "hex": "0x3b9aca00"
  },
  "gasLimit": {
    "type": "BigNumber",
    "hex": "0x1893b7"
  },
  "to": null,
  "value": {
    "type": "BigNumber",
    "hex": "0x00"
  },
  "data": "0x6080604...",
  "chainId": 4,
  "v": 44,
  "r": "0x8522b0de35c3c726187d8f48c5581b9ee8243951c17bd7f4d43feeebf601c046",
  "s": "0x21b568249c31499f3af2304937925f724d2cbe701c7ccc897d6e7d6cbb27c9a3",
  "from": "0x1722602Ea456CdA0E563Fb7dD86B4f8C5451dC1a",
  "hash": "0x86deeb84ddf5d444b075e3828744129c4aa0964aac04f23b019c2d77283cecc5",
}


const HomePage = () => {
  const [req1Result, setReq1Result] = React.useState({})
  const [req2Result, setReq2Result] = React.useState({})
  const [req3Result, setReq3Result] = React.useState({})
  const [req4Result, setReq4Result] = React.useState({})
  const [demo1Json, setDemo1Json] = React.useState({
    chain: 'ethereum',
    network: 'mainnet',
    address: '0x49931C77832C91E7D6d2d20Ce5e6d986fAA70235',
  })
  const [demo2Json, setDemo2Json] = React.useState({
    // chain: 'ethereum',
    // network: 'mainnet',
    contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    limit: 5,
  })
  const [demo3Json, setDemo3Json] = React.useState({
    chain: 'ethereum',
    network: 'rinkeby',
  })
  const [demo4Json, setDemo4Json] = React.useState({
    "chain": "ethereum",
    "network": "rinkeby",
    "type": "APIS_ERC20",
    "token": {
      "name": 'tokenName',
      "symbol": 'tokenSymbol',
      "minter": 'address',
      "account": 'address',
      "initialSupply": "10000000000000000000000000",
    },
    "sender": 'address',
    "privateKey": 'privateKey',
  })

  return (
    <div>
      <Layout>
        <Header>
          <img
            className="logo"
            src={'https://uploads-ssl.webflow.com/5f953ed01d99c01576df6c19/5fa9bb0a1246d708e4c02e69_Horizontal-configuration-p-500.png'}
            alt="The APIS"
            style={{
              cursor: 'pointer',
              height: '40px',
              width: '145px',
            }}
            onClick={() => window.open('https://theapis.io', { target: '_blank', rel: 'noopener' })}
          />
          <a href="https://docs.theapis.io" style={{ margin: '0 20px', color: 'white' }}>API Reference</a>
        </Header>
        <Content>

          <Row style={{ padding: '24px' }}>
            <Col span={24}>
              <div>
                <h3>Demo 1: Input wallet address and get the balances (Ethereum Mainnet)</h3>
                <p style={{ lineBreak: 'anywhere' }}>GET {`https://api.theapis.io/api/v1/wallets?${qs.stringify(demo1Json)}`}</p>
              </div>
            </Col>
            <Col span={24}>
              <div>
                <ReactJson
                  style={{ overflowX: 'scroll' }}
                  name="Query Parameters"
                  src={demo1Json}
                  onEdit={({ updated_src }) => {
                    setDemo1Json(updated_src)
                    return true
                  }}
                />
              </div>
            </Col>
            <Col span={24}>
              <Button onClick={async () => {
                const result = await axios.get(`https://api.theapis.io/api/v1/wallets?${qs.stringify(demo1Json)}`)
                setReq1Result(result.data || {})
              }}>
                Try it now!
              </Button>
              <br />
              {JSON.stringify(req1Result) === '{}' ? <Empty /> : <ReactJson name="Response"style={{ margin: '8px 0', overflowX: 'scroll' }} src={req1Result} />}
            </Col>
          </Row>

          <Divider />

          <Row style={{ padding: '24px' }}>
            <Col span={24}>
              <div>
                <h3>Demo 2: Side-by-side comparison with TheGraph</h3>
                <p style={{ lineBreak: 'anywhere' }}>GET {`https://api.theapis.io/api/v1/ethereum/methods?${qs.stringify(demo2Json)}`}</p>
              </div>
            </Col>
            <Col span={24}>
              <div>
                <pre>{theGraphUSDCSubgraphQuery}</pre>
                {/* <Button>
                  Try it
                </Button> */}
                <ReactJson style={{ overflowX: 'scroll' }} name="USDC Subgraph Response" src={theGraphUSDCUserSubgraphResponse} />
              </div>
            </Col>

            <Col span={24} style={{ overflowX: 'scroll' }}>
              <ReactJson
                name="Query Parameters"
                src={demo2Json}
                onEdit={({ updated_src }) => {
                  setDemo2Json(updated_src)
                  return true
                }}
              />
              <br />
              <Button onClick={async () => {
                const result = await axios.get(`https://api.theapis.io/api/v1/ethereum/methods?${qs.stringify(demo2Json)}`)
                setReq2Result(result.data || {})
              }}>
                Try it now!
              </Button>
              <br />
              {JSON.stringify(req2Result) === '{}' ? <Empty /> : <ReactJson name="Response" style={{ margin: '8px 0', overflowX: 'scroll' }} src={req2Result} />}
            </Col>
          </Row>

          <Divider />

          <Row style={{ padding: '24px' }}>
            <Col span={24}>
              <div>
                <h3>Demo 3: Create wallet: Ethereum [& Solana coming soon]</h3>
                <p style={{ lineBreak: 'anywhere' }}>POST {'https://api.dev.theapis.io/api/v1/wallets'}</p>
              </div>
            </Col>
            <Col span={24} style={{ overflowX: 'scroll' }}>
              <ReactJson
                name="Request Body"
                src={demo3Json}
                onEdit={({ updated_src }) => {
                  setDemo3Json(updated_src)
                  return true
                }}
              />
            </Col>
            <Col span={24}>
              <Button style={{ margin: '8px 0' }} onClick={async () => {
                const result = await axios.post('https://api.dev.theapis.io/api/v1/wallets', {
                  chain: 'ethereum',
                  network: 'rinkeby',
                })
                setReq3Result(result.data || {})
              }}>
                Try it now!
              </Button>
              <br />
              {JSON.stringify(req3Result) === '{}' ? <Empty /> : <ReactJson name="Response" style={{ overflowX: 'scroll' }} src={req3Result} />}
            </Col>
          </Row>

          <Divider />

          <Row style={{ padding: '24px' }}>
            <Col span={24}>
              <div>
                <h3>Demo 4: Launch your token [testnet only]</h3>
                <p>POST {'https://api.dev.theapis.io/api/v1/tokens'}</p>
              </div>
            </Col>
            <Col span={24}>
              <ReactJson
                style={{ overflowX: 'scroll' }}
                name="Request Body"
                src={demo4Json}
                onEdit={({ updated_src }) => {
                  setDemo4Json(updated_src)
                  return true
                }}
              />
            </Col>
            <Col span={24} style={{ overflowX: 'scroll' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  onClick={async () => {
                    const result = await axios.post('https://api.dev.theapis.io/api/v1/tokens', demo4Json)
                    console.log(result)
                    setReq4Result(result.data || {})
                  }}
                >
                  Try it now!
                </Button>
                <p style={{ marginLeft: '8px' }}>(Don&apos;t have testnet Ether? View <span
                    style={{ color: 'blue', fontWeight: 500, cursor: 'pointer', '&:hover': { textDecoration: 'underline' }}}
                    onClick={() => setReq4Result({ data: demo4ResultExample })}
                  >an example</span> token creation response)
                </p>
              </div>
              <br />
              {JSON.stringify(req4Result) === '{}' || console.log('req4Result', req4Result) ? <Empty /> : <ReactJson name="Response" style={{ overflowX: 'scroll' }} src={req4Result.data} />}
            </Col>
          </Row>
        </Content>
        <Footer style={{
          padding: '24px 50px',
          color: 'white',
          background: '#001529',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <ul style={{ listStyle: 'none' }}>
              <b>Products</b>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.theapis.io/">Products</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.theapis.io/developers">Developers</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.theapis.io/roadmap">Roadmap</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.theapis.io/changelog">Changelog</a></li>
            </ul>
            <ul style={{ listStyle: 'none' }}>
              <b>Team</b>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.theapis.io/team">Team</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.theapis.io/join-us">Join Us</a></li>
            </ul>
            <ul style={{ listStyle: 'none' }}>
              <b>Resources</b>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.theapis.io/community">Community</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.theapis.io/blog">Blog</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.theapis.io/faq">FAQ</a></li>
            </ul>
            <ul style={{ listStyle: 'none' }}>
              <b>Docs</b>
              <li><a target="_blank" rel="noopener noreferrer" href="https://docsend.com/view/fv4s2ju2xqeaj33e">One Pager</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://static.theapis.io/whitepaper.pdf">White Paper</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.theapis.io/token-economics">Token Economics</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://docsend.com/view/w5udyw5gkd2h3b7q">Security Audit</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.theapis.io/logo-brand">Logo & Brand</a></li>
            </ul>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div>APIS is a project created by <a target="_blank" rel="noopener noreferrer" href="https://www.titans.finance/">Titans Finance, Inc.</a></div>
            <div>8153 Elk Grove Blvd #20, Elk Grove, CA 95758, USA</div>
           <div>
              <a target="_blank" rel="noopener noreferrer" href="https://uploads-ssl.webflow.com/5f953ed01d99c01576df6c19/5fab7b15cb92787c75e1e42a_THE%20APIS%20TERMS%20OF%20SERVICE.pdf">
                Terms of Service
              </a> | <a target="_blank" rel="noopener noreferrer" href="https://uploads-ssl.webflow.com/5f953ed01d99c01576df6c19/5fab7b150167eef5067906c8_THE%20APIS%20PRIVACY%20POLICY.pdf">
                Privacy
              </a>
            </div>
          </div>

        </Footer>
      </Layout>

    </div>
  );
};

export default HomePage;
