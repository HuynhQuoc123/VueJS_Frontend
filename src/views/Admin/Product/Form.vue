<template>
    <div class="card  w-75 mt-5 py-4 px-5 mx-auto">
        <h3 class="mx-auto pb-2">Sản phẩm</h3>
        <!-- {{ product }} -->
        <form @submit.prevent="save()">
           <div class="row mb-3">
                <!-- col-left -->
                <div class="col-6">
                    <div class="form-group">
                        <label class="h6">Tên danh muc</label>
                        <select class="form-select"  v-model="product.id_category">
                            <option v-for="(category, index) in categories" :key="index" v-bind:value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group mt-2">
                        <label class="h6">Tên sản phẩm</label>
                        <input type="text" v-model="product.name" class="form-control"/>
                    </div>

                    <div class="form-group mt-2">
                        <label class="h6">Giá bán</label>
                        <input type="text" v-model="product.import_price" class="form-control"/>
                    </div>

                    <div class="form-group mt-2">
                        <label class="h6">Giá bán</label>
                        <input type="text" v-model="product.price" class="form-control"/>
                    </div>

                    <div class="form-group mt-2 ">
                        <label class="h6">Ảnh sản phẩm</label>
                        <input type="file" class="d-block" @change="onImageChange"/>
                    </div>
                </div>
                <!-- col-left -->

                <!-- col-right -->
                <div class="col-6 ">
                    <div class="form-group">
                        <label class="h6">Tên nhà sản xuất</label>
                        <select class="form-select"  v-model="product.id_producer">
                            <option v-for="(producer, index) in producers" :key="index" v-bind:value="producer.id">
                                {{ producer.name }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group mt-2">
                        <label class="h6">Số lượng sản phẩm</label>
                        <input type="text" v-model="product.quantity" class="form-control"/>
                    </div>

                    <div class="form-group mt-2">
                        <label class="h6">Mô tả sản phẩm</label>
                        <textarea v-model="product.describe" placeholder="Nhập văn bản có nhiều dòng" class="w-100 product-describe"></textarea>   
                    </div>    

                </div>
                <!-- col-right -->

           </div>               

            <button className='btn btn-success' type="submit" >Save</button> &nbsp;
            <button type="reset" class="btn btn-danger">Cancel</button>
       
        </form>



    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
    export default {
        data(){
            return{
                errors: {
                    name: '',
                    id_category: '',
                    id_producer: '',
                    import_price: '',
                    price:'',
                    quantity: '',
                    image: '',
                    describe: ''
                },
                product:{
                    name: '',
                    id_category: '',
                    id_producer: '',
                    import_price: '',
                    price:'',
                    quantity: '',
                    image: '',
                    describe: ''
                },
                categories:[],
                producers:[]
            }
        },
        created(){
            this.getCategories();
            this.getProducers();
            let productID = this.$route.params.id;
            if(productID){
                this.getProduct(productID);
            }
        },
        methods:{
            save(){
                if(this.product.id){
                    axios.put(`products/${this.product.id}`, this.product).then(res => {
                        if(res.data.success){
                            this.$swal.fire('Đã sửa thành công!','','success');
                            this.$router.push('/admin/products')
                        }
                    });
                } 
                else
                {
                    axios.post('products', this.product).then(res => {
                        if(res.data.success){
                            this.$swal.fire('Đã thêm thành công!','','success');
                        }
                    });
                }
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
            getProduct(productID){
                axios.get(`products/${productID}`).then(res=>{
                    this.product = res.data
                })
            },
            getCategories(){
                axios.get('categories').then(res=>{
                    this.categories = res.data;
                });
            },
            getProducers(){
                axios.get('producers').then(res=>{
                    this.producers = res.data;
                });
            }
        }
        
    }
</script>

<style scoped>
.inputGroup {
  font-family: 'Segoe UI', sans-serif;
  margin: 1em 0 1em 0;
  max-width: 190px;
  position: relative;
}

.inputGroup input {
  font-size: 100%;
  padding: 0.8em;
  outline: none;
  border: 2px solid rgb(200, 200, 200);
  background-color: transparent;
  border-radius: 20px;
  width: 100%;
}

.inputGroup label {
  font-size: 100%;
  position: absolute;
  left: 0;
  padding: 0.8em;
  margin-left: 0.5em;
  pointer-events: none;
  transition: all 0.3s ease;
  color: rgb(100, 100, 100);
}

.inputGroup :is(input:focus, input:valid)~label {
  transform: translateY(-50%) scale(.9);
  margin: 0em;
  margin-left: 1.3em;
  padding: 0.4em;
  background-color: #e8e8e8;
}

.inputGroup :is(input:focus, input:valid) {
  border-color: rgb(150, 150, 200);
}
.product-describe{
    height: 112px;
}

</style>