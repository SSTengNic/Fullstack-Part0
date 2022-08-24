import Header from "./components/header";
import Content from './components/content';
import Total from './components/total';
import { CourseParts } from "./types/CourseParts";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts:Array<CourseParts>  = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name = {courseName}/>
      <Content courseparts = {courseParts}/>
      <Total courseparts = {courseParts}/>
    </div>
  );
};

export default App;