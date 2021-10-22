import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from "./lottery";

class App extends React.Component {
  // es2016
  state = {
    manager: '',
    players: [],
    contractBalance: '',
    value: '',
    account: '',
    message: '',
    lastWinner: '',
    currentRound: '',
    walletEthBalance: ''
  };

  async componentDidMount() {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const lastWinner = await lottery.methods.lastWinner().call();
    const currentRound = await lottery.methods.currentRound().call();
    const contractBalance = await web3.eth.getBalance(lottery.options.address);
    const walletEthBalance = await web3.eth.getBalance(accounts[0]);

    const formatedPlayers = players.map(player => {
      return player.toLowerCase()
    });

    this.setState({ 
      manager: manager.toLowerCase(),
      players:formatedPlayers,
      contractBalance,
      account: accounts[0].toLowerCase(),
      lastWinner: lastWinner.toLowerCase(),
      currentRound,
      walletEthBalance
    });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.enter().send({
      from: this.state.account,
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have been entered!' });
  }

  pickWinner = async (event) => {
    event.preventDefault();

    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.pickWinner().send({
      from: this.state.account,
    });

    const lastWinner = await lottery.methods.lastWinner().call();

    this.setState({ message: `A winner has been picked ${lastWinner}`, lastWinner: lastWinner.toLowerCase() });
  }

  render() {
    const { manager, players, contractBalance, value, account, message, lastWinner, currentRound, walletEthBalance } = this.state;
    return (
      <div className="">
        <h2>Lottery contract{account === manager && <span>(manager)</span>}</h2>
        <p>My account: {account}</p>
        <p>My wallet balance: {web3.utils.fromWei(walletEthBalance, 'ether')} ETH</p>
        <hr></hr>
        <p>Current lottery round: {currentRound}</p>
        <p>Last winner: {lastWinner}</p>
        <p>This contract is managed by: {manager}.
        There are currently {players.length} people entered,
        competing to win {web3.utils.fromWei(contractBalance, 'ether')} Ether!
        </p>

      <hr></hr>
      {
        players.indexOf(account) === -1 && account !== manager ? 
          <form onSubmit={this.onSubmit}>  
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={value}
              onChange={event => this.setState({ value: event.target.value, message: '' })}
            />
          </div>
          <button>Enter</button>
          </form>
        :
        <p>You cannot enter into lottery!</p>
      }
      
        <hr></hr>
        {
          account === manager &&
          <div>
            <h4>Ready to pick a winner?</h4>
            <button onClick={this.pickWinner}>Pick winner</button>
          </div>
        }
        <hr></hr>
        <p>{message}</p>
      </div>
    );
  }
}
export default App;
