<template>
    <h2 class="text-center pt-5 pb-3">Nhà sản xuất</h2>
    <div class="px-5">
        <button class="btn-black mb-4">
            <RouterLink to="/admin/producer/create" ><i class="fa-sharp fa-solid fa-plus pr-1"></i>
                Thêm nhà sản xuất
            </RouterLink>
        </button>
       <table class="myTable table-striped  table table-bordered bg-white table-hover">
            <thead class="">
                <tr>
                    <th>STT</th>
                    <th>Tên nhà sản xuất</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Tùy chọn</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="index" v-for="(producer, index) in producers">
                    <td>{{ index + 1 }}</td>
                    <td>{{ producer.name }}</td>
                    <td>{{ producer.phone }}</td> 
                    <td>{{ producer.email }}</td> 
                    <td>
                        <button class="btn btn-warning mr-1">
                            <RouterLink class="text-a" :to="{name: 'producer.edit', params: {id: producer.id}}">
                                <i class="fa-solid fa-pen pr-1"></i>
                                Edit
                            </RouterLink>
                        </button>
                        &nbsp
                        <button class="btn btn-danger"  @click="onDelete(producer.id)"><i class="fa-sharp fa-solid fa-trash pr-1"></i>Delete</button>
                    </td>
                </tr>
            </tbody>

       </table> 
    </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';

export default{
    name: 'ProducerList',
    data(){
        return{
            producers: []
        }
    },
    created(){
        this.getProducers();
    },
    beforeUpdate(){

    },
    methods:{
        getProducers(){
            axios.get('producers').then(res => {
                this.producers = res.data;
                setTimeout(() =>{
                    $('.myTable').DataTable();
                }, 100);
            });
        },

        onDelete(producerID){
            this.$swal.fire({
                title: 'Bạn có chắc chắn muốn xóa?',
                icon: 'warning',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy',
                }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`producers/${producerID}`).then(res=>{
                        if(res.data.success){
                            this.$swal.fire('Đã xóa thành công!','','success');
                            this.getProducers();
                        }
                    })
                }
            })
        }
    }
}
</script>