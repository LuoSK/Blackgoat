const app = getApp();
Page({
  data: {
    weeklist: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    cur_month: 0,
    cur_year: 0,
    tabbar: {}
  },
  onLoad: function() {
    app.editTabbar();
    var that = this;
    var cur_year = new Date().getFullYear();
    var cur_month = new Date().getMonth();
    that.calendar(cur_year, cur_month);
    that.setData({
      cur_month,
      cur_year
    })
  },
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
  year_click: function(e) {
    let cur_month = this.data.cur_month,
      cur_year = this.data.cur_year,
      value = parseInt(e.currentTarget.dataset.value),
      newyear = cur_year + value;
    this.calendar(newyear, cur_month);
    this.setData({
      cur_year: newyear
    })

  }
})