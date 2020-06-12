var express = require('express');
var router = express.Router();
var {
  User
} = require('../utils/model')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//注册
router.post('/zhuce', (req, res) => {
  var body = req.body;
  User.findOne({
    username: body.username,
  }).then(result => {
    console.log(result);
    if (result) {
      res.send(`<script>alert('用户名已注册，请重新注册');location.href='/register'</script>`)
    } else {
      body.time = new Date();
      User.insertMany(body)
        .then(result => {
          res.send(`<script>alert('注册成功，马上跳转...');location.href='/login?username=${body.username}'</script>`)
        })
        .catch(err => {
          res.send(`<script>alert('服务异常');location.href='/register'</script>`)
        })
    }
  })
});

//登录
router.post("/userlogin", (req, res) => {
  var body = req.body;

  User.findOne({
    username: body.username,
    password: body.password
  }).then(result => {
    if (result) {
      req.session.username = result.username;
      res.redirect("/");
    } else {
      res.send(`<script>alert('用户名或者密码错误,请重新登录');location.href='/login'</script>`)
    }
  })
})

//个人信息修改
router.post('/mychange', (req, res) => {
  var body = req.body;
  console.log(body);
  if (req.session.username) {
    User.updateMany({
      username: req.session.username
    }, {
      $set: body
    }).then(result => {
      res.json({
        msg: '个人信息修改成功',
        result,
        code: 200
      })
    })
  } else {
    res.send(`<script>alert('请先登录');location.href='/login'</script>`)
  }
})

//重置密码
router.post('/pwdchange', (req, res) => {
  var body = req.body;
  console.log(body);
  if (req.session.username) {
    User.findOne({
      username: req.session.username,
      password: body.password
    }).then(result=>{
      if(result){
        User.updateMany({
          username: req.session.username,
          password: body.password
        }, {
          $set: {
            password: body.newpassword
          }
        }).then(result => {
          res.json({
            msg: '个人信息修改成功',
            result,
            code: 200
          })
        })
      }else{
        res.send(`<script>alert('密码错误');location.href='/resetpwd'</script>`)
      }
    })
  } else {
    res.send(`<script>alert('请先登录');location.href='/login'</script>`)
  }
})





module.exports = router;
