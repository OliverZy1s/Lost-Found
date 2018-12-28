import {
  Cloud
} from '../../Models/cloud.js'

let cloud = new Cloud()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  // attached: function(event){
  //   this.data.item.cloud_image
  //   cloud.downloadFile({
  //     this.data.item.cloud_image
  //   })
  // },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function(){
  
      const item_id = this.data.item._id

      wx.navigateTo({
        url: `../../pages/itemDetails/itemDetails?item_id=${item_id}`,
      })
    }
  }
})
