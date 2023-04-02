<template>
    <div>
        <div class="card  w-75 mt-5 py-3 px-5 mx-auto">
        <h3 class="mx-auto my-3 pb-2">Thêm nhân viên</h3>
        <form @submit.prevent="save()">
            <div class="form-group mt-3">
                <label class="h6">Tên nhân viên</label>
                <input v-model="employee.name" type="text" class="form-control">
            </div>
            <div class="form-group my-3">
                <label class="h6">Email</label>
                <input v-model="employee.email"  type="text" class="form-control"/>
            </div>
            <div class="form-group my-3">
                <label class="h6">Số điện thoại</label>
                <input v-model="employee.phone" v-bind="setPassword()"  type="text" class="form-control"/>
            </div>
            <div class="form-group my-3">
                <label class="h6">Mật khẩu</label>
                <input v-model="employee.phone"  type="password" class="form-control"/>
            </div>
            <div class="form-group my-3">
                <h6 class="col-1 m-0">Vai trò: </h6>
                <div class="d-flex mt-2">
                    <div v-for="(role, index) in allRoles" :key="index" class="form-check col-2 pointer m-0" >
                        <input class="form-check-input" v-model="roles" type="checkbox" :value="role.id" :id="role.name">
                        <label class="form-check-label" :for="role.name">
                            {{ role.name }}
                        </label>
                    </div>
                </div>
            </div>

            <button className='btn btn-success' type="submit" >Save</button> &nbsp;
            <button type="reset" class="btn btn-danger">Cancel</button>
       
        </form>    
        {{ a }}


        
     </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            employee:{
                name: '',
                phone: '',
                email: '',
                password: ''
            },
            allRoles: [],
            roles: []
        }
    }, 
    created(){
        this.getRoles();
        let employeeId = this.$route.params.id;
        if(employeeId){
            this.getEmployee(employeeId);
        }
    },
    methods:{
        save(){
            if(this.employee.id){
                axios.put(`employees/${this.employee.id}`, this.employee).then(res=>{
                if(res.data.success){
                    console.log(this.roles)
                    axios.put(`users/${this.employee.id}/roles`, {roles: this.roles}).then(response=>{
                        if(response.data.success){
                            this.$router.push({name: 'employees'})
                            this.$swal.fire('Đã sửa thành công!','','success');
                        }
                    })
                }
            });
            } else{
                axios.post('employees', this.employee).then(res=>{
                if(res.data.success){
                    axios.post(`users/${res.data.id}/roles`, {roles: this.roles}).then(response=>{
                        if(response.data.success){
                            this.$router.push({name: 'employees'})
                            this.$swal.fire('Đã thêm thành công!','','success');
                        }
                    })
                }
            });
            }

        },
        setPassword(){
            this.employee.password = this.employee.phone
        },
        async getRoles(){
            await axios.get('roles').then(res=>{
                this.allRoles = res.data;
            })
        },
        async getEmployee(employeeId){
            await axios.get(`employees/${employeeId}`).then(res=>{
                this.employee = res.data
                res.data.roles.forEach(e => {
                    this.roles.push(e.id)
                });
            })
        }

    }

}
</script>
