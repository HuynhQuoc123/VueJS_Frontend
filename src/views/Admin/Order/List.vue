<template>
    <h2 class="text-center pt-5 pb-4">Đơn hàng</h2>
    <div class="px-5">
        <table class="myTable table table-bordered bg-white table-hover">
            <thead class="">
                <tr>
                    <th>Mã đơn hàng</th>
                    <th>Tên khách hàng</th>
                    <th>Ngày đặt</th>
                    <th>Hình thức</th>
                    <th>Chi tiết</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in orders " :key="index">
                    <td>DH{{ order.id }}</td>
                    <td>{{ order.name }}</td>
                    <td>{{ order.order_date }}</td>
                    <td>{{ order.payments }}</td>
                    <td>
                        <RouterLink :to="{name: 'order.detail', params: {id: order.id}}" class="text-primary">Xem chi tiết</RouterLink>
                    </td>
                    <td >
                        <button v-if="order.status == 0" @click="updateStatus(order.id)" class="btn btn-danger">Chờ xử lý</button>
                        <button v-if="order.status == 1" class="btn btn-success">Đang giao hàng</button>
                    </td>

                </tr>
                
            </tbody>

       </table> 
    </div>
    
</template>

<script>
import axios from 'axios';
import $ from 'jquery'

export default {
    name: 'OrderList',
    data(){
        return{
            orders: [],
            employeeId: ''
        }
    },
    async created(){
        this.getOrder()
        if(localStorage.getItem('tokenAdmin') != null){
            const res = await axios.get('user',{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin')
            }
            
		})
        this.employeeId = res.data.id

            
        }  
    },
    beforeUpdate(){
        $(".myTable").DataTable().destroy();

    },
    methods:{
        async getOrder(){
            await axios.get('orders').then(res=>{
                this.orders = res.data;
                setTimeout(() => {
                    $(".myTable").DataTable({
                        "language": {
                            "search": "Tìm kiếm:",
                            "searchPlaceholder": "Tìm kiếm",
                            "loadingRecords": "Đang tải...",
                            "zeroRecords": "Không tìm thấy kết quả",
                            "lengthMenu": "Hiển thị _MENU_ bản ghi",
                            "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
                            "paginate": {
                                "first": "Trang đầu",
                                "last": "Trang cuối",
                                "next": "Trang sau",
                                "previous": "Trang trước"
                            }
                        },
                        "lengthMenu": [5, 10, 25, 50],
                        "pageLength": 5
                    });
                }, 100)
            })
        }, 
        updateStatus(orderId){
            axios.post(`order/update-${orderId}`, {id_employee: this.employeeId}).then(res=>{
                if(res.data.success){
                    this.getOrder();
                }
            })
        }
    }

}
</script>

