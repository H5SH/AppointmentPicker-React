import { PageTitle } from "../../../_metronic/layout/core"
import AppointmentMain from "./AppointmentMain"
import {Routes, Route} from 'react-router-dom'


const appointmentBreadCrumbs = [
    {
        title: 'Appointment',
        path: '/appointment/book',
        isSeparator: false,
        isActive: false
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    }
]

const AppoinmentPage = () => (
    <Routes>
        <Route
        path='book'
        element={
            <>
            <PageTitle breadcrumbs={appointmentBreadCrumbs}>Appointment</PageTitle>
            <AppointmentMain />
            </>
        } 
        />
    </Routes>

)

export default AppoinmentPage
