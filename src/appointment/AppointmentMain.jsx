import TimeSlotDay from './components/timeSlots/TimeSlotDay';
import TimeSlotWeek from './components/timeSlots/TimeSlotWeek';
import { useContext, useEffect, useState } from 'react';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { days } from './components/data';
import AppointmentForm from './components/AppointmentForm/AppointmentForm';
import { setDataContext } from '../../utilities/SettingContext';
import { getProviderReq } from '../providers/__request/RequestProvider';
import { toast } from 'react-toastify';
import ListOfProviders from './components/ListOfProviders';
import AppointmentHeader from './AppointmentHeader';

function AppointmentMain() {

    const { appointmentDate, setAppointmentDate, appointmentProvider } = useContext(setDataContext)
    const [showWeeks, setShowWeeks] = useState(false)
    const [showSideBar, setShowSideBar] = useState(true)
    const [providers, setProviders] = useState(null)

    async function providersList() {
        try {
            // later 2 parameters are to make sure that we hit provider api
            const response = await getProviderReq('rendering', 0, { text: '', field: 'first_name' })
            setProviders(response.data.data)
        } catch (err) {
            console.log(err)
            toast.error("Failed To Load Provider Try Again")
        }
    }

    useEffect(() => {
        providersList()
    }, [])

    return (
        <div className='card bg-light-primary overflow-hidden'>
            <AppointmentForm />
            <AppointmentHeader
            showSideBar={showSideBar} 
            setShowSideBar={setShowSideBar} 
            showWeeks={showWeeks} 
            setShowWeeks={setShowWeeks} 
            appointmentDate={appointmentDate}/>
            <div className='row border border-top-1'>
                {showSideBar && 
                <div className='col-3'>
                    <Calendar onChange={setAppointmentDate} value={appointmentDate} className='border border-white' />
                    {providers && <ListOfProviders providers={providers} />}
                </div>}
                <div className='col bg-white overflow-scroll h-550px border-0 border-left-1 border-light p-2'>
                    <div className='w-100'>
                        <div className='row'>
                            <h4 className='text-center bg-primary text-light rounded'>{appointmentProvider.full_name}</h4>
                            {showWeeks ?
                                <TimeSlotWeek gap={15} start={8} end={17} /> :
                                <TimeSlotDay day={days[appointmentDate.getDay() - 1]} gap={15} start={8} end={17} />
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppointmentMain;
