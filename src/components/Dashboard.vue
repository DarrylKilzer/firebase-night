<template>
  <div class="dashboard">
    <div v-for="contact in contacts">
      {{contact}}
    </div>
    <button @click=""></button>
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created() {
      // this.$store.dispatch('getContacts')
    },
    methods: {
      add() {
        this.$router.push("/add")
      }
    },
    computed: {
      contacts() {
        return this.$store.state.contacts
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