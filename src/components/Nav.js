import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../store/actions"
import React from "react";
import {
  NavBar,
  NavLink,
  NavMenu,
  NavToggle,
  NavUserInfo
} from "../styles/rest"

export default function Nav() {
  const account = useSelector(state => state.account);
  const walletEthBalance = useSelector(state => state.walletEthBalance);
  const network = useSelector(state => state.network);
  const manager = useSelector(state => state.manager);
  const scanner = useSelector(state => state.scanner);
  const lottery = useSelector(state => state.lottery);

  const dispatch = useDispatch();

  return (
    <NavBar>
      <NavMenu>
        <NavLink>Lottery App</NavLink>
        <NavToggle onClick={() => dispatch(toggleTheme())}>Toggle theme</NavToggle>
      </NavMenu>
      {account && 
        <NavUserInfo>
          address: <u>
            <a href={`${scanner}/${account}`} target="_blank" rel="noopener noreferrer">
            {account.substring(0,6) + '...' + account.substring(38,42)}
            </a>
            </u>&nbsp;
          network: <u>{network}</u>&nbsp;
          contract address: <u>
            <a href={`${scanner}/${lottery.options.address}`} target="_blank" rel="noopener noreferrer">
            {lottery.options.address.substring(0,6) + '...' + lottery.options.address.substring(38,42)}
            </a>
            </u>&nbsp;
          walletEthBalance: <u>{walletEthBalance} ETH</u>&nbsp;
          {account === manager &&
            <p>manager: yes</p>
          }
        </NavUserInfo>
      }
    </NavBar>
  );
}