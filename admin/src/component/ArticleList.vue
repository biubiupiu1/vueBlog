<template>
    <div>
        <div class="article-list">
            <div class="article-instructions">
                <i class="iconfont icon-article"></i>
                <span>文章列表 / {{position}}</span>
                <i class="iconfont icon-tianjia" @click="addArticle"></i>
            </div>
            <ul v-articleListHeight>
                <li v-for="item in articleList" :class="[{active: item._id === $route.params.id}]">
                    <h3 :class="{'articlePreview-title-draft': item.state=='draft', 'articlePreview-title-publish': item.state=='publish'}" @click="articlePreview(item._id)">
                        {{item.title}}
                    </h3>
                    <p>{{item.date}}
                        <span class="label-item">{{item.label}}</span>
                    </p>
                </li>
            </ul>
        </div>
        <div class="router-view">
                <router-view @saveArticleInformation="LoadData" @emitArticleLabelList="onArticleLabelLis"></router-view>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            articleList: []
        }
    },
    computed:{
        position(){
            let tar = this.$route.fullPath.split("/")[2];
            return tar === "all" ? "全部" : this.$route.fullPath.split("/")[2];
        }
    },
    mounted: function(){
    },
    created: function(){
        this.LoadData();
    },
    methods: {
        LoadData(){
            let param = this.$route.params.state || "all";
            let condition = param === "all" ? {state:"all"} : {state: "one",lable: param};

            this.$http.post('api/articleList' , condition ).then(
                respone => {
                    this.articleList = respone.body.reverse();
                },
                respone => console.log(respone)
            )
        },
        // 文章编辑页路由
        addArticle: function(){
            this.$router.push({ name: 'articleEdit' , params:{id: "new"}})
        },
        // 文章预览页
        articlePreview: function(id){
            this.$router.push({ name: 'articlePreview', params: { id: id }})
        },
        onArticleLabelLis: function(title){
        }
    },
    watch:{
        $route(val){
            if(val.name === 'articleList')
                this.LoadData();
        }
    },
    directives: {
        articleListHeight: {
            bind: function(el){
                var height = window.innerHeight - 80
                el.style.maxHeight = height + 'px'
            }
        }
    }
}
</script>

<style scoped>
li.active{
    background: #20a0ff;
}
li.active h3,li.active p{
    color: #fff !important;
}
</style>

<style scoped>
.article-list {
    width: 250px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 90px;
    border-right: 1px solid #f1f1f1;
    z-index: 1;
    background-color: #fff;
}
.article-list > ul {
    overflow: auto;
    padding-left: 12px;
    padding-right: 12px;
}
.article-list > ul > li {
    border-bottom: 1px solid #f1f1f1;
    padding: 5px 10px 5px 10px;
}
.article-list > ul > li > h3 {
    width: 170px;
    padding: 5px 0 5px 0;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}
.article-list > ul > li > p {
    font-size: 12px;
    color: #b3bbbc;
    display: flex;
    justify-content: space-between
}
.article-instructions {
    height: 65px;
    line-height: 65px;
    padding-left: 20px;
    border-bottom: 1px solid #f1f1f1;
    color: #666;
    position: relative;
}
.article-instructions > span {
    /*width: 150px;*/
    /*display: inline-block;*/
}
.article-instructions > img {
    vertical-align:middle;
    cursor: pointer;
}
.router-view {
    position: relative;
    height: 100%;
    margin-left: 321px;
}
.articlePreview-title-publish {
    color: #20a0ff;
}
.articlePreview-title-draft {
    color: #FF4949 !important;
}
.label-item {
    border: 1px #ccc solid;
    border-radius: 5px;
    padding: 2px 4px;
}
.icon-tianjia{
    right: 15px;
    font-size: 18px;
    position: absolute;
}
</style>
