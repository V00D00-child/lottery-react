import { useSelector, useDispatch } from "react-redux";
import React from "react"
import { update } from "../store/interactions"
import { clear } from "../store/actions"

export default function Connection() {

    const connection = useSelector(state => state.connection);
    const account = useSelector(state => state.account);

    const dispatch = useDispatch();

    const doConnectWallet = async (event) => {
        event.preventDefault();

        if( window.ethereum && connection === null ) {
            update(dispatch)
        
            window.ethereum.on('accountsChanged', async () => { 
                console.log('account change')
                await update(dispatch) 
            });
            window.ethereum.on('chainChanged', async () => {
                //  await update(dispatch)
                console.log('network change')
                window.location.reload();
            });
        }
    }

    const doDisConnectWallet = async (event) => {
        event.preventDefault();
        dispatch(clear())
    }

    return (
        <div className="connection-container">
            {/* connect wallet */}
            {account === null ?
              <div>
                <button className="btn btn-primary connect-wallet-button" onClick={(e) => doConnectWallet(e)}>Sign in with metamask Wallet</button>
              </div>
              :
              <div>
                <button className="btn btn-primary connect-wallet-button" onClick={(e) => doDisConnectWallet(e)}>Sign out</button>
              </div>
            }
      </div>
    );
}