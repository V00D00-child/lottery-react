import { useSelector } from "react-redux";
import React from "react";
import { 
  LotteryPool
} from "../styles/rest"
export default function LotteryInfo() {

  const manager = useSelector(state => state.manager);
  const account = useSelector(state => state.account);
  const lastWinner = useSelector(state => state.lastWinner);
  const currentRound = useSelector(state => state.currentRound);
  const poolBalance = useSelector(state => state.poolBalance);
  const players = useSelector(state => state.players);

  return (
  	<LotteryPool>
      <h2>Players entered into Pool:</h2>
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
    </LotteryPool>
  );
}