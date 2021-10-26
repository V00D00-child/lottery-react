import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react"
import { updateUserMessage } from "../store/actions"
import { update } from "../store/interactions"
import { 
  Button
} from "../styles/rest"

export default function PickWinner() {

  const [isDisabled, setiIsDisabled] = useState(false);
  const lottery = useSelector(state => state.lottery);
  const account = useSelector(state => state.account);

  const dispatch = useDispatch();

  const pickWinner = async (event) => {
    event.preventDefault();
    setiIsDisabled(true);
    dispatch(updateUserMessage('Waiting on transaction success...'))

    await lottery.methods.pickWinner().send({
      from: account,
    });

    const lastWinner = await lottery.methods.lastWinner().call();
    dispatch(updateUserMessage(`A winner has been picked ${lastWinner}`))
    setiIsDisabled(false);
    update(dispatch)
  }

  return (
    <div>
        <h4>Ready to pick a winner?</h4>
        <Button disabled={isDisabled} onClick={pickWinner}>Pick winner</Button>
    </div>
  );
}