[中文](https://github.com/hjdtl/dateCounter/blob/master/README.zh.md) | [English](https://github.com/hjdtl/dateCounter)

# datecounter
Format date for articles, news or comments

## Usage

### Parameter
datecounter receive an **object parameter** :

| key | default | describe | required |
| - | :-: | :- | :-: |
| date_ | none| Expected is Date Object or timestamp | yes |
| countDay_ | 7 | Countdown days | no |
| i18n_ | 'zh' | Language | no |

```javascript
import datecounter from 'datecounter'

datecounter({
    date_: new Date(), 
    countDay_: 7, 
    i18n_: 'en'})
```


### Example
```javascript
import datecounter from 'datecounter'
var now = new Date() // now : Thu Jul 05 2018 09:20:00
var fiveDaysAgo = now - (5 * 24 * 60 * 60 * 1000)
var eightDaysAgo = now - (8 * 24 * 60 * 60 * 1000)
var january = now - (180 * 24 * 60 * 60 * 1000)
var aYearsAgo = now - (365 * 24 * 60 * 60 * 1000)

/************************* Default usage *************************/
datecounter({date_: now})         // return : 0 minutes ago
datecounter({date_: fiveDaysAgo}) // return : 5 days 0 hours ago
datecounter({date_: january})     // return : January 6, 9:20
datecounter({date_: aYearsAgo})   // return : July 5, 2017 9:20

/************************* Countdown days *************************/
var countdown = 10
datecounter({date_: eightDaysAgo, countDay_: countdown}) // return : 8 days 0 hours ago
datecounter({date_: eightDaysAgo}) // return : June 27, 9:20

/************************* i18n *************************/
/* langList = ['zh', 'en', 'jp', 'ru', 'kr', 'fr', 'vi'] */
/* Now noly have ['zh', 'en', 'jp'] , other language are being developed */
datecounter({date_: fiveDaysAgo, i18n_: 'zh'}) // return : 5天0小时前
datecounter({date_: fiveDaysAgo, i18n_: 'en'}) // return : 5 days 0 hours ago
datecounter({date_: fiveDaysAgo, i18n_: 'jp'}) // return : 5天0時間前
```


---
If you are good at these languages ['en', 'jp', 'ru', 'kr', 'fr', 'vi'], maybe you can help me.😄