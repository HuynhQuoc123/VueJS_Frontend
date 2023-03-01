// import Vue from "vue";
import {createStore} from 'vuex';

// Vue.use(Vuex);

const state = {
    user: null,
    userId: null
};
const store = createStore({
    state,
    getters: {
        admin: (state) => {
            return state.admin;
        },
        user: (state) => {
            return state.user;
        },
        userId: (state) => {
            return state.userId;
        }
    },
    actions: {
        admin(context, admin) {
            context.commit('admin', admin);
        },
        user(context, user) {
            context.commit('user', user);
        },
        userId(context, userId) {
            context.commit('userId', userId);
        },
    },
    mutations:{
        admin(state, admin) {
            state.admin = admin
        },
        user(state, user) {
            state.user = user
        },
        userId(state, userId) {
            state.userId = userId
        }
    },
});


export default store;
