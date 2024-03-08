import { setDataContext } from "../../../utilities/SettingContext"
import { useContext, useEffect } from "react"

function ListOfProviders({ providers }) {

    const {appointmentProvider ,setAppointmentProvider} = useContext(setDataContext)
    console.log(providers, 'hh')
    
    useEffect(()=> {
        setAppointmentProvider(providers[0])
    },[])

    return (
        <div className="overflow-scroll text-center mt-2 h-150px bg-white">
            <h4>Providers</h4>
            {providers?.map((provider, index) => (
                <div>
                    <input className={`border-0 p-2 ${appointmentProvider === provider ? 'bg-light-dark': 'bg-white'}`} 
                    type="button"
                    onClick={()=> setAppointmentProvider(provider)}
                    value={provider.full_name}
                    />
                </div>
            ))}

        </div>
    )
}

export default ListOfProviders