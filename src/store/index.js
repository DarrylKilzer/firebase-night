import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import firebase from 'firebase'
import db from '../utils/firebaseInit'

vue.use(vuex)

let store = new vuex.Store({
    state: {
        user: {},
        boards: [],
        activeBoard: {},
        posts: [],
        replies: {},
        loading: true
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setBoards(state, payload) {
            state.boards = payload
            state.loading = false
        },
        setPosts(state, payload) {
            state.posts = payload
        },
        setActiveBoard(state, payload) {
            state.activeBoard = payload
        },
    },
    actions: {
        getBoards({ commit, dispatch }) {
            // db.collection('boards').where(firebase.firestore.FieldPath.documentId(), "==" , "2HeDtYnpF7OF4ly6jM9b").get().then(querySnapshot => {
            db.collection('boards').get().then(querySnapshot => {
                var boards = []
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    data.id = doc.id
                    boards.push(data)
                })
                commit('setBoards', boards)
            })
        },
        addBoard({ commit, dispatch }, payload) {
            db.collection('boards').add(payload)
                .then(function (docRef) {
                    console.log('Document written with ID: ', docRef.id)
                    dispatch('getBoards')
                })
                .catch(function (error) {
                    console.error('Error adding document: ', error)
                })
        },
        activeBoard({ commit, dispatch }, board) {
            commit('setActiveBoard', board)
            router.push('/boards/'+board.id)
        },
        getPosts({ commit, dispatch }, boardId) {
            db.collection('posts').where("boardId", "==" , boardId).get().then(querySnapshot => {
            // db.collection('posts').get().then(querySnapshot => {
                var posts = []
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    data.id = doc.id
                    posts.push(data)
                })
                commit('setPosts', posts)
            })
        },
        addPost({ commit, dispatch }, payload) {
            db.collection('posts').add(payload)
                .then(function (docRef) {
                    dispatch('getPosts', payload.boardId)
                    console.log('Document written with ID: ', docRef.id)
                })
                .catch(function (error) {
                    console.error('Error adding document: ', error)
                })
        },
        register({ commit, dispatch }, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(res => {
                    commit('setUser', firebase.auth().currentUser)
                    router.push('/')
                })
                .catch(err => {
                    console.error(err)
                })
        },
        login({ commit, dispatch }, payload) {
            firebase.auth().signInAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
                .then(res => {
                    commit('setUser', firebase.auth().currentUser)
                    router.push('/')
                })
                .catch(err => {
                    console.error(err)
                })
        },
        authenticate({ commit, dispatch }) {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    commit('setUser', user)
                    router.push('/')
                } else {
                    commit('setUser', {})
                    router.push('login')
                }
            })
        },
        logout({ commit, dispatch }) {
            firebase.auth().signOut()
                .then(res => {
                    commit('setUser', {})
                    router.push('login')
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }
})

export default store