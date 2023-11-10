import React from 'react'
import { Actions } from '../App'

const Digits = (props) => {
  return (
    <button onClick={()=>props.dispatch({type:Actions.addDigits,payload:props.digit})}>{props.digit}</button>
  )
}

export default Digits