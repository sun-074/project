

const http = require('http');
const hostname = 'localhost';
const port = 2200;

let {
    User,
    UserClass
} = require('./first')

let u1 = new UserClass('小明',18);
let u2 = new User('小娟',20,'小美')


let {
    Person,
    Student
} = require('./person');

let p1 = new Person('丫丫',20);
let s1 = new Student('小新',30,80);

const server = http.createServer(function (req, res) {
    if (req.url !== "/favicon.ico") {
        res.writeHead(200, { "content-type":"text/html;charset=utf8"})
        res.write(`<h2>欢迎第一次创建web服务器</h2>`)
        res.write(`<h2>${u1.name} --- ${u1.age} --- ${UserClass.hobby} --- ${u1.say()}</h2>`)
        res.write(`<h2>${u2.name} --- ${u2.age} --- ${User.hobby}  --- ${u2.friend} --- ${u2.say()}</h2>`)
        res.write(`<h2>${p1.name} --- ${p1.age} --- ${Person.hobby} --- ${p1.say()}</h2>`)
        res.write(`<h2>${s1.name} --- ${s1.age} --- ${Student.hobby}  --- ${s1.score} --- ${s1.say()}</h2>`)
        res.end()
    }
});

server.listen(port,hostname,()=>{
    console.log(`the server is running http://${hostname}:${port}`);
})