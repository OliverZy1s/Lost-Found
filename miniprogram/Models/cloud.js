class Cloud {

  //定义Cloud有个属性为db
  constructor(db) {
    this.db = wx.cloud.database();
  }

  //在集合内添加一个记录
  add(collection_name, data){
    return this.db.collection(collection_name).add({
      data: data
    })
  }

  //在指定记录内更新一个字段（字段要以对象形式包裹）
  update_doc(collection_name, doc, data) {
    return this.db.collection(collection_name).doc(doc).update({
      data: data
    })
  }

  //获取集合当前记录
  getCurrentItem(collection_name){
    return this.db.collection(collection_name).limit(1).get()
  
  }

  //获取集合内指定_id的item记录
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

  //上传图片到储存 cloudPath为云端储存路径  filePath为临时保存路径
  uploadFile({cloudPath, filePath}){
    return wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: filePath
    })
  }

  //上传图片到储存 cloudPath为云端储存路径  filePath为临时保存路径
  downloadFile({ cloudPath }) {
    return wx.cloud.downloadFile({
      fileID: cloudPath
    })
  }
}

export {Cloud}