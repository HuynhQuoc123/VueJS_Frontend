<template>    
    <div class="card  w-75 mt-5 py-3 px-5 mx-auto">
        <h3 class="mx-auto my-3 pb-2">Danh mục sản phẩm</h3>
     
        <form @submit.prevent="save()">

            <div class="form-group my-3">
                <label class="h6">Tên danh mục:</label>
                <input v-model="category.name" type="text" class="form-control"
                @blur="validate()"  v-bind:class="{'is-invalid': errors.name}"/>
                <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
            </div>

            <button className='btn btn-success' type="submit" >Save</button> &nbsp;
            <button type="reset" class="btn btn-danger">Cancel</button>
       
        </form>
    
        
     </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex'

export default {
    name: 'CategoryForm',
    data(){
        return{
            errors:{
                name:'',
            },
            category:{
                name:'',
            }
        }
    },
    created(){
        let categoryId = this.$route.params.id;
        if(categoryId){
            this.getCategory(categoryId);
        }
    },
    methods:{
        validate(){
            let isValid = true;
            this.errors ={
                name: ''
            }
            if(!this.category.name){
                this.errors.name ="Tên danh mục không được bỏ trống! "
                isValid = false;
            }
        },
        save(){
            this.validate();
            if(this.category.id){
                axios.put(`categories/${this.category.id}`, this.category).then(res => {
                    if(res.data.success){
                        this.$router.push({name: 'categories'})
                        this.$swal.fire('Đã sửa thành công!','','success');
                    }
                });
            } else{
                axios.post('categories', this.category).then(res => {
                    if(res.data.success){
                        this.$router.push({name: 'categories'})
                        this.$swal.fire('Đã thêm thành công!','','success');
                    }
                });
            }
         
        },
        getCategory(categoryId){
                axios.get(`categories/${categoryId}`).then(res=>{
                    this.category = res.data
                })
            },
    }        
}

</script>