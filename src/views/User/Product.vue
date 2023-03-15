<template>
    <div class="container-md pt-2">
        <div class="row mt-5">
            <div class="col-xl-3 col-lg-4 col-md-5">
                <div class="bg-white p-3 shadow-sm">
                    <div class="catgory">
                        <h6>Danh mục</h6>
                        <hr class="my-1">
                        <ul class="category-list mt-3">
                            <li class="category-item">Guitar</li>
                            <li class="category-item">Piano</li>
                            <li class="category-item">Trống</li>
                        </ul>
                    </div>

                    <div class="producer mt-5">
                        <h6>Nhà sản xuất</h6>
                        <hr class="my-1">
                        <ul class="category-list mt-3">
                            <li class="category-item">Guitar</li>
                            <li class="category-item">Piano</li>
                            <li class="category-item">Trống</li>
                            <!-- {{ products }} -->
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-xl-9 col-lg-8 col-md-7">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-6" v-for="(product, index) in products" :key="index">
                        <div class="product-item">
                            <RouterLink :to="{name: 'product.detail', params: {id: product.id}}">

                                <div class="position-relative bg-light overflow-hidden">
                                    <img class="img-fluid w-100" :src="getImage(product.image)" alt="">
                                </div>
                                <div class="text-center p-3">
                                    <span class="d-block h6 mb-2">{{ product.name }}</span>
                                    <span class=" me-1">{{ formatPrice(product.price) }} <small>vnđ</small></span>
                                    
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
    </div>
    

      

           
    
</template>


<script>
import axios from 'axios';
import {mapGetters} from 'vuex'
import Swal from 'sweetalert2'



export default{
    data(){
        return{
            products: [],
            cart:{
                product_id: '',
                quantity  :1
            }

            
        }
    
    },
    computed:{
        ...mapGetters(['user'])
    },
    created(){
        this.getProducts()
    },
    methods:{
        getProducts(){
            axios.get('products').then(res => {
                this.products = res.data;
             
            })
        },    
        
        getImage(image){
            return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
        },
        
        async addToCart(productID){
            console.log(this.user.id)
            if(localStorage.getItem('tokenUser') == null){
                this.$router.push({name: 'login'});                
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

                    }
                })

            }
       
        },

        formatPrice(value) {
          let val = (value/1).toFixed(0).replace('.', ',') ;
          return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },   
    },
    
}
</script>




