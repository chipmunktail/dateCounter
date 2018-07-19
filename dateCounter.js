const formatMinute = minute => {
    return minute < 10 ? ('0' + minute) : minute
}
const toI18n = (arg) => {
    const { type, lang } = arg
    // const langList = ['zh', 'en', 'jp', 'ru', 'kr', 'fr', 'vi']
    const language = {
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
            month_: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            date_: '',
            days_: ['day', 'days'],
            hours_: ['hour', 'hours'],
            hoursAgo_: ['hour ago', 'hours ago'],
            minutesAgo_: ['minute ago', 'minutes ago']
        },
        jp: {
            year_: '年',
            month_: '月',
            date_: '日 ',
            days_: '日',        // 5天前 5日前
            hours_: '時間',
            hoursAgo_: '時間前',
            minutesAgo_: '分前'
        }
    }[lang]
    let zh = '', en = '', jp = ''
    if (type === 'history') {
        const { year, month, date, hour, minute } = arg
        const { year_, month_, date_ } = language
        zh = (year ? year + year_ : '') + month + month_ + date + date_ + ' ' + hour + ':' + formatMinute(minute)
        en = `${month_[month - 1]} ${date}, ${year ? year + ' ' : ''}${hour}:${formatMinute(minute)}`
        jp = (year ? year + year_ : '') + month + month_ + date + date_ + ' ' + hour + ':' + formatMinute(minute)
    }
    if (type === 'countDown_day') {
        const { day, hour } = arg
        const { days_, hoursAgo_ } = language
        zh = day + days_ + hour + hoursAgo_
        en = `${day} ${day === 1 ? days_[0] : days_[1]} ${hour} ${hour === 1 ? hoursAgo_[0] : hoursAgo_[1]}`
        jp = day + days_ + hour + hoursAgo_
    }
    if (type === 'countDown_minute') {
        const { minute } = arg
        const { minutesAgo_ } = language
        zh = minute + minutesAgo_
        en = `${minute} ${minute === 1 ? minutesAgo_[0] : minutesAgo_[1]}`
        jp = minute + minutesAgo_
    }
    if (type === 'countDown_hour') {
        const { hour, minute } = arg
        const { hours_, minutesAgo_ } = language
        zh = hour + hours_ + minute + minutesAgo_
        en = `${hour} ${hour === 1 ? hours_[0] : hours_[1]} ${minute} ${minute === 1 ? minutesAgo_[0] : minutesAgo_[1]}`
        jp = hour + hours_ + minute + minutesAgo_
    }

    switch (lang) {
        case 'zh': return zh
        case 'en': return en
        case 'jp': return jp
        default: return zh
    }
}

function Datecounter(arg) {
    if (!(arg instanceof Object)) {
        arg = {countDay:7,i18n:'zh'}
    }
    const { countDay, i18n, raw } = arg
    const countDay_ = countDay ? countDay : 7
    const i18n_ = i18n ? i18n : 'zh'
    const raw_ = Boolean(raw)
    return date_ => {
        const now = Date.now() // Current timestamp
        const type = ['history', 'countDown_day', 'countDown_hour', 'countDown_minute']

        let time = new Date(date_)
        let year = time.getFullYear() === new Date().getFullYear() ? null : time.getFullYear()
        let month = time.getMonth() + 1
        let date = time.getDate()
        let hour = time.getHours()
        let minute = time.getMinutes()
        let result_ = { type: type[0], year: year, month: month, date: date, hour: hour, minute: minute }

        const timeDiff = now - time
        const minuteMs = 60 * 1000        // A minute of milliseconds
        const hourMs = 60 * minuteMs      // A hour   of milliseconds
        const dayMs = 24 * hourMs         // A day    of milliseconds
        if (timeDiff < dayMs * countDay_) {
            if (timeDiff / dayMs > 1) {     // days ago
                let day_ = timeDiff / dayMs
                let hour_ = (timeDiff % dayMs) / hourMs
                result_ = { type: type[1], day: day_.toFixed(), hour: hour_.toFixed() }
            } else {
                if (timeDiff / hourMs < 1) {    // minutes ago
                    let minute_ = Math.ceil(timeDiff / minuteMs)
                    result_ = { type: type[3], minute: minute_ }
                } else {                        // hours ago
                    let minute_ = (timeDiff % hourMs) / minuteMs
                    let hour_ = (timeDiff / hourMs).toFixed()
                    result_ = { type: type[2], hour: hour_, minute: minute_.toFixed() }
                }
            }
        }
        if (!raw_) {
            result_.lang = i18n_
            result_ = toI18n(result_)
        }
        return result_
    }
}
export default Datecounter