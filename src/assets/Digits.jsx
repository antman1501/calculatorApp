import React from 'react'
import { Actions } from '../App'

const Digits = (props) => {
    const {dispatch,digit} =props;
  return (
    <button onClick={()=>dispatch({type:Actions.addDigits,payload:digit})}>{digit}</button>
  )
}

export default Digits