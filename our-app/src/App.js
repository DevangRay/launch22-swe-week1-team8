import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Classes from './components/classesComp/Classes';
import Error from './components/routerComp/Error';
import Calendar from './components/calenderComp/Calendar';
import Directory from './components/directoryComp/Directory';
import IndividualClass from './components/classesComp/IndividualClass';
import ChangeGrade from './components/classesComp/ChangeGrade';
import MainPage from './landing_page/MainPage';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/classes" element={<Classes/>} />
        <Route path="/classes/:teacherName" element={<IndividualClass />} />
        <Route path="/student/:studentTeacher/:studentName/:grade" element={<ChangeGrade/>} />
        <Route path="/calendar" element = {<Calendar/>} />
        <Route path="/directory" element = {<Directory/>} />
        <Route path='/*' element={<Error/>}/>
      </Routes>

      <nav>
        <Link to="/"> Home </Link>
        <Link to="/classes"> Classes </Link>
        <Link to="/calendar"> Calendar </Link>
        <Link to="/directory"> Directory </Link>
      </nav>
    </div>
  );
}

export default App;