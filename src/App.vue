<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{

    }
  },
}
</script>

<style lang="less">
 @import "../static/less/main.less";
 html,body {
  margin:0;
  padding:0;
  width:100%;
  height: 100%;
}
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family:'Microsoft YaHei';
  height:100%;
  width: 100%;
  color:#282D32;
  font-size:14px;
}


</style>
