

class Recommend{
  silderFilter(name, filter, item_id, pageIndex){
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: name,
        data: {
          filter: filter,
          item_id: item_id,
          pageIndex: pageIndex
        },
        success: res => {
          resolve(res.result.data)

          // return res.result.data
          // console.log('callFunction test result: ', res.result.data)
        }
      })
    })
  }

  imagesDownload(items){
    let async_num = 0
    let items_image = new Array(items.length)

    return new Promise((resolve, reject) => {
      for (let i = 0; i < items.length; i++) {
        if (wx.getStorageSync(items[i]._id) == ''){
          wx.cloud.downloadFile({
            fileID: items[i].cloud_image
          })
            .then(res => {
              wx.setStorageSync(items[i]._id, res.tempFilePath)
              items_image[i] = res.tempFilePath
              async_num = async_num + 1
              if (async_num == items.length) {
                resolve(items_image)
              }
            })
        }
        else {
          // console.log(1)
          items_image[i] = wx.getStorageSync(items[i]._id)
          async_num = async_num + 1
          if (async_num == items.length) {
            resolve(items_image)
          }
          // console.log(items_image[i] )
          // resolve()
        }
      }
    }
    )
    
  }
}

export {Recommend}