const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minLength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    // User가 저장되기 전에 작업되도록 함. 

    var user = this;

    if (user.isModified('password')) {
        // 이대로 사용하면 user가 수정되어도 save는 일어나기 때문에,
        // 다른 정보가 수정되어도 password 암호화가 일어남.
        // password가 수정되었을 때만 실행되도록.

        // 비밀번호를 암호화시킴
        // Salt 값을 이용해서 비밀번호를 암호화시킴. 
        // saltRounds : salt가 몇글자인지
        bcrypt.genSalt(saltRounds, function(err, salt) {
            // next() : user 저장되는 과정으로 넘김

            if (err) return next(err)
            // salt를 만드는데 문제가 생기면 그냥 넘김

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                // hash값을 넘기는데 문제가 생기면 그냥 넘김

                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema);

module.exports = { User }