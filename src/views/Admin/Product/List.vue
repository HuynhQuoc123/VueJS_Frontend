<template>
    <h2 class="text-center pt-5 pb-3">Sản phẩm</h2>
    <div class="container">
        <button class="btn-black mb-4">
            <RouterLink to="/admin/product/create" ><i class="fa-sharp fa-solid fa-plus pr-1"></i>
                Thêm sản phẩm
            </RouterLink>
        </button>
    </div>
</template>
<script>
import axios from 'axios';
import $ from 'jquery';

export default{
    name: 'ProductsList',
    data(){
        return{
            products:[]
        }
    },
    created(){
        
    },
    methods:{
        getImage(image){
                return 'http://127.0.0.1:8000/public/images'+image;
            },
    }
}
</script>