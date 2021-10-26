require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privatekeys = process.env.PRIVATE_KEYS || "";

module.exports = {
  networks: {
    development: {
      url: "http://127.0.0.1:9545",
      network_id: "*",
    },
    // for use with local environment -- use `npm runLocalArbitrum` to start
    // after you have installed the repo and run `npm runLocalEthereum`, which will run a test L1 chain
    arbitrum_local: {
      provider: function() {
        return new HDWalletProvider(
          privatekeys.split(','), // Array of account private keys
          'http://127.0.0.1:8547/',
        )
      },
      network_id: "*",
      gas: 8500000
    },
    arbitrum_testnet: {
      provider: function() {
        return new HDWalletProvider(
          privatekeys.split(','), // Array of account private keys
          `https://arbitrum-rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
        )
      },
      networkCheckTimeout: 100000,
      gas: 287853530,
      network_id: 421611,
      chain_id: 421611
    },
    arbitrum_mainnet: {
      provider: function() {
        return new HDWalletProvider(
          privatekeys.split(','), // Array of account private keys
          `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);
      },
      networkCheckTimeout: 100000,
      gas: 287853530,
      network_id: 42161,
      chain_id: 42161,
    },
  },
  mocha: {
    timeout: 100000
  },
  contracts_directory: './src/contracts/arbitrum',
  contracts_build_directory: './src/abis/arbitrum-contracts',
  test_directory: './test_arbitrum/',
  migrations_directory: './migrations_arbitrum/',
  compilers: {
    solc: {
      version:'0.4.17',
      settings:  {
        optimizer: {
          enabled: true,
          runs: 800
        }
      }
    },
  },
  db: {
    enabled: false
  }
}
