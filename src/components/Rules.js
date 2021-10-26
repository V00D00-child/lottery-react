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
      <AppHeader2>Project Information</AppHeader2>
      <RulesContent>- <a href="https://kovan.etherscan.io/address/0xE412A7396AcC914Ee9F026B4DF3E0AF0034D9ce5#code" target="_blank" rel="noopener noreferrer">Kovan Verified Smart Contract</a></RulesContent>
      <RulesContent>- <a href="https://ropsten.etherscan.io/address/0x4e781145626e90d438b1A5D035ECc8A1198358C2#code" target="_blank" rel="noopener noreferrer">Ropsten Verified Smart Contract</a></RulesContent>
      <RulesContent>- <a href="https://github.com/V00D00-child/lottery-react" target="_blank" rel="noopener noreferrer">Source code</a></RulesContent>
      <RulesContent>- Author:<a href="https://github.com/V00D00-child" target="_blank" rel="noopener noreferrer">Idris Bowman</a></RulesContent>
    </RulesContainer>
  );
}