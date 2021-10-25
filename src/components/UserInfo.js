import { useSelector } from "react-redux";
import React from "react";

export default function UserInfo() {

  const manager = useSelector(state => state.manager);
  const account = useSelector(state => state.account);
  const lastWinner = useSelector(state => state.lastWinner);
  const currentRound = useSelector(state => state.currentRound);
  const walletEthBalance = useSelector(state => state.walletEthBalance);
  const network = useSelector(state => state.network);
  const poolBalance = useSelector(state => state.poolBalance);
  const players = useSelector(state => state.players);

  return (
  	<div>
      <h2>My Info:{account === manager && account!== null && <span>(manager)</span>}</h2>
      <p>My account: {account}</p>
      <p>My wallet balance: {walletEthBalance} ETH</p>
      <p> Current network: {network}</p>
      <hr></hr>
      <h2>Players entered:</h2>
      {players.length > 0 &&
        players.map((player, index) => {
          return (
            <p key={index}>- {player} {player === account ? '(you)' : ''}</p>
          )
        })
      }
      <hr></hr>
      <h2>Lottery Round Info:</h2>
      <p>Current lottery round: {currentRound}</p>
      <p>Last winner: {lastWinner}</p>
      <p>The lottery contract is managed by: {manager}.</p>
      <p>There are currently {players.length} people entered,
      competing to win {poolBalance} Ether!</p>
    </div>
  );
}