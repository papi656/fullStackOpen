const Course = (props) => {
    return (
      <>
        {props.course.map((individualCourse) =>{
          return (
            <div key={individualCourse.id}>
            <Header course={individualCourse} />
            <Content course={individualCourse} />
            <Total course={individualCourse} />
            </div>
          )
        })}
      </>
    )
  }

const Header = (props) => {
return (
    <h1>{props.course.name}</h1>
)
}
  
const Part = (props) => {
return (
    <p key={props.id}>{props.name} {props.count}</p>
)
}

const Content = (props) => {
return (
    <div>
    {props.course.parts.map((value) => <Part name={value.name} count={value.exercises} key={value.id}/>)}
    </div>
)
}
  
const Total = (props) => {
const initialValue = 0
const sum = props.course.parts.reduce((accumulator, currentElement) => accumulator + currentElement.exercises, 0)
return (
<p><b>total of {sum} exercises</b></p>
)
}

export default Course