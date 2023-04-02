<template>
    <div>
        <h2 class="text-center pt-5 pb-3">Danh sách nhân viên</h2>
        <div class="px-5">
            <button class="btn-black mb-4">
                <RouterLink to="/admin/employee/create"><i class="fa-sharp fa-solid fa-plus pr-1"></i>
                    Thêm nhân viên
                </RouterLink>
            </button>

            <table class="myTable table table-bordered bg-white table-striped table-hover ">
                <thead class="">
                    <tr>
                        <th>Tên nhân viên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th style="width: 250px;">Vai trò</th>
                        <th>Tùy chọn</th>
                    </tr>
                </thead>
                
                
                <tbody>
                    <tr v-for="(employee, index) in employees" :key="index">
                        <td>{{ employee.name }}</td>
                        <td>{{ employee.phone }}</td>
                        <td>{{ employee.email }}</td>
                        <td >
                            <span v-for="(role, i) in employee.roles" :key="i" class="bg-primary rounded text-white px-2 py-1 ">                            
                                {{ role.name }}
                            </span>
                        </td>
                        <td>
                            <RouterLink class="text-a" :to="{name: 'employee.edit', params: {id: employee.id}}">
                                <button class="btn btn-warning mr-1">
                                    <i class="fa-solid fa-pen px-1"></i>
                                    Chỉnh sửa
                                </button>
                            </RouterLink>
                            &nbsp   
                            <button @click="blocked(employee.id)" v-if="employee.blocked" class="btn btn-success">
                                Khóa
                            </button>  
                            <button @click="blocked(employee.id)" v-else class="btn  btn-danger">
                                Mở khóa
                            </button>               
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>

</template>

<script>
import axios from 'axios';
export default {
    name: 'EmployeesList',
    data(){
        return{
            employees:[],
			admin: [],

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
    methods:{
        blocked(id){
            axios.delete(`employees/${id}`).then(res=>{
                if(res.data.success){
                    this.getEmployees()
                }
            })
        },
        async getEmployees(){
            await axios.get('employees').then(res=>{
                this.employees = res.data;
                console.log(this.employees)
               
            })
        }
    }

}
</script>

