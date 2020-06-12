var express = require('express');
var router = express.Router();

var {
  User,
  Mov
} = require('../utils/model')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { username: req.session.username });
});

router.get("/login", (req, res) => {
  var username = req.query.username || '';
  res.render("login", { username: username })
})


router.get("/register", (req, res) => {
  res.render("register");
})

router.get("/my", (req, res) => {
  if (req.session.username) {
    User.findOne({
      username: req.session.username
    }).then(result => {
      console.log(result);
      res.render("my", { result })
    })
  } else {
    res.send(`<script>alert("你的登录已经失效,请重新登录!");location.href='/login'</script>`)
  }
})


router.get('/movie', (req, res) => {
  const query = req.query;
  console.log(query);
  var keyobj = {};
  var sortobj = {};

  if (query['keyword']) {
    var keyword = query['keyword'];
    keyobj = {
      $or: [
        { title: new RegExp(keyword) },
        { year: new RegExp(keyword) },
        { genres: new RegExp(keyword) }
      ]
    }
  } else {
    sortobj = query
  };

  if (req.session.username) {
    Mov.find(keyobj, {}).sort(sortobj)
      .then(result => {
        res.render('movie', { result })
      })
  } else {
    res.send(`<script>alert("请先登录!");location.href='/login'</script>`)
  }
})


router.get('/wbsocket', (req, res) => {
  res.render('wbsocket')
})


module.exports = router;
