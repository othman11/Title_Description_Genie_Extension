# Testnet Wallet Checker

Chrome extension for deriving Bitcoin Testnet and Ethereum Sepolia addresses from a BIP-39 mnemonic and checking their balances.

## Safety Rules
- **Testnets only**: APIs point to Bitcoin Testnet and Ethereum Sepolia. The extension never contacts mainnet services.
- **Mnemonic use**: Use only self-generated or public test phrases. Never enter real mainnet phrases.
- **No mainnet connections**: There are no mainnet API or node URLs in the code.

Load the extension in Chrome via `Extensions → Developer Mode → Load unpacked` and select this folder.
