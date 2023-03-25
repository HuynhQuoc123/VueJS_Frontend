<template>
    <div class="container-md pb-5">
        <div class="row mt-4">
            <div class="col-xl-3 col-lg-4 col-md-5 mt-3">
                <div class="bg-white p-3 shadow-sm">
                    <div class="catgory">
                        <h6>Danh mục</h6>
                        <hr class="my-1">
                        <ul class="category-list mt-3">
                            <li @click="getProducts()" class="pointer">
                                Tất cả
                            </li>
                            <li v-for="(category, index) in categories" :key="index" 
                            @click="productBelongCategory(category.id)" class="category-item pointer">
                                {{  category.name }}
                            </li>                     
                        </ul>
                    </div>

                    <div class="producer mt-5">
                        <h6>Nhà sản xuất</h6>
                        <hr class="my-1">
                        <ul class="producer-list mt-3">
                            <li @click="getProducts()" class="pointer">
                                Tất cả
                            </li>
                            <li v-for="(producer, index) in producers" 
                            @click="productBelongProducer(producer.id)" class="producer-item pointer">
                                {{ producer.name }}
                            </li>       
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-xl-9 col-lg-8 col-md-7">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-6" v-for="(product, index) in  displayedProducts" :key="index">
                        <div class="product-item mt-3">
                            <RouterLink :to="{name: 'product.detail', params: {id: product.id}}">

                                <div class="position-relative bg-light overflow-hidden">
                                    <img class="img-fluid w-100" :src="getImage(product.image)" alt="">
                                </div>
                                <div class="text-center p-3">
                                    <span class="d-block h6 mb-2">{{ product.name }}</span>
                                    <span class=" me-1">{{ formatPrice(product.price) }} <small>đ</small></span>
                                    
                                </div>
                            </RouterLink>
                            <div class="d-flex border-top">
                                <small class="w-50 text-center border-end py-2">
                                    <RouterLink :to="{name: 'product.detail', params: {id: product.id}}">
                                        <i class="fa fa-eye text-primary me-2"></i>Xem chi tiết
                                    </RouterLink>
                                </small>
                                <small class="w-50 text-center py-2 pointer" @click="addToCart(product.id)">
                                    <span class="text-body">
                                        <i class="fa fa-shopping-bag text-primary me-2"></i>Thêm vào giỏ hàng
                                    </span>
                                </small>
                            </div>
                        </div>
                    </div>    
                </div>
      
            </div>
         
           
            
        </div>
        <div class="me-3 mt-5">
            <div class="row">
                <div class="col-12">
                    <ul class="pagination justify-content-end">
                        <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                            <a class="page-link" href="#" @click.prevent="currentPage = 1">
                                <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                            <a class="page-link" href="#" @click.prevent="currentPage--">
                                <i class="fa fa-angle-left" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: currentPage === pageNumber }">
                            <a class="page-link" href="#" @click.prevent="currentPage = pageNumber">{{ pageNumber }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                            <a class="page-link" href="#" @click.prevent="currentPage++">
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                            <a class="page-link" href="#" @click.prevent="currentPage = totalPages">
                                <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
   
    

      

           
    
</template>


<script>
import axios from 'axios';
import {mapGetters} from 'vuex'
import Swal from 'sweetalert2'



export default {

    data() {
        return {
            products: [],
            categories: [],
            producers: [],
            cart: {
                product_id: '',
                quantity: 1
            },
            currentPage: 1,
            itemsPerPage: 6,


        }

    },

    computed: {
        totalPages() {
            return Math.ceil(this.products.length / this.itemsPerPage);
        },
        displayedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.products.slice(start, end);
        },
        ...mapGetters(['user']),

    },

    created() {
        this.getProducts();
        this.getCategories();
        this.getProducer();
    },
    methods: {
        getProducts() {
            axios.get('products').then(res => {
                this.products = res.data;

            })
        },
        getCategories() {
            axios.get('categories').then(res => {
                this.categories = res.data;
            })
        },
        productBelongCategory($id) {
            axios.get(`categories/${$id}`).then(res => {
                this.products = res.data.products
            })
        },
        getProducer() {
            axios.get('producers').then(res => {
                this.producers = res.data;
            })
        },
        productBelongProducer($id) {
            axios.get(`producers/${$id}`).then(res => {
                this.products = res.data.products
            })
        },

        getImage(image) {
            return 'http://127.0.0.1:8000/storage/uploads/products/' + image;
        },
        getCart(user){
            axios.get(`cart/${user.id}`).then(res=>{
                this.$store.dispatch('addProductToCart', res.data);                
            })
        },     
        async addToCart(productID) {
            console.log(this.user.id)
            if (localStorage.getItem('tokenUser') == null) {
                this.$router.push({ name: 'login' });
            }
            else {
                this.cart.product_id = productID;
                await axios.post(`cart/${this.user.id}`, this.cart).then(res => {
                    if (res.data.success) {

                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'success',
                            title: 'Đã thêm thành công'
                        })
                        
                        axios.get(`cart/${this.user.id}`).then(res => {  
                            this.$store.commit('addToCart', res.data);                         
                        })

                    }
                })
            }
        },

        changePage(pageNumber) {
            this.currentPage = pageNumber;
        },

        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace('.', ',');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
     
    },
}
</script>




