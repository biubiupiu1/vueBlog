<template>
  <div class="footer">
    <span>
      © 2017-2020 biubiupiu 版权所有
    </span>
    <span style="padding-left: 10px">
        备案号: <a class="beian" href="http://www.beian.miit.gov.cn" target="_blank">赣ICP备17013002号</a>
    </span>
  </div>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped>
  .footer span {
    font-size: .5rem;
  }

  .footer {
    text-align: center;
    padding: 20px 0 5px;
  }
  .beian {
    text-decoration: underline;
  }
  .beian:hover {
    cursor: pointer;
    color: #aa5500;
  }
</style>
