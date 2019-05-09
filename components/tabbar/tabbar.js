Component({
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#db9019",
        "list": [{
            "pagePath": "pages/index/index",
            "text": "时间轴"
          },
          {
            "pagePath": "pages/add/add",
            "text": "添加",
            "isSpecial": true
          },
          {
            "pagePath": "pages/me/me",
            "text": "Me"
          }
        ]
      }

    }
  }
})