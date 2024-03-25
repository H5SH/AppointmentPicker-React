import { prefixDays } from '../data'
import TimeSlotDay from './TimeSlotDay'

function TimeSlotWeek({ start = 8, end = 17, skip = 15, first, last, month }) {
    const week = {
        'start': 7 - last.getDate(),
        'first': first.getDate(),
        'last': 1,
        'month': month
    }
    return (
        <div className='d-flex justify-content-between'>
            <div className='pt-6'>
                <TimeSlotDay displayOnlyTime={true} start={start} end={end} skip={skip} />
            </div>
            {prefixDays.map((day, index) => (
                <div className='col justify-content-center ms-3'>
                    <div className='border border-1 text-center bg-white'>
                        {`${day} ${last.getMonth() !== first.getMonth() ? week.start <= index ? `${month}/${week.last++}` : `${month - 1}/${week.first++}` : `${month}/${week.first++}`}`}
                    </div>
                    <div className='ms-5 text-center'>
                        <TimeSlotDay displayOnlyHover={true} day={day} start={start} end={end} skip={skip} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TimeSlotWeek