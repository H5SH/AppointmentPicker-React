import { prefixDays } from '../data'
import TimeSlotDay from './TimeSlotDay'

function TimeSlotWeek({ start = 8, end = 17, gap = 15 }) {

    return (
        <div className='d-flex justify-content-between'>
            <div className='pt-6'>
                <TimeSlotDay displayOnlyTime={true} start={start} end={end} gap={gap} />
            </div>
            {prefixDays.map((day) => (
                <div className='col justify-content-center ms-3'>
                    <div className='border border-success text-center bg-light-primary'>
                    {day}
                    </div>
                    <div className='ms-5 text-center'>
                    <TimeSlotDay displayOnlyHover={true} day={day} start={start} end={end} gap={gap} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TimeSlotWeek