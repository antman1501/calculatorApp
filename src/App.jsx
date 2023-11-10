/* eslint-disable react-refresh/only-export-components */
import { useReducer, useState } from 'react'
import './App.css'
import Digits from './assets/digits'
import Operations from './assets/Operations'

const initialState={
  currentResult:'',
  previousResult:'',
  operator:'',
  overwrite:false,
}

export const Actions={
  addDigits:'add-digits',
  chooseOperator:'choose-operator',
  clear:'clear',
  deleteDigit:'delete-digit',
  evaluate:'evaluate',
}

function reducer(state,action){
  switch(action.type){
    case Actions.addDigits:
      if(state.overwrite){
        return{
          ...state,
          currentResult:action.payload,
          overwrite:false
        }
      }
      if(action.payload === "0" && state.currentResult === "0") return state
      if(action.payload === "." && state.currentResult.includes(".")) return state
      return {
        ...state,
        currentResult:`${state.currentResult|| ''}${action.payload}`
      }
    case Actions.chooseOperator:
      if(state.currentResult.length==0 && state.previousResult.length==0){
        return state
      }
      if(state.currentResult.length==0){
        return{
          ...state,
          operator:action.payload
        }
      }
      if(state.previousResult.length==0){
        return{
          ...state,
          operator:action.payload,
          previousResult:state.currentResult,
          currentResult:'',
        }
      }
      return{
        ...state,
        previousResult: evaluate(state),
        operator:action.payload,
        currentResult:''
      }
    case Actions.clear:
      return initialState
    case Actions.deleteDigit:
      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          currentResult:''
        }
      }
      if(state.currentResult.length==0) return state
      return{
        ...state,
        currentResult:state.currentResult.substring(0,state.currentResult.length-1)
      }
    case Actions.evaluate:
      if(state.currentResult==''||state.previousResult==''||state.operator=='') return state
      return{
        ...state,
        currentResult:evaluate(state),
        previousResult:'',
        operator:'',
        overwrite:true
      }
  }
}

function evaluate(state){
  const prev=parseFloat(state.previousResult)
  const curr=parseFloat(state.currentResult)
  const operation=state.operator
  if(operation=='+'){
    return (prev+curr).toString()
  }
  if(operation=='-'){
    return (prev-curr).toString()
  }
  if(operation=='÷'){
    return (prev/curr).toString()
  }
  if(operation=='*'){
    return (prev*curr).toString()
  }
}

const INTEGER_FORMATTER=new Intl.NumberFormat('en-us',{
  maximumFractionDigits:0,
})

function formatOperand(operand){
  if(operand==null)return 
  const [integer, decimal]=operand.split('.')
  if(decimal==null)return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {

  const[state,dispatch]=useReducer(reducer,initialState)

  return (
    <div className='container'>
      {console.log(state.currentResult,state.operator,state.previousResult)}
      <div className='calculator-outline'>
        <div className='result'>
          <div className='prevResult'>{formatOperand(state.previousResult)} {state.operator}</div>
          <div className='currResult'>{formatOperand(state.currentResult)}</div>
        </div>
        <button className='span-two' onClick={()=>dispatch({type:Actions.clear})}>AC</button>
        <button onClick={()=>dispatch({type:Actions.deleteDigit})}>DEL</button>
        <Operations operation='÷' dispatch={dispatch}/>
        <Digits digit='1' dispatch={dispatch}/>
        <Digits digit='2' dispatch={dispatch}/>
        <Digits digit='3' dispatch={dispatch}/>
        <Operations operation='*' dispatch={dispatch}/>
        <Digits digit='4' dispatch={dispatch}/>
        <Digits digit='5' dispatch={dispatch}/>
        <Digits digit='6' dispatch={dispatch}/>
        <Operations operation='+' dispatch={dispatch}/>
        <Digits digit='7' dispatch={dispatch}/>
        <Digits digit='8' dispatch={dispatch}/>
        <Digits digit='9' dispatch={dispatch}/>
        <Operations operation='-' dispatch={dispatch}/>
        <Digits digit='.' dispatch={dispatch}/>
        <Digits digit='0' dispatch={dispatch}/>
        <button onClick={()=>dispatch({type:Actions.evaluate})} className='span-two'>=</button>
      </div>
    </div>
  )
}

export default App
