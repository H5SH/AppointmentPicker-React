import { useContext } from 'react'
import Select from 'react-select'
import { appointmentContext } from '../../context'

function LocationList({locations}){

    const {appointmentLocation, setAppointmentLocation} = useContext(appointmentContext)

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