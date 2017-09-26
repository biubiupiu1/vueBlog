<template>
  <div class="header">
    <div class="left">
      <img src="../assets/imgs/logo.png" alt="" class="centerXY">
    </div>
    <div class="right">
      <ul class="tabs">
        <x-nav key="PC"></x-nav>
      </ul>
      <i class="iconfont icon-list list_btn" @click="ToggleLists"></i>
    </div>
    <div class="clear"></div>
    <div class="lists" :style="{'height': Lheight + 'px'}" @click="ToggleLists">
      <x-nav key="Mobile"></x-nav>
    </div>
  </div>
</template>

<script>
  import XNav from '../components/Nav.vue'
  export default {
    name: "Header",
    data () {
      return {
        Lheight: 0,
      }
    },
    components:{XNav},
    methods:{
      ToggleLists(){
        let rem = this.$store.state.rem;
        this.Lheight = this.Lheight ? 0 : rem * 1.5 * 3;
      }
    }
  }
</script>

<style scoped lang="less">
@import '../assets/css/basic.less';
@header_HMax: 100px;
@header_HMin: 70px;
.header{
  height: @header_HMax;
  line-height: @header_HMax;
  position: relative;
}

.left,.right{
  height: 100%;
}
.left{
  position: relative;
  min-width: @header_HMin * 4 / 3;
  width: 180px;
}
.left img{
  height: 100%;
}
.right ul div{
  display: flex;
}
.right{
  width: 25%;
}
.list_btn{
  font-size: 1.8rem;
  float: right;
  margin-right: .4rem;
  display: none;
}
.lists{
  display: none;
  position: absolute;
  z-index: 2;
  line-height: 1.5rem;
  top: @header_HMin - 3;
  text-align: center;
  width: 100%;
  box-shadow:1px 2px 3px #e6e6e6;
  background: #fff;
  transition: all .3s;
  overflow: hidden;
}

@media screen and (max-width: 700px) {
  .left{
    width: auto;
  }
  .right .tabs{
    display: none;
  }
  .list_btn,.lists{
    display: block;
  }
  .header{
    height: @header_HMin;
    line-height: @header_HMin;
    box-shadow:1px 2px 3px #e6e6e6;
  }
}
</style>
