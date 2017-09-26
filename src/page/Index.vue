<template>
  <div class="index">
    <lists :list="{time: '2017-09-26' , title: 'JavaScript数据结构《队列》'}" v-for="n in 4"></lists>
  </div>
</template>

<script>
  import Lists from '../components/Lists.vue'
  export default {
    data () {
      return {

      }
    },
    components:{Lists}
  }
</script>

<style scoped>

</style>
