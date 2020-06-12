
const http = require('http');
const hostname = 'localhost';
const port = 3800;
const url = require('url');
const route = require('./route')

const server = http.createServer((req,res)=>{
    if(req.url !== '/favicon.ico'){
        console.log(req.url)

        const pathname = url.parse(req.url).pathname.replace(/\//,"");
        console.log(pathname)
        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        try{
            route[pathname](req,res)
        }catch(err){
            console.log("pathname 没有匹配成功");
            route['notFound'](req,res);
        }
    }
}).listen(port,hostname,()=>{
    console.log(`node server is running  at http://${hostname}:${port}`)
})


