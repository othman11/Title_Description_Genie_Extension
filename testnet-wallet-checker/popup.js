// Testnet Wallet Checker logic
// Only uses test networks and public test mnemonics.

async function deriveAndDisplay(mnemonic) {
  const output = document.getElementById('output');
  output.textContent = '';

  if (!bip39.validateMnemonic(mnemonic)) {
    output.textContent = 'Invalid mnemonic. Use a valid BIP-39 phrase.';
    return;
  }

  const seed = await bip39.mnemonicToSeed(mnemonic);

  // Bitcoin Testnet address using m/44'/1'/0'/0/0
  const testnet = bitcoin.networks.testnet;
  const root = bitcoin.bip32.fromSeed(seed, testnet);
  const child = root.derivePath("m/44'/1'/0'/0/0");
  const btcAddress = bitcoin.payments.p2pkh({ pubkey: child.publicKey, network: testnet }).address;

  // Ethereum Sepolia address (standard derivation path)
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  const ethAddress = wallet.address;

  // Fetch balances
  try {
    const btcUrl = `https://api.blockcypher.com/v1/btc/test3/addrs/${btcAddress}/balance`;
    const btcRes = await fetch(btcUrl);
    const btcJson = await btcRes.json();
    const btcBalance = btcJson.balance / 1e8; // satoshi to BTC

    const ethUrl = `https://api-sepolia.etherscan.io/api?module=account&action=balance&address=${ethAddress}&tag=latest`;
    const ethRes = await fetch(ethUrl);
    const ethJson = await ethRes.json();
    const ethBalance = ethers.utils.formatEther(ethJson.result);

    output.textContent =
      `Bitcoin testnet:\n  Address: ${btcAddress}\n  Balance: ${btcBalance} BTC\n\n` +
      `Ethereum Sepolia:\n  Address: ${ethAddress}\n  Balance: ${ethBalance} ETH`;
  } catch (err) {
    output.textContent = 'Error fetching balances: ' + err.message;
  }
}

// Event listeners

document.getElementById('derive').addEventListener('click', () => {
  const mnemonic = document.getElementById('mnemonic').value.trim();
  deriveAndDisplay(mnemonic);
});

document.getElementById('generate').addEventListener('click', () => {
  const mnemonic = bip39.generateMnemonic(128);
  document.getElementById('mnemonic').value = mnemonic;
  deriveAndDisplay(mnemonic);
});
