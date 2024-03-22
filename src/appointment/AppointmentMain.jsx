import TimeSlotDay from './components/timeSlots/TimeSlotDay';
import TimeSlotWeek from './components/timeSlots/TimeSlotWeek';
import { useContext, useEffect, useState } from 'react';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { days, getFirstAndLastDate, months } from './components/data';
import AppointmentForm from './components/AppointmentForm/AppointmentForm';
import { setDataContext } from '../../utilities/SettingContext';
import { getProviderReq } from '../providers/__request/RequestProvider';
import { toast } from 'react-toastify';
import ProvidersList from './components/ProvidersList';
import AppointmentHeader from './AppointmentHeader';
import Select from 'react-select';
import { getFacilitiesDataReq } from '../organization/components/facilities/__request/RequestFacility';
import LocationList from './components/LocationList';
import { providerAppointment } from './components/data';

function AppointmentMain() {

    const { appointmentDate, setAppointmentDate, appointmentProvider } = useContext(setDataContext)
    const [showWeeks, setShowWeeks] = useState(false)
    const [showSideBar, setShowSideBar] = useState(true)
    const [providers, setProviders] = useState(null)
    const [facilities, setFacilities] = useState(null)
    const [gap, setGap] = useState({'label': 15})
    const {first, last} = getFirstAndLastDate(appointmentDate)

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

    async function getFacilitiesData(){
        const response = await getFacilitiesDataReq()
        setFacilities(response.data.data)
    }

    useEffect(() => {
        providersList()
        getFacilitiesData()
    }, [])

    return (
        <div className='card bg-light-primary overflow-scroll'>
            <AppointmentForm />
            <AppointmentHeader
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
                showWeeks={showWeeks}
                setShowWeeks={setShowWeeks}
                appointmentDate={appointmentDate}
                first={first}
                last={last} 
            />
            
            <div className='row p-2'>
                {showSideBar &&
                    <div className='col-3'>
                        <div className="card">
                            <div className="card-body d-flex flex-column px-9 pt-6 pb-8">
                                <Calendar onChange={setAppointmentDate} value={appointmentDate} className='border border-white fs-5' />
                            </div>
                        </div>
                           
                        <div className="card my-3">
                            
                            <div className="card-body d-flex flex-column px-9 pt-6 pb-8">
                                
                                <div className="mb-10 fv-row">
                                    <label className="form-label mb-3">Location</label>
                                    <LocationList locations={facilities}/>
                                </div>

                                <div className="mb-10 fv-row">
                                    <label className="form-label mb-3">Providers</label>
                                    {providers && <ProvidersList providers={providers} />}
                                </div>

                            </div>
                        </div>

                    </div>
                }

                <div className={`${showSideBar ? 'col-9': 'col-12'} p-0`}>
                    <div className="card">
                        <div class="card-header border-0 pt-5">
                            <h3 class="card-title align-items-start flex-column">
                                <span class="card-label fw-bold fs-3 mb-1">{appointmentProvider.full_name}</span>
                            </h3>
                            <div class="card-toolbar" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-trigger="hover" title="Click to add a user">
                                <a href="#" class="btn btn-sm btn-light-primary" id='kt_appointment_toggle'>
                                    <i class="ki-duotone ki-plus fs-3"></i>New Appointment
                                </a>
                            </div>
                        </div>
                        <div className="card-body d-flex flex-column px-9 pt-6 pb-8">
                            
                            {showWeeks ?
                                <>
                                    <TimeSlotWeek skip={gap.label} start={8} end={17} first={first} last={last} month={appointmentDate.getMonth() + 1}/> 
                                </>:
                                <>
                                    <TimeSlotDay day={days[appointmentDate.getDay()]} skip={gap.label} start={8} end={17} providerAppointments={providerAppointment}/>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppointmentMain;
