<template>
  <div class="nav">
    <li v-for="item in tabs" :class="{active : activeRoute === item.title}">
      <router-link :to="item.path">{{item.title}}</router-link>
    </li>
  </div>
</template>

<script>
  export default {
    name: 'Nav',
    data () {
      return {
        tabs: [{path: '/' , title: 'Home'},
          {path: '/tags' , title: 'Tags'},
          {path: '/about' , title: 'About'},],
        activeRoute: null,
      }
    },
    watch:{
      $route(val){
        this.activeRoute = this.$route.name;
      }
    },
    created(){
      this.activeRoute = this.$route.name;
    }
  }
</script>

<style scoped lang="less">
@import '../assets/css/basic.less';
.right li{
  width: 33%;
  text-align: center;
  font-size: .65rem;
}
li.active a{
  color: @active;
}
</style>
