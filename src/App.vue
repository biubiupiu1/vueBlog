<template>
  <div id="app">
    <my-header></my-header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import myHeader from './components/Header.vue'
export default {
  name: 'app',
  data(){
      return{

      }
  },
  components:{ myHeader },
  created(){
    this.ReSize();
    window.addEventListener("resize", () => {
      this.ReSize();
    });
  },
  methods:{
      ReSize(){
          let w = document.body.clientWidth;
          let rem = w * 0.05 > 25 ? 25 : w * 0.05;
          this.$store.state.rem = rem;
          document.documentElement.style.fontSize = rem + "px";
      }
  }
}
</script>

<style>
@import "assets/css/all.less";
.content{
  width: 45%;
  margin: 0 auto;
}
@media screen and (max-width: 700px) {
  .content{
    width: 85%;
  }
}
</style>
