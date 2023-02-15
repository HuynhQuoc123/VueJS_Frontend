<template>
    <div class="card  w-75 mt-5 py-3 px-5 mx-auto">
        <h3 class="mx-auto my-3 pb-2">Sản phẩm</h3>
        <!-- {{ product }} -->
        <form @submit.prevent="save()">
            <div class="form-group">
                <label class="h6">Mã sản phẩm:</label>
                <input type="text" class="form-control"  disabled>
            </div>
            <div class="form-group">
                <label class="h6">Tên danh mục</label>
                <input type="text" v-model="product.id_category" class="form-control"/>
            </div>
            <div class="form-group">
                <label class="h6">Tên sản phẩm</label>
                <input type="text" v-model="product.name" class="form-control"/>
            </div>
            <div class="form-group">
                <label class="h6">Số lượng sản phẩm</label>
                <input type="text" v-model="product.quantity" class="form-control"/>
            </div>
            <div class="form-group">
                <label class="h6">Giá sản phẩm</label>
                <input type="text" v-model="product.price" class="form-control"/>
            </div>
            <div class="form-group">
                <label class="h6">Ảnh sản phẩm</label>
                <input type="file" class="d-block" @change="onImageChange"/>
            </div>

            <button className='btn btn-success' type="submit" >Save</button> &nbsp;
            <button type="reset" class="btn btn-danger">Cancel</button>
       
        </form>

    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return{
                errors: {
                    name: '',
                    id_category: '',
                    price:'',
                    quantity: '',
                    image: '',
                },
                product:{
                    name: '',
                    id_category: '',
                    price:'',
                    quantity: '',
                    image: '',
                }
            }
        },
        methods:{
            save(){
                axios.post('http://127.0.0.1:8000/api/products', this.product).then(res => {
                    if(res.data.success){
                        // this.$router.push({name: 'products.list'})
                        this.$swal.fire('Đã thêm thành công!','','success');
                    }
                    console.log(res.data)
                });
            // if(this.product.id){
            //     axios.put(`http://127.0.0.1:8000/api/products/${this.product.id}`, this.product).then(res => {
            //         if(res.data.success){
            //             this.$router.push({name: 'products'})
            //             this.$swal.fire('Đã sửa thành công!','','success');
            //         }
            //     });
            // } 
            // else
            // {
            //     axios.post('http://127.0.0.1:8000/api/products', this.product).then(res => {
            //         if(res.data.success){
            //             this.$router.push({name: 'products'})
            //             this.$swal.fire('Đã thêm thành công!','','success');
            //         }
            //     });
            // }
            },
            onImageChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.product.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
        }
        
    }
</script>

<style scoped>

</style>