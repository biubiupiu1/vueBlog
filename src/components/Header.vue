<template>
  <div class="header">
    <div class="left">

    </div>
    <div class="right">
      <ul>
        <li v-for="item in tabs">{{item}}</li>
      </ul>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data () {
      return {
        tabs: ["Home" , "Tags" , "About"],
      }
    }
  }
</script>

<style scoped lang="less">
@import '../assets/basic.less';
.header{
  height: @header_H;
}
.left,.right{
  height: 100%;
}
.right ul{
  display: flex;
  line-height: @header_H;
}
.right li{
  width: 33%;
  text-align: center;
  font-size: .7rem;
}
.right{
  width: 25%;
}
</style>
