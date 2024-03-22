import { setDataContext } from "../../../utilities/SettingContext"
import { useContext, useEffect } from "react"
import Select from 'react-select'

function ProvidersList({ providers }) {

    const {appointmentProvider ,setAppointmentProvider} = useContext(setDataContext)

    const formateProviderLabel= ({full_name})=> (
        <div>
            {full_name}
        </div>
    )
    
    useEffect(()=> {
        setAppointmentProvider(providers[0])
    },[])

    return (
        <Select
        options={providers}
        formatOptionLabel={formateProviderLabel}
        onChange={(provider)=> setAppointmentProvider(provider)}
        value={appointmentProvider}
        getOptionValue={(option)=> option.full_name}
        isSearchable
        />
    )
}

export default ProvidersList