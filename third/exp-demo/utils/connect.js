//  node 链接 mongodb 数据库 
//  工具 mongoose 


const mongoose = require('mongoose');

const hostname = '0.0.0.0';
const port = 27017;
const  dbname = 'nz1903';
const user = '?';
const password = "?";

//连接地址
const connect_db_url = `mongodb://${hostname}:${port}/${dbname}`;

//数据库的连接开始
mongoose.connect(connect_db_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log('数据库连接失败');
        throw err;
    }else{
        console.log('数据库连接成功')
    }
});

//数据库的增删改查



// 监听数据库的链接状态
const connection = mongoose.connection;

//连接成功
connection.on('connected',()=>{
    console.log('mongoDB连接成功');
})

//连接异常
connection.on('error',(err)=>{
    console.log("Mongoose connection error " + err);
})

//连接断开
connection.on('disconnected',()=>{
    console.log("Mongoose connection 断开 ");
})


module.exports.connection = connection;