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
