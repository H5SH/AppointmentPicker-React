import { useContext, useState } from 'react'
import { skips, times } from '../data'
import { pad } from '../../../../utilities/Helper'
import './timeslots.css'
import { setDataContext } from '../../../../utilities/SettingContext'

function TimeSlotDay({ displayOnlyTime, displayOnlyHover = false, day, start = 8, end = 17, gap = 15, }) {
    const { setAppointmentTime, setAppointmentDay } = useContext(setDataContext)
    // times take start and end time and returns an array of hours
    const slots = times(start, end)
    const gaps = skips(gap)

    return (
        <div>
            {!displayOnlyHover && !displayOnlyTime &&
                <div className='row'>
                    <div className='col-1 bg-primary text-center border border-1'>
                        Time
                    </div>
                    <div className='col-1 bg-primary border border-1'>
                        Length
                    </div>
                    <div className='col-1 bg-primary text-center border border-1'>
                        Patient Name
                    </div>
                    <div className='col-1 bg-primary text-center border border-1'>
                        DOB
                    </div>
                    <div className='col-1 bg-primary text-center border border-1'>
                        Home/Cell Phone
                    </div>
                    <div className='col-2 bg-primary text-center border border-1'>
                        Provider/ Staff
                    </div>
                    <div className='col-2 bg-primary text-center border border-1'>
                        Reason for Visit
                    </div>
                    <div className='col-1 bg-primary text-center border border-1'>
                        Status
                    </div>
                    <div className='col-2 bg-primary text-center border border-1'>
                        Automated Eligibility Status
                    </div>
                </div>}
            {slots.map((time) => (
                <>
                    {gaps.map((gap, index) => (
                        <div key={index} className='row' onClick={() => {
                            setAppointmentTime(`${time}:${pad(gap)}`)
                            setAppointmentDay(day)
                        }} >
                            {!displayOnlyHover &&
                                <div className={`border border-1 bg-white ${displayOnlyTime ? 'col' : 'col-1 text-center'}`}>
                                    {index === 0 ?
                                        <>
                                            <h6 style={{ display: 'inline' }}>{pad(time)}</h6>:{pad(gap)}
                                        </> :
                                        <div className='ps-4'>
                                            {`:${pad(gap)}`}
                                        </div>}
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