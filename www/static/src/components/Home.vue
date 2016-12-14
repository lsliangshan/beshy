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
          <div class="md-toolbar-container">
            <h3 class="md-title">Sidenav content</h3>
          </div>
        </md-toolbar>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cupiditate esse necessitatibus beatae nobis, deserunt ut est fugit, tempora deleniti, eligendi commodi doloribus. Nemo, assumenda possimus, impedit inventore perferendis iusto!</p>
      </md-sidenav>
    </div>
  </div>
</template>
<style scoped lang="scss">
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
        theme: this.$root.theme
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
