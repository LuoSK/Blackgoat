const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabbar: {},
    userInfo: [],
    userRecord: [{
      event: '任务总数',
      data: 0
    }, {
      event: '已完成',
      data: 0
    }, {
      event: '未完成',
      data: 0
    }, {
      event: '完成率',
      data: 0
    }]
  },
  onLoad: function() {
    app.editTabbar();
    //查看授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            lang: 'zh_CN',
            success: res => {
              console.log(res.userInfo)
              this.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })

  },
  onShow: function() {
    //获取用户任务数据
    wx.cloud.init
    const db = wx.cloud.database()
    db.collection('userinfo').get().then(res => {
      const uInfo = res.data[0]
      this.setData({
        'userRecord[0].data': uInfo.total,
        'userRecord[1].data': uInfo.completed,
        'userRecord[2].data': uInfo.unfinished,
        'userRecord[3].data': Math.round(uInfo.percent * 100) + '%'
      })
    })
  }
})