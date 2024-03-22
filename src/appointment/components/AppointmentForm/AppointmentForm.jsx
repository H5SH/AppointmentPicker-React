import { useContext, useEffect, useState } from "react"
import { setDataContext } from "../../../../utilities/SettingContext"
import { days, months } from "../data"
import SubmitButton, { GotoBackButton } from "../../../../utilities/SubmitButton"
import { Field, Formik, Form, ErrorMessage } from "formik"
import { initialValues, reasonsForVisit, validation } from "../__request/initialValuesAndValidation"
import { addAppointmentReq } from "../__request/appointmentRequest"
import Select from 'react-select'
import { getFacilitiesDataReq } from "../../../organization/components/facilities/__request/RequestFacility"
import { getProviderReq } from "../../../providers/__request/RequestProvider"
import { getPatientDataReq } from "../../../patients/__request/RequestPatient"
import { pad } from "../../../../utilities/Helper"
import { DrawerHeader } from "../../../../utilities/DrawerHeader"
import { useDispatch, useSelector } from "react-redux"
import { editAppointmentIdAction } from "../../../../redux/action"


function AppointmentForm() {
    const { appointmentDate, appointmentTime, appointmentDay, appointmentProvider, appointmentLocation} = useContext(setDataContext)
    const appointmentId = useSelector((state)=> state.appointmentIdEditReducer)
    const dispatch = useDispatch()
    const [hours, min] = appointmentTime.time.split(':')
    const [facilities, setFacilities] = useState([])
    const [providers, setProviders] = useState([])
    const [patients, setPatients] = useState([])
    const [appointment, setAppointment] = useState(null)
    const [response, setResponse] = useState('')
    const [patientFields, setPatientFields] = useState({
        patient: '',
        first_name: '',
        last_name: '',
        dob: '',
        phone: '',
        insurance_name: '',
        phone: '',
        health_paln_Eligibility_name: ''
    })

    async function getPatientData() {
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

    async function getAppointment(){
        setAppointment(1)
    }

    async function addAppointment(values) {
        if(!patientFields.patient){
            setResponse('Patient is Required')
            return false
        }
        values.facility_id = values.facility_id.id
        values.provider_id = values.provider_id.id
        values.patient_id = patientFields.patient.id
        console.log('addAppointment')
    }

    function validate() {
        return true
    }

    const customLabelFacilities = ({ name }) => (
        <div style={{ color: "black", }}>
            {name}
        </div>
    )

    const customLabelProvider = ({ full_name }) => (
        <div style={{ color: "black", }}>
            {full_name}
        </div>
    )

    useEffect(() => {
        getFacilitiesData()
        getProvider()
        getPatientData()
    }, [])

    useEffect(()=> {
        if(appointmentId > 0){
            getAppointment()
        }
    },[appointmentId])


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
                <DrawerHeader
                title={appointmentId ? 'Edit Appointment':'New Appointment'}
                drawerid={'appointment'} 
                />
                <Formik
                    initialValues={{
                        ...initialValues,
                        facility_id: appointmentLocation,
                        provider_id: appointmentProvider,
                        appointment_date: `${appointmentDate.getFullYear()}-${pad(appointmentDate.getMonth() + 1)}-${pad(appointmentDate.getDate())}`,
                        appointment_time: `${pad(hours)}:${min}`,
                        visit_length: appointmentTime.skip,
                    }}
                    validationSchema={validation}
                    onSubmit={(values) => {
                        addAppointment(values)
                    }}
                    enableReinitialize
                >
                    {({ handleSubmit, setValues, values }) => (
                        <Form>
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
                                    <div className="row">
                                        {/* <h2 className="pb-4">Patient Information</h2> */}
                                        <div className="col-4">
                                            <label className="form-label">Patient</label>
                                            <Select
                                                options={patients}
                                                formatOptionLabel={customLabelProvider}
                                                onChange={(patient) => patient ?
                                                    setPatientFields({
                                                        patient: patient,
                                                        first_name: patient.first_name,
                                                        last_name: patient.last_name,
                                                        dob: patient.dob,
                                                        insurance_name: patient.insurance_name,
                                                        phone: patient.hphone
                                                    }):setPatientFields({
                                                            patient: '',
                                                            first_name: '',
                                                            last_name: '',
                                                            dob: '',
                                                            insurance_name: '',
                                                            phone: ''
                                                        })
                                                    }
                                                value={patientFields.patient}
                                                getOptionValue={(option) => option.full_name}
                                                isSearchable
                                                isClearable
                                            />
                                            <dic className='text-danger'>{response}</dic>
                                        </div>
                                        <div className="col-3">
                                            <label className="form-label">First Name</label>
                                            <input type='text' value={patientFields.first_name} className='form-control' disabled={validate()} />
                                        </div>
                                        <div className="col-3">
                                            <label className="form-label">Last Name</label>
                                            <input type='text' value={patientFields.last_name} className="form-control" disabled={validate()} />
                                        </div>
                                        <div className="col-3 pt-4">
                                            <label className="form-label">Date Of Birth</label>
                                            <input type='text' value={patientFields.dob} className="form-control" disabled={validate()} />
                                        </div>
                                        <div className="col-3 pt-4">
                                            <label className="form-label">Phone</label>
                                            <input type='text' value={patientFields.phone} className="form-control" disabled={validate()} />
                                        </div>
                                        <div className="col-3 pt-4">
                                            <label className="form-label">Health Plan Eligibility Name</label>
                                            <input type='text' value={patientFields.health_paln_Eligibility_name} className="form-control" disabled={validate()} />
                                        </div>
                                        <div className="col-3 pt-4">
                                            <label className="form-label">Insurance Name</label>
                                            <input type='text' value={patientFields.insurance_name} className="form-control" disabled={validate()} />
                                        </div>
                                    </div>
                                    <div className="row pt-4">
                                        {/* <h2 className="pt-4 pb-4">Appointment Information</h2> */}
                                        <div className="col-4">
                                            <label className="form-label required">Office Name</label>
                                            <Select
                                                options={facilities}
                                                formatOptionLabel={customLabelFacilities}
                                                onChange={(facility) => {
                                                    setValues({
                                                        ...values,
                                                        facility_id: facility || '',
                                                    })
                                                }}
                                                value={values.facility_id}
                                                getOptionValue={(option) => option.name}
                                                style={{
                                                    color: 'black',
                                                }}
                                                isSearchable
                                                isClearable
                                            />
                                            <ErrorMessage name='facility_id'>
                                                {msg => <div className="text-danger">{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        <div className="col-4">
                                            <label className="form-label required">With</label>
                                            <Select
                                                options={providers}
                                                formatOptionLabel={customLabelProvider}
                                                onChange={(provider) => {
                                                    setValues({
                                                        ...values,
                                                        provider_id: provider || ''
                                                    })
                                                }}
                                                value={values.provider_id}
                                                getOptionValue={(option) => option.full_name}
                                                styles={{
                                                    color: 'black'
                                                }}
                                                isSearchable
                                                isClearable
                                            />
                                            <ErrorMessage name='provider_id'>
                                                {msg => <div className="text-danger">{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        <div className="col-3">
                                            <label className="form-label required">Visit Reason</label>
                                            <Select
                                                options={reasonsForVisit}
                                                formatOptionLabel={customLabelFacilities}
                                                onChange={(reason) => setValues({
                                                    ...values,
                                                    visit_reason: reason || ''
                                                })}
                                                value={values.visit_reason}
                                                getOptionValue={(option) => option.name}
                                                style={{
                                                    color: 'black'
                                                }}
                                                isSearchable
                                                isClearable
                                            />
                                            <ErrorMessage name="visit_reason">
                                                {msg => <div className="text-danger">{msg}</div>}
                                            </ErrorMessage>
                                        </div>


                                        <div className="col-3 pt-4">
                                            <label className="form-label">On({appointmentDay})</label>
                                            <Field type='date' name='appointment_date' className='form-control' />
                                            <ErrorMessage name="appointment_date">
                                                {msg=> <div className="text-danger">{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        <div className="col-3 pt-4">
                                            <label className="form-label">At</label>
                                            <Field type='time' name='appointment_time' className='form-control' />
                                            <ErrorMessage name="appointment_time">
                                                {msg=> <div className="text-danger">{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        <div className="col-3 pt-4">
                                            <label className="form-label">Visit Length</label>
                                            <Field name='visit_length' type='number' className='form-control' />
                                            <ErrorMessage name='visit_length'>
                                                {msg=> <div className="text-danger">{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        <div className="col-1 pt-4 text-center">
                                            <label className="form-label">Color</label>
                                            <Field name='color' type='color' className='form-control m-2 p-2' />
                                            <ErrorMessage name="color">
                                                {msg => <div className="text-danger">{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        <div className="col-3 ms-4 pt-4 form-check form-switch">
                                            <Field className="form-check-input" type="checkbox" name="status" role="switch"/>
                                            <label className="form-check-label">Status</label>
                                        </div>

                                        {/* <div className="col-4 pt-10 text-center">
                                            <label className="form-check-label pe-2">In Office</label>
                                            <input type="radio" name="in_office" className="form-check-input" />
                                            <label className="form-check-label ps-4 pe-2">Virtual Visit</label>
                                            <input type="radio" name="in_office" className="form-check-input" />
                                        </div> */}

                                        <div className="col-12">
                                            <label className="form-label">Note</label>
                                            <textarea value={values.comment} className="form-control" style={{ height: '114px' }} onChange={(e) => setValues({
                                                ...values,
                                                comment: e.target.value
                                            })}></textarea>
                                            <ErrorMessage name='comment'>
                                                {msg  => <div className="text-danger">{msg}</div>}
                                            </ErrorMessage>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="p-8 py-5 d-flex justify-content-between bottom-0"
                                id='kt_appointment_footer'
                            >
                                <SubmitButton
                                    title='Book'
                                    callback_event={handleSubmit}
                                    class_name='btn btn-primary'
                                />
                                <GotoBackButton id={'kt_appointment_close'} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    )
}

export default AppointmentForm