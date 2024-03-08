const days = [
    'Monday',
    'Teusday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]

const prefixDays = [
    'Mon',
    'Teu',
    'Wed',
    'Thur',
    'Fri',
    'Sat',
    'Sun'
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

function times(start, end) {
    const times = []
    for (let i = start; i <= end; i++) {
        times.push(i)
    }
    return times
}

function skips(gap){
    const gaps = [0]
    let min = 0
    for(let i = 0; i < (60/gap - 1); i++){
        gaps.push(min += gap)
    }
    return gaps
}
export { days, months, times, prefixDays, skips }