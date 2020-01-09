var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon')

var router = require('./router');
var compression = require('compression');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var app = express();

var resolve = file => path.resolve(__dirname, file);
app.use(compression());


var options = {
  maxAge: 3600000
};

app.use(favicon(path.join(__dirname, '../favicon.ico')));

app.use('/Backstage', express.static(resolve('../Backstage'), options));
app.use('/home', express.static(resolve('../home'), options));
app.use('/biubiupiu', express.static(resolve('../biubiupiu'), options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var identityKey = 'skey';

app.use(session({
    name: identityKey,
    secret: 'chyingp',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 1000 * 60 * 1000  // 有效期，单位是毫秒, 这里设置的是15分钟
    }
}));

app.use(router)

// 后台管理页
app.get('/admin', function(req, res) {
    var sess = req.session;
    var loginUser = sess.loginUser;
    var isLogined = !!loginUser;
    if (isLogined){
        console.log('已登录')
        var html = fs.readFileSync(resolve('../admin.html'), 'utf-8');
    }else{
        console.log('未登录')
        var html = fs.readFileSync(resolve('../' + 'login.html'), 'utf-8');
    }
	res.send(html)
});
app.get('/blog', function(req, res) {
    var html = fs.readFileSync(resolve('../' + 'blog.html'), 'utf-8');
    res.send(html)
});

// 博客首页
app.get('/', function(req, res) {
    var html = fs.readFileSync(resolve('../' + 'index.html'), 'utf-8');
    res.send(html)
});

app.listen(process.env.PORT || 1234, function() {
    console.log("应用实例，访问地址为 localhost:1234")
});
