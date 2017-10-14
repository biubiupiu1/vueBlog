<template>
  <div class="lists">
    <router-link :to="`Article/${this.list._id}`">
      <li class="list">
        <p class="time">{{list.date | loadDate}}</p>
        <p class="title">{{list.title}}</p>
      </li>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'List',
  data () {
    return {

    }
  },
  props:['list'],
  created(){
  },
  filters:{
    loadDate(val){
      return val.split(" ")[0];
    },
  }
}
</script>

<style scoped lang="less">
@import "../assets/css/basic";
.list:hover p{
  color: @active;
  cursor: pointer;
}
.list{
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  padding: 25px 0;
  line-height: 30px;
}
p{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  letter-spacing: 1px;
}
.time{
  color: #999;
  font-size: 14px;
  min-width: 90px;
}
.title{
  font-weight: 400;
  color: #444;
  padding-left: 50px;
}
@media screen and (max-width: 700px) {
  .list{
    padding: 1.2rem 0;
    display: block;
    line-height: normal;
  }
  .time{
    font-size: .7rem;
    margin-bottom: .5rem;
  }
  .title{
    font-size: .85rem;
    font-weight: 400;
    padding: 0;
  }
}
</style>
