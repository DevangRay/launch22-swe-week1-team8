import './calendar.css'
import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Events from './Events';
// import { CardActions, CardContent, CardMedia, Typography } from '@mui/material';
// import Card from '@mui/material/Card';

function Calendar() {
    const [value,setValue]=useState(null);

    const handleSelect=(e)=>{
        setValue(e)
    }

    function toMonth(id) {
        switch(id) {
            case "1": return "January"; 
            case "2": return "February"; 
            case "3": return "March"; 
            case "4": return "April"; 
            case "5": return "May"; 
            case "6": return "June";
            case "7": return "July";
            case "8": return "August";
            case "9": return "September";
            case "10": return "October";
            case "11": return "November";
            case "12": return "December";
            default: return "No month selected";
        }
    }
    const id = toMonth(value);

    return (
      <div>
            <h1>School Event Calender</h1>
            <div className="selector">
                <div className="monthName">
                        <h5>Select the Month:</h5>
                </div>
                
                <div className='menu'>
                    <DropdownButton
                        title={id}
                        id="dropdown-menu-align-left"
                        onSelect={handleSelect}
                        >
                            <Dropdown.Item eventKey="1">January</Dropdown.Item>
                            <Dropdown.Item eventKey="2">February</Dropdown.Item>
                            <Dropdown.Item eventKey="3">March</Dropdown.Item>
                            <Dropdown.Item eventKey="4">April</Dropdown.Item>
                            <Dropdown.Item eventKey="5">May</Dropdown.Item>
                            <Dropdown.Item eventKey="6">June</Dropdown.Item>
                            <Dropdown.Item eventKey="7">July</Dropdown.Item>
                            <Dropdown.Item eventKey="8">August</Dropdown.Item>
                            <Dropdown.Item eventKey="9">September</Dropdown.Item>
                            <Dropdown.Item eventKey="10">October</Dropdown.Item>
                            <Dropdown.Item eventKey="11">November</Dropdown.Item>
                            <Dropdown.Item eventKey="12">December</Dropdown.Item>
                            {/* <Dropdown.Divider />
                            <Dropdown.Item eventKey="some link">some link</Dropdown.Item> */}
                    </DropdownButton>
                </div>
            </div>
            
            <div className="display">
                {value && <h2>Events in {id}</h2>}
                <Events month={value}/>
            </div>
      </div>
  );
}

export default Calendar;