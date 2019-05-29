// pages/add/add.js
import util from '../../utils/util'
var weekmap = new Map()
var monthmap = new Map()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titlevalue: '',
    contentvalue: '',
    due: [],
    def_Date: [],
    weeklist: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    everymonth: [],
    weekls_cn: [{
        val: "周日",
        flag: false
      },
      {
        val: "周一",
        flag: false
      },
      {
        val: "周二",
        flag: false
      },
      {
        val: "周三",
        flag: false

      },
      {
        val: "周四",
        flag: false
      },
      {
        val: "周五",
        flag: false
      },
      {
        val: "周六",
        flag: false
      }

    ],
    CalendarOnShow: false,
    WeekOnShow: false,
    TodayOnShow: false,
    TomorrowOnShow: false,
    EdayOnShow: false,
    EmonthOnShow: false,
    toastHidden: true,
    cur_year: 0
  },
  onReady: function() {

    let everymonth = []

    for (let i = 1; i <= 31; i++) {
      everymonth.push({
        val: i,
        flag: false
      })
    }
    everymonth.push({
      val: '月末',
      flag: false
    })
    this.setData({
      everymonth

    })

  },
  onLoad: function() {
    var that = this;
    var cur_year = new Date().getFullYear();
    var cur_month = new Date().getMonth();
    that.calendar(cur_year, cur_month);
    that.setData({
      cur_month,
      cur_year
    })

  },



  /*标题*/
  Tinput: function(e) {
    this.setData({
      titlevalue: e.detail.value
    })
  },
  /*内容*/
  Cinput: function(e) {
    this.setData({
      contentvalue: e.detail.value
    })
  },

  /*日历*/
  calendar: function(year, month) {
    let curMonthDay = parseInt(new Date(year, month + 1, 0).getDate()),
      startWeek = parseInt(new Date(year, month, 1).getDay()),
      lastMonthday = parseInt(new Date(year, month, 0).getDate()),
      totalDay = (curMonthDay + startWeek) % 7 == 0 ? (curMonthDay + startWeek) : (curMonthDay + startWeek) + 7 - (curMonthDay + startWeek) % 7,
      lastMonthlist = [],
      curMonthlist = [],
      nextMonthlist = []
    console.log(month, year)
    for (let i = 0; i < totalDay; i++) {
      if (i < startWeek) {
        lastMonthlist.push(lastMonthday - startWeek + 1 + i)
      } else if (i < (startWeek + curMonthDay)) {
        curMonthlist.push(i + 1 - startWeek)
      } else {
        nextMonthlist.push(i + 1 - (startWeek + curMonthDay))
      }
    }
    this.setData({
      lastMonthlist,
      curMonthlist,
      nextMonthlist
    })
  },
  /*切换月份*/
  month_click: function(e) {
    let cur_month = this.data.cur_month,
      cur_year = this.data.cur_year,
      value = parseInt(e.currentTarget.dataset.value),
      newmonth = cur_month + value;
    if (newmonth < 0) {
      newmonth = 11
    } else if (newmonth > 11) {
      newmonth = 0
    }
    this.calendar(this.data.cur_year, newmonth);
    this.setData({
      cur_month: newmonth
    })

  },
  /*切换年份*/
  year_click: function(e) {
    let cur_month = this.data.cur_month,
      cur_year = this.data.cur_year,
      value = parseInt(e.currentTarget.dataset.value),
      newyear = cur_year + value;
    this.calendar(newyear, cur_month);
    this.setData({
      cur_year: newyear
    })

  },
  /*每周*/
  r_week: function() {
    this.setData({
      WeekOnShow: true,
      CalendarOnShow: false,
      TomorrowOnShow: false,
      TodayOnShow: false,
      EdayOnShow: false,
      EmonthOnShow: false
    })
  },
  /*每周选择*/
  week_click: function(e) {
    let idx = e.target.dataset.idx;
    let w_flag = this.data.weekls_cn[idx].flag;

    console.log(w_flag);
    w_flag = w_flag == false ? true : false;
    var f_flag = 'weekls_cn[' + idx + '].flag';
    this.setData({
      [f_flag]: w_flag,
      due: []
    })
    if (w_flag == true) {
      weekmap.set(idx, 1)
    } else if (w_flag == false) {
      weekmap.delete(idx)
    }
    for (let i = 0; i < 30; i++) {
      let due = new Date()
      due.setDate(due.getDate() + i)
      let cur_week = due.getDay()
      if (weekmap.has(cur_week)) {
        this.data.due.push(util.formatTime(due))
      }
    }
    console.log(this.data.due)
  },
  /*每月选择*/
  Emonth_click: function(e) {
    let idx = e.target.dataset.idx;
    let m_flag = this.data.everymonth[idx].flag;
    let f_flag = 'everymonth[' + idx + '].flag'
    m_flag = m_flag == false ? true : false;
    this.setData({
      [f_flag]: m_flag,
      due: []
    })
    if (m_flag == true) {
      monthmap.set(idx + 1, 1)
    } else if (m_flag == false) {
      monthmap.delete(idx + 1, 1)
    }
    console.log(monthmap)
    let
      year = new Date().getFullYear(),
      month = new Date().getMonth() + 1,
      alldays = 0
    for (let i = 1; i <= 6; i++) {
      if (month > 12) {
        year += 1
        month = 1
      }
      alldays += parseInt(new Date(year, month, 0).getDate())
      month += 1
    }
    alldays -= new Date().getDate()
    for (let i = 0; i <= alldays; i++) {
      let due = new Date()
      due.setDate(due.getDate() + i)
      if (monthmap.has(32)) {
        let year = new Date(due).getFullYear(),
          month = new Date(due).getMonth() + 1
        if (new Date(year, month, 0).getDate() == new Date(due).getDate()) {
          this.data.due.push(util.formatTime(due))
        } else if (monthmap.has(due.getDate())) {
          this.data.due.push(util.formatTime(due))
        }
      } else if (monthmap.has(due.getDate())) {
        this.data.due.push(util.formatTime(due))
      }
    }

    console.log(this.data.due)
  },
  /*自定义选择*/
  defined_click: function(e) {
    let year = e.currentTarget.dataset.year,
      month = e.currentTarget.dataset.month,
      day = e.currentTarget.dataset.day,
      def_Date = this.data.def_Date,
      idx = this.data.def_Date.findIndex(function(item, index, arr) {
        return (item.year == year && item.month == month && item.day == day)
      })
    if (idx == -1) {
      def_Date.push({
        year: year,
        month: month,
        day: day
      })

    } else {
      def_Date.splice(idx, 1)
    }

    this.setData({
      def_Date: def_Date,
      due: []
    })
    for (let i = 0; i < def_Date.length; i++) {
      this.data.due.push(util.formatTime(new Date(def_Date[i].year, def_Date[i].month - 1, def_Date[i].day)))
    }
    this.setData({
      due: this.data.due
    })
    console.log(this.data.def_Date)
    console.log(this.data.due)

  },
  /*自定义*/
  r_defined: function() {
    this.setData({
      CalendarOnShow: true,
      WeekOnShow: false,
      TomorrowOnShow: false,
      TodayOnShow: false,
      EdayOnShow: false,
      EmonthOnShow: false
    })
  },
  /*今天*/
  r_today: function() {
    this.setData({
      due: [],
      CalendarOnShow: false,
      WeekOnShow: false,
      TomorrowOnShow: false,
      TodayOnShow: true,
      EdayOnShow: false,
      EmonthOnShow: false,
      'due[0]': util.formatTime(new Date)
    })
  },
  /*明天*/
  r_tomorrow: function() {
    let due = new Date();
    due.setDate(due.getDate() + 1);
    this.setData({
      due: [],
      CalendarOnShow: false,
      WeekOnShow: false,
      TomorrowOnShow: true,
      TodayOnShow: false,
      EdayOnShow: false,
      EmonthOnShow: false,
      'due[0]': util.formatTime(due)
    })
  },
  /*每月*/
  r_month: function() {
    this.setData({
        CalendarOnShow: false,
        WeekOnShow: false,
        TomorrowOnShow: false,
        TodayOnShow: false,
        EdayOnShow: false,
        EmonthOnShow: true
      }),
      console.log(this.data.everymonth)
  },
  /*每天*/
  r_everyday: function() {
    this.setData({
      CalendarOnShow: false,
      WeekOnShow: false,
      TomorrowOnShow: false,
      TodayOnShow: false,
      EdayOnShow: true,
      EmonthOnShow: false,
      due: []
    })
    for (let i = 0; i < 7; i++) {
      let due = new Date();
      due.setDate(due.getDate() + i);
      this.data.due.push(util.formatTime(due))
    }

  },
  /*确认*/
  confirm: function() {

    if (this.data.titlevalue != '' && this.data.due.length !== 0) {

      weekmap = new Map()
      monthmap = new Map()
      let pages = getCurrentPages()
      let prevPage = pages[pages.length - 2]
      /* 添加一条任务到数据库*/
      wx.cloud.init()
      const testDB = wx.cloud.database({});
      for (let i = 0; i < this.data.due.length; i++) {
        testDB.collection('todos').add({
          data: {
            due: this.data.due[i],
            done: false,
            title: this.data.titlevalue,
            year: new Date(this.data.due[i]).getFullYear(),
            month: new Date(this.data.due[i]).getMonth() + 1,
            day: new Date(this.data.due[i]).getDate(),
            week: new Date(this.data.due[i]).getDay()
          },

        })
      }

      //更新用户数据
      testDB.collection('userinfo').get().then(res => {
        if (res.data.length == 0) {
          testDB.collection('userinfo').add({
            data: {
              unfinished: this.data.due.length,
              total: this.data.due.length,
              completed: 0,
              percent: 0
            }
          })
        } else {

          var uInfo = res.data,
            id = uInfo[0]._id,
            tUnfinished = uInfo[0].unfinished + this.data.due.length,
            tTotal = uInfo[0].total + this.data.due.length,
            tPercent = (tTotal - tUnfinished) / tTotal
         
          testDB.collection('userinfo').doc(id).update({

            data: {
              unfinished: tUnfinished,
              total: tTotal,
              percent: tPercent
            }
          })
        }
      })














      ///再次获取//
      testDB.collection('todos').count({
        success: res => {
          var list = []
          const batchTimes = Math.ceil(res.total / 20)
          for (let i = 0; i < batchTimes; i++) {
            const arr = []
            testDB.collection('todos').skip(i * 20).limit(20).get({
              success: res => {
                list = list.concat(res.data)
                let len = list.length
                for (let i = 0; i < len; i++) {
                  for (let j = 0; j < len - i - 1; j++) {
                    if (list[j].due > list[j + 1].due) {
                      let temp = 0
                      temp = list[j]
                      list[j] = list[j + 1]
                      list[j + 1] = temp
                    }
                  }
                }
                this.setData({
                  list: list
                })
                prevPage.setData({
                  list: this.data.list
                })
              }
            })
          }
        }
      })

      prevPage.setData({

        ScrollNum: 0,
        'fold': []
      })

      wx.navigateBack({})
    } else {

      this.setData({
        toastHidden: false
      })
      var that = this
      setTimeout(function() {
        that.setData({
          toastHidden: true
        })
      }, 800)
    }
  },
})