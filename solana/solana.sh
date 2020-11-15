# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.4.8/install)"

# Install Solana Token CLI
cargo install spl-token-cli


solana config get

# Set network
solana config set --url https://devnet.solana.com

# Create key
solana-keygen new --no-passphrase # --no-outfile

# Get $$
solana airdrop 10 <RECIPIENT_ACCOUNT_ADDRESS> --url https://devnet.solana.com

# Create token
spl-token create-token
