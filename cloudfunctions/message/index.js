// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => new Promise ((resolve, reject) => {
  const {
    OPENID,
    APPID,
    UNIONID
  } = cloud.getWXContext()
  const item_id = event.item_id

  const AccessToken_options = {
    method: 'GET',
    url: 'https://api.weixin.qq.com/cgi-bin/token',
    qs: {
      grant_type: 'client_credential',
      appid: APPID,
      secret: '8c3cc54e7ad82ec34218bb61f4170ad7',
    },
    json: true
  }

  db.collection('items_found').doc(item_id).get()
    .then(res => {
      
      // resolve(res)
      db.collection('items_lost').where({
        campus: res.data.campus,
        location: res.data.location,
        name: res.data.name,
        date: _.lte(res.data.date),
      })
        .get()
        .then(res => {
          let items = res
          // resolve(res)
          let token = ''

          rp(AccessToken_options)
            .then((res) => {
              token = res.access_token
              // resolve(token)
              let OPENIDs = new Array(items.data.length)
              let formIDs = new Array(items.data.length)

              for (let i = 0; i < items.data.length; i++) {
                if (items.data[i].formID != ''){
                  OPENIDs[i] = items.data[i]._openid
                  formIDs[i] = items.data[i].formID

                  const body = {
                    "access_token": token,
                    "touser": OPENIDs[i],
                    "template_id": "FvehDBoJ-s4iKnnhqqb67BnVW3KLvLlGbn-2-6pluxU",
                    "form_id": formIDs[i]
                  }

                  const send = {
                    method: 'POST',
                    url: `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${token}`,
                    body,
                    json: true
                  }
                  // resolve(send)
                  rp(send)
                  // .then(res => {
                  //   resolve(res)
                  // })
                }
              
              }
        }
            )
      })
    })

})