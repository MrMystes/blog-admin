<template>
  <div class="wrapper">
    <div class="about-me">
      <img :src="logoImg" alt="logo">
      <div class="name">Mystes</div>
      <div class="words">Unlimited Code Works</div>
    </div>
    <div class="action-list">
      <router-link to="/">
        <div class="action" :style="{background: activeTab==0?'#1abc9c':'#23282D'}">
          <span class="icon-pencil2"></span>编辑文章
        </div>
      </router-link>

      <router-link to="/manage-posts">
        <div class="action" :style="{background: activeTab==1?'#1abc9c':'#23282D'}">
          <span class="icon-stack"></span>文章管理
        </div>
      </router-link>

      <router-link to="/manage-comments">
        <div class="action" :style="{background: activeTab==2?'#1abc9c':'#23282D'}">
          <span class="icon-bubbles3"></span>评论管理
        </div>
      </router-link>

      <router-link to="/settings">
        <div class="action" :style="{background: activeTab==3?'#1abc9c':'#23282D'}">
          <span class="icon-cog"></span>全局设置
        </div>
      </router-link>

    </div>
  </div>
</template>

<script>
  import logoImg from '../../assets/head.jpg'
  export default{
    data(){
      return {
        logoImg,
        activeTab: 0
      }
    },
    watch: {
      $route(){
        switch (this.$route.name) {
          case "Edit":
            this.activeTab = 0;
            break;
          case "ManagePosts":
            this.activeTab = 1;
            break;
          case "ManageComments":
            this.activeTab = 2;
            break;
          case "Settings":
            this.activeTab = 3;
            break;
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  @import "../../assets/css/constants";

  .wrapper {
    width: 100%;
    background: $dark-black;
    color: white;
    display: flex;
    flex-direction: column;
    .about-me {
      display: flex;
      flex-direction: column;
      height: 15rem;
      border-bottom: .3rem solid $admin-hr-bg;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      img {
        width: 6rem;
        height: 6rem;
        border-radius: 4rem;
        border: .4rem solid $admin-hr-bg;
      }
      .name {
        font-weight: bold;
        margin-top: 1rem;
        color: white;
      }
      .words {
        font-weight: bold;
        margin-top: 1rem;
        color: darkgrey;
      }
    }

    .action-list {
      a {
        color: white;
        font-size: 1.4rem;
        .action {
          text-align: left;
          padding: 2rem;
          margin: 1rem 0;
          &:hover {
            background: $light-black;
          }
          &::selection {
            background: $admin-dark-green;
          }
          span {
            margin-right: 1rem;
          }
        }
      }
    }
  }

</style>
