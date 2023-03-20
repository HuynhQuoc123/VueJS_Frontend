<template>
    <div v-if="admin.id_role == 1">
        <h2 class="text-center pt-5 pb-3">Danh sách nhân viên</h2>
        <div class="px-5">

            <button class="btn-black mb-4">
                <RouterLink to="/admin/employee/create"><i class="fa-sharp fa-solid fa-plus pr-1"></i>
                    Thêm nhân viên
                </RouterLink>
            </button>


            <table class="myTable table-striped  table table-bordered bg-white table-hover ">
                <thead class="">
                    <tr>
                        <th>Tên nhân viên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Vai trò</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(employee, index) in employees" :key="index">
                        <td>{{ employee.name }}</td>
                        <td>{{ employee.phone }}</td>
                        <td>{{ employee.email }}</td>
                        <td>
                            <span v-if="employee.id_role == 1">Admin</span>
                            <span v-else>Nhân viên</span>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>

</template>

<script>
import axios from 'axios';
import $ from 'jquery';
export default {
    name: 'EmployeesList',
    data(){
        return{
            employees:[],
			admin: []

        }
    },
   async created(){
        this.getEmployees();
        if(localStorage.getItem('tokenAdmin') != null){
            const res = await axios.get('user',{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin')

            }
		})		
		this.admin = res.data;
    }
    },
    beforeUpdate(){
        $('.myTable').DataTable().destroy();
    },
    methods:{
        async getEmployees(){
            await axios.get('allEmployee').then(res=>{
                this.employees = res.data;
                setTimeout(() => {
                    $(".myTable").DataTable();
                }, 100)
            })
        }
    }

}
</script>

