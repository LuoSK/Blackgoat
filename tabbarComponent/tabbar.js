const app = getApp();
Component({
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [{
            "pagePath": "pages/index/index",
            "text": "时间轴"
          },
          {
            "pagePath": "pages/add/add",
            "text": "添加",
            "iconPath": "images/addition.png",
            "isSpecial": true
          },
          {
            "pagePath": "pages/me/me",
            "text": "Me"
          }
        ]
      }

    }
  },
  data: {
   // isIphoneX: app.globalData.systemInfo.model.includes('iPhone X')
  }
})