import React from "react";
import {
  RulesContainer,
  AppHeader2,
  RulesContent,
  RulesLink
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
      <RulesContent>Lottery smart contract(Ropsten Test Network):<RulesLink target="_blank" rel="noopener noreferrer" href="https://ropsten.etherscan.io/address/0x4e781145626e90d438b1A5D035ECc8A1198358C2">https://ropsten.etherscan.io/address/0x4e781145626e90d438b1A5D035ECc8A1198358C2</RulesLink></RulesContent>
    </RulesContainer>
  );
}