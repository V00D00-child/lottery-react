import { useSelector } from "react-redux"
import React from "react"
import LotteryInfo from "./LotteryInfo";
import EnterLottery from "./EnterLottery";
import PickWinner from "./PickWinner";
import Connection from "./Connection";
import Nav from "./Nav";
import { 
  GlobalStyles,
  MainApp,
  AppHeader1,
  AppHeader2,
  RulesContainer, 
  RulesContent,
  RulesLink,
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
        <AppHeader1>Smart contract Lottery</AppHeader1>
        <RulesContainer>
          <AppHeader2>How it works?</AppHeader2>
          <RulesContent>Player must submit a minimum ammount of 0.02 ETH to enter 
            into the lottery pool. After all players have entered, the manger address
            (account that deployed contract) can call the pickWinner() function. 
            The winning will be picked using a pseudo random generator and the winning
            address with receive all ETH in the lottery pool. After the lottery winner is 
            selected the smart contacts state will reset and a new lottery round can start.
          </RulesContent>
          <RulesContent>Lottery smart contract(Ropsten Test Network):<RulesLink target="_blank" rel="noopener noreferrer" href="https://ropsten.etherscan.io/address/0x4e781145626e90d438b1A5D035ECc8A1198358C2">https://ropsten.etherscan.io/address/0x4e781145626e90d438b1A5D035ECc8A1198358C2</RulesLink></RulesContent>
        </RulesContainer>

        <hr></hr>

        <Connection />
        <LotteryInfo />
        <hr></hr>
        {
        account !== manager &&
          <EnterLottery />
        }
        <hr></hr>
        {
         account === manager && players.length !== 0 &&
         <PickWinner />
        }

        <hr></hr>
        <UserMessage>{message}</UserMessage>
      </MainApp>
    </ThemeProvider>
  );
}
