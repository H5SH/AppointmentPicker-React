import * as Yup from 'yup'

export const initialValues = {
    facility_id: '',
    provider_id: '',
    appointment_date: '',
    appointment_time: '',
    visit_reason: '',
    visit_length: '',
    color: '#000000',
    comment: '',
    status: true,
    patient_id: '',
}

export const validation = Yup.object({
    facility_id: Yup.object().required(),
    provider_id: Yup.object().required(),
    appointment_date: Yup.string().required(),
    appointment_time: Yup.string().required(),
    visit_reason: Yup.object().required(),
    visit_length: Yup.string().required(),
    color: Yup.string(),
    comment: Yup.string(),
    status: Yup.boolean().required(),
    patient_id: Yup.number()
})

export const reasonsForVisit = [
    {'name': 'Anxiety', 'id': 1},
    {'name': 'Depression', 'id': 2},
    {'name': 'Established Patient', 'id': 3},
    {'name': 'Family Psychology', 'id': 4},
    {'name': 'Follow Up', 'id': 5},
    {'name': 'New Patient', 'id': 6},
    {'name': 'Physical Exam', 'id': 7},
    {'name': 'Psychological Exam', 'id': 8}
]