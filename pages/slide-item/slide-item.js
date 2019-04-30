Page({
  data: {

    list: [{
        title: 1,
        due: '2012'
      },
      {
        title: 2,
        due: '2013'
      }
    ]
  },
  /** 
   * 显示删除按钮
   */
  showDeleteButton: function(e) {
    let movIndex = e.currentTarget.dataset.movindex
    this.setXMove(movIndex, -65)
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
    if (e.changedTouches[0].pageX < this.startX && e.changedTouches[0].pageX - this.startX <= -30) {
      this.showDeleteButton(e)
    } else if (e.changedTouches[0].pageX > this.startX && e.changedTouches[0].pageX - this.startX <= 30) {
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
      if (e.detail.x < -30) {
        this.showDeleteButton(e)
      } else {
        this.hiddenDeleteButton(e)
      }
    } else if (e.detail.source = "out-of-bounds" && e.detail.x === 0) {
      this.hiddenDeleteButton(e)
    }
  },

})