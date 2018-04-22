<template>
    <div class="register">
        <form @submit.prevent="register(user);user = {};">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="user.name">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="user.email">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="user.password">
            <button type="submit">Register</button>
        </form>
        <p>Already a user? <em class="select" @click="login">Login</em></p>
    </div>
</template>


<script>
    export default {
        name: 'register',
        data() {
            return {
                user: {}
            }
        },
        computed: {},
        methods: {
            register(user) {
                this.$store.dispatch('register', user)
            },
            login(){
                this.$router.push("login")
            }
        },
        components: {}
    }
</script>


<style scoped>
</style>