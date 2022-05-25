import { Routes, Route, Link } from 'react-router-dom';
import Classes from '../src/components/classesComp/Classes'
import Home from '../src/components/Home';
import Error from '../src/components/Error';
import Calendar from '../src/components/calenderComp/Calendar';
import IndividualClass from '../src/components/classesComp/IndividualClass';


function App() {
  return (

    <div className="App">
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/classes"> Classes </Link>
        <Link to="/calendar"> Calendar </Link>

      </nav>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/classes" element={<Classes/>} />
        <Route path="/classes/:teacherName" element={<IndividualClass />} />
        <Route path="/calendar" element = {<Calendar/>} />
        <Route path='/*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
