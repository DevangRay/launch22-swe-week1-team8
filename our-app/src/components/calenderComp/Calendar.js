import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Events from './Events';
import { makeStyles } from '@material-ui/core/styles';
import {useNavigate} from 'react-router-dom';
import { Button } from "@mui/material"

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '15vh',
      fontFamily: 'Nunito',
      background: '#fafafa',
      color: '#dc7027'
    }, 
    body: {
      background: '#fafafa',
      justifyContent: 'center'
    },
    emphasisText: {
      color: '#f4d8ae',
    }
  }));

function Calendar() {
    const [value,setValue]=useState(null);
    const classes = useStyles();
    const navigate = useNavigate();

    function goToAddEvent() {
        navigate("/add-event")
    }

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
      <div className={classes.body}>
            <h1 className={classes.root}>School Event Calender</h1>
            <div className="selector">
                <div className="monthName">
                        

                <Button variant="outlined" onClick={goToAddEvent} className='addClassButton' style={{textDecoration: 'none'}}>
                  Create Event
                </Button> 
                </div>
                
                <div className='menu'>
                <h5>Select the Month:</h5>
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