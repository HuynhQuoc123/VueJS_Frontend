<template>
    <h2 class="text-center pt-5 pb-3">Sản phẩm</h2>
    <div class="px-5">
        <button class="btn-black mb-4">
            <RouterLink to="/admin/product/create" ><i class="fa-sharp fa-solid fa-plus pr-1"></i>
                Thêm sản phẩm
            </RouterLink>
        </button>
        <table  class="myTable table table-bordered bg-white table-striped table-hover ">
            <thead >
                <tr >
                    <th >Danh mục</th>
                    <th >Nhà sản xuất</th>
                    <th >Tên sản phẩm</th>
                    <th >Giá nhập</th>
                    <th >Giá bán</th>
                    <th >Số lượng</th>
                    <th>Hình ảnh</th>
                    <th style="width: 200px;">Tùy chọn</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr :key="index" v-for="(product, index) in products" class="align-middle">
                    <td>{{ product.categoryName }}</td>
                    <td>{{ product.producerName }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ formatPrice(product.import_price) }}</td>
                    <td>{{ formatPrice(product.price) }}</td>
                    <td>{{ product.quantity }}</td>
                    <td class="text-center ">

                        <img class="border rounded" :src="getImage(product.image)" width="100" alt="">

                    </td>
                    <td >
                        <RouterLink class="text-a" :to="{name: 'product.edit', params: {id: product.id}}">
                            <button class="btn btn-warning">
                                <i class="fa-solid fa-pen pr-1"></i>                                
                            </button>                        
                        </RouterLink>
                        <button class="btn btn-danger mx-1"  @click="onDelete(product.id)"><i class="fa-sharp fa-solid fa-trash pr-1"></i></button>
                        <RouterLink :to="{name: 'admin.product.detail', params: {id: product.id}}">
                            <button class="btn btn-secondary">
                            <i class="fa-solid fa-eye"></i>
                            </button>
                        </RouterLink>
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
        return {
            products: [],
            admin : []
           
        }
    },
    async created(){
        this.getProducts();
        if(localStorage.getItem('tokenAdmin') != null){
            const res = await axios.get('admin',{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin')

            }
		})		
		    this.admin = res.data;            
        }   
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
                }, 100);
            })
        },
        onDelete(productID) {
            let permissionsArray = [];
            this.admin.roles.forEach(element => {
                permissionsArray.push(element.permissions);
            });
            let hasPermission = false;

            permissionsArray.forEach(permissions => {
                hasPermission = permissions.some(permission => permission.id === 12);
                if (hasPermission) {
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
                            axios.delete(`products/${productID}`).then(res => {
                                if (res.data.success) {
                                    this.$swal.fire('Đã xóa thành công!', '', 'success');
                                    this.getProducts();
                                }
                            })
                        }
                    })
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Bạn không có quyền xóa!',
                    })
                }
            })

        },
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace('.', ',');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
    }
}
</script>
