import {
  Recommend
} from '../../Models/recommend.js'

import {
  Cloud
} from '../../Models/cloud.js'

import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

let cloud = new Cloud()
let recommend = new Recommend()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    item_id: '',
    items: Array,
    items_image: Array,
    active: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Notify({
      text: '洋河蓝色经典为您推荐结果以下结果',
      duration: 2000,
      selector: '#custom-selector',
      backgroundColor: '#B0E2FF'
    })
    // console.log(options.item_id)
    if (options.item_id == undefined){
      cloud.getCurrentItem('items_lost')
        .then(res => {
          let item_id = res.data[0]._id
          this.setData({
            item_id: item_id
          })
          console.log(item_id)
          this._onLoadData('test_1', 'normal', item_id)
        })   
    }
    else {
      let item_id = options.item_id
      this.setData({
        item_id: item_id
      })
      console.log(item_id)
      this._onLoadData('test_1', 'normal', item_id)
    }

  },
  
  _onLoadData: function(funcName, filter, item_id){
    recommend.silderFilter(funcName, filter, item_id)
      .then(res => {
        // console.log(res)
        if (res.length == 0){
          Toast({
            mask: true,
            message: '抱歉，暂无数据，\n请尝试更换过滤条件',
            duration: 2000
          })
          this.setData({
            items: []
          })
        }
        else {
          let items = res
          recommend.imagesDownload(items)
            .then(res => {

              Toast.clear()

              let _items = new Array(items.length)
              let items_image = res

              for (let i = 0; i < items.length; i++) {
                let item = items[i]
                let item_image = items_image[i]
                // console.log(item)
                let date = item.date.substring(0, 10)

                _items[i] = { ...item, item_image, date }
              }

              // console.log(_items[0].date)
              this.setData({
                items: _items,
                // items:{
                //   items_image: res
                // } 
              })
            })
        }
      })
  },

  onChange(event) {

    Toast.loading({
      mask: true,
      message: '加载中...'
    });

    let item_id = this.data.item_id
    let value = event.detail.index

    // console.log(value)
    if (value == 3){
      this._onLoadData('test_1', 'strict', item_id)
    }
    else if (value == 2){
      this._onLoadData('test_1', 'normal', item_id)
    }
    else if (value == 1) {
      this._onLoadData('test_1', 'mild', item_id)
    }
    else if (value == 0) {
      this._onLoadData('test_1', 'none', item_id)
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