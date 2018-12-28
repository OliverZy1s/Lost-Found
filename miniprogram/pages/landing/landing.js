//导入封装好的Cloud类
import {
  Cloud
} from '../../Models/cloud.js'

//导入van组件
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';

//导入封装好的Picker类
import {
  Picker
} from '../../Models/picker.js'

//导入具体地点数组常量
import {
  multiArray_A,
  objectMultiArray_A,
  multiIndex_A,

  multiArray_B,
  objectMultiArray_B,
  multiIndex_B,

  multiArray_C,
  objectMultiArray_C,
  multiIndex_C,

  multiArray_D,
  objectMultiArray_D,
  multiIndex_D
} from '../../config.js'

let cloud = new Cloud()
let picker = new Picker()

let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:  0,
    uploadImage: false,

    item: {
      kind: 'lost',
      campus: 'A区',
      location: '一教',
      date: '2019-01-01',
      name: '学生证',
      supply_info: '',
      item_image: ''
    },

    _date: '2019-01-01',

    multiArray: [],
    objectMultiArray: [],
    multiIndex: [],

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

  //改变第一层tab栏的点击事件
  //注意：同时上传图片括号内的文字也发生改变
  onChange_level_1(event) {
    let array = ['lost', 'found']
    let choice = array[event.detail.index]
    let kind = 'item.kind'
    this.setData({
      [kind]: choice
    })
  },

  //改变第二层tab栏的点击事件
  //注意：具体地点的picker选项也将发生改变
  onChange_level_2(event) {
    let array = ['A区', 'B区', 'C区', 'D区']
    let choice = array[event.detail.index]
    let campus = 'item.campus'
    this.setData({
      [campus]: choice
    })
    
    if (event.detail.index == 0){
      this.setData({
        multiArray: multiArray_A,
        objectMultiArray: objectMultiArray_A,
        multiIndex: multiIndex_A
      })
    }
    else if (event.detail.index == 1){
      this.setData({
        multiArray: multiArray_B,
        objectMultiArray: objectMultiArray_B,
        multiIndex: multiIndex_B
      })
    }
    else if (event.detail.index == 2){
      this.setData({
        multiArray: multiArray_C,
        objectMultiArray: objectMultiArray_C,
        multiIndex: multiIndex_C
      })
    }
    else if (event.detail.index == 3){
      this.setData({
        multiArray: multiArray_D,
        objectMultiArray: objectMultiArray_D,
        multiIndex: multiIndex_D
      })
    }
  },

  //地点选择器的确定事件
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
    let location = this.data.multiArray[0][e.detail.value[0]]
    this.data.item.location = location
  },

  //地点选择器的改变事件
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    let value = e.detail.value
    let column = e.detail.column
    data.multiIndex[column] = value

    //根据tab栏的切换，切换不同地点的选项卡
    let _data = Object
    if (this.data.item.campus == 'A区'){
      _data = picker.switch_A(column, data)
    }
    else if (this.data.item.campus == 'B区'){
      _data = picker.switch_B(column, data)
    }
    else if (this.data.item.campus == 'C区') {
      _data = picker.switch_C(column, data)
    }
    else if (this.data.item.campus == 'D区') {
      _data = picker.switch_D(column, data)
    }

    this.setData(_data);
  },

  //时间选择器的确定事件
  bindDateChange: function (e) {
    // let date = e.detail.value
    // console.log(this.data.item._date)
    let date = this.data.item.date
    date = new Date(e.detail.value)

    //_date类型为String，目的是方便显示
    let _date = date.toLocaleDateString()

    let date_setData = 'item.date'
    this.setData({
      [date_setData]: date,
      _date: _date
    })
  },

  //时间选择器的改变事件
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    this.data.item.name = this.data.array[e.detail.value]
  },

  //补充信息输入框的改变事件
  onChange_supply: function(event){
    console.log(event.detail)
    let supply_info_setData = 'item.supply_info'
    this.setData({
      [supply_info_setData]: event.detail
    })
  },

  //上传图片事件
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

  //提交事件
  onSubmit: function(event){

    let item_id = ''
    let date_default = new Date('2019-01-01')

    let item = {
      kind: this.data.item.kind,
      campus: this.data.item.campus,
      location: this.data.item.location,
      date: this.data.item.date,
      name: this.data.item.name,
      supply_info: this.data.item.supply_info,
      getMethod: ['', '', ''],
      formID: ''
    } 

    if (item.date == '2019-01-01'){
      item.date = date_default
    }

    console.log(item)

    if (item.kind=='lost'){
      this._submitLost(item, item_id)
    }
    else if (item.kind == 'found'){
      this._submitFound(item, item_id)
    }
  },

  //内部方法，丢失信息的提交
  _submitLost:function(item, item_id){
    
    //在云端数据库内添加丢失成就
    cloud.add('achievements', {kind: 'lost', name: item.name})

    //在云端数据库内添加丢失记录
    cloud.add('items_lost', item)
      .then(res => {
        // console.log(item)
          item_id = res._id
          wx.showToast({
            title: `成功提交哦`,
            icon: 'success',
            duration: 1500,
            mask: false,
          })
          console.log(item_id)
          setTimeout(function () {

            //成功提交后跳转至推荐界面
            wx.switchTab({
              url: `../recommend/recommend`,
            })

            //因为跳转到tabbar页面不允许携带参数，因此将id存放在全局变量里
            app.globalData.item_id = item_id
            // console.log(app.globalData.item_id)
          }, 1000)

        //如果丢失信息提交了图片，则在记录中增加图片（目前实际并未用到）
        if (this.data.item.item_image) {
          cloud.uploadFile({
            cloudPath: 'lost_images/' + item_id,
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

  //内部方法，拾得信息的提交
  _submitFound: function (item, item_id) {

    //在云端数据库内添加拾到成就
    cloud.add('achievements', { kind: 'found', name: item.name })

    //容错处理，防止不提交图片
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
        //提交丢失信息成功后将跳转至填写联系信息页面
        wx.navigateTo({
          url: `../contactInfo/contactInfo?_id=${item_id}`,
        })
      }, 1000)

      //在云端数据库中添加拾到信息
      cloud.add('items_found', item)
        .then(res => {
          item_id = res._id
          console.log(item_id)
          
          //发送该条拾到记录给云端服务器，让其发送模板消息给用户
          wx.cloud.callFunction({
            name: 'message',
            data: {
              item_id: item_id
            }
          })
            .then(res => {
              console.log(res)
            })
            .catch(err => {
              console.log(res)
            })
        
          //上传图片
          cloud.uploadFile({
            cloudPath: 'found_images/' + item_id,
            filePath: this.data.item.item_image
          })
            .then(res => {

              //上传图片完成后将得到图片的fileID上传至数据库保存
              cloud.update_doc('items_found', item_id, {
                cloud_image: res.fileID
              })
            })
        })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function (options) {

    //将剪切完的图片显示在页面上
    if (options.uploadImage){
      setData({
        uploadImage: true
      })
    }

    //地点选择器的默认值
    this.setData({
      multiArray: multiArray_A,
      objectMultiArray: objectMultiArray_A,
      multiIndex: multiIndex_A
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