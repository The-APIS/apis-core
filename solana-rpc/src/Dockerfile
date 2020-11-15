# FROM node:10-alpine

# WORKDIR /app

# RUN apk add --no-cache \
#   python \
#   build-base \
#   git \
#   bash \
#   gettext \
#   && npm -g install node-gyp

# ADD ./solana-rpc/src /app
# ADD ./share /app/share
# ADD ./share/models /app/constructors/sequelize/models

# RUN ls -alrt /app

# RUN npm install

# CMD npm start


FROM node

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    ca-certificates curl file \
    build-essential \
    autoconf automake autotools-dev libtool xutils-dev && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get install \
  python \
  build-base \
  git \
  bash \
  && npm -g install node-gyp

ENV SSL_VERSION=1.0.2k

RUN curl https://www.openssl.org/source/openssl-$SSL_VERSION.tar.gz -O && \
    tar -xzf openssl-$SSL_VERSION.tar.gz && \
    cd openssl-$SSL_VERSION && ./config && make depend && make install && \
    cd .. && rm -rf openssl-$SSL_VERSION*

ENV OPENSSL_LIB_DIR=/usr/local/ssl/lib \
    OPENSSL_INCLUDE_DIR=/usr/local/ssl/include \
    OPENSSL_STATIC=1

RUN curl https://sh.rustup.rs -sSf | \
    sh -s -- --default-toolchain nightly -y

ENV PATH=/root/.cargo/bin:$PATH


# Install Solana CLI
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.4.8/install)"

# Install Solana Token CLI
RUN cargo install spl-token-cli


RUN solana config get

# Set network
RUN solana config set --url https://devnet.solana.com

# Create key
RUN solana-keygen new --no-passphrase
# --no-outfile


ADD ./solana-rpc/src /app
ADD ./share /app/share
ADD ./share/models /app/constructors/sequelize/models

RUN npm install

CMD npm start
