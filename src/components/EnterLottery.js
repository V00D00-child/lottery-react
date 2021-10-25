import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react"
import { updateUserMessage } from "../store/actions"
import { update } from "../store/interactions"
import { 
  Button
} from "../styles/rest"
export default function EnterLottery() {

  const [value, setValue] = useState('');
  const [isDisabled, setiIsDisabled] = useState(false);
  const lottery = useSelector(state => state.lottery);
  const connection = useSelector(state => state.connection);
  const account = useSelector(state => state.account);

  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch(updateUserMessage('Waiting on transaction success...'))

    setiIsDisabled(true);

    await lottery.methods.enter().send({
      from: account,
      value: connection.utils.toWei(value, 'ether')
    });

    setValue('')
    setiIsDisabled(false);
    dispatch(updateUserMessage('You have been entered!'))
    update(dispatch)
  };

  return (
    <form onSubmit={onSubmit}>  
      <h4>Want to try your luck?</h4>
      <div>
        <label>Amount of ether to enter</label>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <Button disabled={isDisabled}>Enter</Button>
    </form>
  );
}