// model 操作表 操作集合 

// Schema  ==> Schema主要用于定义MongoDB中集合Collection里文档document的结构
// 每个schema会映射到mongodb中的一个collection 结构
// schema不具备操作数据库的能力

// 定义  Schema 指定字段名和类型即可
// String      字符串
// Number      数字    
// Date        日期
// Buffer      二进制
// Boolean     布尔值
// Mixed       混合类型
// ObjectId    对象ID    
// Array       数组


//导入mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mov_Schema = new Schema({
    username: String,
    password: String,
    age: Number
});
// 定义集合文档的数据结构 和类型 


// model schema生成的模型  专门实现对数据库的操作
// 使用model()方法，将Schema编译为Model。
// model()方法的第一个参数是模型名称
//  mongoose.model("表名",schema)
// 如果名称的最后一个字符是字母，则会变成复数；如果名称的最后一个字符是数字，则不变
exports.Mov = mongoose.model('mov', mov_Schema)

