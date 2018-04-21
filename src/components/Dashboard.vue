<template>
  <div class="dashboard">
    <div v-for="board in boards">
      {{board}}
    </div>
    <h1>Add Board</h1>
    <form @submit.prevent="add(board);board = {};">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="board.name">
      <label for="description">Description</label>
      <input type="text" id="description" v-model="board.description">
      <button type="submit">Add Board</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    data() {
      return {
        board: {}
      }
    },
    created() {
      this.$store.dispatch('getBoards')
    },
    methods: {
      add(board) {
        this.$store.dispatch('addBoard', board)
      }
    },
    computed: {
      boards() {
        return this.$store.state.boards
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