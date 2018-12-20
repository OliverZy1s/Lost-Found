import {
  Mine 
} from '../../Models/mine.js'

let mine = new Mine()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    achievements: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getAchieve',
      success: res => {
        let achievements = res.result.data

        mine.imagesDownload(achievements)
          .then(res => {
            let achievements_image = res
            let _achievements = new Array(achievements.length)

            for (let i = 0; i < achievements.length; i++) {
              let achievement = achievements[i]
              let achievement_image = achievements_image[i]
              _achievements[i] = { ...achievement, achievement_image }
              console.log(_achievements)
            }


            this.setData({
              achievements: _achievements
            })

            console.log(this.data.achievements)

          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})