/* eslint-disable no-undef */
const LotteryV2 = artifacts.require("LotteryV2");

module.exports = async function (deployer) {

  let _VRF;
  let _linkToken;
  let _keyHash;
  let _feeLink;

  console.log(deployer.network);

  // Determine Network values ******************************************************
  if(deployer.network === 'kovan') {
    console.log(`Deploying to KOVAN Network!!!!`)
    _VRF = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9'
    _linkToken = '0xa36085F69e2889c224210F603D836748e7dC0088'
    _keyHash = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4'
    _feeLink = (0.1 * 10 ** 18).toString()
  } else if (deployer.network === 'rinkeby') {
    console.log(`Deploying to Rinkeby Network!!!!`)
    _VRF = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B'
    _linkToken = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'
    _keyHash = '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311'
    _feeLink = (0.1 * 10 ** 18).toString()
  } else if (deployer.network === 'ropsten') {
    console.log(`We do not support ropsten network`)
    return;
  } else {
    console.log(`Deploying to Mainnet or Mainet Fork Network!!!!`)
    _VRF = '0xf0d54349aDdcf704F77AE15b96510dEA15cb7952'
    _linkToken = '0x514910771AF9Ca656af840dff83E8264EcF986CA'
    _keyHash = '0xAA77729D3466CA35AE8D28B3BBAC7CC36A5031EFDC430821C02BC31A238AF445'
    _feeLink = (2 * 10 ** 18).toString()
  }

  // DEPLOY ******************************************************
  await deployer.deploy(
    LotteryV2,
      _VRF,
      _linkToken,
      _keyHash,
      _feeLink
  )

  // Transfer LINK tokens to contract ******************************************************
  process.env.NETWORK = deployer.network
  const lotteryV2 = await LotteryV2.deployed()

  // Copy deployed contract address and deposit some LINK to pay for fees for VRF use
  console.log(`DEPLOYED CONTRACT ADDRESS IS: ${lotteryV2.address} on ${deployer.network} network.`)
  // on Kovan network transfer some LINK into contract or get from a faucet  
};
