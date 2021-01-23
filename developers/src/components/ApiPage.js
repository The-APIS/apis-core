import React from 'react';
import { Layout, Divider } from 'antd';
import { RedocStandalone } from 'redoc';
import spec from '../apis-spec.json';
const { Header, Footer, Content } = Layout;


const ApiPage = () => {
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
          <RedocStandalone spec={spec} />
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

export default ApiPage;
