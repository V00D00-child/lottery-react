import Web3 from 'web3'
import {
  web3Loaded,
  web3NetworkLoaded,
  web3AccountLoaded,
  web3BalanceLoaded,
  lotteryContractLoaded,
  userDataLoaded,
  clear,
  setisEntered
} from './actions'
import LotteryEthereum from '../abis/ethereum-contracts/Lottery.json';

const NETWORKS = {
  '1': 'Mainnet Ethereum',
  '3': 'Ropsten Ethereum',
  '42': 'Kovan Ethereum',
  '4': 'Rinkeby Ethereum',
  '5777': 'Ethereum Local',
  '421611': 'Arbitrum Rinkeby',
  '42161': 'Arbitrum Mainnet',
  '10': 'Arbitrum Local'
};

const SCANNERS = {
  '1': 'https://etherscan.io/address',
  '3': 'https://ropsten.etherscan.io/address',
  '42': 'https://kovan.etherscan.io/address',
  '4': 'https://rinkeby.etherscan.io/address',
  '5777': 'https://etherscan.io/address',
  '421611': 'https://rinkeby-explorer.arbitrum.io/address',
  '42161': 'https://explorer.offchainlabs.com/address',
};

export const loadWeb3 = async (dispatch) => {
  if(typeof window.ethereum !== 'undefined'){
    window.ethereum.autoRefreshOnNetworkChange = false;
    const web3 = new Web3(window.ethereum)
    dispatch(web3Loaded(web3))
    return web3
  } else {
    window.alert('Please install MetaMask')
    window.location.assign("https://metamask.io/")
  }
}

export const loadNetwork = async (dispatch, web3) => {
  try{
    let network;
    const networkId = await web3.eth.net.getId()
    network = NETWORKS[networkId.toString()] 
    const networkObj = {
      network,
      networkId,
      scanner: SCANNERS[networkId.toString()]
    };
    dispatch(web3NetworkLoaded(networkObj))
    return network
  } catch (e) {
    dispatch(web3NetworkLoaded('Wrong network'))
    console.log('Error, load network: ', e)
  }
}

export const loadAccount = async (dispatch) => {
  if(typeof window.ethereum !== 'undefined') {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = await accounts[0]

    if(typeof account !== 'undefined') {
      dispatch(web3AccountLoaded(account.toLowerCase()))
      return account.toLowerCase()
    } else {
      dispatch(web3AccountLoaded(null))
      window.alert('Please install MetaMask')
      window.location.assign("https://metamask.io/")
      return null
    }
  }
}

export const loadBalance = async (dispatch, web3, account) => {
  try {
    // Ether balance in wallet
    const etherBalance = await web3.eth.getBalance(account)
    dispatch(web3BalanceLoaded((etherBalance/10**18).toFixed(5)))
  } catch (e) {
    console.log('Error, load balance: ', e)
  }
}

export const loadContract = async (dispatch, web3, networkId) => {
  try {
    if (networkId ===  3 || networkId === 42 || networkId === 5777) {
      const contract = new web3.eth.Contract(LotteryEthereum.abi, LotteryEthereum.networks[networkId].address)
      dispatch(lotteryContractLoaded(contract))
      return contract
    } else {
      dispatch(clear())
      window.alert('Lottery smart contract not detected on the current network. Please select another network with Metamask.');
      window.location.reload();
      return null;
    } 
  } catch (e) {
    console.log('Error, load contract: ', e)
  }
}

export const loadUserData = async (dispatch, contract, web3, account) => {
  try {
    const manager = await contract.methods.manager().call();
    const players = await contract.methods.getPlayers().call();
    const lastWinner = await contract.methods.lastWinner().call();
    const currentRound = await contract.methods.currentRound().call();
    const poolBalance = await web3.eth.getBalance(contract.options.address);
    const formatedPlayers = players.map(player => {
      return player.toLowerCase()
    });
    const userData = {
      manager: manager.toLowerCase(),
      players: formatedPlayers,
      lastWinner,
      currentRound,
      poolBalance: web3.utils.fromWei(poolBalance, 'ether')
    }

    // check enter state
    formatedPlayers.forEach((player) => {
      console.log(player)
      if (player === account && player !== manager) {
        dispatch(setisEntered(true));
      } else {
        dispatch(setisEntered(false));
      }
    })

    dispatch(userDataLoaded(userData))
    return userData
  } catch (e) {
    console.log('Error, load contract data: ', e)
  }
}

// update web3 connection
export const update = async (dispatch) => {
  let account, web3

  web3 = await loadWeb3(dispatch)
  await loadNetwork(dispatch, web3)
  const networkId = await web3.eth.net.getId()

  const lotteryContract = await loadContract(dispatch, web3, networkId)
  if (lotteryContract) {
    account = await loadAccount(dispatch)
    if(account){
      await loadBalance(dispatch, web3, account)
      await loadUserData(dispatch, lotteryContract, web3, account)
    }
  }
}