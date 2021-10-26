import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react"
import { updateUserMessage, setisEntered } from "../store/actions"
import { update } from "../store/interactions"
import { 
  Button
} from "../styles/rest"
export default function EnterLottery() {

  const [value, setValue] = useState('');
  const lottery = useSelector(state => state.lottery);
  const connection = useSelector(state => state.connection);
  const account = useSelector(state => state.account);
  const isEntered = useSelector(state => state.isEntered);

  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch(updateUserMessage(''))

    // minimum ammount of 0.02 ETH to enter validation
    const parsed = parseFloat(value, 10)
    if (isNaN(parsed)) {
      setValue('')
      dispatch(updateUserMessage('Please only enter valid numbers'))
      return;
    } else if (parsed < 0.02) {
      dispatch(updateUserMessage('The minimum ammount to enter is 0.02 ETH'))
      return;
    }

    dispatch(updateUserMessage('Waiting on transaction success...'))
    dispatch(setisEntered(true));

    await lottery.methods.enter().send({
      from: account,
      value: connection.utils.toWei(value, 'ether')
    });

    setValue('')
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
          disabled={isEntered}
        />
      </div>
      <Button disabled={isEntered}>Enter</Button>
    </form>
  );
}