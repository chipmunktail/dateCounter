[中文](https://github.com/hjdtl/dateCounter/blob/master/README.zh.md) | [English](https://github.com/hjdtl/dateCounter)

# Datecounter
一个改变时间格式的工具类库

为文章，新闻或评论增加格式化的时间

## 使用

### 参数
datecounter 接收一个 **对象参数** , 返回一个 **counter** :

| 参数 | 默认 | 描述 | 必须 |
| - | :-: | :- | :-: |
| date | none| 接收时间对象或时间戳 | 是 |
| countDay | 7 | 倒计天数 | 否 |
| i18n | 'zh' | 语言 | 否 |
| raw | none | 原始数据 | 否 |


### 基础
```javascript
import Datecounter from 'Datecounter'
const counter=new Datecounter({countDay: 10, i18n: 'en'})
counter(new Date())
```

### Vue
```javascript
// 结合Vue使用
import Vue from 'vue'
import {vDatecounter} from 'Datecounter'
Vue.use(vDatecounter, {countDay: 10, i18n: 'en'})

/************************* 全局方法 *************************/
this.$datecounter(new Date())
/************************* 局部方法 *************************/
const counter=new this.$Datecounter({countDay: 10, i18n: 'en'})
counter(new Date)
```


### 用例
```javascript
import Datecounter from 'Datecounter'
var now = new Date() // now : 2018年7月05日09:20:00
var twoMinutesAgo = now - (2 * 60 * 1000)
var twoHoursAgo = now - (2 * 60 * 60 * 1000)
var fiveDaysAgo = now - (5 * 24 * 60 * 60 * 1000)
var eightDaysAgo = now - (8 * 24 * 60 * 60 * 1000)
var january = now - (180 * 24 * 60 * 60 * 1000)
var aYearsAgo = now - (365 * 24 * 60 * 60 * 1000)

/************************* 默认用法 *************************/
const counter1=new Datecounter()
counter1(now)           // return : 0分钟前 
counter1(fiveDaysAgo)   // return : 5天0小时前
counter1(january)       // return : 1月6日 9:20
counter1(aYearsAgo)     // return : 2017年7月5日 9:20

/************************* 使用倒计天数 *************************/
const counter2=new Datecounter({countDay: 10})
const counter3=new Datecounter({countDay: 7})
counter2(eightDaysAgo)  // return : 8天0小时前
counter3(eightDaysAgo)  // return : 6月27日 9:20

/************************* 国际化 *************************/
/* langList = ['zh', 'en', 'jp', 'ru', 'kr', 'fr', 'vi'] */
/* 现在只有 ['zh', 'en', 'jp'] , 其他语言将会加上 */
const counter_zh=new Datecounter({i18n: 'zh'})
const counter_en=new Datecounter({i18n: 'en'})
const counter_jp=new Datecounter({i18n: 'jp'})
counter_zh(fiveDaysAgo) // return : 5天0小时前
counter_en(fiveDaysAgo) // return : 5 days 0 hours ago
counter_jp(fiveDaysAgo) // return : 5天0時間前
```

### 获取原始数据
```javascript
/* 如果你需要原始数据 */
/* 一共有四种数据类型 ['history', 'countDown_day', 'countDown_hour', 'countDown_minute'] */
const count_raw=new Datecounter({raw: true})
count_raw(twoMinutesAgo)// return : {type: "countDown_minute", minute: 2}
count_raw(twoHoursAgo)  // return : {type: "countDown_hour", hour: "2", minute: "0"}
count_raw(fiveDaysAgo)  // return : {type: "countDown_day", day: "5", hour: "0"}
count_raw(january)      // return : {type: "history", year: null, month: 1, date: 6, hour: 9, minute: 20 }
count_raw(aYearsAgo)    // return : {type: "history", year: 2017, month: 7, date: 6, hour: 9, minute: 20 }
```


---
如果你擅长这些语言 ['en', 'jp', 'ru', 'kr', 'fr', 'vi']，也许你能帮助我。😄