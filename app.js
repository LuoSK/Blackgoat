//app.js
App({
  onLaunch: function() {
    this.hideTabbar()
  },
  hideTabbar: function() {
    wx.hideTabBar({
     
      fail: function() {
        setTimeout(function() {
          wx.hideTabBar()
        }, 500)
      }
    })
  },
  getSystemInfo: function() {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.systemInfo = res;
      },
    })
  },
  editTabbar: function() {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1]
    let pagePath = _this.route
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath
    }
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      if (tabbar.list[i].pagePath == pagePath) {
        tabbar.list[i].selected = true
      }
    }
    _this.setData({
      tabbar: tabbar
    })
  },
  globalData: {
    systemInfo: null,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [{
          "pagePath": "/pages/index/index",
          "text": "时间轴"
        },
        {
          "pagePath": "/pages/add/add",
          "text": "添加",
          "iconPath": "/images/addition.png",
          "isSpecial": true
        },
        {
          "pagePath": "/pages/me/me",
          "text": "Me"
        }
      ]
    }
  }
})