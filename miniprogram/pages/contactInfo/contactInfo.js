import {
  Cloud
} from '../../Models/cloud.js'

let cloud = new Cloud()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    list: ['a', 'b','c'],
    result: [],
    status: [
      false,
      false,
      false
    ],

    value_onLine: '',
    value_offLine: '',
    value_diy: '',

    multiArray: [['一教', '图书馆', '一食堂'], ['一楼', '二楼', '三楼', '四楼'], ['D1001', 'D1002']],

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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _id = options._id
    this.data._id = _id
    // console.log(this.data._id)
  },

  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
    let location = this.data.multiArray[0][e.detail.value[0]]
    this.data.value_offLine = location
    // console.log(1)
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

  toggle(event) {
    const { name } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${name}`);

    if (name == this.data.list[0]){
      this._checkBoxMethod(0)
    }
    else if (name == this.data.list[1]) {
      this._checkBoxMethod(1)
    }
    else if (name == this.data.list[2]) {
      this._checkBoxMethod(2)
    }
  },

  _checkBoxMethod: function(num){
    let result = this.data.result
    if (this.data.status[num] == false) {
      result.push(this.data.list[num])
    }
    else {
      result.splice(result.indexOf(this.data.list[num]), 1)
    }
    let _status= `status[${num}]`
    this.setData({
      result: result,
      [_status]: !this.data.status[num]
    })

    // console.log(this.data.status[0])
  },


  onChange_onLine: function (event){
    console.log(event.detail)
    this.data.value_onLine = event.detail
  },

  // onChange_offLine: function (event) {

  // },

  onChange_diy: function (event) {
    console.log(event.detail)
    this.data.value_diy = event.detail
  },

  onSubmit: function(event){
    let value_onLine = this.data.value_onLine
    let value_offLine = this.data.value_offLine
    let value_diy = this.data.value_diy

    let getMethod = [
      value_onLine,
      value_offLine,
      value_diy
    ]

    wx.showToast({
      title: '感谢您的贡献！',
      icon: 'success',
      duration: 1500,
      mask: false,
    })

    // let getMethod = _getMethod.filter(item => item)
    // console.log(this.data._id)
    // console.log(getMethod)
    // console.log(this.data._id)

    cloud.update_doc_getMethod('items_found', this.data._id, getMethod)

    setTimeout(function () {
      wx.redirectTo({
        url: '../landing/landing',
      })
    }, 1000)
  },

  onClose() {
    this.setData({ show: false });
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