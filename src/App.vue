<template>
  <div id="app">
    <div class="container">
      <div class="content">
        <template v-for="post in POSTS">
          <p>{{ post.body }}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        posts : []
      }
    },
    mounted() {
      axios.get('http://localhost:8081/api/ch/posts/').then(({data}) => { this.posts = data })
    },
    computed: {
      POSTS() { return this.posts }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
