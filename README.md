# Lottery smart contracts
Player must submit a minimum ammount of 0.02 ETH to enter into the lottery pool. After all players have entered, the manger address(account that deployed contract) can call the pickWinner() function. The winning will be picked using a pseudo random generator and the winning address with receive all ETH in the lottery pool. After the lottery winner is selected the smart contacts state will reset and a new lottery round can start.

# Contract deployed
- ropsten: 0x4e781145626e90d438b1A5D035ECc8A1198358C2
- https://ropsten.etherscan.io/address/0x4e781145626e90d438b1A5D035ECc8A1198358C2

- kovan: 0xE412A7396AcC914Ee9F026B4DF3E0AF0034D9ce5
- https://kovan.etherscan.io/address/0xE412A7396AcC914Ee9F026B4DF3E0AF0034D9ce5

# Running locally
- npm install
- start local Ganache blockchain
- npm run deploy:contract:dev
- npm run start
- navigate to http://localhost:3000/
- enter into lottery

# Layer 2 scaling soultion Abritrum
- https://developer.offchainlabs.com/docs/inside_arbitrum

## Arbitrum Box
- https://www.trufflesuite.com/blog/truffle-and-infura-support-arbitrum
- https://github.com/truffle-box/arbitrum-box
- box: https://www.trufflesuite.com/boxes/arbitrum