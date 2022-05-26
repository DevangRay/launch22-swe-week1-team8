import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';
import Classes from './components/classesComp/Classes';
import Error from './components/routerComp/Error';
import Calendar from './components/calenderComp/Calendar';
import Directory from './components/directoryComp/Directory';
import IndividualClass from './components/classesComp/IndividualClass';
import AddClass from './components/classesComp/AddClass';
import ChangeGrade from './components/classesComp/ChangeGrade';
import MainPage from './landing_page/MainPage';


function App() {
  const style = {
    backgroundColor: "#fafafa",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    marginTop: "10%"
  }

  return (
    <div className="App">
      <div className='components'>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/classes" element={<Classes/>} />
          <Route path="/classes/:teacherName" element={<IndividualClass />} />
          <Route path="/student/:studentName" element={<ChangeGrade/>} />
          <Route path="/add-class" element={<AddClass/>}/>
          <Route path="/calendar" element = {<Calendar/>} />
          <Route path="/directory" element = {<Directory/>} />
          <Route path='/*' element={<Error/>}/>
        </Routes>
      </div>
      <div className='breaker'></div>
      <div style={style} className="navBar">
        <nav>
          <ButtonGroup variant='text' aria-label="text button group">
            <Button><Link to="/" style={{ textDecoration: 'none', color: '#dc7027' }}> Home </Link></Button>
            <Button><Link to="/classes" style={{ textDecoration: 'none' , color: '#dc7027' }}> Classes </Link></Button>
            <Button><Link to="/calendar" style={{ textDecoration: 'none' , color: '#dc7027' }}> Calendar </Link></Button>
            <Button><Link to="/directory" style={{ textDecoration: 'none' , color: '#dc7027' }}> Directory </Link></Button>
          </ButtonGroup>
        </nav>
      </div>
    </div>
  );
}

export default App;