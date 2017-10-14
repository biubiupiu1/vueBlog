<template>
	<div class="articel-edit-wrap">
        <div class="article-title">
            <input type="text" v-model="articleTitle">
        </div>
        <div class="article-toolbar">
            <div class="label">
                <el-popover ref="tag" placement="top-start" width="150" trigger="click">
                    <ul class="tag-list-wrap">
                        <li v-for="item in tags" @click="selectTag(item)">{{item.tagName}}</li>
                    </ul>
                </el-popover>
                <img src="../assets/tag.png" height="30" width="30" v-popover:tag>
                <el-tag :closable="true" type="success"  :close-transition="false" @close="handleClose" v-if="lable !== ''">
                    {{lable}}
                </el-tag>
            </div>
            <div class="action-button">
                <el-button v-if="this.$route.params.id" type="danger" size="small" @click="delectArticles">删除</el-button>
                <el-button size="small" @click="submit('draft')">保存草稿</el-button>
                <el-button type="primary" size="small" @click="submit('publish')">发布文章</el-button>
            </div>
        </div>
        <textarea id="editor"></textarea>
	</div>
</template>

<script>
import SimpleMDE from 'simplemde'
import '../assets/simplemde.css'
import marked from 'marked';
import highlight from 'highlight.js'
import '../assets/atom-one-light.css'
import { Message } from 'element-ui';
export default {
	data () {
        return {
            articleTitle: '请输入文章标题',
            content: '',
            tags: [],
            lable: '',
            smde: null,
        }
    },
    mounted: function(){
        this.smde = new SimpleMDE({
            element: document.getElementById('editor'),
            autofocus: true,
            autosave: true,
            previewRender: function(plainText) {
                return marked(plainText,{
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight: function (code) {
                        return highlight.highlightAuto(code).value;
                    }
                });
            },
        });
        this.smde.codemirror.on("change", function(){
            this.content = this.smde.value()
        }.bind(this));
        this.init();
        // 请求标签数据列表
        this.$http.post('/api/getArticleLabel').then(
            respone => {
                this.tags =  respone.body
            },
            respone => {
                Message.error('数据出错，请重新刷新页面')
            }

        )
    },
    beforeRouteLeave(to, from, next){

        if(localStorage.getItem("change") === "true"){

          this.$confirm('当前文档还未保存, 是否退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            localStorage.removeItem("change");
            next();
          }).catch(() => {
          });

        } else
            next();

    },
    watch:{
        $route(){
            this.init();
        }
    },
    methods: {
        init(){
            let self = this;
            let id = this.$route.params.id;
            localStorage.setItem("change","true");
            if( id && id !== "new"){
                this.$http.post('/api/articleDetails', {
                    id: this.$route.params.id
                }).then(
                    respone => {
                        this.articleTitle = respone.body.title;
                        this.lable = respone.body.label;
                        this.smde.value(respone.body.articleContent);
                    },
                    respone => console.log(respone)
                )
            } else {
                this.smde.value("快来开始写博客吧");
                this.articleTitle = '请输入文章标题';
            }
        },
        // 删除
        delectArticles: function(){

            this.$confirm('删除后无法恢复, 是否删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.$http.post('/api/delect/article', {
                  _id : this.$route.params.id
                }).then(
                  respone => {
                    this.$message('删除成功'),
                    localStorage.removeItem("change");
                    this.$emit('saveArticleInformation'),
                    this.$router.push('/articleList/all')
                  },
                  respone => {
                    this.$message.error('删除失败请重试')
                  }
                );
            }).catch(() => {
                this.$message('已取消删除');
            });

        },
    	submit: function(state){
    	    let self = this;
          let id = this.$route.params.id;
          if(!id) return;
    	    let labelName = this.lable === '' ? '未分类' : this.lable;
          let tObj = {
              _id: id !== "new" ? id : null,
              title: this.articleTitle,
              articleContent: this.content,
              date: new Date().toLocaleString(),
              state: state,
              label: labelName
          };

          let tApi = id !== "new" ? '/api/updateArticle' : '/api/saveArticle';

          this.$http.post(tApi,{
              obj: tObj
          }).then(
              respone => {
                self.successSave();
              },
              respone => {
                  Message.error('文章保存失败')
              }
          );
        },
        selectTag: function(data){
            this.lable = data.tagName;
        },
        handleClose: function(tag) {
            this.lable = ''
        },
        successSave(){
            localStorage.removeItem("change");
            Message.success('文章发布成功');
            this.$router.push('/articleList/all');
            // 如果文章信息保存成功就给父组件派发一个事件通知它刷新文章列表
            this.$emit('saveArticleInformation')
        }
    },
    directives: {

    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-active {
    opacity: 0
}
.articel-edit-wrap {
    width: 100%;
    height: 100%;
}
.article-title {
    height: 45px;
    border-bottom: 1px solid #f1f1f1;
}
.article-title > input {
    border: none;
    outline-style: none;
    width: 97%;
    height: 43px;
    padding-left: 10px;
    font-size: 20px;
}
.article-toolbar {
    height: 60px;
    line-height: 60px;
}
.label {
    width: 60%;
    height: 60px;
    line-height: 60px;
    padding-left: 10px;
    float: left;
    display: table-cell;
    vertical-align: middle;
}
.label > img {
    vertical-align: middle;
    cursor: pointer;
}
.label > img:hover {
    border-bottom: 2px solid #20a0ff;
}
.tag-list-wrap {
    border: 1px solid #e0e6ed;
    padding: 5px;
    max-height: 150px;
    overflow: auto;
}
.tag-list-wrap > li {
    margin: 2px;
    padding: 3px;
    cursor: pointer;
    height: 30px;
    line-height: 36px;
}
.tag-list-wrap > li:hover {
    background-color: #e0e6ed;
}
.action-button {
    min-width: 120px;
    float: right;
    padding-right: 20px;
}
.CodeMirror {
    border-bottom: none!important;
    border-left: none!important;
    border-right: none!important;
    border-top: 1px solid #f1f1f1!important;
}
.editor-toolbar {
    border-top-left-radius: 0!important;
    border-top-right-radius: 0!important;
    border-left: none!important;
    border-right: none!important;
    border-top: 1px solid #f1f1f1!important;
}
.editor-statusbar {
    display: none;
}
</style>
