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

            <button className='btn btn-success' type="submit" >Save</button> &nbsp;
            <button type="reset" class="btn btn-danger">Cancel</button>
       
        </form>    
        
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
        }
    }, 
    methods:{
        save(){
            axios.post('registerAdmin', this.employee).then(res=>{
                if(res.data.success){
                    this.$router.push({name: 'employees'})
                    this.$swal.fire('Đã thêm thành công!','','success');
                }
            });
        },
        setPassword(){
            this.employee.password = this.employee.phone
        }

    }

}
</script>
