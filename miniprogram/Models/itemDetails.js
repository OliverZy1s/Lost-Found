class ItemDetails{
  getItemDetails(){
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: name,
        data: {
          _id: _id
        },
        complete: res => {
          resolve(res.result.data)
        }
      })
    })
  }
}