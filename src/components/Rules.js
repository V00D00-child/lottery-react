import React from "react";
import {
  RulesContainer,
  AppHeader2,
  RulesContent
} from "../styles/rest"

export default function Rules() {

  return (
    <RulesContainer>
      <AppHeader2>How it works?</AppHeader2>
      <RulesContent>Player must submit a minimum ammount of 0.02 ETH to enter 
        into the lottery pool. After all players have entered, the manger address
        (account that deployed contract) can call the pickWinner() function. 
        The winning will be picked using a pseudo random generator and the winning
        address with receive all ETH in the lottery pool. After the lottery winner is 
        selected the smart contacts state will reset and a new lottery round can start.
      </RulesContent>
      <AppHeader2>Network support</AppHeader2>
      <RulesContent>- Ropsten Ethereum</RulesContent>
      <RulesContent>- Kovan Ethereum</RulesContent>
      <RulesContent>- Arbitrum Rinkeby(comming soon)</RulesContent>
    </RulesContainer>
  );
}