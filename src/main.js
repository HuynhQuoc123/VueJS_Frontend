import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import './axois'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap-icons/font/bootstrap-icons.css"

import './assets/css/custom.css';








import "datatables.net-bs4"
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"



 createApp(App).use(router).use(store).use(VueSweetalert2).mount('#app');

