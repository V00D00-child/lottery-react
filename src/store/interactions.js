import Web3 from 'web3'
import {
  web3Loaded,
  web3NetworkLoaded,
  web3AccountLoaded,
  web3BalanceLoaded,
  lotteryContractLoaded,
  userDataLoaded,
  clear
} from './actions'
import Lottery from '../abis/Lottery.json';


export const loadWeb3 = async (dispatch) => {
  if(typeof window.ethereum!=='undefined'){
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
    let network = await web3.eth.net.getNetworkType()
    network = network.charAt(0).toUpperCase()+network.slice(1)
    dispatch(web3NetworkLoaded(network))
    return network
  } catch (e) {
    dispatch(web3NetworkLoaded('Wrong network'))
    console.log('Error, load network: ', e)
  }
}

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts()
  const account = await accounts[0].toLowerCase()
  if(typeof account !== 'undefined'){
    dispatch(web3AccountLoaded(account))
    return account
  } else {
    dispatch(web3AccountLoaded(null))
    console.log('logout')
    return null
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

export const loadContract = async (dispatch, web3, network, networkId) => {
  try {
    if (network === 'Ropsten') {
      const contract = new web3.eth.Contract(Lottery.abi, Lottery.networks[networkId].address)
      dispatch(lotteryContractLoaded(contract)) //create in action.js and add to reducers.js
      return contract
    } else {
      dispatch(clear())
      window.alert('Lottery smart contract not detected on the current network. Please select another network with Metamask. Currenlty depolyed on Ropsten.');
      window.location.reload();
      return null;
    } 
  } catch (e) {
    console.log('Error, load contract: ', e)
  }
}

export const loadUserData = async (dispatch, contract, web3) => {
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

    dispatch(userDataLoaded(userData))
    return userData
  } catch (e) {
    console.log('Error, load contract data: ', e)
  }
}

// update web3 connection
export const update = async (dispatch) => {
  let account, web3, network

  web3 = await loadWeb3(dispatch)
  network = await loadNetwork(dispatch, web3)
  const networkId = await web3.eth.net.getId()

  const lotteryContract = await loadContract(dispatch, web3, network, networkId)
  if (lotteryContract) {
    account = await loadAccount(web3, dispatch)
    if(account){
      await loadBalance(dispatch, web3, account)
      await loadUserData(dispatch, lotteryContract, web3)
    }
  }
}