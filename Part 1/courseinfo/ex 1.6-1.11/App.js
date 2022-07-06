import { useState } from 'react'


const StatisticLine = ({text,value}) => {
  return(
    <p>
      {text} {value}
    </p>
  )
}
const Statistics =(props)=> {
return (
  <div>
  <StatisticLine text = "good" value = {props.good}/>
  <StatisticLine text = "neutral" value = {props.neutral}/>
  <StatisticLine text = "bad" value = {props.bad}/>
  </div>
)
}
const Advance =({good, bad, neutral}) => {

  var Total = good + bad + neutral
  var Average = (good - bad)/Total 
  var Percentage = good/Total

if (Total === 0)
{
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

else {
  return(

    <div>
      <p>
        all {good + bad + neutral}
      </p>
      <p>
        Average {Average}
      </p>
      <p>
        Positive {Percentage}%
      </p>
    </div>
    )
  }
}

const Button = (props) => {
  return(
      <>
        <button onClick = {props.Setter}>
          {props.choice}
        </button>
      </>
      )
}


const App = () => { 
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
     <h1>
      give feedback
     </h1>
     <p>
       <Button Setter = {()=>setGood(good+1)} choice = 'good'/>
       <Button Setter = {()=>setNeutral(neutral+1)} choice = 'neutral'/>
       <Button Setter = {()=>setBad(bad+1)} choice = 'bad'/>
     </p>
     <h1>
      statistics
     </h1>
     <table>
      <tr>
       <Statistics good = {good} bad = {bad} neutral = {neutral}/>
       </tr>
       <tr>
       <Advance good = {good} bad ={bad} neutral = {neutral}/>
       </tr>
       

      
     </table>
    </div>
  )
}

export default App