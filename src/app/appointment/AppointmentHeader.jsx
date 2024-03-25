import { months, prefixMonths, prefixDays } from "./components/data"

function AppointmentHeader({ showWeeks, setShowWeeks, appointmentDate, setShowSideBar, showSideBar, last, first }) {

    return (
        <div className='row bg-light p-4'>
            <div className="col-3">
                <button className="btn btn-dark justify-content-center" onClick={() => setShowSideBar(!showSideBar)}>
                    <i className="fas fa-bars fs-2"></i>
                </button> &nbsp;
                <a className="btn btn-primary" onClick={() => window.location.reload()}><i className="bi bi-bootstrap-reboot fs-2"></i></a>
            </div>

            <div className='col-7'>
                <span class="card-label fw-bold fs-1 mb-1">
                    {showWeeks ?
                        `${prefixMonths[first.getMonth()]} ${first.getDate()} - ${first.getMonth() !== last.getMonth() ? prefixMonths[last.getMonth()] : ''} ${last.getDate()} ${appointmentDate.getFullYear()}`
                        :
                        `${prefixDays[appointmentDate.getDay()]}, ${months[appointmentDate.getMonth()]} ${appointmentDate.getDate()} ${appointmentDate.getFullYear()}`
                    }
                </span>
            </div>

            <div className="col-2">
                <button onClick={() => setShowWeeks(false)} className={`btn btn-light ${!showWeeks && 'active'} border border-1 rounded rounded-start`}>Days</button>  &nbsp; &nbsp;
                <button onClick={() => setShowWeeks(true)} className={`btn btn-light ${showWeeks && 'active'} border border-1 rounded rounded-end me-2`}>Week</button>
            </div>
        </div>
    )
}

export default AppointmentHeader