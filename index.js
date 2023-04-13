const express = require('express')  // express 모듈을 가져오기
const app = express()  // 새로운 앱을 만듬
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

const config = require('./config/key');
// config/key.js에서 production에 따른 URI 참조 방식을
// 결정해줌.


// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json())


const mongoose = require('mongoose')
// require() : 파일 경로를 인수로받아서 해당 파일에서 내보낸
// 객체를 반환하는 함수. 


//    "mongoose": "^7.0.3",
// config 안의 mongoURI를 가져와주는 방식.
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex : true,
}).then(() => console.log('MongoDB Connected...'))
.catch(err=>console.log(err))
// connect()
app.get('/', (req, res) =>  res.send('Hello World! 안녕하세요!'))

app.post('/register', async (req, res) => {
    //회원가입시 필요 정보를 client에서 가져오면
    //데이터베이스에 삽입한다
  
    //body parser를 통해 body에 담긴 정보를 가져온다
    const user = new User(req.body)
  
    //mongoDB 메서드, user모델에 저장
    const result = await user.save().then(()=>{
      res.status(200).json({
        success: true
      })
    }).catch((err)=>{
      res.json({ success: false, err })
    })
  })

app.listen(port, () =>   console.log(`Example app listening on port ${port}`))