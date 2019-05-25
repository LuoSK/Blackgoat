const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabbar: {},
    userInfo: [],
    userRecord: [{
      event: '任务总数',
      data: '10'
    }, {
      event: '已完成',
      data: '6'
    }, {
      event: '未完成',
      data: '4'
    }, {
      event: '完成率',
      data: '60%'
    }]
  },
  onLoad: function() {
    app.editTabbar();
    //查看授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

})