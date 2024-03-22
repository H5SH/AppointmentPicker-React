import { useContext } from 'react'
import Select from 'react-select'
import { setDataContext } from '../../../utilities/SettingContext'

function LocationList({locations}){

    const {appointmentLocation, setAppointmentLocation} = useContext(setDataContext)

    const formatLocationLabel = ({name})=> (
        <div>
            {name}
        </div>
    )
    
    return (
        <Select
        options={locations}
        formatOptionLabel={formatLocationLabel}
        onChange={(option)=> setAppointmentLocation(option)}
        value={appointmentLocation}
        getOptionValue={({name})=> name}
        />
    )
}

export default LocationList