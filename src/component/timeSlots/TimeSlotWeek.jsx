import { times, prefixDays } from '../data'
import TimeSlotDay from './TimeSlotDays'

function TimeSlotWeek() {

    return (
        <div>
            <div className='row'>
                <div className='col-1'>
                    <div className='row'>
                        <div className='col-1'></div>
                        <TimeSlotDay displayOnlyTime={true} />
                    </div>
                </div>
                <div className='col-10'>
                    <div className='row'>
                        {prefixDays.map((day) => (
                            <div className='col-1'>
                                {day}
                                <TimeSlotDay displayOnlyHover={true} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeSlotWeek