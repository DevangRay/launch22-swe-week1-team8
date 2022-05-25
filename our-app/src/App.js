import { Routes, Route, Link } from 'react-router-dom';
import Classes from '../src/components/classesComp/Classes'
import MainPage from '../src/landing_page/MainPage';
import Error from '../src/components/Error';
import Calendar from '../src/components/calenderComp/Calendar';
import IndividualClass from '../src/components/classesComp/IndividualClass';


function App() {
  return (

    <div className="App">
      <nav>
        <Link to="/"> MainPage </Link>
        <Link to="/classes"> Classes </Link>
        <Link to="/calendar"> Calendar </Link>

      </nav>

      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/classes" element={<Classes/>} />
        <Route path="/classes/:teacherName" element={<IndividualClass />} />
        <Route path="/calendar" element = {<Calendar/>} />
        <Route path='/*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
