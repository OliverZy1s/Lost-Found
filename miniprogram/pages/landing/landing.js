import {
  Cloud
} from '../../Models/cloud.js'

import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

let cloud = new Cloud()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:  0,
    uploadImage: false,
    // reportSubmit: false,
    // formID:'',
    item: {
      kind: 'lost',
      campus: 'A区',
      location: '一教',
      date: '2019-01-01',
      name: '学生证',
      item_image: ''
    },

    _date: '2019-01-01',

    multiArray: [['一教', '图书馆','一食堂'], ['一楼', '二楼', '三楼', '四楼'], ['D1001', 'D1002']],

    objectMultiArray: [
      [
        {
          id: 0,
          name: '一教'
        },
        {
          id: 1,
          name: '图书馆'
        },
        {
          id: 2,
          name: '一食堂'
        }
      ], [
        {
          id: 0,
          name: '一楼'
        },
        {
          id: 1,
          name: '二楼'
        },
        {
          id: 2,
          name: '三楼'
        },
        {
          id: 3,
          name: '四楼'
        }
      ], [
        {
          id: 0,
          name: 'D1001'
        },
        {
          id: 1,
          name: 'D1002'
        }
      ],
    ],
    multiIndex: [0, 0, 0],

    date: '2019-01-01',

    array: ['学生证', '钱包', '手机', '雨伞'],
    objectArray: [
      {
        id: 0,
        name: '学生证'
      },
      {
        id: 1,
        name: '钱包'
      },
      {
        id: 2,
        name: '手机'
      },
      {
        id: 3,
        name: '雨伞'
      }
    ],
    index: 0,
  },


  onChange_level_1(event) {
    // wx.showToast({
    //   title: `切换到第一层标签 ${event.detail.index + 1}`,
    //   icon: 'none'
    // });
    let array = ['lost', 'found']
    let choice = array[event.detail.index]
    let kind = 'item.kind'
    this.setData({
      [kind]: choice
    })
  },

  onChange_level_2(event) {
    // wx.showToast({
    //   title: `切换到第二层标签 ${event.detail.index + 1}`,
    //   icon: 'none'
    // });
    let array = ['A区', 'B区', 'C区', 'D区']
    this.data.item.campus = array[event.detail.index]
  },

  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
    let location = this.data.multiArray[0][e.detail.value[0]]
    this.data.item.location = location
  },

  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['一楼', '二楼', '三楼', '四楼'];
            data.multiArray[2] = ['D1001', 'D1002'];
            break;
          case 1:
            data.multiArray[1] = ['图书馆一楼', '图书馆二楼', '图书馆三楼'];
            data.multiArray[2] = ['东区', '西区'];
            break;
          case 2:
            data.multiArray[1] = ['一食堂一楼', '一食堂二楼'];
            data.multiArray[2] = ['东区', '西区'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['D1001', 'D1002'];
                break;
              case 1:
                data.multiArray[2] = ['D2001', 'D2001'];
                break;
              case 2:
                data.multiArray[2] = ['D3001', 'D3002'];
                break;
              case 3:
                data.multiArray[2] = ['D4001', 'D4002'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['东区', '西区'];
                break;
              case 1:
                data.multiArray[2] = ['南区', '北区'];
                break;
              case 2:
                data.multiArray[2] = ['上区', '下区'];
                break;
            }
            break;
          case 2:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['东区', '西区'];
                break;
              case 1:
                data.multiArray[2] = ['南区', '北区'];
                break;
              case 2:
                data.multiArray[2] = ['上区', '下区'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        // console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },

  bindDateChange: function (e) {
    // let date = e.detail.value
    // console.log(this.data.item._date)
    let date = this.data.item.date
    date = new Date(e.detail.value)

    let _date = date.toLocaleDateString()

    let date_setData = 'item.date'
    this.setData({
      [date_setData]: date,
      _date: _date
    })
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    this.data.item.name = this.data.array[e.detail.value]
  },

  uploadImage: function(event){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const src = res.tempFilePaths[0]
        wx.navigateTo({
          url: `/pages/imageProcess/imageProcess?src=${src}`,
        })
      }
    })
  },

  onSubmit: function(event){
    let item = {
      kind: this.data.item.kind,
      campus: this.data.item.campus,
      location: this.data.item.location,
      date: this.data.item.date,
      name: this.data.item.name,
      getMethod: ['', '', '']
    } 
    // console.log(item.date)
    if (item.date == '2019-01-01'){
      let date = new Date('2019-01-01')
      item.date = date
      // console.log(item.date)
    }
    let item_id = ''

    if (item.kind=='lost'){
      this._submitLost(item, item_id)
    }
    else if (item.kind == 'found'){
      this._submitFound(item, item_id)
    }
  },

  _submitLost:function(item, item_id){

    cloud.add('achievements', {kind: 'lost', name: item.name})

    cloud.add('items_lost', item)
      .then(res => {
          item_id = res._id
          wx.showToast({
            title: `成功提交哦`,
            icon: 'success',
            duration: 1500,
            mask: false,
          })

            wx.navigateTo({
              url: `../recommend/recommend?item_id=${item_id}`,
            })


        if (this.data.item.item_image) {
          cloud.uploadFile({
            cloudPath: item_id,
            filePath: this.data.item.item_image
          })
            .then(res => {
              cloud.update_doc('items_lost', item_id, {
                cloud_image: res.fileID
              })
            })
        }
      })
  },

  _submitFound: function (item, item_id) {

    // this.setData({
    //   reportSubmit: true
    // })
    // console.log(event);
    // this.data.formID = event.detail.formId

    cloud.add('achievements', { kind: 'found', name: item.name })

    if (this.data.uploadImage == false) {
      Toast.fail({
        message: '请上传图片',
        duration: 1000
      });
    }
    else {
      wx.showToast({
        title: '成功提交哦',
        icon: 'success',
        duration: 1500,
        mask: false,
      })
      setTimeout(function () {
        wx.navigateTo({
          url: `../contactInfo/contactInfo?_id=${item_id}`,
        })
      }, 1000)

      cloud.add('items_found', item)
        .then(res => {
          item_id = res._id
          cloud.uploadFile({
            cloudPath: item_id,
            filePath: this.data.item.item_image
          })
            .then(res => {
              cloud.update_doc('items_found', item_id, {
                cloud_image: res.fileID
              })
            })
        })
    }
  },

  // submit: function (e) {
  //   console.log(e.detail.formId);
  //   this.data.formID = e.detail.formId

  //   // wx.cloud.callFunction({
  //   //   name: 'test_2',
  //   //   data: {
  //   //     formID: this.data.formID
  //   //   }
  //   // })
  //   //   .then(res => {
  //   //     console.log(res)
  //   //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.uploadImage){
      setData({
        uploadImage: true
      })
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
  onShow: function (options) {
    
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