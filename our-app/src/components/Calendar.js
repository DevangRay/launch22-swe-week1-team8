import './calendar.css'
import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Events from './Events';

function Calendar() {
    const [value,setValue]=useState(null);

  const handleSelect=(e)=>{
    setValue(e)
  }

  return (
      <div>
            <div className="selector">
                <div className="monthName">
                    <p>Select the Month:</p>
                </div>

                <div className='menu'>
                    <DropdownButton
                        // alignLeft
                        title="Month"
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
                {/* <p>Here's what's happening!</p>
                {value && <h4>You selected {value}</h4>} */}
                <Events month={value}/>
            </div>
      </div>
  );
}

export default Calendar;