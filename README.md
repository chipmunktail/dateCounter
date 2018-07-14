[中文](https://github.com/hjdtl/dateCounter/blob/master/README.zh.md) | [English](https://github.com/hjdtl/dateCounter)

# Datecounter
Format date for articles, news or comments

## Usage

### Parameter
Datecounter receive an **object parameter** , and return a **counter** :

| key | default | describe | required |
| - | :-: | :- | :-: |
| date | none| Expected is Date Object or timestamp | yes |
| countDay | 7 | Countdown days | no |
| i18n | 'zh' | Language | no |
| raw | none | Raw data | no |

```javascript
import Datecounter from 'Datecounter'
const counter=new Datecounter({countDay: 10, i18n: 'en'})
counter(new Date())
```


### Example
```javascript
import Datecounter from 'Datecounter'
var now = new Date() // now : Thu Jul 05 2018 09:20:00
var twoMinutesAgo = now - (2 * 60 * 1000)
var twoHoursAgo = now - (2 * 60 * 60 * 1000)
var fiveDaysAgo = now - (5 * 24 * 60 * 60 * 1000)
var eightDaysAgo = now - (8 * 24 * 60 * 60 * 1000)
var january = now - (180 * 24 * 60 * 60 * 1000)
var aYearsAgo = now - (365 * 24 * 60 * 60 * 1000)

/************************* Default usage *************************/
const counter1=new Datecounter({i18n: 'en'})
counter1(now)           // return : 0 minutes ago
counter1(fiveDaysAgo)   // return : 5 days 0 hours ago
counter1(january)       // return : January 6, 9:20
counter1(aYearsAgo)     // return : July 5, 2017 9:20

/************************* Countdown days *************************/
const counter2=new Datecounter({countDay: 10, i18n: 'en'})
const counter3=new Datecounter({countDay: 7, i18n: 'en'})
counter2(eightDaysAgo)  // return : 8 days 0 hours ago
counter3(eightDaysAgo)  // return : June 27, 9:20

/************************* i18n *************************/
/* langList = ['zh', 'en', 'jp', 'ru', 'kr', 'fr', 'vi'] */
/* Now noly have ['zh', 'en', 'jp'] , other language are being developed */
const counter_zh=new Datecounter({i18n: 'zh'})
const counter_en=new Datecounter({i18n: 'en'})
const counter_jp=new Datecounter({i18n: 'jp'})
counter_zh(fiveDaysAgo) // return : 5天0小时前
counter_en(fiveDaysAgo) // return : 5 days 0 hours ago
counter_jp(fiveDaysAgo) // return : 5天0時間前
```

### Get raw data
```javascript
/* If you need raw data */
/* There are four kinds of data types in all ['history', 'countDown_day', 'countDown_hour', 'countDown_minute'] */
const count_raw=new Datecounter({raw: true})
count_raw(twoMinutesAgo)// return : {type: "countDown_minute", minute: 2}
count_raw(twoHoursAgo)  // return : {type: "countDown_hour", hour: "2", minute: "0"}
count_raw(fiveDaysAgo)  // return : {type: "countDown_day", day: "5", hour: "0"}
count_raw(january)      // return : {type: "history", year: null, month: 1, date: 6, hour: 9, minute: 20 }
count_raw(aYearsAgo)    // return : {type: "history", year: 2017, month: 7, date: 6, hour: 9, minute: 20 }
```


---
If you are good at these languages ['en', 'jp', 'ru', 'kr', 'fr', 'vi'], maybe you can help me.😄