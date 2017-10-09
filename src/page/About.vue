<template>
  <div class="about">
    <div v-for="item in aboutBiu" class="item">
      <div class="title">
        <h4>{{item.title}}</h4>
      </div>
      <p class="content_a" v-html="item.content">
        <a href="https://lweiwei.com/">https://github.com/biubiupiu1</a>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'About',
    data () {
      return {
        aboutBiu:[
            {title:'关于作者',content: '在校大二dog、懂基础JavaScript、Vue、Node、Three等。不善表达'},
          {title:'关于博客',content: '该博客借鉴于一位<a href="https://lweiwei.com/">大佬</a>的由Angular4实现的博客系统，现用Vue重写，express提供数据接口，mongoDB储存数据，部署在阿里云的服务器上，博客的初衷是希望把自己平常学习总结的东西记录下来，以便不时之需可以查阅。 <a href="https://github.com/biubiupiu1/vueBlog">博客源码</a>'},
          {title:'联系作者',content: 'Email：1757191096@qq.com <br/>' +
          'GitHub：<a href="https://github.com/biubiupiu1">https://github.com/biubiupiu1</a><br/>' +
          'Weibo：<a href="https://weibo.com/6052229892/">https://weibo.com/6052229892/</a>'}
          ]
      }
    }
  }
</script>



<style scoped lang="less">
@import "../assets/css/basic";
.about{
  padding-top: 1.1rem;
}
.title{
  color: #444;
  display: inline-block;
  font-size: .8rem;
  border-bottom: .1rem solid @active;
  padding-bottom: .2rem;
}
p{
  padding: .4rem 0 0 .5rem;
  font-size: .65rem;
  font-weight:400;
  letter-spacing: 1px;
  line-height: 1.3rem;
}
.item{
  padding-top: 1.5rem;
}
</style>

<style lang="less">
  @import "../assets/css/basic";
  p a{
    color: @active;
  }
</style>
