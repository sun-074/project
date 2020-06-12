var http = require('http');

function initServer(url,data){
    http.createServer((req,res)=>{   // https 需要域名证书
        if(req.url===url){
            //1.  打印 JSON 数据 
            res.writeHead(200,{"content-Type":"application/json"});  // 表示接受 JSON 数据
            res.write(data);
            res.end();
        }
    }).listen(3000,"localhost",()=>{
        console.log("server init successful")
    });
}


exports.initServer = initServer;