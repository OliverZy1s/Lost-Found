import {
  Cloud
} from '../../Models/cloud.js'

let cloud = new Cloud()

import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: null,
    clickStatus: false,
    onLineValue: '',
    offLineValue: '',
    diyValue: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _id = options._id

    cloud.getItem('items_found',_id)
      .then(res => {
        let item = {
          ...res,
          item_image: wx.getStorageSync(_id)
        }
        item.date = item.date.toLocaleDateString()
        this.setData({
          item: item
        })
      })
    
  },

  onClick: function(event){
    Dialog.confirm({
      title: '注意！',
      message: '点击确定即表明对该物品负责'
    }).then(() => {
      this.setData({
        clickStatus: true,
        onLineValue: this.data.item.getMethod[0],
        offLineValue: this.data.item.getMethod[1],
        diyValue: this.data.item.getMethod[2],
      })
    }).catch(() => {
      
    });
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