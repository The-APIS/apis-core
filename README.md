# The APIS - A Decentralized API Layer for the Future of the Web

[Visit our Website for more informatoin](https://www.theapis.io/).

The APIS is a decentralized read and write protocol, acting as necessary middleware for the mainstream growth of a fully decentralized internet. Our protocol is community owned, in that at least 70% of API tokens (our native token) will be distributed to the builders that utilize the APIS protocol, with the other 30% going to those who contribute ‘proof of work’ to the APIS protocol. The best way to use the APIS protocol is to build a cool Dapp with it. We work alongside you, so that you don’t need to hire any additional manpower or build any additional infrastructure, while still offering your users all of the best Web 3.0 experiences (DeFi, NFTs, DAOs, etc.). When your Dapp grows like crazy, your corresponding ownership of API tokens will ensure that you never experience the platform risk of the Web 2.0 era. We win as a team.



[Check out our primary source of documentation](https://app.gitbook.com/@the-apis-1/s/the-apis/)

[The APIS JavaScript SDK](https://www.npmjs.com/package/@theapis/sdk)

Looking for our docker images? [Download and run our images directly from DockerHub](https://hub.docker.com/u/theapis)

[![Build Status](https://circleci.com/gh/The-APIS/apis-core/tree/master.svg?style=svg)](https://app.circleci.com/pipelines/github/The-APIS/apis-core?branch=master)

Follow us!
[Medium](https://medium.com/the-apis) | [Twitter](https://twitter.com/TheApis_io) | [Discord](https://discord.gg/UgRYEVb3us)



# Development


## Setup

Clone the apis-core repository

```bash
git clone --depth=1 https://github.com/The-APIS/apis-core.git
```

Create the .env file at project root and run the build scripts. See `.env-example` for the list of environment variables and defaults.

```bash
cd apis-core/
cp .env-example .env
```

## Run


TL;DR: Using task runner:


```bash
npm run build
npm run start
```


By service or chain:


```bash
# ex: run just the gateway
docker-compose up gateway

# ex: run all ethereum services
docker-compose up ethereum*

# ex: run all bitcoin services
docker-compose up bitcoin*

# ex: run everything
docker-compose up

```



# Production


## Run


```bash
npm run build-production
npm run start-production
```


# Notes

> See individual service README files
> (`gateway` is a good place to start)


# License


Copyright 2021 APIS Foundation.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


