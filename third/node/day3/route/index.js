// 路由

var {
    readHtml,
    readJson,
    readIMG
} = require('../files');

const url = require('url');
const querystring = require('querystring')


module.exports = {
    home(req, res) {
        readHtml('html/home.html', req, res); //路径更server.js对应
    },

    login(req, res) {

        //get获取数据
        // const query = url.parse(req.url,true).query;
        // console.log(query);
        // console.log(req.url);

        //POSt获取数据
        var postData = ''
        req.on('data',d=>{
            postData += d;
        });

        req.on('end',()=>{
            console.log('请求提交 完毕');
            postData = querystring.parse(postData);
            console.log(postData);
        });

        readHtml('html/login.html', req, res);
    },

    goods(req,res){
        readJson('html/goods.json',req,res);
    },

    img(req,res){
        readIMG('imgs/2.jpg',req,res);
    },

    notFound(req, res) {
        res.write(`<h2>404 - 404 - notFound </h2>`);
        res.end();
    }

}