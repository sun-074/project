
//insert添加数据
db.users.insert({
    username: 'huahua'
});



db.users.insert({
    username: 'lala'
});


db.users.insert([
    {
        username: 'yaya'
    },
    {
        possword: '123456'
    }
]);

//update修改数据
db.users.update(
    { username: "lala" }
    ,
    {
        $set: {
            password: "abc123"
        }
    })


db.users.update(
    { username: 'huahua' }
    ,
    {
        $set: {
            password: '15945'
        }
    });


db.users.updateMany({}, {
    $inc: {
        age: 12
    }
});

//deleteMany删除数据
db.users.deleteMany({username:'lala'})



db.movie.find({},{title:1,year:1,_id:0,genres:1})

// $gt   great then > 
// $gte  great then equal >=
// $lt   less then  <
// $lte  less then equal <= 
db.movie.find({
    "rating.average":{
        $gt:9.4
    }
},{_id:0,title:1,'rating.average':1})

db.movie.find({
    year:{
        $gt:'1970',
    }
},{title:1,_id:0,year:1})


db.movie.find({
    year:{
        $gt:'1970',
    }
},{title:1,_id:0,year:1}).sort({year:1})




// limit 只查出前面的 10条数据 
db.movie.find({},{
    _id:0,
    title:1,
    year:1,
}).limit(10)
// skip 跳过前面 多少条数据 
db.movie.find({},{
    _id:0,
    title:1,
    year:1,
}).limit(10).skip(3);
// count size 求出当前数据的长度
db.movie.find().count();
db.movie.find().skip(5).count();    // 无视条件的  20 
db.movie.find().size();
db.movie.find().skip(5).size();     // 真实长度    15


// 求出年份最大值 
db.movie.find({
     
},{
    _id:0,
    title:1,
    year:1,
}).sort({year:-1}).limit(1)

// 求出年份最小值 
db.movie.find({

},{
    _id:0,
    title:1,
    year:1
}).sort({year:1}).limit(1);


// 判断 列 field 是否存在  $exists
db.movie.find({year:{$exists:true}},{_id:0,title:1,year:1})

//$in
db.movie.find({
    genres:{
        $in:['剧情','科幻']
    }
},{title:1,_id:0,genres:1,year:1})



// and 查询
db.movie.find({
    year:"1997",
    genres:{
        $in:["灾难"]
    }
},{
    _id:0,
    title:1,
    genres:1,
    year:1
})


//正则判断
db.users.find({
    username:/a$/
})

db.users.find({
    username:/ah/
})