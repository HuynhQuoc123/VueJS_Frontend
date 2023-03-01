<template>
    <div class="container-md pt-4">
        <div class="row mt-5">
            <div class="col-xl-3 col-lg-4 col-md-5 mt-4">
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
                    <div class="col-xl-3 col-lg-4 col-md-6 mt-4" v-for="(product, index) in products" :key="index">
                        <div class="product-item">
                            <div class="position-relative bg-light overflow-hidden">
                                <img class="img-fluid w-100" :src="getImage(product.image)" alt="">
                            </div>
                            <div class="text-center p-3">
                                <a class="d-block h6 mb-2 " href="">{{ product.name }}</a>
                                <span class=" me-1">{{ product.price }}</span>
                                
                            </div>
                            <div class="d-flex border-top">
                                <small class="w-50 text-center border-end py-2">
                                    <a class="text-body" href=""><i class="fa fa-eye text-primary me-2"></i>View detail</a>
                                </small>
                                <small class="w-50 text-center py-2"   @click="addToCart(product.id)">
                                    <a class="text-body"  href="javascript:void(0)"><i class="fa fa-shopping-bag text-primary me-2"></i>Add to cart</a>
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
            if(localStorage.getItem('tokenUser') == null){
                this.$router.push({name: 'login'});
                
            }
            else{
                this.cart.product_id = productID;
                
                await axios.get('user',{
                    headers:{
                        Authorization: 'Bearer ' + localStorage.getItem('tokenUser')
                    }
                }).then(async (res) => {
                    await axios.post(`cart/${res.data.id}`, this.cart).then(res =>{
                        // console.log(res.data)
                    })
                
                })
            }

  
       
        }
    },
    computed:{
        ...mapGetters(['user'])
    }
}
</script>

<style scoped>


/*** Product ***/
.nav-pills .nav-item .btn {
    color: var(--dark);
}

.nav-pills .nav-item .btn:hover,
.nav-pills .nav-item .btn.active {
    color: #FFFFFF;
}

.product-item {
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}

.product-item img {
    transition: .5s;
}

.product-item:hover img {
    transform: scale(1.1);
}

.product-item small:hover {
    /* color: var(--primary) !important; */
    opacity: 0.8;
    background-color: #fff;
}


</style>


