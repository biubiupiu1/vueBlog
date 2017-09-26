<template>
  <div class="tags">
    <div class="tagName">
      <h1></h1>
      <p>数据结构</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tags',
    data () {
      return {

      }
    }
  }
</script>

<style scoped lang="less">
@import "../assets/css/basic";
.tags{
  width: 45%;
  margin: 0 auto;
}
.tagName{
  display: flex;
  padding-top: 40px;
}
p{
  padding-left: 10px;
}
.tagName h1{
  width: 8px;
  height: 25px;
  background: @active;
}
</style>
