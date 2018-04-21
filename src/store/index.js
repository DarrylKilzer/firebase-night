import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import firebase from 'firebase'
import db from '../utils/firebaseInit'

vue.use(vuex)

let store = new vuex.Store({
    state: {
        user: {},
        contacts: [],
        loading: true
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setContacts(state, payload) {
            state.contacts = payload
            state.loading = false
        }
    },
    actions: {
        getContacts({ commit, dispatch }) {
            // db.collection('contacts').where(firebase.firestore.FieldPath.documentId(), "==" , "2HeDtYnpF7OF4ly6jM9b").get().then(querySnapshot => {
                db.collection('contacts').get().then(querySnapshot => {
                var contacts = []
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    contacts.push(data)
                })
                commit('setContacts', contacts)
            })
        },
        saveContact({ commit, dispatch }, payload) {
            db.collection('persons').add(payload)
                .then(function (docRef) {
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