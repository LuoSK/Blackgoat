Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    fold: [],
    ScrollNum: 0,

  },
  onShow: function() {
    wx.cloud.init()
    const db = wx.cloud.database({})

    db.collection('todos').count({
      success: res => {
        var list = []
        const batchTimes = Math.ceil(res.total / 20)
        for (let i = 0; i < batchTimes; i++) {
          const arr = []
          db.collection('todos').skip(i * 20).limit(20).get({
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
              } //
              this.setData({
                list: list
              })
            }
          })
        }
      }
    })
  },



  /*任务卡片展开*/
  rotateAnim: function(e) {

    let idx = e.target.dataset.index;
    let flag = this.data.fold[idx]
    console.log(idx);
    flag = flag == false ? true : false;
    var f_flag = 'fold[' + idx + ']'
    this.setData({
      [f_flag]: flag
    })
  },
  /*添加任务*/
  addtap: function() {

    wx.navigateTo({
      url: '../add/add',
    })
  },





  /** 
   * 显示删除按钮
   */
  showDeleteButton: function(e) {
    let movIndex = e.currentTarget.dataset.movindex
    this.setXMove(movIndex, -50)
  },

  /**
   * 隐藏删除按钮
   */
  hiddenDeleteButton: function(e) {
    let movIndex = e.currentTarget.dataset.movindex
    this.setXMove(movIndex, 0)
  },
  setXMove: function(movIndex, xmove) {
    let list = this.data.list
    list[movIndex].xmove = xmove
    this.setData({
      list: list
    })
  },

  /** 
   * 处理touchstart事件
   */
  handleTouchStart: function(e) {
    this.startX = e.touches[0].pageX
  },

  /**
   * 处理touchend事件
   */
  handleTouchEnd: function(e) {
    if (e.changedTouches[0].pageX < this.startX && e.changedTouches[0].pageX - this.startX <= -25) {
      this.showDeleteButton(e)
    } else if (e.changedTouches[0].pageX > this.startX && e.changedTouches[0].pageX - this.startX <= 25) {
      this.showDeleteButton(e)
    } else {
      this.hiddenDeleteButton(e)
    }
  },

  /**
   * 处理movable-view移动事件
   */
  handleMovableChange: function(e) {
    if (e.detail.source === "friction") {
      if (e.detail.x < -25) {
        this.showDeleteButton(e)
      } else {
        this.hiddenDeleteButton(e)
      }
    } else if (e.detail.source = "out-of-bounds" && e.detail.x === 0) {
      this.hiddenDeleteButton(e)
    }
  },
  handleDeleteList: function(e) {
    wx.cloud.init()
    const db = wx.cloud.database()
    let index = e.currentTarget.dataset.delete_index,
      id = e.currentTarget.dataset.id,
      list = this.data.list,
      fold = this.data.fold
    fold.splice(index, 1)
    list.splice(index, 1)
    this.setData({
      list: list,
      fold: fold
    })
    db.collection('todos').doc(id).remove()
  },
  test: function() {
    console.log(new Date('2019/04/17'))
  }
})