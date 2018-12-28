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
    // console.log(options.item_id)
    //获取传入的item_id参数
    const item_id = options.item_id

    //根据item_id从数据库获取item信息
    cloud.getItem('items_found',item_id)
      .then(res => {

        //从储存中添加item_image到item（已经加载过该物品的图片，所以直接从储存调用就行）
        let item = {
          ...res,
          item_image: wx.getStorageSync(item_id)
        }

        //把item中date类型转换为String，方便显示
        item.date = item.date.toLocaleDateString()

        this.setData({
          item: item
        })
      })
    
  },

  //点击item组件事件
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