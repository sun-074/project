var express = require('express');
var router = express.Router();
var {
    Mov,
    User
} = require("../utils/model")

var multer = require("multer") 

var {
    aesEncrypt,
    aesDecrypt,
    keys
} = require("../utils")

router.get('/', (req, res, next) => {
    res.json({
        msg: "获取成功",
        code: 200,
        result: null
    })
})


// 查询电影数据的接口    
router.get('/movie', (req, res) => {
    var {
        limit
    } = req.query;    // 获取 search(查询参数 ) 里面的 query 
    limit = limit * 1 || 0;
    console.log(limit);
    Mov.find({}, { _id: 0 }).limit(limit).sort({ _id: -1 })
        .then(result => {
            // res.render(ejs)  小黑屋 
            res.json({
                msg: "获取电影数据成功",
                code: 200,
                result
            })
        })
});

router.post('/register', (req, res) => {
    var body = req.body;
    console.log(body)
    User.findOne({
        mobile: body.mobile
    }).then(result => {
        if (result) {
            console.log(result)
            res.json({
                msg: "用户名已被注册，请重新输入",
                code: 200,  
                type:0,              
                result: result
            })
        } else {
            body.time = new Date();
            User.insertMany(body)
                .then(result => {
                    res.json({
                        msg: "注册成功",
                        code: 200,
                        type:1,
                        result: result
                    })
                })
        }
    })
})

router.post("/login",(req,res)=>{
    const body = req.body;
    console.log(body);
    User.findOne({
        mobile:body.mobile
    }).then(data=>{
        if(data.password == body.password){
            var token = aesEncrypt(data.mobile+data.username+data.password,keys);
            req.session.mobile = data.mobile;
            req.session.username = data.username;
            req.session.token = token
            res.json({
                msg:"登录成功",
                code:200,
                type:1,
                data,
                token   //  token 一定发送客户端 
            })
        }else{
            res.json({
                msg:"登录失败,密码或者手机号不正确",
                code:200,
                type:0,
                data
            })
        }
    })
});

router.get("/getuserinfo",(req,res)=>{
    console.log(req.session);
    User.findOne({
        mobile:req.session.mobile
    }).then(result=>{
        res.json({
            msg:"获取用户信息成功",
            code:200,
            type:1,
            result
        })
    })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+"nz1903"+file.originalname)
    }
  })
  
var upload = multer({ storage: storage }).any();

router.post("/uploadimg",upload,(req,res)=>{
    console.log('上传头像成功')
    console.log(req.files)
    if(req.files){
        var path = req.files[0].path;
        User.updateOne({
            mobile:req.session.mobile
        },{
            $set:{
                avatar:path  
            }
        }).then(result=>{
            res.json({
                code:200,
                msg:"头像上传成功",
                type:1,
                path:path,
                result,
                mobile:req.session.mobile
            })
        })
    }else{
        res.json({
            code:200,
            msg:"头像上传失败",
            type:0,
        })
    }
})


router.post("/getavatar",(req,res)=>{
    User.updateOne({
        mobile:req.session.mobile
    }).then(result=>{
        if(result.avatar){
            res.json({
                msg:"获取头像成功",
                code:200,
                result,
                type:1
            })
        }else{
            res.json({
                msg:"获取头像失败",
                code:200,
                result,
                type:0
            })
        }
    })
})

module.exports = router;