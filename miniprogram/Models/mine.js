import {
  achievements_images_lost
} from '../config.js'

class Mine {
  getAchieve() {
    
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getOpenid',
        complete: res => {
          console.log(res)
          resolve(res)
        }
      })
    })
  }

  imagesDownload(achievements) {

    let achievements_image = new Array(achievements.length)

    return new Promise((resolve, reject) => {
      for (let i = 0; i < achievements.length; i++) {
        let fileID = ''

        if (achievements[i].kind == 'lost'){
          fileID = achievements_images_lost[achievements[i].name]
        }
        else if (achievements[i].kind == 'found'){
          fileID = achievements_images_found[achievements[i].name]
        }

        wx.cloud.downloadFile({
          fileID: fileID
        })
          .then(res => {
            achievements_image[i] = res.tempFilePath
            if (i == achievements.length - 1){
              resolve(achievements_image)
            }
          })
      }
    })
  }
}

export { Mine }