import AppointmentMain from "./app/appointment/AppointmentMain";
import { AppointmentContext } from "./app/context";
import 'bootstrap/dist/css/bootstrap.css';


function App() {

  return (
    <AppointmentContext>
      <AppointmentMain />
    </AppointmentContext>
  )
}

export default App