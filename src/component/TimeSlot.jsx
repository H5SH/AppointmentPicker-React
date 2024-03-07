import ReactTimeslotCalendar from 'react-timeslot-calendar'
import './timeslot.css'

function TimeSlot(){
    const times = []
    for(let i = 1; i < 13; i++){
        times.push(i)
    }

    return (
        <div>
        {/* <ReactTimeslotCalendar /> */}
        <div className=''>
            {times.map((time)=> (
                <div className='row'>
                    <div className='col-1'>
                {`${time}:00`}
                </div>
                <div className='col-6'> 
                <div className="timeInputs">{`${time}:00`}</div>
                </div>
                </div>
            ))}
        </div>

        </div>
    )
}

export default TimeSlot