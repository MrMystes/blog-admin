<template>
  <div id="app">
    <header id="app-header">
      <header-view></header-view>
    </header>
    <div id="app-main">
      <div class="left-menu">
        <left-menu></left-menu>
      </div>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>
<script>
  import headerView from './components/header/HeaderView.vue';
  import leftMenu from './components/main_content/LeftMenu.vue'
  export default {
    components: {
      headerView,
      leftMenu
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "./assets/css/constants";

  html {
    overflow-y: scroll; /*默认显示右侧滚动条，防止页面切换抖动 */
    font-size: 12px;
  }

  * {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: Microsoft JhengHei, SimSun, Helvetica, serif;
  }

  a {
    text-decoration: none
  }

  #app {
    display: flex;
    height: 100vh;
    flex-direction: column;

    #app-header {
      width: 100%;
      height: 3rem;
    }
    #app-main {
      width: 100%;
      flex-grow: 1;
      display: flex;
      flex-wrap: nowrap;
      border-top: .3rem solid $admin-hr-bg;
      .left-menu {
        background: $dark-black;
        width: 15rem;
        flex-grow: 0;
        flex-shrink: 0;
      }
      .main-content {
        background: $light-black;
        flex-grow: 1;
      }
    }
  }

</style>
