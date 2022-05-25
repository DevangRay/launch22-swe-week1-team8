import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Classes from './components/classesComp/Classes';
import Home from './components/Home';
import Error from './components/Error';
import Calendar from './components/calenderComp/Calendar';

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
        <Route path="/classes" element={<Classes/>} exact/>
        <Route path="/calendar" element = {<Calendar/>} />
        <Route path='/*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
