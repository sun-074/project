const fs = require('fs');

exports.readHtml = function(path,req,res){
    fs.readFile(path,'utf8',(err,data)=>{
        if(err) {console.log(err)};
        res.writeHead(200,{'content-type':'text/html;charset=utf8'});
        res.write(data);
        res.end();
    })
};

exports.readJson = function(path,req,res){
    fs.readFile(path,'utf8',(err,data)=>{
        if(err) console.log(err);
        res.writeHead(200,{'content-type':'application/json'});
        res.write(data);
        res.end();
    })
};

exports.readIMG = function(path,req,res){
    fs.readFile(path,'binary',(err,data)=>{
        if(err) console.log(err);
        res.writeHead(200,{'content-type':'image/jpeg'});
        res.write(data,"binary");
        res.end();
    })
}