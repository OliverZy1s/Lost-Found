const cloud = require('wx-server-sdk')
cloud.init()

const { OPENID, APPID, UNIONID } = cloud.getWXContext()
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => new Promise((resolve, reject) => {
  let filter = event.filter
  let item_id = event.item_id
  let skip_items = event.pageIndex * 6

  // resolve(skip_items)

  // //先计算集合中记录个数
  // const countResult = await db.collection('items_found').count()
  // const total = countResult.total

  // //计算分几次取
  // const batchTimes = Math.ceil(total / 10)

  db.collection('items_lost')
    .where({
      _id: item_id
    })
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
          .orderBy('date', 'desc')
          .skip(skip_items)
          .limit(6)
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
          .orderBy('date', 'desc')
          .skip(skip_items)
          .limit(6)
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
          .orderBy('date', 'desc')
          .skip(skip_items)
          .limit(6)
          .get()
          .then(res => {
            resolve(res)
          })
      }
      else if (filter == 'none') {
        db.collection('items_found')
          .orderBy('date', 'desc')
          .skip(skip_items)
          .limit(6)
          .get()
          .then(res => {
            resolve(res)
          })
      }
    })
})

