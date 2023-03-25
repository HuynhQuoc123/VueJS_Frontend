<template>
    <div class="container py-4">
        <div class="row ">
            <div class="col-3 ">
               <div class="card p-3 mt-3">
                    <div>
                        <img src="@/assets/images/user.png"  alt="" width="45" class="rounded-circle">
                        
                        {{ user.name }}
                        <hr>
                        <ul>
                            <li>Tài khoản của tôi</li>
                            <li>Đơn mua</li>
                            <li>Thông báo</li>
                        </ul>
                     
                    </div>
                </div>
            </div>
            <div class="col-9">
                <div v-for="(order, index) in orders" class="card mt-4 p-3">

                    <div class="d-flex justify-content-between">
                        <div class="h6 m-0">Mã đơn hàng: DH{{ order.id}}</div>
                        <div>
                            Trạng thái:
                            <span class="">{{ order.payments }} - </span>
                            <span v-if="order.status == 0">Chờ xử lý</span>
                            <span v-if="order.status == 1">Đang giao hàng</span>
                        </div>
                    </div>
                    <div v-for="(order_detail, index) in order.order_details" class="">
                        <hr>
                        <div class="d-flex">
                            <img :src="getImage(order_detail.productImage)" class="img-fluid border" style="width: 100px;">
                            <div class="mx-3 w-100 d-flex justify-content-between">
                                <div>
                                    <div class="h6">{{ order_detail.productName }}</div>
                                    <div>Đơn giá: {{ formatPrice(order_detail.price) }}</div>
                                    <div>Số lượng: {{ order_detail.quantity }}</div>


                                </div>
                                <div>{{ formatPrice(order_detail.price * order_detail.quantity) }}</div>
                            </div>
                        </div>              
                        <hr>
                    </div>
                    <h6 class="m-0 text-end">
                        Tổng tiền: {{ formatPrice(order.total) }}
                    </h6>
                </div>  
            </div>
        </div>  
    </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex'


export default {
    data(){
        return{
            orders: [],
            user: []
        }
    },
    async created(){
        if (localStorage.getItem('tokenUser') != null) {
            const res = await axios.get('user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('tokenUser')

                }
            })
            this.user = res.data
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
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace('.', ',');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
    }
}


</script>
