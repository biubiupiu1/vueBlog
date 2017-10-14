<template>
  <div class="tags">
    <div v-for="(item , index) in tags" :key="index">
      <div class="tagName">
        <h1></h1>
        <p>{{item.tag.tagName}}</p>
      </div>
      <div class="content_list">
        <p v-if="item.lists.length === 0">暂无内容@_@</p>
        <lists :list="_item" v-for="_item in item.lists" :key="_item._id"></lists>
      </div>
    </div>
  </div>
</template>

<script>
  import Lists from '../components/Lists.vue'
  export default {
    name: 'Tags',
    data () {
      return {
        tags: null
      }
    },
    components:{Lists},
    created(){
      this.LoadTags();
    },
    methods:{
      LoadTags(){
        this.$http.post('/api/getArticleLabel' , {state: 1})
          .then(function (res) {
              this.tags = res.data;
          }.bind(this))
          .catch(function (err) {
            console.log(err);
          });
      },
      LoadLists(){

      }
    }
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
.content_list>p{
  font-size: .65rem;
}
@media screen and (max-width: 700px) {
}
</style>
