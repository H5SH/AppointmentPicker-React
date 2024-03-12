import { useContext, useEffect, useState } from "react"
import { setDataContext } from "../../../../utilities/SettingContext"
import { days, months } from "../data"
import { GotoBackButton } from "../../../../utilities/SubmitButton"
import { Field, Formik, Form, ErrorMessage } from "formik"
import { initialValues, reasonsForVisit, validation } from "../__request/initialValuesAndValidation"
import { addAppointmentReq } from "../__request/appointmentRequest"
import Select from 'react-select'
import { getFacilitiesDataReq } from "../../../organization/components/facilities/__request/RequestFacility"
import { getProviderReq } from "../../../providers/__request/RequestProvider"
import { getPatientDataReq } from "../../../patients/__request/RequestPatient"
import { pad } from "../../../../utilities/Helper"


function AppointmentForm() {
    const { appointmentDate, appointmentTime, appointmentDay, appointmentProvider } = useContext(setDataContext)
    const [ hours, min ] = appointmentTime.split(':')
    const [facilities, setFacilities] = useState([])
    const [providers, setProviders] = useState([])
    const [patients, setPatients] = useState([])

    async function getPatientData(){
        const response = await getPatientDataReq(0, { text: '', field: 'first_name' })
        setPatients(response.data.data)
    }

    async function getFacilitiesData() {
        const response = await getFacilitiesDataReq()
        setFacilities(response.data.data)
    }

    async function getProvider() {
        const response = await getProviderReq('rendering', 0, { text: '', field: 'first_name' })
        setProviders(response.data.data)
    }

    async function addAppointment(values) {
        console.log('addAppointment')
        addAppointmentReq(values)
    }

    function validate(){
        return true
    }

    console.log(`${pad(hours)}:${min}`, 'Hasham')

    const customLabelFacilities = ({ name }) => (
        <div style={{ color: "black", }}>
            {name}
        </div>
    )

    const customLabelProvider = ({ full_name }) => (
        <div>
            {full_name}
        </div>
    )

    useEffect(() => {
        getFacilitiesData()
        getProvider()
        getPatientData()
    }, [])


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
                        <Formik
                            initialValues={{
                                ...initialValues,
                                date: `${appointmentDate.getFullYear()}-${pad(appointmentDate.getMonth() + 1)}-${pad(appointmentDate.getDate())}`,
                                time: `${pad(hours)}:${min}`,
                                visit_length: '15',
                            }}
                            validationSchema={validation}
                            onSubmit={(values) => {
                                addAppointment(values)
                            }}
                            enableReinitialize
                        >
                            {({ handleSubmit, setValues, values }) => (
                                <Form>
                                    <div className="row">
                                        <h2 className="pb-4">Patient Information</h2>
                                        <div className="col-4">
                                            <label className="form-label">Patient</label>
                                            <Select
                                            options={patients}
                                            formatOptionLabel={customLabelProvider}
                                            onChange={(patient)=> {
                                                patient ?
                                                setValues({
                                                    ...values,
                                                    patient: patient || '',
                                                    first_name: patient.first_name || '',
                                                    last_name: patient.last_name || '',
                                                    dob: patient.dob || '',
                                                    insurance_name: patient.insurance_name || '',
                                                    phone: patient.hphone || ''
                                                }): setValues({
                                                    ...values, 
                                                    patient: '',
                                                    first_name: '',
                                                    last_name: '',
                                                    dob: '',
                                                    insurance_name:'',
                                                    phone:  ''
                                                })
                                            }}
                                            value={values.patient}
                                            getOptionValue={(option)=> option.full_name}
                                            isSearchable
                                            isClearable 
                                            />
                                        </div>
                                        <div className="col-3">
                                            <label className="form-label">First Name</label>
                                            <Field type='text' name='first_name' className='form-control' disabled={validate()}/>
                                        </div>
                                        <div className="col-3">
                                            <label className="form-label">Last Name</label>
                                            <Field type='text' name='last_name' className="form-control" disabled={validate()}/>
                                        </div>
                                        <div className="col-3 pt-4">
                                            <label className="form-label">Date Of Birth</label>
                                            <Field type='text' name='dob' className="form-control" disabled={validate()}/>
                                        </div>
                                        <div className="col-3 pt-4">
                                            <label className="form-label">Phone</label>
                                            <Field type='text' name='phone' className="form-control" disabled={validate()}/>
                                        </div>
                                        <div className="col-3 pt-4">
                                            <label className="form-label">Health Plan Eligibility Name</label>
                                            <Field type='text' name='health_paln_Eligibility_name' className="form-control" disabled={validate()}/>
                                        </div>
                                        <div className="col-3 pt-4">
                                            <label className="form-label">Insurance Name</label>
                                            <Field type='text' name='insurance_name' className="form-control" disabled={validate()}/>
                                        </div>
                                    </div>
                                    <div className="row pt-4">
                                        <h2 className="pt-4 pb-4">Appointment Information</h2>
                                        <div className="col-4">
                                            <label className="form-label required">Office Name</label>
                                            <Select
                                                options={facilities}
                                                formatOptionLabel={customLabelFacilities}
                                                onChange={(facility) => {
                                                    setValues({
                                                        ...values,
                                                        office_name: facility | ''
                                                    })
                                                }}
                                                value={values.office_name}
                                                getOptionValue={(option) => option.name}
                                                style={{
                                                    color: 'black',
                                                }}
                                                isSearchable
                                                isClearable
                                            />
                                        </div>

                                        <div className="col-4">
                                            <label className="form-label required">With</label>
                                            <Select
                                                options={providers}
                                                formatOptionLabel={customLabelProvider}
                                                onChange={(provider) => {
                                                    setValues({
                                                        ...values,
                                                        provider: provider | ''
                                                    })
                                                }}
                                                value={values.provider}
                                                getOptionLabel={(option) => option.full_name}
                                                styles={{
                                                    color: 'black'
                                                }}
                                                isSearchable
                                                isClearable
                                            />
                                        </div>

                                        <div className="col-4">
                                            <label className="form-label">Resources</label>
                                            <Select
                                            />
                                        </div>


                                        <div className="col-3 pt-4">
                                            <label className="form-label required">Visit Reason</label>
                                            <Select
                                            options={reasonsForVisit}
                                            formatOptionLabel={customLabelFacilities}
                                            onChange={(reason)=> setValues({
                                                ...values,
                                                visit_reason: reason || ''
                                            })}
                                            value={values.visit_reason}
                                            getOptionLabel={(option)=> option.name}
                                            style={{
                                                color: 'black'
                                            }} 
                                            isSearchable
                                            isClearable
                                            />
                                        </div>


                                        <div className="col-3 pt-4">
                                            <label className="form-label">On({appointmentDay})</label>
                                            <Field type='date' name='date' className='form-control' disabled={validate()}/>
                                        </div>

                                        <div className="col-3 pt-4">
                                            <label className="form-label">At</label>
                                            <Field type='time' name='time' className='form-control' disabled={validate()}/>
                                        </div>

                                        <div className="col-2 pt-4">
                                            <label className="form-label">Visit Length</label>
                                            <Field name='visit_length' type='number' className='form-control' disabled={validate()}/>
                                        </div>

                                        <div className="col-1 pt-4">
                                            <label className="form-label">Color</label>
                                            <Field name='color' type='color' className='form-control'/>
                                        </div>


                                        <div className="col-2 pt-4">
                                            <label className="form-label">Repeat</label>
                                            <Field name='repeat' type='number' className='form-control' disabled={validate()}/>
                                        </div>

                                        <div className="col-3 pt-4">
                                            <label className="form-label">Days Between Visits</label>
                                            <Field name='days_between_visits' type='number' className='form-control' disabled={validate()} />
                                        </div>

                                        <div className="col-4 pt-10 text-center">
                                            <label className="form-check-label pe-2">In Office</label>
                                            <input type="radio" name="in_office" className="form-check-input"/>
                                            <label className="form-check-label ps-4 pe-2">Virtual Visit</label>
                                            <input type="radio" name="in_office" className="form-check-input"/>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label">Note</label>
                                            <textarea value={values.comment} className="form-control" style={{height: '114px'}} onChange={(e)=>setValues({
                                                ...values,
                                                comment: e.target.value
                                            })}></textarea>
                                            <ErrorMessage>
                                                {({ msg }) => <div>{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        {console.log(values.patient)}
                                    </div>
                                </Form>
                            )}
                        </Formik>

                        {/* <h3>{`${appointmentDay} ${months[appointmentDate.getMonth()]} ${appointmentDate.getDate()} ${appointmentDate.getFullYear()}`}</h3>
                        <h4>{`${appointmentTime}`}</h4>
                        <h2>{appointmentProvider.full_name}</h2> */}
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