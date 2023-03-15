<template>
    <div class="container py-4">
        <div v-for="(order, index) in orders" class="card mt-3">
            {{ order.id }}
            <div v-for="(order_detail, index) in order.order_details" class="border mt-2">
                <img
                :src="getImage(order_detail.productImage)"
                class="img-fluid border" style="width: 65px;">
                {{ order_detail.productName }}
                {{ order_detail.price }}
                {{ order_detail.quantity }}
            </div>
        </div>    
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            orders: []
        }
    },
    async created(){
        if (localStorage.getItem('tokenUser') != null) {
            const res = await axios.get('user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('tokenUser')

                }
            })
            this.getOrders(res.data);
        }  
    },
    methods:{
        async getOrders(user){
            await axios.get(`order/${user.id}`).then(res=>{
                this.orders = res.data
            })
        },
        getImage(image) {
            return 'http://127.0.0.1:8000/storage/uploads/products/' + image;
        },   
    }
}


</script>
