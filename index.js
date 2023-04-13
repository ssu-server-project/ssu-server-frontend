const express = require('express')
// express 모듈을 가져오기
const app = express()
// 새로운 앱을 만듬
const port = 5000


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://parkch:12341234@boilerplate.7bsnomf.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err=>console.log(err))

app.get('/', (req, res) =>  res.send('Hello World!'))

app.listen(port, () =>   console.log(`Example app listening on port ${port}`))