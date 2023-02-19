<template>
    <h2 class="text-center pt-5 pb-3">Sản phẩm</h2>
    <div class="px-5">
        <button class="btn-black mb-4">
            <RouterLink to="/admin/product/create" ><i class="fa-sharp fa-solid fa-plus pr-1"></i>
                Thêm sản phẩm
            </RouterLink>
        </button>
        <table  class="myTable table table-bordered bg-white table-hover ">
            <thead>
                <tr>
                    <th>Tên danh mục</th>
                    <th>Tên nhà sản xuất</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá nhập</th>
                    <th>Giá bán</th>
                    <th>Số lượng</th>
                    <th>Hình ảnh</th>
                    <th>Tùy chọn</th>
                    </tr>
            </thead>
            <tbody>
                <tr :key="index" v-for="(product, index) in products">
                    <td>{{ product.category.name }}</td>
                    <td>{{ product.producer.name }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.import_price }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.quantity }}</td>
                    <td class="text-center">
                        <img :src="getImage(product.image)" width="100" alt="">
                    </td>
                    <td>
                        <button class="btn btn-warning mr-1">
                            <RouterLink class="text-a" :to="{name: 'product.edit', params: {id: product.id}}">
                                <i class="fa-solid fa-pen pr-1"></i>
                                Edit
                            </RouterLink>
                        </button>
                        
                        <button class="btn btn-danger"  @click="onDelete(product.id)"><i class="fa-sharp fa-solid fa-trash pr-1"></i>Delete</button>
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
    name: 'ProductsList',
    data(){
        return{
            products:[]
        }
    },
    created(){
        this.getProducts();
    },
    beforeUpdate(){
        $(".myTable").DataTable().destroy();
    },
    methods:{
        getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
        },
        getProducts(){
            axios.get('products').then(res => {
                this.products = res.data;
                setTimeout(() => {
                    $(".myTable").DataTable();
                }, 100)
            })
        },
        onDelete(productID){
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
                    axios.delete(`products/${productID}`).then(res=>{
                        if(res.data.success){
                            this.$swal.fire('Đã xóa thành công!','','success');
                            this.getProducts();
                        }
                    })
                }
            })

        }
    }
}
</script>