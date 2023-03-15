// import Vue from "vue";
import {createStore} from 'vuex';

// Vue.use(Vuex);

const state = {
    user: null,
    userId: null,
    carts: []
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
        },
        carts: (state) => {
            return state.carts;
          },
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
        addProductToCart(context, product) {
            context.commit('addToCart', product);
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
        },
        addToCart(state, product) {
            state.carts.push(product);
          },
  
    },
});


export default store;
