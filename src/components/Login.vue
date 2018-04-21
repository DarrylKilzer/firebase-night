<template>
    <div class="login">
        <form @submit.prevent="login(user);user = {};">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="user.email">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="user.password">
            <button type="submit">Login</button>
        </form>
        <p>Not a user? <em class="select" @click="register">Register</em></p>        
    </div>
</template>


<script>
    export default {
        name: 'login',
        data() {
            return {
                user: {}
            }
        },
        computed: {},
        methods: {
            login(user) {
                this.$store.dispatch('login', user)
            },
            register(){
                this.$router.push("register")
            }
        },
        components: {}
    }
</script>


<style scoped>
</style>