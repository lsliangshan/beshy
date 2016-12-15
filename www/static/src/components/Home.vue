<template>
  <div class="container" v-md-theme="theme">
    <div class="phone-viewport">
      <md-toolbar class="header">
        <md-button class="md-icon-button" @click="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title" v-text="appName"></h2>

        <md-menu md-direction="bottom left" md-size="4">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>color_lens</md-icon>
          </md-button>

          <md-menu-content>
            <md-subheader>设置主题色</md-subheader>
            <md-subheader class="theme-settings">
              <div class="item" v-for="t in themes">
                <div class="sample" :class="'bg-' + t" @click="setTheme(t)"></div>
              </div>
            </md-subheader>
          </md-menu-content>
        </md-menu>
      </md-toolbar>

      <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
        <md-toolbar class="md-large">
          <md-avatar class="md-large">
            <img src="../../static/img/avatar.png" :src="userInfo.avatar">
          </md-avatar>
          <div class="md-list-text-container ml10">
            <div v-if="!isLogin">
              <span>您还未登录</span>
            </div>
            <div v-else>
              <p class="lh2" v-text="userInfo.username"></p>
              <p class="lh2" v-text="userInfo.phonenum"></p>
            </div>
          </div>
          <router-link to="/login">
            <md-button class="md-icon-button WHITE" v-if="isLogin">
              <md-icon>directions_run</md-icon>
            </md-button>
          </router-link>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>whatshot</md-icon>
            <span>News</span>

            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">World</md-list-item>
                <md-list-item class="md-inset">Americas</md-list-item>
                <md-list-item class="md-inset">Europe</md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>

          <md-list-item>
            <md-icon>videogame_asset</md-icon>
            <span>Games</span>

            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">Console</md-list-item>
                <md-list-item class="md-inset">PC</md-list-item>
                <md-list-item class="md-inset">Phone</md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>

          <md-list-item>
            <md-icon>video_library</md-icon>
            <span>Video</span>

            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">Humor</md-list-item>
                <md-list-item class="md-inset">Music</md-list-item>
                <md-list-item class="md-inset">Movies</md-list-item>
                <md-list-item class="md-inset">TV Shows</md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>

          <md-list-item>
            <md-icon>shopping_basket</md-icon>
            <span>Shop</span>
          </md-list-item>

        </md-list>
      </md-sidenav>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .ml10 {
    margin-left: 10px;
  }
  .lh2 {
    line-height: 2;
  }
  .WHITE {
    color: #fff;
  }
  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .theme-settings {
    width: 100%;
    height: auto;
    /*background-color: red;*/
    padding: 0 10px;
    .item {
      width: 51px;
      height: 51px;
      padding: 5px;
      .sample {
        width: 100%;
        height: 100%;
        border: 1px solid lightgray;
      }
    }
  }

</style>
<script>
  import 'vue-material/dist/vue-material.css'
  export default {
    name: 'home',
    data () {
      return {
        themes: this.$root.themes,
        appName: this.$root.appName,
        theme: this.$root.theme,
        userInfo: this.$root.userInfo,
        isLogin: this.$root.isLogin
      }
    },
    components: {
    },
    methods: {
      toggleLeftSidenav () {
        this.$refs.leftSidenav.toggle()
      },
      toggleRightSidenav () {
        this.$refs.rightSidenav.toggle()
      },
      closeRightSidenav () {
        this.$refs.rightSidenav.close()
      },
      open (ref) {
        console.log('Opened: ' + ref)
      },
      close (ref) {
        console.log('Closed: ' + ref)
      },
      randomTheme () {
        var allThemes = JSON.parse(JSON.stringify(this.themes))
        allThemes.splice(allThemes.indexOf(this.theme), 1)
        this.theme = allThemes[Math.floor(Math.random() * allThemes.length)]
      },
      setTheme (theme) {
        console.log(theme)
        this.theme = theme
      }
    }
  }
</script>
