import logo from './logo.svg';
import './App.css';
import Appointment from './component/Appointment';
import AppointmentCalendar from './component/AppoinmentCalendar';
import TimeSlotDay from './component/timeSlots/TimeSlotDays';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {days, months} from './component/data'
import TimeSlotWeek from './component/timeSlots/TimeSlotWeek';

function App() {
  const [value, setValue] = useState(new Date())
  const [showWeeks, setShowWeeks] = useState(false)
  // console.log(value.getDate(), value.getMonth(), value.getDate(), value.getFullYear())

  return (
    <div className="pt-10" style={{ margin: 40 }}>
      <div className='row p-10 mt-10'>
        <div className='col-3'>
          {/* <AppointmentCalendar onChange={setValue} value={value} /> */}
          <Calendar onChange={setValue} value={value}/>
        </div>
        <div className='col-8'>
          <h3>{`${days[value.getDay() - 1]} ${months[value.getMonth()]} ${value.getDate()} ${value.getFullYear()}`}</h3>
          {showWeeks ? 
          <TimeSlotWeek />:
          <TimeSlotDay />
          }
        </div>
        <div className='col-1'>
          <button onClick={()=> setShowWeeks(false)} style={{margin:20, backgroundColor: 'blue', color: 'white'}}>Days</button>
          <button onClick={()=> setShowWeeks(true)} style={{margin:20, backgroundColor: 'blue', color: 'white'}}>Week</button>
        </div>

        {/* <Appointment /> */}
      </div>
    </div>
  );
}

export default App;
