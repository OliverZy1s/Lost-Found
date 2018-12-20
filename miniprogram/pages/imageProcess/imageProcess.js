import 
  WeCropper
from '../../we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadImage: false,
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    }
  },

  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },

  getCropperImage(){
    this.wecropper.getCropperImage((image) => {
      if (image) {
        let pages = getCurrentPages(); 
        let prevPage = pages[pages.length - 2];
        let item_image = 'item.item_image'
        prevPage.setData({  
          [item_image]: image,
          uploadImage: true
        })
        // let uploadImage = this.data.uploadImage
        // this.setData({
        //   uploadImage: true
        // })
        wx.navigateBack({
          url: `/pages/landing/landing`,
        })
      }
      else {
        console.log('获取图片失败，请稍后再试')
      }
    })
  },

  uploadTap (){
    const self = this
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'],
      success(res) {
        const src = res.tempFilePaths[0]
        self.wecropper.pushOrign(src)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { cropperOpt } = this.data
    if (options.src){
      cropperOpt.src = options.src
      new WeCropper(cropperOpt)
        .on('ready', (ctx) => {

        })
        .on('beforeImageLoad', (ctx) => {

        })
        .on('imageLoad', (ctx) => {

        })
        .on('beforeDraw', (ctx, instance) => {

        })
        .updateCanvas()
    }
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