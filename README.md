# datecounter
Format date for article or news

## Usage

### parameter
datecounter receive an **object parameter** :

| key | default | describe | required |
| - | :-: | :- | :-: |
| date_ | none| Expected is Date Object or timestamp | yes |
| countDay_ | 7 | Countdown days | no |
| i18n_ | 'zh' | Language | no |

```javascript
import datecounter from 'datecounter'

datecounter({date_: new Date(), countDay_: 7, i18n_: 'en'})
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
datecounter({date_: now})         // return : 0分钟之前 (0 minutes ago)
datecounter({date_: fiveDaysAgo}) // return : 5天0小时前 (5 days 0 hours ago)
datecounter({date_: january})     // return : 1月6日 9:20 (January 6, 9:20)
datecounter({date_: aYearsAgo})   // return : 2017年7月5日 9:20 (July 5, 2017 9:20)

/************************* Countdown days *************************/
var countdown = 10
datecounter({date_: eightDaysAgo, countDay_: countdown}) // return : 8天0小时之前 (8 days 0 hours ago)
datecounter({date_: eightDaysAgo}) // return : 6月27日 9:20 (June 27, 9:20)

/************************* i18n *************************/
/* langList = ['zh', 'en', 'jp', 'ru', 'kr', 'fr', 'vi'] */
/* Now noly have 'zh',other language are being developed */
datecounter({date_: fiveDaysAgo, i18n_: 'zh'}) // return : 5天0小时前
datecounter({date_: fiveDaysAgo, i18n_: 'en'}) // return : 5 days 0 hours ago
```


---
If you are good at these languages ['en', 'jp', 'ru', 'kr', 'fr', 'vi'], maybe you can help me.😄