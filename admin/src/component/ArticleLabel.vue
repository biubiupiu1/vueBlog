<template>
    <div class="article-label-wrap">
        <div class="article-label-nav">
            <div class="article-instructions">
                <i class="iconfont icon-article"></i>
                <span>标签管理</span>
                <span style="" class="edit_btn" @click="isDel = !isDel">{{!isDel ? '编辑':'完成'}}</span>
            </div>
            <ul v-articleListHeight>
                <li v-for="(item , index) in articleLabel" >
                    <img src="../assets/labels.png" height="17" width="17" class="centerY">
                    <h3 class="articleLabel-title" @click="labelClassification(item.tagName)">
                        {{item.tagName}}
                    </h3>
                    <span style="color:#7e7e7e;" class="centerY tagNumber">({{item.tagNumber}})</span>
                    <i class="iconfont icon-shanchu" v-show="isDel" @click="delBtn(item , index)"></i>
                </li>
            </ul>

            <el-input class="tagName-input" v-if="isTagInputShow" v-model="tagName" placeholder="请输入标签名添加">
                <el-button slot="append" icon="check" @click="saveTagNema"></el-button>
            </el-input>
            <el-button v-else="" class="tagName-addbtn" @click="isTagInputShow = !isTagInputShow">添加标签</el-button>
        </div>
    </div>
</template>

<script>
import { Message } from 'element-ui';
export default{
    data(){
        return{
            articleLabel: [

            ],
            tagName: '',
            isTagInputShow: false,
            isDel: false
        }
    },
    mounted: function(){
        // 请求标签数据列表
        this.loadTag();
    },
    methods: {
        labelClassification: function(title){
            this.$router.push("/articleList/" + title);
        },
        loadTag(){
            this.$http.post('/api/getArticleLabel').then(
                respone => {
                    this.articleLabel =  respone.body;
                },
                respone => {
                    Message.error('请求数据出错，请重新刷新页面')
                }
            )
        },
        addArticLabel: function(){
            this.isTagInputShow = true;
        },
        delBtn(tag , index){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delArticLabel(tag , index);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        delArticLabel(tag , index){
            this.$http.post('/api/delArticleLabel',{
                tag: tag
            }).then(
                respone => {
                    if(respone.body.error){
                        Message.error(respone.body.msg);
                        return;
                    }
                    this.articleLabel.splice(index, 1);
                    Message.success('标签删除成功');
                }
            )
        },
        saveTagNema: function(){
            this.isTagInputShow = false;
            let obj = {
                tagName: this.tagName,
                tagNumber: 0
            };
            if(this.tagName){
                this.$http.post('/api/saveArticleLabel',{
                    tagList: obj
                }).then(
                    respone => {
                        if(respone.body.error){
                            Message.error(respone.body.msg);
                            return;
                        }
            		    Message.success('标签保存成功');
                        this.tagName = "";
                        this.articleLabel.push(obj)
                    },
                    respone => Message.error('标签保存失败')
                )
            }
        }
    },
    directives: {
        articleListHeight: {
            bind: function(el){
                var height = window.innerHeight - 120
                el.style.maxHeight = height + 'px'
            }
        }
    }
}
</script>

<style>
.edit_btn{
    position: absolute;
    right: 16px;
    font-size: 15px;
}
.edit_btn:hover{
    cursor: pointer;
}
.article-label-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    margin-left: 90px;
}
.article-label-nav {
    width: 250px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 90px;
    border-right: 1px solid #f1f1f1;
    z-index: 1;
    background-color: #fff;
}
.article-label-nav > ul {
    overflow: auto;
    padding-left: 22px;
}
.article-label-nav > ul > li {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f1f1f1;
    padding: 5px 0;
    position: relative;

}
.article-label-nav > ul > li > img {
    display: block;
    float: left;
}
.article-label-nav > ul > li > h3 {
    max-width: 130px;
    padding-left: 25px;
    font-size: 18px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    color: #20a0ff;
}
.article-label-nav > ul > li > i{
    color: #ff5332;
    font-size: 30px;
    position: absolute;
    right: 5px;
}
.tagNumber{
    font-weight: bold;
    font-size: 18px;
    width: 40px;
    text-align: center;
}
.tagName-addbtn,.tagName-input{
    position: absolute;
    margin: 5px 5px 0;
    bottom: 3px;
    width: 100%;
}
</style>
