import { useContext } from 'react'
import { skips, timeComparer, times } from '../data'
import { pad } from '../../../../utilities/Helper'
import './timeslots.css'
import { useDispatch } from 'react-redux'
import { editAppointmentIdAction } from '../../../../redux/action'
import { appointmentContext } from '../../../context'

function TimeSlotDay({ displayOnlyTime, displayOnlyHover = false, day, start = 8, end = 17, skip = 15, providerAppointments }) {
    const { setAppointmentTime, setAppointmentDay } = useContext(appointmentContext)
    // times take start and end time and returns an array of hours
    const slots = times(start, end)
    const gaps = skips(skip)
    const dispatch = useDispatch()

    return (
        <div>
            {!displayOnlyHover && !displayOnlyTime &&
                <div className='row'>
                    <div className='col-1 text-center border border-1'>
                        Time
                    </div>
                    <div className='col-1 border border-1'>
                        Length
                    </div>
                    <div className='col-2 text-center border border-1'>
                        Patient Name
                    </div>
                    <div className='col-1 text-center border border-1'>
                        DOB/Age
                    </div>
                    <div className='col-2 text-center border border-1'>
                        Home/Cell Phone
                    </div>
                    <div className='col-2 text-center border border-1'>
                        Provider/ Staff
                    </div>
                    <div className='col-2 text-center border border-1'>
                        Reason for Visit
                    </div>
                    <div className='col-1 text-center border border-1'>
                        Status
                    </div>
                    
                </div>}
                {slots.map((time) => (
                    <>
                        {gaps.map((gap, index) => (
                            <div key={index} className='row' onClick={() => {
                                setAppointmentTime({time:`${time}:${pad(gap)}`, skip:skip})
                                setAppointmentDay(day)
                            }} >
                                {!displayOnlyHover &&
                                    <div className={`border border-1 bg-white ${displayOnlyTime ? 'col' : 'col-1 text-center'}`}>
                                        {index === 0 ?
                                            <>
                                                <h6 style={{ display: 'inline' }}>{pad(time)}</h6>:{pad(gap)}
                                            </> :
                                            <div className='ps-5'>
                                                {`:${pad(gap)}`}
                                            </div>}
                                    </div>
                                }
                                {!displayOnlyTime &&
                                    <div className='col-11' id='kt_appointment_toggle'>
                                        <div 
                                        onClick={()=> { providerAppointments && 
                                             dispatch(editAppointmentIdAction(timeComparer(providerAppointments.appointments[0].from, providerAppointments.appointments[0].to, `${time}:${pad(gap)}`) ? providerAppointments.id: null))
                                        }}
                                        className="timeInputs" 
                                        style={providerAppointments && {backgroundColor: 
                                            timeComparer(providerAppointments.appointments[0].from, providerAppointments.appointments[0].to, `${time}:${pad(gap)}`) 
                                            && 'green' }}>{`${time}:${pad(gap)}`}</div>
                                    </div>
                                }
                            </div>
                        ))}
                    </>
                ))
            }
        </div>
    )
}

export default TimeSlotDay