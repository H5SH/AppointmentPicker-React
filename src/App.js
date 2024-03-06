import logo from './logo.svg';
import './App.css';
import Appointment from './component/Appointment';
import AppointmentCalendar from './component/AppoinmentCalendar';
import TimeSlot from './component/TimeSlot';

function App() {
  return (
    <div className="App">
      <TimeSlot />
     <AppointmentCalendar />
     <Appointment />
    </div>
  );
}

export default App;
