import "../App.css";
import { useSelector } from "react-redux"
import React from "react"
import UserInfo from "./UserInfo";
import EnterLottery from "./EnterLottery";
import PickWinner from "./PickWinner";
import Connection from "./Connection";

export default function App() {

  const manager = useSelector(state => state.manager);
  const players = useSelector(state => state.players);
  const account = useSelector(state => state.account);
  const message = useSelector(state => state.message);

  return (
    <div className="app">
      <h1>Smart contract Lottery</h1>
      <div className="rules">
        <h2>How it works?</h2>
        <p>Player must submit a minimum ammount of 0.02 ETH to enter 
          into the lottery pool. After all players have entered, the manger address
          (account that deployed contract) can call the pickWinner() function. 
          The winning will be picked using a pseudo random generator and the winning
          address with receive all ETH in the lottery pool. After the lottery winner is 
          selected the smart contacts state will reset and a new lottery round can start.
        </p>
        <p>Lottery smart contract(Ropsten Test Network):<a target="_blank" rel="noopener noreferrer" href="https://ropsten.etherscan.io/address/0x4e781145626e90d438b1A5D035ECc8A1198358C2">https://ropsten.etherscan.io/address/0x4e781145626e90d438b1A5D035ECc8A1198358C2</a></p>
      </div>
      <hr></hr>
      <Connection />
      <UserInfo />
      <hr></hr>
      {
      players.indexOf(account) === -1 && account !== manager && 
      <EnterLottery />
      }
      <hr></hr>
      {
      account === manager && players.length !== 0 &&
      <PickWinner />
      }
      <hr></hr>
      <p>{message}</p>
    </div>
  );
}
