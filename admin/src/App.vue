<template>
    <div id="app">
        <div class="left-sidebar">
            <div class="admin-logo">
                <img src="./assets/logo.png" width="40" height="40">
            </div>
            <div :class="['article-logo' , {active: activeRoute === 'articleList'}]" @click="articleList">
                <i class="iconfont icon-wenzhang centerXY"></i>
            </div>
            <div :class="['label-logo' , {active: activeRoute === 'atricleLabel'}]" @click="articleLabel">
                <i class="iconfont icon-biaoqian centerXY"></i>
            </div>
        </div>
        <div class="article-list-wrap">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            activeRoute: ''
        }
    },
    created(){
        this.activeRoute = this.$route.fullPath.split("/")[1];
    },
    mounted: function(){

    },
    watch:{
        $route(val){
            this.activeRoute = val.fullPath.split("/")[1];
        }
    },
    methods: {
        // 文章列表路由
        articleList: function(){
            this.$router.push('/articleList/all')
        },
        // 文章标签路由
        articleLabel: function(){
            this.$router.push('/atricleLabel')
        },
        // 个人中心
        personalCenter: function(){
            this.$router.push('/personalCenter')
        }
    },
    directives: {

    }
}
</script>

<style scoped="">
.left-sidebar{
    text-align: center;
}
.left-sidebar i{
    font-size: 30px;
    width: 40px;
    height: 40px;
    color: #20a0ff;
    border: 1px solid #20a0ff;
    padding: 5px;
    line-height: 40px;
    border-radius: 52px;
}
.active i{
    background-color: #20a0ff;
    color: #fff;
}
</style>

<style>
* {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
body {
    position: relative;
}
pre {
    background-color: #f5f5f5;
    padding: 0.5rem 1rem;
    border-radius: 3px;
    margin: 10px 0 10px 0;
    overflow-x: auto;
}
blockquote {
    border-left: 10px #e4e9eb solid;
    background-color: #f5f5f5;
    padding: 15px 20px;
    margin: 10px 0 10px 0;
}
strong {
    color: #579eff;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    overflow: hidden;
}
.left-sidebar {
    width: 90px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    border-right: 1px solid #f1f1f1;
    background-color: #f8f8f8;
}
.admin-logo {
    width: 70px;
    height: 80px;
    margin: 0 auto;
    margin-top: 20px;
    border-bottom: 1px solid #eaeaea;
}
.admin-logo > img {
    overflow: hidden;
    display: block;
    margin: 0 auto;
}
.article-logo {
    position: relative;
    height: 100px;
    border-bottom: 1px solid #eaeaea;
}
.article-logo > img {
    display: block;
    margin: 0 auto;
    cursor: pointer;
}
.label-logo {
    position: relative;
    height: 100px;
    margin-top: 20px;
    border-bottom: 1px solid #eaeaea;
}
.label-logo > img {
    display: block;
    margin: 0 auto;
    cursor: pointer;
}
.use-logo {
    height: 100px;
    margin-top: 20px;
}
.use-logo > img {
    display: block;
    margin: 0 auto;
    cursor: pointer;
}
.sidebar-switch {
    height: 100px;
    position: absolute;
    bottom: 30px;
    left: 0;
}
.sidebar-switch > img {
    display: block;
    margin: 0 auto;
}
.article-list-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}
.centerXY{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50% , -50%);
}
.centerX{
    position: absolute;
    left: 50%;
    transform: translate(-50% , 0%);
}
.centerY{
    position: absolute;
    top: 50%;
    transform: translate(0% , -50%);
}
</style>
