<template>
    <div>
        <h2 class="text-center pt-5 pb-3">Quản lý vai trò</h2>
        <div class="px-5">
            <button class="btn-black mb-4">
                <RouterLink to="/admin/role/create"><i class="fa-sharp fa-solid fa-plus pr-1"></i>
                    Thêm vai trò
                </RouterLink>
            </button>

            <table class="myTable table table-bordered bg-white table-striped table-hover ">
                <thead class="">
                    <tr>
                        <th>STT</th>
                        <th>Tên vai trò</th>
                        <th>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(role, index) in roles" :key="index">
                        <td>{{ index+1 }}</td>
                        <td>{{ role.name }}</td>
                        <td>
                            <RouterLink class="text-a" :to="{name: 'role.edit', params: {id: role.id}}">
                                <button class="btn btn-warning mr-1">
                                    <i class="fa-solid fa-pen pr-1"></i>
                                    Chỉnh sửa
                                </button>
                            </RouterLink>
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
    data(){
        return{
            roles:[]
        }
    },
    created(){
        this.getRoles();
    },
    methods:{
        getRoles(){
            axios.get('roles').then(res=>{
                this.roles = res.data;
                
            })
        }
    }


}
</script>

