[中文](https://github.com/hjdtl/dateCounter/blob/master/README.zh.md) | [English](https://github.com/hjdtl/dateCounter)

# datecounter
为文章，新闻或评论增加格式化的时间

## 使用

### 参数
datecounter 接收一个 **对象参数** :

| 参数 | 默认 | 描述 | 必须 |
| - | :-: | :- | :-: |
| date_ | none| 接收时间对象或时间戳 | 是 |
| countDay_ | 7 | 倒计天数 | 否 |
| i18n_ | 'zh' | 语言 | 否 |

```javascript
import datecounter from 'datecounter'

datecounter({
    date_: new Date(), 
    countDay_: 7, 
    i18n_: 'en'})
```


### 用例
```javascript
import datecounter from 'datecounter'
var now = new Date() // now : 2018年7月05日09:20:00
var fiveDaysAgo = now - (5 * 24 * 60 * 60 * 1000)
var eightDaysAgo = now - (8 * 24 * 60 * 60 * 1000)
var january = now - (180 * 24 * 60 * 60 * 1000)
var aYearsAgo = now - (365 * 24 * 60 * 60 * 1000)

/************************* 默认用法 *************************/
datecounter({date_: now})         // return : 0分钟前 
datecounter({date_: fiveDaysAgo}) // return : 5天0小时前
datecounter({date_: january})     // return : 1月6日 9:20
datecounter({date_: aYearsAgo})   // return : 2017年7月5日 9:20

/************************* 使用倒计天数 *************************/
var countdown = 10
datecounter({date_: eightDaysAgo, countDay_: countdown}) // return : 8天0小时前
datecounter({date_: eightDaysAgo}) // return : 6月27日 9:20

/************************* 国际化 *************************/
/* langList = ['zh', 'en', 'jp', 'ru', 'kr', 'fr', 'vi'] */
/* 现在只有 ['zh', 'en', 'jp'] , 其他语言将会加上 */
datecounter({date_: fiveDaysAgo, i18n_: 'zh'}) // return : 5天0小时前
datecounter({date_: fiveDaysAgo, i18n_: 'en'}) // return : 5 days 0 hours ago
datecounter({date_: fiveDaysAgo, i18n_: 'jp'}) // return : 5天0時間前
```


---
如果你擅长这些语言 ['en', 'jp', 'ru', 'kr', 'fr', 'vi']，也许你能帮助我。😄