import { ApiFetchReq } from "../../../../utilities/api/ApiRequest";

export async function addAppointmentReq(values){
    await ApiFetchReq('POST', `${process.env.REACT_APP_API_URL}`, values)
}