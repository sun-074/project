var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require("cors");

//连接数据库
var connection  = require('./utils/connect');
var webSocketServer = require('./utils/wbsocketserver')

//路由模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentRouter = require('./routes/comment');
var vueRouter = require('./routes/vue');
var reactRouter = require('./routes/react');
var { checkToken } = require("./utils")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session 中间件  必须写在路由中间件前面 
app.use(session({
  name:"AppTest",
  cookie:{maxAge:1000*60*60},  // session 时长
  secret:"test",
  resave:false,
  saveUninitialized:true
}))

app.use(cors())
//路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comment', commentRouter);
app.use('/react', reactRouter);
// app.use(checkToken);
app.use('/vue', vueRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
