import {
  Recommend
} from '../../Models/recommend.js'

import {
  Cloud
} from '../../Models/cloud.js'

import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';

let cloud = new Cloud()
let recommend = new Recommend()
let app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    item_id: '',
    items: [],
    items_image: [],
    active: 2,
    tabValue: 2,
    pageIndex: 0,
    upScrollLoading: false,
    upScrollLoading_nomore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //从全局变量中获取item_id，如果携带参数直接用传入的item_id，未携带则用默认值
    let item_id = app.globalData.item_id

    //如果没有传入item_id
    if (item_id == undefined){

      //获取当前位置最新的物品item_id
      cloud.getCurrentItem('items_lost')
        .then(res => {

          let item_id = res.data[0]._id

          this.setData({
            item_id: item_id
          })

          Toast.loading({
            mask: true,
            message: '未提交数据，随机加载中...'
          });

          //开始从云函数加载items数据
          let tabValue = this.data.tabValue
          this.loadByTab(tabValue, item_id)
        })
    }
    //传入了item_id就直接根据此id加载items数据
    else {

      this.setData({
        item_id: item_id
      })

      Toast.loading({
        mask: true,
        message: '加载中...'
      });

      //开始从云函数加载items数据
      let tabValue = this.data.tabValue
      this.loadByTab(tabValue, item_id)
    }
  },
  
  //加载items数据的核心方法
  _onLoadData: function(funcName, filter, item_id, pageIndex){

    //调用封装好的Recommend类中的方法加载数据
    recommend.silderFilter(funcName, filter, item_id, pageIndex)
      .then(res => {
        
        //如果返回值不为空且不为第一页，停止显示”加载中“图标
        if (res.length != 0 && pageIndex != 0){
          this.setData({
            upScrollLoading: false
          })
        }
        //如果返回值为空且不为第一页，停止显示”加载中“图标且显示”没有数据“图标
        else if (res.length == 0 && pageIndex != 0){
          this.setData({
            upScrollLoading: false,
            upScrollLoading_nomore: true,
          })
        }

        //如果返回值为空且为第一页，提示暂无数据
        if (res.length == 0 && pageIndex == 0){
          Toast({
            mask: true,
            message: '抱歉，暂无数据，\n请尝试更换过滤条件',
            duration: 2000
          })
          this.setData({
            items: []
          })
        }
        //如果返回值为不为空，开始将返回数据拼接到原items数组上
        else if (res.length != 0){
          this.setData({
            items: this.data.items.concat(res)
          })

          //从数据库取回items数据，开始加载图片
          let items = this.data.items
          recommend.imagesDownload(items)
            .then(res => {

              //图片加载完成，如果是第一页则显示Notify
              if (pageIndex == 0){
                Notify({
                  text: '洋河蓝色经典为您推荐结果以下结果',
                  duration: 2000,
                  selector: '#custom-selector',
                  backgroundColor: '#B0E2FF'
                })
              }

              //把加载回来的图片数据（tempFile）放到内部_items数组中
              let _items = new Array(items.length)
              let items_image = res

              for (let i = 0; i < items.length; i++) {
                let item = items[i]
                let item_image = items_image[i]
                let date = item.date.substring(0, 10)

                _items[i] = { ...item, item_image, date }
              }

              this.setData({
                items: _items,
              })

              Toast.clear()

            })
        }
      })
  },

  //改变Tab栏事件
  onChange(event) {

    Toast.loading({
      mask: true,
      message: '加载中...'
    });

    let item_id = this.data.item_id
    let tabValue = event.detail.index
    let pageIndex = this.data.pageIndex

    this.setData({
      tabValue: tabValue
    })

    this.loadByTab(tabValue, item_id)
  },

  //Tab变化触发的加载（items数组重新加载）
  loadByTab: function (tabValue, item_id){

    this.setData({
      items: [],
      pageIndex: 0,
      upScrollLoading_nomore: false
    })

    if (tabValue == 3) {
      this._onLoadData('test_1', 'strict', item_id, 0)
    }
    else if (tabValue == 2) {
      this._onLoadData('test_1', 'normal', item_id, 0)
    }
    else if (tabValue == 1) {
      this._onLoadData('test_1', 'mild', item_id, 0)
    }
    else if (tabValue == 0) {
      this._onLoadData('test_1', 'none', item_id, 0)
    }
  },

  //上拉触发的加载（pageIndex发生变化，分页加载）
  loadByUpScroll: function (tabValue, item_id, pageIndex) {

    if (tabValue == 3) {
      this._onLoadData('test_1', 'strict', item_id, pageIndex)
    }
    else if (tabValue == 2) {
      this._onLoadData('test_1', 'normal', item_id, pageIndex)
    }
    else if (tabValue == 1) {
      this._onLoadData('test_1', 'mild', item_id, pageIndex)
    }
    else if (tabValue == 0) {
      this._onLoadData('test_1', 'none', item_id, pageIndex)
    }
  },

  //开启消息提醒事件
  onMessage: function(event){
    // console.log(event.detail.formId)
    Dialog.confirm({
      title: '开启消息提醒',
      message: '开启消息提醒可以为您推送之后严格匹配的信息'
    }).then(() => {

      //在该用户数据库记录中新增一条formID记录
      let item_id = this.data.item_id
      let data = {
        formID: event.detail.formId
      }
      cloud.update_doc('items_lost', item_id, data)

    }).catch(() => {
      // on cancel
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
    wx.showNavigationBarLoading();

    //重新加载页面
    this.onLoad()

    wx.hideNavigationBarLoading();

    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    //根据是否到底决定是否隐藏”加载中“   
    //根据是否到底决定pageIndex是否加一
    this.setData({
      upScrollLoading: this.data.upScrollLoading_nomore ? false : true,
      pageIndex: this.data.upScrollLoading_nomore ? this.data.pageIndex : this.data.pageIndex + 1
    })

    //上拉触发加载数据
    let item_id = this.data.item_id
    let tabValue = this.data.tabValue
    let pageIndex = this.data.pageIndex
    this.loadByUpScroll(tabValue, item_id, pageIndex)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})