<template>
    <div class="card w-75 mx-auto mt-5 p-5">
        <h3 class="mx-auto my-3 pb-2">Thêm vai trò</h3>
        <form @submit.prevent="save()">
            <div class="form-group mt-3 ">
                <label class="h6">Tên vai trò: </label>
                <input type="text" v-model="role.name" class="form-control">
            </div>

            <div class="row mt-4">
                <h6 class="col-4">Quản lý nhà sản xuất:</h6>
                <div class="form-check col-2 pointer" >
                    <input class="form-check-input" type="checkbox" v-model="permissions" value="1" id="viewProducer">
                    <label class="form-check-label" for="viewProducer">
                        Xem
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="2" id="addProducer">
                    <label class="form-check-label" for="addProducer">
                        Thêm
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="3" id="editProducer">
                    <label class="form-check-label" for="editProducer">
                        Sửa
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="4" id="deleteProducer">
                    <label class="form-check-label" for="deleteProducer">
                        Xóa
                    </label>
                </div>

            </div>
            <div class="row mt-3">
                <h6 class="col-4">Quản lý danh mục:</h6>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="5" id="viewCategory">
                    <label class="form-check-label" for="viewCategory">
                        Xem
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="6" id="addCategory">
                    <label class="form-check-label" for="addCategory">
                        Thêm
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="7" id="editCategory">
                    <label class="form-check-label" for="editCategory">
                        Sửa
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="8" id="deleteCategory">
                    <label class="form-check-label" for="deleteCategory">
                        Xóa
                    </label>
                </div>

            </div>
            <div class="row mt-3">
                <h6 class="col-4">Quản lý sản phẩm:</h6>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="9" id="viewProduct">
                    <label class="form-check-label" for="viewProduct">
                        Xem
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="10" id="addProduct">
                    <label class="form-check-label" for="addProduct">
                        Thêm
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="11" id="editProduct">
                    <label class="form-check-label" for="editProduct">
                        Sửa
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="12" id="deleteProduct">
                    <label class="form-check-label" for="deleteProduct">
                        Xóa
                    </label>
                </div>

            </div>
            <div class="row mt-3">
                <h6 class="col-4">Quản lý đơn hàng:</h6>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="13" id="viewOrder">
                    <label class="form-check-label" for="viewOrder">
                        Xem
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="14" id="addOrder">
                    <label class="form-check-label" for="addOrder">
                        Thêm
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="15" id="editOrder">
                    <label class="form-check-label" for="editOrder">
                        Sửa
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="16" id="deleteOrder">
                    <label class="form-check-label" for="deleteOrder">
                        Xóa
                    </label>
                </div>

            </div>
            <div class="row mt-3">
                <h6 class="col-4">Quản lý nhóm quyền:</h6>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="17" id="viewRole">
                    <label class="form-check-label" for="viewRole">
                        Xem
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="18" id="addRole">
                    <label class="form-check-label" for="addRole">
                        Thêm
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="19" id="editRole">
                    <label class="form-check-label" for="editRole">
                        Sửa
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="20" id="deleteRole">
                    <label class="form-check-label" for="deleteRole">
                        Xóa
                    </label>
                </div>

            </div>
            <div class="row my-3">
                <h6 class="col-4">Quản lý nhân viên:</h6>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="21" id="viewEmployee">
                    <label class="form-check-label" for="viewEmployee">
                        Xem
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="22" id="addEmployee">
                    <label class="form-check-label" for="addEmployee">
                        Thêm
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="23" id="editEmployee">
                    <label class="form-check-label" for="editEmployee">
                        Sửa
                    </label>
                </div>
                <div class="form-check col-2 pointer">
                    <input class="form-check-input " type="checkbox" v-model="permissions" value="24" id="deleteEmployee">
                    <label class="form-check-label" for="deleteEmployee">
                        Xóa
                    </label>
                </div>
            </div>

            
            <button className='btn btn-success' type="submit" >Save</button> &nbsp;
        </form>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            permissions:[],
            role: {
                name: ''
            }
        }
    },
    created(){
        let roleId = this.$route.params.id;
        if(roleId){
            this.getRole(roleId);
        }
    },
    methods:{
        save(){
            if(this.role.id){
                axios.put(`roles/${this.role.id}`, this.role).then(res=>{
                    axios.put(`roles/${this.role.id}/permissions`, { permissions: this.permissions }).then(response => {
                        if (response.data.success) {
                            this.$swal.fire('Đã sửa thành công!','','success');
                            this.$router.push("/admin/roles")
                        }
                    })
                })
            } else{
                axios.post('roles', this.role).then(res=>{
                    if(res.data.success){
                        axios.post(`roles/${res.data.id}/permissions`,{permissions:this.permissions}).then(response=>{
                            if(response.data.success){
                                this.$swal.fire('Đã thêm thành công!','','success');
                                this.$router.push("/admin/roles")
                            }
                        })
                    }
                })
            }
 
        },
        async getRole(roleId){
            await axios.get(`roles/${roleId}`).then(res=>{
                this.role = res.data;
                res.data.permissions.forEach(element => {
                    this.permissions.push(element.id)
                });
            })
        }
    }
}
</script>
