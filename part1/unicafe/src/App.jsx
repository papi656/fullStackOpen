import { useState } from "react";

const Button = (props) => <button onClick={props.event}>{props.text}</button>

const StatisticLine = ({text, value}) => <><td>{text}</td><td>{value}</td></>

const Statistics = (props) => {
  const getAverage = () => {
    let avg = (props.good-props.bad)/(props.good+props.neutral+props.bad)
    if(isNaN(avg))
      return 0
    return avg
  }
  const getPositivePercent = () => {
    let percent = ((props.good * 1.0) / (props.good+ props.neutral + props.bad)) * 100
    if(isNaN(percent))
      return 0
    return percent
  }

  if((props.good + props.neutral + props.bad) === 0)
    return (<p>No Feedback given</p>)
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr>
            <StatisticLine text="Good" value={props.good} />
          </tr>
          <tr>
            <StatisticLine text="Neutral" value={props.neutral} />
          </tr>
          <tr>
            <StatisticLine text="Bad" value={props.bad} />
          </tr>
          <tr>
            <StatisticLine text="Average" value={getAverage()} />
          </tr> 
          <tr>
            <StatisticLine text="Positive" value={getPositivePercent()} />
          </tr>
        </tbody>
      </table>
      {/* <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
      <p>All {props.good+props.neutral+props.bad}</p>
      <p>Average {getAverage()}</p>
      <p>Positive {getPositivePercent()}</p> */}
    </>
  )
}

const App = () => {
  // making state for each button
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => {
    setGood(good+1)
  }
  const updateNeutral = () => {
    setNeutral(neutral+1)
  }
  const updateBad = () => {
    setBad(bad+1)
  }

  

  return (
    <div>
      <h1> Give Feedback</h1>

      <Button event={updateGood} text="Good" />
      <Button event={updateNeutral} text="Neutral" />
      <Button event={updateBad} text="Bad" />
      
      <Statistics good={good} neutral={neutral} bad={bad} />      
    </div>
  )
}

export default App