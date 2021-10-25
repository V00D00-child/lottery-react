import { useSelector, useDispatch } from "react-redux";
import React from "react"
import { update } from "../store/interactions"
import { clear } from "../store/actions"
import { 
  ConnectionContainer,
  Button
} from "../styles/rest"

export default function Connection() {

  const connection = useSelector(state => state.connection);
  const account = useSelector(state => state.account);

  const dispatch = useDispatch();

  const doConnectWallet = async (event) => {
    event.preventDefault();

    if( window.ethereum && connection === null ) {
        update(dispatch)
    
        window.ethereum.on('accountsChanged', async () => { 
            await update(dispatch) 
        });
        window.ethereum.on('chainChanged', async () => {
            window.location.reload();
        });
    }
  }

  const doDisConnectWallet = async (event) => {
    event.preventDefault();
    dispatch(clear())
  }

  return (
    <ConnectionContainer>
      {account === null ?
        <div>
          <Button onClick={(e) => doConnectWallet(e)}>Connect metamask wallet</Button>
        </div>
        :
        <div>
          <Button onClick={(e) => doDisConnectWallet(e)}>Disconnect wallet</Button>
        </div>
      }
    </ConnectionContainer>
  );
}