


//爬虫

//抓取数据

const url = "https://www.lagou.com/";
const https = require('https');
const querystring = require("querystring");
const cheerio = require("cheerio");  // 类似 jQuery 运用到 服务器端 
const http = require('http');


https.get(url, (res) => {
    console.log('状态码:', res.statusCode);
    console.log('请求头:', res.headers);

    var htmlData = "";
    var count = 0;
    // 监听响应数据 传输
    res.on("data", d => {
        htmlData += d;
        count++;
    });

    // 监听响应数据 传输 完毕 
    res.on("end", () => {
        console.log('传输次数 == ' + count);
        // 解析 htmlData  获取到你想要的数据信息 
        getHtmlData(htmlData);
    })

}).on('error', (err) => {
    console.error(err);
});



function getHtmlData(data) {
    var $ = cheerio.load(data);
    var dataList = [];

    var mains = $('#sidebar').find('.menu_main');
    // console.log(mains.length)

    mains.each((index, ele) => {
        var title = $(ele).find("h2").text().trim();
        var jobs = $(ele).find("a")
        var jobList = [];
        // console.log(title);
        // console.log("==============");

        jobs.each((index, item) => {
            var jobTitle = $(item).find("h3").text().trim();
            console.log(jobTitle)
            jobList.push(jobTitle);
        });

        // console.log("==============");
        dataList.push({
            title,
            jobList
        });
    })

    initServer(dataList)
};


function initServer(data){
    http.createServer((req,res)=>{   // https 需要域名证书
        if(req.url==="/list"){
            //1.  打印 JSON 数据 
            // res.writeHead(200,{"Content-Type":"application/json"});  // 表示接受 JSON 数据
            // res.write(JSON.stringify(data));
            // res.end();
            //2.  ul li 列表 
            res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
            var oul = "<ul>";
            data.forEach((item,index)=>{
                oul+=`<li> <h2>${item.title}</h2>`;
                oul+="<ol>"
                item.jobList.forEach((val,i)=>{
                    oul+=`<li>${val}</li>`
                });
                oul+="</ol></li>"
            });
            oul+="</ul>";
            res.write(oul);
            res.end();
        }
    }).listen(3000,"localhost",()=>{
        console.log("server init successful")
    });
}