const cloud = require('wx-server-sdk')
cloud.init()

const { OPENID, APPID, UNIONID } = cloud.getWXContext()
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => new Promise((resolve, reject) => {
  let filter = event.filter
  let item_id = event.item_id
  db.collection('items_lost')
    .where({
      _id: item_id
    })
    // .limit(1)
    .get()
    .then(res => {
      if (filter == 'strict'){
        db.collection('items_found')
          .where({
            campus: res.data[0].campus,
            location: res.data[0].location,
            name: res.data[0].name,
            date: _.gte(res.data[0].date),
          })
          .get()
          .then(res => {
            resolve(res)
          })
      }
      else if (filter == 'normal'){
        db.collection('items_found')
          .where({
            campus: res.data[0].campus,
            name: res.data[0].name,
            date: _.gte(res.data[0].date)
          })
          .get()
          .then(res => {
            resolve(res)
          })
      }
      else if (filter == 'mild') {
        db.collection('items_found')
          .where({
            campus: res.data[0].campus,
          })
          .get()
          .then(res => {
            resolve(res)
          })
      }
      else if (filter == 'none') {
        db.collection('items_found')
          .get()
          .then(res => {
            resolve(res)
          })
      }
    })
})

