<template>
    <h2 class="text-center pt-5 pb-3">Danh mục sản phẩm</h2>

    <div class="px-5">

        <button class="btn-black mb-4">
            <RouterLink to="/admin/category/create" ><i class="fa-sharp fa-solid fa-plus pr-1"></i>
                Thêm danh mục 
            </RouterLink>
        </button>


        <table id="myTable" class="table table-bordered bg-white table-hover ">
            <thead class="">
                <tr>
                    <th style="width: 30px;">STT</th>
                    <th>Tên danh mục</th>
                    <th style="width: 250px;">Tùy chọn</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="index" v-for="(category, index) in categories">
                    <td>{{ index+1 }}</td>
                    <td>{{ category.name }}</td>
                    <td>
                        <button class="btn btn-warning mr-1">
                            <RouterLink class="text-a" :to="{name: 'category.edit', params: {id: category.id}}">
                                <i class="fa-solid fa-pen pr-1"></i>
                                Edit
                            </RouterLink>
                        </button>
                        
                        <button class="btn btn-danger"  @click="onDelete(category.id)"><i class="fa-sharp fa-solid fa-trash pr-1"></i>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'

export default{
    name: 'CategoriesList',
    data(){
        return{
            categories:[]
        }
    },
    created(){
        this.getCategories();
    },
    beforeUpdate(){
        $("#myTable").DataTable().destroy();

    },
    
    methods:{
        getCategories(){
            axios.get('categories').then(res => {
                this.categories = res.data;       
                setTimeout(() => {
                    $("#myTable").DataTable();
                }, 100)
            });
        },
        onDelete(categoryID){
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
                    axios.delete(`categories/${categoryID}`).then(res=>{
                        if(res.data.success){
                            this.$swal.fire('Đã xóa thành công!','','success');
                            this.getCategories();
                        }
                    })
                }
            })
        }      
   
    }
}
</script>

