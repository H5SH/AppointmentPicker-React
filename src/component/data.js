const days = [
    'Monday',
    'Teusday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]

const prefixDays =[
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

const times = []
for (let i = 1; i < 13; i++) {
    times.push(i)
}

export { days, months, times, prefixDays }