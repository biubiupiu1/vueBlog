<template>
  <div class="index">
    <lists :list="{time: '2017-09-26' , title: 'JavaScript数据结构《队列》'}" v-for="n in 4"></lists>
  </div>
</template>

<script>
  import Lists from '../components/Lists.vue'
  export default {
    components:{Lists},
    data () {
      return {

      }
    },
    created(){
      this.LoadArticle();
    },
    methods:{
      LoadArticle(){
        this.$http.get('/api/articleList')
          .then(function (res) {
            console.log(res);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    }
  }
</script>

<style scoped>

</style>
