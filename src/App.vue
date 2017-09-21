<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
      return{

      }
  },
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
          document.documentElement.style.fontSize = rem + "px";
      }
  }
}
</script>

<style>
@import "assets/all.less";
</style>
