import { PageTitle } from "../../../_metronic/layout/core"
import AppointmentMain from "./AppointmentMain"
import {Routes, Route} from 'react-router-dom'


const appointmentBreadCrumbs = [
    {
        title: 'Appointments',
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
        path='create'
        element={
            <>
            <PageTitle breadcrumbs={appointmentBreadCrumbs}>Appointments</PageTitle>
            <AppointmentMain />
            </>
        } 
        />
    </Routes>

)

export default AppoinmentPage
