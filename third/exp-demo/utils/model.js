
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user_Schema = new Schema({
    username: String,
    password: String,
    againpwd:String,
    age:Number,
    mobile:Number,
    time:Date,
    nickname:String,
    email:String,
    avatar:String,
    type:Number,     //   0 普通居民用户     1 管理员 
    category:String,  // 3 业主  2 租户  1 志愿者 
    isTest:Boolean 
});
exports.User = mongoose.model('user', user_Schema)


const movie_schema = new Schema({
    "rating" :Object, 
    "genres" :Array, 
    "title" : String, 
    "casts" :Array, 
    "collect_count" : Number, 
    "original_title" : String, 
    "subtype" : String, 
    "directors" :Array, 
    "year" : String, 
    "images" : Object, 
    "alt" : String, 
    "id" : String
});
exports.Mov = mongoose.model("mov",movie_schema); 

const comment_schema = new Schema({
    id:Number,  // 评论序号
    title:String, // 评论标题
    content:String, // 评论内容
    username:String, // 评论人
    time:String, // 评论时间 
    mid:String, // 评论的电影id 
    mtitle:String, // 评论的电影标题  
    mpic:String
});
exports.Comment = mongoose.model("comment",comment_schema);  // comments
 
 
// 控制id 自增长 
const uid_schema =  new Schema({
    id:Number, 
    name:String  // 表名 
});
exports.Uid = mongoose.model("uid",uid_schema)  // uids

//留言板
const liuyan_schema = new Schema({
    title:String,
    content:String
})

exports.liuyan = mongoose.model("liuyan",liuyan_schema)


// 居民体温的 表结构 
const tw_schema =  new Schema({
    username:String, 
    mobile:Number,
    wendu:Number,
    time:Date,
    toggle:Boolean,  // 大于 37.4     
});
exports.Tw = mongoose.model("tiwen",tw_schema)  


// 社区建议  表结构 
const advise_schema =  new Schema({
    autor:String,   // 意见发表人 
    title:String,
    category:Array,
    content:String,
    time:Date,
});
exports.Advise = mongoose.model("advise",advise_schema)  

//商品表结构
const good_schema =  new Schema({
    name: String,
    price: Number,
    discount: Number,
    img: String,
    type: Object
});
exports.Good = mongoose.model("good",good_schema)  

