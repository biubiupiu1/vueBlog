<template>
  <div class="tags">
    <template>
      <div class="tagName">
        <h1></h1>
        <p>数据结构</p>
      </div>
      <div class="content_list">
        <lists :list="{time: '2017-09-26' , title: 'JavaScript数据结构《队列》'}" v-for="n in 4"></lists>
      </div>
    </template>
  </div>
</template>

<script>
  import Lists from '../components/Lists.vue'
  export default {
    name: 'Tags',
    data () {
      return {

      }
    },
    components:{Lists}
  }
</script>

<style scoped lang="less">
@import "../assets/css/basic";
.tagName{
  display: flex;
  padding: 1.7rem 0 1.0rem;
}
p{
  padding-left: 10px;
  font-size: .8rem;
}
.tagName h1{
  width: 8px;
  height: 25px;
  background: @active;
}
.content_list{
  padding-left: 15px;
}
@media screen and (max-width: 700px) {
}
</style>
