import { useContext, useState } from 'react'
import { skips, times } from '../data'
import { pad } from '../../../../utilities/Helper'
import './timeslots.css'
import { setDataContext } from '../../../../utilities/SettingContext'

function TimeSlotDay({ displayOnlyTime, displayOnlyHover = false, day, start = 8, end = 17 ,gap = 15, }) {
    const { setAppointmentTime, setAppointmentDay } = useContext(setDataContext)
    // times take start and end time and returns an array of hours
    const slots = times(start, end)
    const gaps = skips(gap)

    return (
        <div className=''>
            {slots.map((time, index) => (
                <>
                    {gaps.map((gap) => (
                        <div key={index} className='row' onClick={() => {
                            setAppointmentTime(`${time}:${pad(gap)}`)
                            setAppointmentDay(day)
                        }} >
                            {!displayOnlyHover &&
                                <div className={`border border-success bg-light-primary ${displayOnlyTime ? 'col':'col-1 text-center'}`}>
                                  <u>{`${time}:${pad(gap)}`}</u>
                                </div>
                            }
                            {!displayOnlyTime &&
                                <div className='col-11' id='kt_appointment_toggle'>
                                    <div className="timeInputs">{`${time}:${pad(gap)}`}</div>
                                </div>
                            }
                        </div>
                    ))}
                </>
            ))}
        </div>
    )
}

export default TimeSlotDay