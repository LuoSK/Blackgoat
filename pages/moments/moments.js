import util from '../../utils/util'

Page({

  data: {
    list: []
  },

  onLoad: function() {

    wx.cloud.init()
    const db = wx.cloud.database({})

    db.collection('todos').count({
      success: res => {
        var list = []
        const batchTimes = Math.ceil(res.total / 20)
        for (let i = 0; i < batchTimes; i++) {
          const arr = []
          db.collection('todos').orderBy('due', 'asc').skip(i * 20).limit(20).get({
            success: res => {
              list = list.concat(res.data)
              console.log(list)
              this.setData({
                list: list
              })
            }
             
          })
          
        }
        
      }
      
    })
  },


  onReady: function() {
  
  }



})