<template>
           
            <nav id="mainnav" class=" fixed-top menu-home">
                <div class="container d-flex justify-content-between align-items-center py-2">
                    <div cilass="logo">
                        <i class="bi bi-music-note-list fs-3"></i>
                     </div>
                    <div class="menu ">
                        <RouterLink class="menu-item " to="/">Trang chủ</RouterLink>

                        <RouterLink class="menu-item  px-3" :to="{name: 'products'}">Sản phẩm</RouterLink>

                        <RouterLink class="menu-item " to="/">Giới thiệu</RouterLink>
                        
    
                    </div>
                    <div class="icon d-flex align-items-center">
                        <div class="cart-wrap px-2">
                            <div class="cart mt-1">
                                <i class="fa-solid fa-cart-shopping fs-5"></i>
                            </div>                        
                            <div  class="cart-list ">
                                <h5 class="cart-heading">
                                        Sản phẩm đã thêm
                                </h5>
                            

                                <ul class="cart-list-items" v-if="carts.length >0">
                                        <li :key="index" v-for="(cart, index) in carts" class="cart-item-wrap">
                                            <img :src="getImage(cart.productImage)" alt="">
                                            <div class="cart-item-info">
                                                <div class="cart-item">
                                                    <h6 class="cart-item-name">{{ cart.productName }}</h6>
                                                    <div class="cart-item-price-wrap pt-2">
                                                        <span class="cart-item-price">{{ cart.productPrice }}</span>
                                                        <span class="cart-item-multiply mx-1">X</span>
                                                        <span class="cart-item-qnt">{{ cart.quantity }}</span>

                                                        <div>
                                                            <a href="javascript:void(0)" @click="deleteCart(cart.id)">Xóa</a>
                                                        </div>
                                                    </div>
                                                </div>                                    
                                            </div>
                                        </li>                           
                                        
                                        
                                        
                            
                                </ul>

                                <div v-if="carts.length == 0" class="text-center pt-4">
                                    <img src="@/assets/images/empty-cart.jpg" class="w-75 pb-4" alt="">
                                </div>
                                
                                <div v-if="carts.length >0" class="cart-btn text-center pt-1">
                                        <RouterLink class="btn btn-dark mt-2 mb-3" :to="{name: 'carts', params: {carts: carts}}">
                                            Xem giỏ hàng
                                        </RouterLink>
                                </div>
                                
                            </div>
                        </div>
                    
                
                        <div class="dropdown">               

                            <div class="px-2 mt-1 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-user fs-5" ></i>
                            </div>

                            <ul class="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" v-if="user" href="#">{{ user.name }}</a></li>
                                <li><RouterLink class="dropdown-item" to="/orderList" v-if="user" >Đơn mua</RouterLink></li>
                                <li><a class="dropdown-item" v-if="user" href="javascript:void(0)" @click="LogOut()">Đăng xuất</a></li>
                                <li><RouterLink class="dropdown-item" to="/register" v-if="!user" >Đăng ký</RouterLink></li>
                                <li><RouterLink class="dropdown-item" to="/login" v-if="!user" >Đăng nhập</RouterLink></li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

       
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios';

export default{
    data(){
        return{
            carts : [],
        }
    },
  
    async created(){
        if(localStorage.getItem('tokenUser') != null){
            const res = await axios.get('user',{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('tokenUser')

            }
            })
            this.$store.dispatch('user', res.data);  
            this.getCart(res.data);
    

        }      
    },

    methods:{
        LogOut(){
            localStorage.removeItem('tokenUser');
            this.$store.dispatch('user', null);
            this.$router.push('login')

        },
        async getCart(user){
            await axios.get(`cart/${user.id}`).then(res=>{
                this.carts = res.data

                this.$store.dispatch('addProductToCart', res.data);                
            })
        },
        getImage(image){
            return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
        },
        deleteCart(idCart){
            axios.delete(`cart/${idCart}`).then(res=>{
                if(res.data.success){
                    alert('hello')

                }
            })
        }
    },
    computed:{
        ...mapGetters(['user']),    
    }
}
</script>