<template>
  <div class="index">
    <lists v-for="item in lists" :list="item" :key="item._id"></lists>
  </div>
</template>

<script>
  import Lists from '../components/Lists.vue'
  export default {
    components:{Lists},
    data () {
      return {
        lists: [],
      }
    },
    created(){
      this.LoadArticle();
    },
    methods:{
      LoadArticle(){
        this.$http.post('/api/articleList')
          .then(function (res) {
            this.lists = res.data;
          }.bind(this))
          .catch(function (err) {
          });
      }
    }
  }
</script>

<style scoped>

</style>
