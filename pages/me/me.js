const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tabbar: {},
    userInfo: []
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