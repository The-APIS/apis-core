# FROM alpine:latest

# RUN apk add curl
# RUN sh -c "$(curl -o /tmp/ -sSfL https://release.solana.com/stable/install)"
# RUN solana --version

FROM solanalabs/rust:latest

RUN rustup update
RUN apt-get -y update
RUN apt-get -y install libssl-dev libudev-dev pkg-config zlib1g-dev llvm clang git
RUN git clone https://github.com/solana-labs/solana.git

WORKDIR solana

RUN cargo build
RUN ./run.sh
