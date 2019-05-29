const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    fold: [],
    ScrollNum: 0,
    tabbar: {},
    fixTop: '',
    fixBottom: '',
    toView: '',
    scrollTop: 0,
    cur_year: new Date().getFullYear(),
    cur_month: new Date().getMonth() + 1,
    cur_day: new Date().getDate()
  },


  onLoad: function() {
    app.editTabbar()

    this.setData({
      fold: []
    })
  },
  onReady: function() {
    this.setData({
      toView: '',
      fixTop: '',
      fixBottom: ''
    })
    //Promise 风格
    wx.cloud.init()
    const db = wx.cloud.database({})
    db.collection('todos').count().then(res => {
      var list = []
      const batchTimes = Math.ceil(res.total / 20)
      for (let i = 0; i < batchTimes; i++) {
        const arr = []
        db.collection('todos').skip(i * 20).limit(20).get().then(res => {
          //对获取的数据按事件顺序排序
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
          // 获取view(今天)的窗口位置
          let that = this;
          wx.createSelectorQuery().select('.static').boundingClientRect(function(res) {
            that.setData({
              fixTop: res.bottom,
              fixBottom: res.top
            })
          }).exec()

        })
      }
      this.setData({
        toView: 'today',

      })

    })
  },
  scroll: function(e) {
    //吸顶

    let that = this,
      top = e.detail.scrollTop;

    that.setData({
      scrollTop: top
    })
  },


  /*添加任务*/
  addtap: function() {

    wx.navigateTo({
      url: '../add/add',
    })
  },
  tapChange: function(e) {
    let idx = e.currentTarget.dataset.idx;
    let flag = this.data.fold[idx]

    flag = !flag;

    var f_flag = 'fold[' + idx + ']'
    this.setData({
      [f_flag]: flag
    })
  },


  handleDoneList: function(e) {
    wx.cloud.init()
    const db = wx.cloud.database()
    let index = e.currentTarget.dataset.idx,
      id = e.currentTarget.dataset.id,
      list = this.data.list
    var f_list = 'list[' + index + '].done'
    this.setData({
      [f_list]: true,
      fold: []
    })
    db.collection('todos').doc(id).update({
      data: {
        done: true
      }
    }).then(success => {
      console.log('successed')
    })



  },




  handleDeleteList: function(e) {
    wx.cloud.init()
    const db = wx.cloud.database()
    let index = e.currentTarget.dataset.idx,
      id = e.currentTarget.dataset.id,
      list = this.data.list

    list.splice(index, 1)
    this.setData({
      list: list,
      fold: []
    })
    let that = this;
    wx.createSelectorQuery().select('.static').boundingClientRect(function(res) {

      that.setData({
        fixTop: res.bottom,
        fixBottom: res.top
      })
    }).exec()
    db.collection('todos').doc(id).remove()
  },
  //点击返回到当天
  scrollIntoToday: function() {
    this.setData({
      toView: 'today'
    })
  },



})