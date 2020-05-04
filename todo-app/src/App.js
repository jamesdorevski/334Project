import React from 'react';
import './App.css';
// import SampleComponent from './components/learning-components/SampleComponent';
// import FuncComponent from './components/learning-components/FuncComponent';
import ToDoApp from './components/todo/ToDoApp';

function App() {
  return (
    <div className="App">
      <ToDoApp/>
    </div>
  );
}

// class LearningComps extends Component {
//   render () {
//     return (
//       <div className="LearningComps">
//         <SampleComponent/>
//         <FuncComponent/>
//       </div>
//     );
//   }
// }

export default App;
