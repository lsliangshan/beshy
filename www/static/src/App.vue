<template>
  <div id="app">
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  height: 100%;
}
  .bg-default {
      background-color: #2196f3;
  }
    .bg-indigo {
        background-color: #3f51b5;
    }
    .bg-brown {
        background-color: #795548;
    }
    .bg-purple {
        background-color: #9c27b0;
    }
    .bg-orange {
        background-color: #ff9800;
    }
    .bg-blue {
        background-color: #2196f3;
    }
    .bg-green {
        background-color: #4caf50;
    }
    .bg-light-blue {
        background-color: #03a9f4;
    }
    .bg-teal {
        background-color: #009688;
    }
    .bg-blue-grey {
        background-color: #607d8b;
    }
    .bg-cyan {
        background-color: #00bcd4;
    }
    .bg-red {
        background-color: #f44336;
    }
    .bg-white {
        background-color: #ffffff;
    }
    .bg-grey {
        background-color: #e0e0e0;
    }
</style>
