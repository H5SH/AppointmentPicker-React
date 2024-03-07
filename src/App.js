import logo from './logo.svg';
import './App.css';
import Appointment from './component/Appointment';
import AppointmentCalendar from './component/AppoinmentCalendar';
import TimeSlot from './component/TimeSlot';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {days, months} from './component/data'

function App() {
  const [value, setValue] = useState(new Date())
  console.log(value.getDate(), value.getMonth(), value.getDate(), value.getFullYear())

  return (
    <div className="pt-10" style={{ margin: 40 }}>
      <div className='row p-10 mt-10'>
        <div className='col-3'>
          {/* <AppointmentCalendar onChange={setValue} value={value} /> */}
          <Calendar onChange={setValue} value={value}/>
        </div>
        <div className='col'>
          <h3>{`${days[value.getDay() - 1]} ${months[value.getMonth()]} ${value.getDate()} ${value.getFullYear()}`}</h3>
          <TimeSlot />
        </div>

        {/* <Appointment /> */}
      </div>
    </div>
  );
}

export default App;
