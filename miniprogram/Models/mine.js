import {
  achievements_images_lost,
  achievements_images_found
} from '../config.js'

class Mine {

  imagesDownload(achievements) {
    
    console.log(achievements)
    let achievements_image = new Array(achievements.length)
    let fileID = ''
    let async_num = 0

    return new Promise((resolve, reject) => {
      for (let i = 0; i < achievements.length; i++) {

        fileID = ''
        if (achievements[i].kind == 'lost'){
          fileID = achievements_images_lost[achievements[i].name]
        }
        else if (achievements[i].kind == 'found'){
          fileID = achievements_images_found[achievements[i].name]
        }
        
        if (wx.getStorageSync(achievements[i]._id) == ''){
          wx.cloud.downloadFile({
            fileID: fileID
          })
            .then(res => {
              wx.setStorageSync(achievements[i]._id, res.tempFilePath)
              achievements_image[i] = res.tempFilePath
              async_num = async_num + 1
              if (async_num == achievements.length) {
                resolve(achievements_image)
              }
            })
        }
        else {
          achievements_image[i] = wx.getStorageSync(achievements[i]._id)
          async_num = async_num + 1
          if (async_num == achievements.length) {
            resolve(achievements_image)
          }
        }

  
      }
      
    })
  }
}

export { Mine }