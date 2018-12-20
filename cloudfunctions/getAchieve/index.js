// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const { OPENID, APPID, UNIONID } = cloud.getWXContext()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve, reject) => {
  db.collection('achievements')
    .where({
      _openid: OPENID
    })
    .get()
    .then(res => {
      resolve(res)
    })
})