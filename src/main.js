import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import './assets/style.css';
import './assets/custom.css';


import "datatables.net-bs4"
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"



 createApp(App).use(router).use(VueSweetalert2).mount('#app');

