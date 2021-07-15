import React, { useState } from 'react'

const Buttom = ({state, setfunc, text}) =>{
  return(
    <button onClick={()=>{setfunc(state+1)}}>{text}</button>
  )
}
const Statistic = ({text, value}) =>{
  if (text==='positive'){
    return(
      <tr>
        <td>{text}</td> 
        <td>{value}%</td>
      </tr>
    )
  }
  return(
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad}) => {
  let all = good+neutral+bad
  let average = 0
  let positive = 0
  if (all!==0){
    average = (good-bad)/all
    positive = good/all
    return(
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={all} />
          <Statistic text='average' value={average} />
          <Statistic text='positive' value={positive} />
        </tbody>
      </table>
    )
  }
  else{
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  /*const setState = ({state, setfunc}) => () => {
    setfunc(state+1)
  }*/

  return (
    <div>
      <h1>give feedback</h1>
      <Buttom state={good} setfunc={setGood} text='good' />
      <Buttom state={neutral} setfunc={setNeutral} text='neutral' />
      <Buttom state={bad} setfunc={setBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
/*<button onClick={()=>{setGood(good+1)}}>good</button>
      <button onClick={()=>{setNeutral(neutral+1)}}>neutral</button>
      <button onClick={()=>{setBad(bad+1)}}>bad</button>*/

export default App