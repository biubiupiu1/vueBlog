<template>
  <div id="app">
    <div class="top-wrap">
      <my-header></my-header>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import myHeader from './components/Header.vue'
import Footer from  './components/Footer'
export default {
  name: 'app',
  data(){
      return{

      }
  },
  components:{ myHeader, Footer },
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
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}
</style>
