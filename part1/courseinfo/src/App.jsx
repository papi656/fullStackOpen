const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.count}</p>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part name={props.values[0].name} count={props.values[0].count} />
      <Part name={props.values[1].name} count={props.values[1].count} />
      <Part name={props.values[2].name} count={props.values[2].count} />
    </div>
  )
}

const Total = (props) => {
  let sum = 0;
  for (let i = 0; i < props.values.length; i++){
    sum += props.values[i];
  }
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const data = [
    {name: 'Fundamentals of React', count:10},
    {name: 'Using props to pass data', count:7},
    {name: 'State of a component', count:14},
  ]

  return (
    <>
      <Header name={course} />
      {/* <Content name={part1} count={exercises1} />
      <Content name={part2} count={exercises2} />
      <Content name={part3} count={exercises3} /> */}
      <Content values={data} />
      <Total values={[exercises1,exercises2,exercises3]} />
    </>
  )
}

export default App