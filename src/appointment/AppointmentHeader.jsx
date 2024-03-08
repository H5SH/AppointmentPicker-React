import { months, days } from "./components/data"

function AppointmentHeader({ showWeeks, setShowWeeks, appointmentDate, setShowSideBar, showSideBar }) {


    return (
        <div className='row bg-light p-4'>
            <div className="col-1">
                <button className="btn btn-dark justify-content-center" onClick={() => setShowSideBar(!showSideBar)}>
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            <div className='col-2'>
                <a className="btn btn-primary"><i className="bi bi-search fs-8 p-0"></i></a>
            </div>
            {showWeeks ?
                <h1 className='col'>{`${months[appointmentDate.getMonth()]} ${appointmentDate.getFullYear()}`}</h1> :
                <h1 className='col'>{`${days[appointmentDate.getDay() - 1]} ${months[appointmentDate.getMonth()]} ${appointmentDate.getDate()} ${appointmentDate.getFullYear()}`}</h1>}

            <div className="col-1" onClick={()=> window.location.reload()}>
                <a className="btn btn-primary"><i className="bi bi-bootstrap-reboot"></i></a>
            </div>
            <button onClick={() => setShowWeeks(false)} className='bg-primary border-0 text-light rounded me-2 col-1'>Days</button>
            <button onClick={() => setShowWeeks(true)} className='bg-primary border-0 text-light rounded me-2 col-1'>Week</button>
        </div>
    )
}

export default AppointmentHeader