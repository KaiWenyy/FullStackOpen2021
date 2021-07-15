import React, { useState } from 'react'

const random = ({min, max}) => Math.floor(min+Math.random()*(max-min))
const Buttom = ({setfunc, text}) =>{
  return(
    <button onClick={setfunc}>{text}</button>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(7).fill(0))
  const [max_selected, setMaxSelected] = useState({value:0, index:0})
  const min = 0
  const max = 7
  
  const handleClickVote = () =>{
    const vote_copy = { ...vote }
    vote_copy[selected]+=1
    setVote(vote_copy)
    if (vote_copy[selected] > max_selected.value){
      setMaxSelected({value:vote_copy[selected],index: selected})
    }
  }
  const handleClickSelect = () =>{
    setSelected(random({min,max}))
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Buttom setfunc={handleClickVote} text='vote' />
      <Buttom setfunc={handleClickSelect} text='next anecdotes' />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[max_selected.index]}</p>
      <p>has {max_selected.value} votes</p>
    </div>
  )
}

export default App