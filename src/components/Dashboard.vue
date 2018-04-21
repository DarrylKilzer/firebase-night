<template>
  <div class="dashboard">
    <div v-for="contact in contacts">
      {{contact}}
    </div>
    <h1>Add Contact</h1>
    <form @submit.prevent="add(contact);contact = {};">
      <label for="name">Name</label>
      <input type="name" id="name" v-model="contact.name">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="contact.email">
      <label for="phone">Phone</label>
      <input type="phone" id="phone" v-model="contact.phoneNumber">
      <button type="submit">Add Contact</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    data() {
      return {
        contact: {}
      }
    },
    created() {
      this.$store.dispatch('getContacts')
    },
    methods: {
      add(contact) {
        this.$store.dispatch('addContact', contact)
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