const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

const prefixDays = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thur',
    'Fri',
    'Sat',
]

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const prefixMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]

function times(start, end) {
    const times = []
    for (let i = start; i <= end; i++) {
        times.push(i)
    }
    return times
}

function skips(gap) {
    const gaps = [0]
    let min = 0
    for (let i = 0; i < (60 / gap - 1); i++) {
        gaps.push(min += gap)
    }
    return gaps
}

function getFirstAndLastDate(month) {
    const selected = new Date(month.getTime())
    const firstDay = new Date(selected.setDate(selected.getDate() - selected.getDay() + 1))
    const lastDay = new Date(selected.setDate(selected.getDate() + 6))

    return { 'first': firstDay, 'last': lastDay }

}

const providerAppointment = {
    id: 1,
    name: 'JOHN M AARON',
    appointments: [
        { from: '12:15', to: '12:30' },
        { from: '15:15', to: '15:30' },
    ]
}


function timeComparer(appointmentFrom, appointmentTo, time){
    // 12:00 <= 12:30 && 12:15 >= 12:30
    if(appointmentFrom <= time && appointmentTo >= time)
        return true
    return false
}

export { days, months, times, prefixDays, skips, getFirstAndLastDate, prefixMonths, providerAppointment, timeComparer }

