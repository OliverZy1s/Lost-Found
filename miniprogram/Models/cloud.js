
class Cloud {
  constructor(db) {
    this.db = wx.cloud.database();
  }

  add(collection_name, data){
    // console.log(data)
    return this.db.collection(collection_name).add({
      data: data
    })
  }

  update_doc(collection_name, doc, data) {
    return this.db.collection(collection_name).doc(doc).update({
      data: data
    })
  }

  // update_achievements(collection_name, OPENID, data){
  //   this.db.collection(collection_name)
  //   .where({
  //     _openid: OPENID
  //   })
  //   .get()
  //   .then(res => {
  //     return res
  //   })

  // }

  getCurrentItem(collection_name){
    return this.db.collection(collection_name).limit(1).get()
      then(res => {
        resolve(res.data)
      })
  }

  getItem(collection_name, _id){
    console.log(_id)
    console.log(typeof(_id))
    return new Promise ((resolve, reject) => {
      this.db.collection(collection_name).doc(_id).get()
        .then(res => {
          resolve(res.data)
        })
    })
  }

  update_doc_getMethod(collection_name, doc, data) {
    return this.db.collection(collection_name).doc(doc).update({
      data: {
        getMethod: data
      }
    })
  }

  uploadFile({cloudPath, filePath}){
    return wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: filePath
    })
  }

  downloadFile({ cloudPath }) {
    return wx.cloud.downloadFile({
      fileID: cloudPath
    })
  }
}

export {Cloud}