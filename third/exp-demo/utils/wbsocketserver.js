

//导入模块
const ws = require('ws');
const webSocketServer = ws.Server;
const port = 3900;

// 1. 创建 服务器  绑定 IP +  端口   监听端口
const wss = new webSocketServer({port});
console.log(`webSocket is running at ws://0.0.0.0:3900`);


let count = 0;
let info = "NZ1903__";
let clientUserMap = {};

// 2. 监听 客户端的链接  
// on  emit 监听 发送
wss.on('connection',(socket)=>{

    // 表示客户端链接成功 
    // socket 来自客户端的链接对象 
    console.log(`客户端 socket 上线了.... `);

    //添加用户姓名
    count++;
    socket.name = info+count;  
    clientUserMap[socket.name] = socket;// 放置对象里面 

    // 3. 监听 客户端发来的消息
    socket.on('message',(msg)=>{
        console.log(msg);
        boradcast(socket,msg)
    });


     // 5. 监听 客户端的关闭  
     socket.on("close",()=>{
        boradcast(socket,"886,我下线了...");
        // 对象删除  delete obj[key]
        delete clientUserMap[socket.name] ; 
    })

})

function  boradcast(socket,msg){
    for(var i in clientUserMap){
        var hour = new Date().getHours();
        var min = new Date().getMinutes();

        clientUserMap[i].send(`${socket.name} 说: (${hour}:${min}) ${msg}`)
    }
}


module.exports.webSocketServer = webSocketServer;