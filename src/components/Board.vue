<template>
    <div class="post">
      <div v-for="post in posts">
        {{post}}
      </div>
      <h1>Add Post</h1>
      <form @submit.prevent="add(post);post = {};">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="post.title">
        <label for="body">Body</label>
        <input type="text" id="body" v-model="post.body">
        <button type="submit">Add Post</button>
      </form>
    </div>
  </template>
  
  <script>
    export default {
      name: 'post',
      data() {
        return {
          post: {}
        }
      },
      created() {
        this.$store.dispatch('getPosts')
      },
      methods: {
        add(post) {
          this.$store.dispatch('addPost', post)
        }
      },
      computed: {
        posts() {
          return this.$store.state.posts
        }
      }
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    h1,
    h2 {
      font-weight: normal;
    }
  
    ul {
      list-style-type: none;
      padding: 0;
    }
  
    li {
      display: inline-block;
      margin: 0 10px;
    }
  
    a {
      color: #42b983;
    }
  </style>