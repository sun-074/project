var express = require('express');
var router = express.Router();
var {
    User,
    Mov,
    Uid,
    Comment
} = require('../utils/model')

var {
    showTime,
    checkSession
} = require('../utils')

router.get('/', function (req, res, next) {
    res.send('comment running');
});

router.get('/movieinfo', (req, res) => {
    var {
        mid
    } = req.query;
    console.log(mid)
    checkSession(req, res, () => {
        Mov.findOne({
            id: mid
        }).then(result => {
            res.render('comment', { result })
        })
    })
})

router.post('/submit', (req, res) => {
    var body = req.body;
    console.log(body);
    var {
        mid
    } = req.query;

    checkSession(req, res, () => {
        Mov.findOne({
            id: mid
        }).then(movie => {
            Uid.updateMany({
                name: "comments"
            }, {
                $inc: {
                    id: 1
                }
            }).then(result => {
                console.log(result);
                body.time = showTime();
                body.mid = movie.id;
                body.mtitle = movie.title;
                body.id = res.id;
                body.mpic = movie.images.large;
                body.username = req.session.username;
                Comment.insertMany(body)
                    .then(result => {
                        res.send(`<script>alert('评论成功');location.href ='/comment/list' </script>`)
                    })
            })
        })
    })
})

//评论列表
//添加分页
router.get('/list', (req, res) => {
    // 查询所有的电影评论 
    // 当前页码 pageNo  默认为 1 
    // 总条数  total 
    // 每页显示的数据  pageSize  ( 4  8  10 15);
    // 总页数  totalPage 
    var query = req.query;
    var pageNo = query.pageNo * 1 || 1;
    var total = 0;
    var pageSize = query.pageSize * 1 || 4;
    var totalPage = 0;

    Comment.find()
        .then(result => {
            if (result.length > 0) {
                total = result.length;
                totalPage = Math.ceil(total / pageSize);  
                pageNo = pageNo <= 1 ? 1 : pageNo; 
                pageNo = pageNo >= totalPage ? totalPage : pageNo 
            }
            Comment.find()
                .sort({ time: -1 })
                .skip((pageNo - 1) * pageSize)
                .limit(pageSize)   
                .then(data => {
                    res.render("list", {
                        result: data,
                        username: req.session.username,
                        total,
                        pageSize,
                        totalPage,
                        pageNo
                    })
                })
        })

    // Comment.find({},{}).sort({_id:-1})
    // .then(result=>{
    //     res.render("mlist.ejs",{
    //         result,
    //         username:req.session.username
    //     });
    // })


    // Comment.find({}, {}).sort({ id: -1 })
    //     .then(result => {
    //         username = req.session.username;
    //         console.log(result)
    //         res.render('list', { result, username })
    //     })
});


//删除评论
router.post('/delSome', (req, res) => {
    var body = req.body;
    console.log(body);
    Comment.deleteMany({
        _id: body.mid
    }).then(resule => {
        res.send('删除成功')
    })
})


//修改评论
router.post('/updateComment', (req, res) => {
    var body = req.body;
    console.log(body);
    Comment.updateMany({
        _id: body.id
    }, {
        $set: {
            title: body.title,
            content: body.content
        }
    }).then(result => {
        res.send('修改成功')
    })
})

//查看单人评论
router.get('/myself',(req,res)=>{
    var query = req.query;
    Comment.find({
        username:query.username
    }).then(result=>{
        res.render('myself',{result})
    })
})

//查看电影的全部评论
router.get('/dianying',(req,res)=>{
    var query = req.query;
    Comment.find({
        mtitle:query.mtitle
    }).then(result=>{
        res.render('dianying',{result})
    })
})





module.exports = router;
