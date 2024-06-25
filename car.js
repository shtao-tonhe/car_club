
//********🚗懂个车🚗********
// |——环境准备
//   |—— node
//   |—— npm
//   |—— mysql
// |—— npm扩展
//   |—— npm install express
//   |—— npm install body-parser
//   |—— npm install multer
//   |—— npm install mysql
//   |—— npm install uuid
// |—— 文件说明
//   |—— indexhtml 客户端（后面再说）
//   |—— car.js    主体文件
//   |—— db.js     数据库文件
//   |—— route.js  路由文件（后面再说）
//   |—— utils.js  工具文件

// 引入所需的库
const express = require('express')
const bodyParser = require('body-parser')

const db = require('./db')
const utils = require('./utils')
const multer = require('multer')
const upload = multer()

const { v4: uuidv4 } = require('uuid')

// 创建Express应用
const app = express()
const port = 3000

// 使用body-parser中间件来解析请求体
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/login', (req, res) => {
  // 0、校验入参数据（没输入用户名、密码直接抛异常）
  // 1、获取入参数据
  // 2、根据入参获取db数据
  // 3、对比db中的密码
  // 4、返回结果
  res.send({
    code: '0000112221',
  })
})


app.get('/carList', (req, res) => {
  db.getData({ table: 'car' }, (error, results) => {
    const resultData = utils.apiResutlOv( error, results )
    res.send(resultData)
  })
});

app.post('/addCar', upload.none(), async (req, res)=>{
  if( !req.body ){
    const resultData = utils.apiResutlOv( error = true )
    res.send(resultData)
    return
  }

  const uuid = uuidv4()
  const id = (uuid.replace(/-/g,'')).toString()
  const reqBody = { id, ...req.body }
  const reqData = await utils.insetDBValue( reqBody )

  const dbKey = 'id,car_name,price'
  const dbData = `${reqData}`

  db.setData({ table: 'car', key: dbKey, value: dbData }, (error, results) => {
    const resultData = utils.apiResutlOv( error, results )
    res.send(resultData)
  })
})

app.delete('/delCar/:id', (req, res) => {
  const carId = req.params.id;
  if( !carId ){
    const resultData = utils.apiResutlOv( error = true )
    res.send(resultData)
    return
  }

  db.deleteData({ table: 'car', value: carId }, (error, results) => {
    const resultData = utils.apiResutlOv( error, results )
    res.send(resultData)
  })
})

// 启动服务器
app.listen(port, () => {
  console.log(`running-BaseUrl---------------http://127.0.0.1:${port}`);
});