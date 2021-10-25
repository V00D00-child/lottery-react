import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../store/actions"
import React from "react";
import {
  NavBar,
  NavLink,
  NavMenu,
  NavToggle,
} from "../styles/rest"

export default function Nav() {
  const account = useSelector(state => state.account);
  const walletEthBalance = useSelector(state => state.walletEthBalance);
  const network = useSelector(state => state.network);
  const manager = useSelector(state => state.manager);
  const dispatch = useDispatch();

  return (
    <NavBar>
      <NavMenu>
        <NavLink>React Lottery App</NavLink>
        <NavToggle onClick={() => dispatch(toggleTheme())}>Toggle theme</NavToggle>
      </NavMenu>
      {account && 
        <div>
          address: <u>{account.substring(0,6) + '...' + account.substring(38,42)}</u>&nbsp;
          network: <u>{network}</u>&nbsp;
          walletEthBalance: <u>{walletEthBalance} ETH</u>&nbsp;
          {account === manager &&
            <p>manager: yes</p>
          }
        </div>
      }
    </NavBar>
  );
}