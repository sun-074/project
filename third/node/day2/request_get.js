// 模拟访问别人的接口  把别人的接口数据移植到自己的服务器去
// 抓接口数据 
// https 没有写 端口 默认就是 443
// http  没有写 端口 默认就是 80 


const urlApi = 'https://zuozhaoxi.com:1910/react/getGoodList';
const https = require('https');
const url = require("url");

const { initServer } = require("./server");

const { stringify } = require("querystring") // querystring.stringify


const options = {
    hostname: 'zuozhaoxi.com',
    port: 1910,
    path: '/react/getGoodList',
    method: 'GEt'
};


const req = https.request(options, res => {
    console.log('状态码:', res.statusCode);
    console.log('请求头:', stringify(res.headers));


    var jsonData = '';
    res.on('data', d => {
        jsonData += d;
    });


    // 响应数据完毕 
    res.on("end", () => {
        console.log(jsonData)
        // https://zuozhaoxi.com:1910/react/getGoodList ==> http://localhost:3000/goods
        initServer("/goodList", jsonData);  // goodList path 路径
        // 1. 批量存入数据库
        // 2. 保存到本地 
    })
})


req.on("error", err => {
    console.log("数据请求失败 == " + err);
});


req.end();  // 请求完毕 