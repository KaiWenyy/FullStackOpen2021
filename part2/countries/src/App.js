import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({newData, newSearchField, handleFilter, handleShowButton, showData, weathData}) =>{
  //const objs = newData.filter(c=>c.name.substring(0,newSearchField.length).toLowerCase()===newSearchField.toLowerCase())
  const objs = newData.filter(c=>c.name.toLowerCase().includes(newSearchField.toLowerCase()))
  return(
    <div>
      find countries<input value={newSearchField} onChange={handleFilter}/>
      <ShowCountry objs={objs} 
      handleShowButton={handleShowButton}
      />
      <Content showData={showData} weathData={weathData} />
    </div>
  )
}
const ShowCountry = ({objs, handleShowButton}) =>{
  const country = (objs)=>{
    if(objs.length>10){ return(<p>Too many matches, specify another filter</p>) }
    else{
      return (
            <ul>
            {objs.map((country,i)=> 
              <Button key={i} country={country} 
              handleShowButton={()=>handleShowButton(country)}
              />)}
            </ul>
      )
    }
  }
  return(
    <div>
      {country(objs)}
    </div>
  )
}
const Button = ({country, handleShowButton}) =>{
  console.log('button',country);
  return (
    <li>
      {country.name}<button  onClick={handleShowButton}>show</button>
    </li>
  )
}
const Content = ({showData, weathData}) =>{
  if (showData !== null){
    console.log('content porops',showData)
    return(
      <div>
        <h1>{showData.name}</h1>
        <p>capital {showData.capital}</p>
        <p>population {showData.population}</p>
        <h2>languages</h2>
        {showData.languages.map(e=><li key={e.name}>{e.name}</li>)}
        <img src={showData.flag} alt="country's flag" />
        <WeatContent showData={showData} weathData={weathData} />
      </div>
    )
  }
  return(<></>)
}
const WeatContent = ({showData,weathData}) =>{
  if (weathData !== null){
    return (  
      <div>
      <h2>Weather in {showData.name}</h2>
      <p>temperature: {weathData.current.temperature} Celcius</p>
      <img src={weathData.current.weather_icons} alt='weather icon' />
      <p>wind: {weathData.current.wind_speed} mph direction {weathData.current.wind_dir}</p>
      </div>
    )
  }
  else{return(<></>)}
}
function App() {
  const [ newSearchField, setSearchField ] = useState('')
  const [ newData, setData ] = useState([])
  const [ showData, setShowData ] = useState(null)
  const [ weathData, setWeathData ] = useState(null)

  const handleFilter = (event) =>{
    const filterStr = event.target.value.toLowerCase()
    setSearchField(filterStr)
  }
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setData(response.data)
      })
  }
  useEffect(hook,[])
  const handleShowButton = (country) =>{
    console.log('click show',country);
    setShowData(country)
    const api_key = process.env.REACT_APP_API_KEY
    axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
        .then(response => {
          console.log('button promise fulfilled')
          console.log(response.data)
          if (response.success){ setWeathData(response.data)}
        })
        .catch(error => {
          setWeathData(null)
          alert(
            'the weather data cannot receive'
          )
        })
  }
  return (
    <div>
      <Filter
      newData={newData}
      newSearchField={newSearchField} 
      handleFilter={handleFilter}
      handleShowButton={handleShowButton}
      showData={showData}
      weathData={weathData} 
      />
    </div>
  )
}
/*<Filter
      persons={persons}
      newSearchField={newSearchField} 
      handleFilter={handleFilter} 
      />*/
export default App;
