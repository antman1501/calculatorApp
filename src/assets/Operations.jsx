import React from 'react'
import { Actions } from '../App'

const Operations = (props) => {
  return (
    <button onClick={()=>props.dispatch({type:Actions.chooseOperator,payload:props.operation})}>{props.operation}</button>
  )
}

export default Operations