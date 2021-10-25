//WEB3
export function web3Loaded(connection) {
  return {
    type: 'WEB3_LOADED',
    payload: connection
  }
}

export function web3NetworkLoaded(network) {
  return {
    type: 'WEB3_NETWORK_LOADED',
    payload: network
  }
}

export function web3AccountLoaded(account) {
  return {
    type: 'WEB3_ACCOUNT_LOADED',
    payload: account
  }
}

export function web3BalanceLoaded(balance) {
  return {
    type: 'WEB3_BALANCE_LOADED',
    payload: balance
  }
}

export function lotteryContractLoaded(contract) {
  return {
    type: 'LOTTERY_CONTRACT_LOADED',
    payload: contract
  }
}

export function updateUserMessage(message) {
  return {
    type: 'UPDATE_MESSAGE',
    payload: message
  }
}

export function userDataLoaded(userData) {
  return {
    type: 'USER_DATA_LOADED',
    payload: userData
  }
}

export function clear() {
  return {
    type: 'CLEAR'
  }
}