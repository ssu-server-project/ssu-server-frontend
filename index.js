const express = require("express"); // express 모듈을 가져오기
const app = express(); // 새로운 앱을 만듬
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

const config = require("./config/key");
// config/key.js에서 production에 따른 URI 참조 방식을
// 결정해줌.

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
// require() : 파일 경로를 인수로받아서 해당 파일에서 내보낸
// 객체를 반환하는 함수.

//    "mongoose": "^7.0.3",
// config 안의 mongoURI를 가져와주는 방식.
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
// connect()
app.get("/", (req, res) => res.send("Hello World! 안녕하세요!"));

app.post("/api/users/register", async (req, res) => {
  //회원가입시 필요 정보를 client에서 가져오면
  //데이터베이스에 삽입한다

  //body parser를 통해 body에 담긴 정보를 가져온다
  const user = new User(req.body);

  //mongoDB 메서드, user모델에 저장
  const result = await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

app.post("/api/users/login", async (req, res) => {
  // 요청된 이메일이 데이터베이스에 있는지 찾음.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      // 데이터베이스에 없을 경우
      return res.json({
        loginSuccess: false,
        messeage: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호까지 맞다면 토큰을 부여
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 쿠키나 로컬 스토리지나,, 어디든 저장할 수 있다.
        // 어디더 저장해야 안전한지는 아직 말이 많다. 여기서는 쿠기에 하자.
        // 쿠키를 사용하기 위해서는 cookie-parser를 깔아야 한다.
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

//#13. authentication 기능 구현 
app.get('/api/users/auth', async(req,res) => {

  // 여기까지 미들웨어를 통과해왔다는 것은 
  // Authentication이 True라는 말.
  // 이제 user 정보를 제공해주면 된다. 원하는 것을 선택해서,,

  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, 
    // 이는 얼마든지 바꿀 수 있다. role 숫자에 따라 직분을 결정한다던지,,
    // role 1 어드민    role 2 특정 부서 어드민
    // role 0 일반유저   그 외에는 관리자 등등,,

    isAuth: true,
    email : req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

// #14 로그아웃 기능 구현
// 이미 로그인된 상태이기 때문에 auth를 넣어준다.
app.get('/api/users/logout', auth,async (req,res) => {
  User.findOneAndUpdate({_id: req.user._id},
    {token: ""},
    (err,user)=> {
      if(err) return res.json({success:false,err});
      return res.status(200).send({
        success: true
      })
    })
})




app.listen(port, () => console.log(`Example app listening on port ${port}`));
