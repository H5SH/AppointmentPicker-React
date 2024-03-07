import ReactTimeslotCalendar from 'react-timeslot-calendar'
import { useState } from 'react'
import { times } from '../data'
import './timeslot.css'

function TimeSlotDay({ displayOnlyTime, displayOnlyHover }) {

    const [form, setForm] = useState(false)

    return (
        <div>
            {/* <ReactTimeslotCalendar /> */}
            <div className=''>
                {times.map((time) => (
                    <div className='row' onClick={() => setForm(true)}>
                        {!displayOnlyHover &&
                        <div className='col-1'>
                            {`${time}:00`}
                        </div>}
                        {!displayOnlyTime &&
                            <div className='col-10'>
                                <div className="timeInputs">{`${time}:00`}</div>
                            </div>
                        }
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TimeSlotDay