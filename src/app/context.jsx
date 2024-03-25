import { createContext, useState } from "react";


const appointmentContext = createContext()

function AppointmentContext({ children }) {

    // Used in Appoinment Module
    const [appointmentDate, setAppointmentDate] = useState(new Date())
    const [appointmentTime, setAppointmentTime] = useState({ time: '12:00', skip: 0 })
    const [appointmentDay, setAppointmentDay] = useState('')
    const [appointmentLocation, setAppointmentLocation] = useState('')
    const [appointmentProvider, setAppointmentProvider] = useState('')

    return (
        <appointmentContext.Provider
            value={{
                appointmentDate,
                setAppointmentDate,

                appointmentTime,
                setAppointmentTime,

                appointmentDay,
                setAppointmentDay,

                appointmentProvider,
                setAppointmentProvider,

                appointmentLocation,
                setAppointmentLocation
            }}
        >
            {children}
        </appointmentContext.Provider>
    )
}

export {appointmentContext, AppointmentContext}