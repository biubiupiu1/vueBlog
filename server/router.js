var express = require('express');
var router = express.Router();
var users = require('./user').items;
var db = require('./db');

var findUser = function(name, password){
    return users.find(function(item){
        return item.name === name && item.password === password;
    });
};
// 登录接口
router.post('/api/login', function(req, res){
    var sess = req.session;
    var user = findUser(req.body.name, req.body.pwd);

    if(user){
        req.session.regenerate(function(err) {
            if(err){
                return res.json({code: 2, msg: '登录失败'});
            }
            req.session.loginUser = user.name;
            res.json({code: 0, msg: '登录成功'});
        });
    }else{
        res.json({code: 1, msg: '账号或密码错误'});
    }
});


// 查询文章列表路由 用于博客前端展示数据不包含草稿内容
router.post('/api/articleList', function(req, res){
    function getArticle(condition) {
        db.Article.find(condition || {}, function(err, docs){
            if (err) {
                console.log('出错'+ err);
                return
            }
            res.json(docs)
        });
    }
    switch(req.body.state){
        case "all":
            getArticle();
            break;
        case "one":
            getArticle({label: req.body.lable});
            break;
        default:
            getArticle({state: "publish"});
    }


});

// 查询文章列表路由 用于博客后端管理系统包含草稿和已发布文章数据
router.get('/api/admin/articleList', function(req, res){
    db.Article.find({}, function(err, docs){
        if (err) {
            console.log('出错'+ err);
            return
        }
        res.json(docs)
    })
});



// 查询文章列表路由(根据标签返回对应的文章列表) 用于博客后端管理系统包含草稿和已发布文章数据
router.post('/api/admin/articleList', function(req, res){
    db.Article.find({label: req.body.label}, function(err, docs){
        if (err) {
            console.log('出错'+ err);
            return
        }
        res.json(docs)
    })
});
// 查询文章详情路由
router.get('/api/articleDetails/:id', function(req, res){
    db.Article.findOne({_id: req.params.id}, function(err, docs){
        if (err) {
            return
        }
        res.send(docs)
    })
});
router.post('/api/articleDetails', function(req, res){
    db.Article.findOne({_id: req.body.id}, function(err, docs){
        if (err) {
            return
        }
        res.send(docs)
    })
});
// 文章保存路由
router.post('/api/saveArticle', function(req, res){
    if(req.body.obj._id)
        delete req.body.obj._id;

    new db.Article(req.body.obj).save(function(error){
        if (error) {
            res.status(500).send();
            return
        }
        if (req.body.obj.state !== 'draft') {
            db.Article.find({label:req.body.obj.label},function(err, ArticleList){
                if (err) {
                    res.status(500).send();
                    return
                }
                db.TagList.find({tagName:req.body.obj.label}, function(err, docs){
                    if(docs.length>0){
                        docs[0].tagNumber = ArticleList.length
                        db.TagList(docs[0]).save(function(error){})
                    }
                })
            })
        }
        res.send()
    })
});

// 文章更新路由
router.post('/api/updateArticle', function(req, res){
    db.Article.find({_id: req.body.obj._id}, function(err, docs){
        if(err){
            return
        }
        docs[0].title = req.body.obj.title
        docs[0].articleContent = req.body.obj.articleContent
        // 不更新文章更改时间
        docs[0].date = docs[0].date
        docs[0].state = req.body.obj.state
        docs[0].label = req.body.obj.label
        db.Article(docs[0]).save(function(err){
            if (err){
                res.status(500).send();
                return
            }
            res.send()
        })
    })
});

// 删除文章
router.post('/api/delect/article', function(req, res){
    db.Article.find({_id: req.body._id}, function(err, docs){
        if(err) return;

        console.log(docs);

        db.Article.remove({_id: req.body._id}, function(err, docs){
            if (err) {
                res.status(500).send();
                return
            }
            res.send()
        })

        if (docs.length > 0 && docs[0].state != 'draft') {
            db.Article.find({label: docs[0].label},function(err, ArticleList){
                if (err) return;
                console.log(ArticleList);
                db.TagList.find({tagName: docs[0].label}, function(err, Tags){
                    if(Tags.length>0){
                        Tags[0].tagNumber = ArticleList.length;
                        db.TagList(Tags[0]).save(function(error){})
                    }
                })
            })
        }
    })

})

// 文章标签查询路由
router.post('/api/getArticleLabel', function(req, res){
    if(!req.body.state){
        db.TagList.find({}, function(err, docs){
            console.log(docs);
            if (err)return;
            res.json(docs);
        })
    }
    else{
        db.TagList.find({}, function(err, docs){
            if (err)return;
            var data = [];
            docs.forEach(function (e , index) {
                data[index] = {};
                data[index].tag = e;
                data[index].lists = [];
                db.Article.find({label: e.tagName , state: "publish"}, function(err, _docs){
                    if (err) {
                        console.log('出错'+ err);
                        return
                    }
                    data[index].lists = _docs;
                    if(index+1 === docs.length){
                        console.log(data)
                        res.json(data);
                    }
                })
            })
        })
    }
});


// 文章标签保存路由
router.post('/api/saveArticleLabel', function(req, res){
    db.TagList.find({}, function(err, docs){
        if(err)return;
        var isExist = false;
        docs.forEach(function(item){
            if(item.tagName == req.body.tagList.tagName){
                isExist = true;
            }
        })
        if (isExist){
            res.json({error: true, msg: '标签已存在'})
        }else{
            new db.TagList(req.body.tagList).save(function(error){
                if (error) {
                    res.send('保存失败');
                    return
                }
                res.send()
            })
        }
    })
});
// 博客信息路由
router.post('/api/save/personalInformation', function(req, res){
    db.PersonalInformation.find({}, function(err, docs){
        if (err) {
            res.status(500).send();
            return
        }
        if(docs.length>0){
            docs[0].name = req.body.form.name
            docs[0].individualitySignature = req.body.form.individualitySignature
            docs[0].introduce = req.body.form.introduce
            db.PersonalInformation(docs[0]).save(function(err){
                if (err) {
                    res.status(500).send();
                    return
                }
                res.send();
            })
        } else {
            new db.PersonalInformation(req.body.from).save(function(err){
                if (err){
                    res.status(500).send();
                    return
                }
                res.send();
            })
        }
    })
})

router.get('/api/personalInformation', function(req, res){
    db.PersonalInformation.find({}, function(err, docs){
        if (err) {
            res.status(500).send();
            return
        }
        res.json(docs)
    })
})

module.exports = router