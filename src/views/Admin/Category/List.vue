<template>
    <h2 class="text-center pt-5 pb-3">Danh mục sản phẩm</h2>

    <div class="px-5">

        <button class="btn-black mb-4">
            <RouterLink to="/admin/category/create" ><i class="fa-sharp fa-solid fa-plus pr-1"></i>
                Thêm danh mục 
            </RouterLink>
        </button>


        <table id="myTable" class="table table-striped  table-bordered bg-white table-hover ">
            <thead class="">
                <tr>
                    <th style="width: 30px;">STT</th>
                    <th>Tên danh mục</th>
                    <th style="width: 350px;">Tùy chọn</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="index" v-for="(category, index) in categories">
                    <td>{{ index+1 }}</td>
                    <td>{{ category.name }}</td>
                    <td>
                        <RouterLink class="text-a" :to="{name: 'category.edit', params: {id: category.id}}">
                            <button class="btn btn-warning mr-1">
                                <i class="fa-solid fa-pen px-1"></i>
                                Chỉnh sửa
                            </button>
                        </RouterLink>
                        &nbsp
                        <button class="btn btn-danger"  @click="onDelete(category.id)"><i class="fa-sharp fa-solid fa-trash px-1"></i>Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import { mapGetters } from 'vuex'
export default{
    name: 'CategoriesList',
    data(){
        return{
            categories:[],
			admin: []

        }
    },
    async created(){
        this.getCategories();
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
        $("#myTable").DataTable().destroy();

    },
    
    methods:{
        async getCategories(){
            await axios.get('categories').then(res => {
                this.categories = res.data;       
                setTimeout(() => {
                    $("#myTable").DataTable({
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
            });
        },
        onDelete(categoryID){
            let permissionsArray = [];
            this.admin.roles.forEach(element => {
                permissionsArray.push(element.permissions);
            });
            let hasPermission = false;
            
            permissionsArray.forEach(permissions => {
                hasPermission = permissions.some(permission => permission.id === 8);
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
                            axios.delete(`categories/${categoryID}`).then(res => {
                                if (res.data.success) {
                                    this.$swal.fire('Đã xóa thành công!', '', 'success');
                                    this.getCategories();
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
   
    },
    computed:{
        ...mapGetters(['admin']),    
    }
}
</script>

