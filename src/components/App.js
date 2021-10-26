import { useSelector } from "react-redux"
import React from "react"
import LotteryInfo from "./LotteryInfo";
import EnterLottery from "./EnterLottery";
import PickWinner from "./PickWinner";
import Connection from "./Connection";
import Nav from "./Nav";
import Rules from "./Rules";
import { 
  GlobalStyles,
  MainApp,
  AppHeader1,
  UserMessage
} from "../styles/rest"
import { ThemeProvider } from "styled-components"

export default function App() {

  const manager = useSelector(state => state.manager);
  const players = useSelector(state => state.players);
  const account = useSelector(state => state.account);
  const message = useSelector(state => state.message);
  const currentTheme = useSelector(state => state.currentTheme);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Nav />
      <MainApp>
        <AppHeader1>Lottery Smart contract</AppHeader1>
        <Rules />
        <hr></hr>
        <Connection />
        <LotteryInfo />
        <hr></hr>
        {account !== manager &&
          <EnterLottery />
        }
        <hr></hr>
        {account === manager && players.length !== 0 &&
         <PickWinner />
        }
        <hr></hr>
        <UserMessage>{message}</UserMessage>
      </MainApp>
    </ThemeProvider>
  );
}
