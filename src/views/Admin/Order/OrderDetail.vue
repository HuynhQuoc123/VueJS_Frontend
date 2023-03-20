<template>
    <div class="my-5">
        <div class="mt-5 px-3 py-4 card w-75 mx-auto">
            <div class="d-flex justify-content-between">
                <div> 
                    <i class="fa-solid fa-chevron-left"></i>
                    <RouterLink to="/admin/orders">Trở lại </RouterLink>
                </div>
                <div>
                    Mã đơn hàng: DH{{ order.id }} | 
                    <span v-if="order.status == 0">Chờ xử lý</span>
                    <span v-if="order.status == 1">Đang giao hàng</span>

                </div>
            </div>
            <hr class="mt-2"> 
            <div>
                <h6 class="">Nhân viên bán hàng</h6> {{ employee.name }} - {{ employee.phone }}
            </div>
            <hr>
            <div class="mt-2">
                <h6>Thông tin khách hàng</h6>
                <div>
                    {{ order.name }} - {{ order.phone }}: 
                    <i>{{ order.address }}, {{ order.ward }}, {{ order.district }}, {{ order.city }}.</i>
                </div>
            </div>  
          
        </div>

        <div class="card mt-3 px-2 py-3 w-75 mx-auto">
            <div class="d-flex justify-content-between">
                <div>
                    Tổng thanh toán: {{ formatPrice(order.total) }}
                </div>
                <div>
                    Hình thức thanh toán: {{ order.payments }}
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

   
        </div>
    </div>
    
</template>

<script>
import axios from 'axios';
export default {
    name: 'OrderDetail',
    data(){
        return{
            orderList: [],
            order: {},
            employee:[]
        }
    },
    created(){
        let orderId = this.$route.params.id;
        if(orderId){
            this.getOrder(orderId)
        }
    },
    methods:{
        getOrder(orderId){
            axios.get(`order/order-${orderId}`).then(res=>{
                this.orderList = res.data;
                this.order = this.orderList[0];
                this.employee = this.order.employee
                console.log(this.order.order_details)
            });
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

