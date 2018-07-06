const formatMinute = minute => {
    return minute < 10 ? ('0' + minute) : minute
}
function template (){
    const zh = {
        t1: (year ? year + year_ : '') + month + month_ + date + date_ +' '+ hour + ':' + formatMinute(minute),
        t2: day + days_ + hour + hoursAgo_,
        t3: minute + minutesAgo_,
        t4: hour + hours_ + minute + minutesAgo_,
    }
    const en = {
        t1: `${month_} ${date}, ${year ? year : ''} ${hour}:${formatMinute(minute)}`,
        t2: `${day} ${day === 1 ? days_[0] : days_[1]} ${hour} ${hour === 1 ? hoursAgo_[0] : hoursAgo_[1]}`,
        t3: `${minute} ${minute === 1 ? minutesAgo_[0] : minutesAgo_[1]}`,
        t4: `${hour} ${hour === 1 ? hours_[0] : hours_[1]} ${minute} ${minute === 1 ? minutesAgo_[0] : minutesAgo_[1]}`
    } 
}
const i18n = (arg) => {
    const { type, lang } = arg
    // todo i18n
    const langList = ['zh', 'en', 'jp', 'ru', 'kr', 'fr', 'vi']
    const language = ({
        zh: {
            year_: '年',
            month_: '月',
            date_: '日 ',
            days_: '天',
            hours_: '小时',
            hoursAgo_: '小时前',
            minutesAgo_: '分钟前'
        },
        en: {
            year_: '',
            month_: ['Jan', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            date_: '',
            days_: ['day', 'days'],
            hours_: ['hour', 'hours'],
            hoursAgo_: ['hour ago', 'hours ago'],
            minutesAgo_: ['minute ago', 'minutes ago'],
        }
    })[lang]
    let result = ''
    if (type === 4) {
        const { year, month, date, hour, minute } = arg
        const { year_, month_, date_ } = language
        result = (year ? year + year_ : '') + month + month_ + date + date_ + hour + ':' + minute
        let zh = (year ? year + year_ : '') + month + month_ + date + date_ + ' ' + hour + ':' + formatMinute(minute),
    }
    if (type === 3) {
        const { day, hour } = arg
        const { days_, hoursAgo_ } = language
        result = day + days_ + hour + hoursAgo_
    }
    if (type === 2) {
        const { minute } = arg
        const { minutesAgo_ } = language
        result = minute + minutesAgo_
    }
    if (type === 1) {
        const { hour, minute } = arg
        const { hours_, minutesAgo_ } = language
        result = hour + hours_ + minute + minutesAgo_
    }
    return result
}

export const datecounter = (arg) => {
    const { date_, countDay_, i18n_ } = arg

    let countDay = countDay_ ? countDay_ : 7 // Countdown days
    const now = Date.now() // Current timestamp

    let time = new Date(date_)
    let year = time.getFullYear() === new Date().getFullYear() ? null : time.getFullYear()
    let month = time.getMonth() + 1
    let date = time.getDate()
    let hour = time.getHours()
    let minute = time.getMinutes()
    // let second = time.getSeconds()
    // let result = (year ? year + '年' : '') + month + '月' + date + '日 ' + hour + ':' + minute
    let result_ = { type: 4, year: year, month: month, date: date, hour: hour, minute: minute }
    /* + ':' + second */

    const timeDiff = now - time
    const minuteMs = 60 * 1000        // A minute of milliseconds
    const hourMs = 60 * minuteMs      // A hour   of milliseconds
    const dayMs = 24 * hourMs         // A day    of milliseconds
    if (timeDiff < dayMs * countDay) {
        if (timeDiff / dayMs > 1) {     // days ago
            let day_ = timeDiff / dayMs
            let hour_ = (timeDiff % dayMs) / hourMs
            // result = `${day_.toFixed()}天${hour_.toFixed()}小时前`
            result_ = { type: 3, day: day_, hour: hour_ }
        } else {
            if (timeDiff / hourMs < 1) {    // minutes ago
                let minute_ = Math.ceil(timeDiff / minuteMs)
                // result = `${minute_}分钟前`
                result_ = { type: 2, minute: minute_ }
            } else {                        // hours ago
                let minute_ = (timeDiff % hourMs) / minuteMs
                let hour_ = (timeDiff / hourMs).toFixed()
                // result = `${hour_}小时 ${minute_.toFixed()}分钟前`
                result_ = { type: 1, hour: hour_, minute: minute_ }
            }
        }
    }
    // return result
    result_.lang = i18n_ ? i18n_ : 'zh'
    return i18n(result_)
}