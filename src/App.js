import logo from './logo.svg';
import './App.css';
import Appointment from './component/Appointment';
import AppointmentCalendar from './component/AppoinmentCalendar';

function App() {
  return (
    <div className="App">
     <AppointmentCalendar />
     <Appointment />
    </div>
  );
}

export default App;
