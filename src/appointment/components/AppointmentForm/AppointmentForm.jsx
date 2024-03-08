import { useContext } from "react"
import { setDataContext } from "../../../../utilities/SettingContext"
import { days, months } from "../data"
import { GotoBackButton } from "../../../../utilities/SubmitButton"


function AppointmentForm() {
    const { appointmentDate, appointmentTime, appointmentDay, appointmentProvider } = useContext(setDataContext)

    return (
        <div
            id="kt_appointment"
            className="bg-body"
            data-kt-drawer='true'
            data-kt-drawer-name='icdcodes'
            data-kt-drawer-activate='true'
            data-kt-drawer-overlay='true'
            data-kt-drawer-width="{default: '300px', 'lg': '900px'}"
            data-kt-drawer-direction='end'
            data-kt-drawer-toggle='#kt_appointment_toggle'
            data-kt-drawer-close='#kt_appointment_close'
        >
            <div className="card shadow-none rounded-0">
                <div className="card-body position-relative" id='kt_appointment_body'>
                    <div
                        id="kt_appointment_scroll"
                        className="position relative scroll-y me-n5 pe-5"
                        data-kt-scroll='true'
                        data-kt-scroll-height='auto'
                        data-kt-scroll-wrappers='#kt_appointment_body'
                        data-kt-scroll-dependencies='#kt_appoitment_header, #kt_appointment_footer'
                        data-kt-scroll-offset='5px'
                    >

                        <h3>{`${appointmentDay} ${months[appointmentDate.getMonth()]} ${appointmentDate.getDate()} ${appointmentDate.getFullYear()}`}</h3>
                        <h4>{`${appointmentTime}`}</h4>
                        <h2>{appointmentProvider.full_name}</h2>
                    </div>
                </div>
                <div
                    className="card-footer py-5 d-flex justify-content-between bottom-0"
                    id='kt_appointment_footer'
                >
                    <GotoBackButton id={'kt_appointment_close'} />
                </div>
            </div>
        </div>

    )
}

export default AppointmentForm