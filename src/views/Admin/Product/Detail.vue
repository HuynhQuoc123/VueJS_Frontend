<template>
    <div class="card  w-75 mt-5 py-4 px-5 mx-auto">
        <h4 class="mx-auto pb-2">Chi tiết sản phẩm</h4>
        <div class="row">
            <div class="col-4">

                <img class="border rounded" :src="getImage(product.image)" width="200" alt="">
            </div>
            <div class="col-8">
                <ul>
                    <li>Tên sản phẩm: {{ product.name }}</li>
                    <li>Giá nhập vào: {{ product.import_price }}</li>
                    <li>Giá bán ra: {{ product.price }}</li> 
                              
                </ul>
            </div>
        </div>
        <hr>
        <div>
            <button @click="showModal = true" class="btn btn-black">Thêm ảnh chi tiết</button>
            <div class="d-flex mt-3">
                <div v-for="(item, index) in images" :key="index">
                    <img class="border rounded" :src="getImage(item.image)" width="200" alt="">
                </div>
            </div>

            <div class="modal" v-if="showModal">
                <div class="modal-content p-3">
                    <span class="close" @click="showModal = false">
                        &times;
                    </span>
                    <div>
                        <h5>Thêm ảnh chi tiết</h5>
                        <div class="form-group my-2">
                            <input type="file" @change="onImageChange">
                        </div>

                        <button @click="saveImage" class="btn btn-success w-25">Lưu</button>
                    </div>
                    
                </div>
            </div>
        </div>
           

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            product:[],
            images:[],
            detail:{
                image: '',
                product_id: '',
            },
            showModal: false,    
        }
    },
    created(){  
        let productID = this.$route.params.id;
            if(productID){
                this.getProduct(productID);
                this.getSubImage(productID);
            }
    },
    methods:{
        getProduct(productID){
            axios.get(`products/${productID}`).then(res=>{
                this.product = res.data;
              

                this.detail.product_id = res.data.id
            })
        },
        getSubImage(productID){
            axios.get(`images/${productID}`).then(res=>{
                this.images = res.data;
            })
        },
        getImage(image){
            return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
        },
        saveImage(){
            if(this.images.length >= 3){
                alert("So anh chi tiet toi da la 3");
            } else {
                axios.post('images', this.detail).then(res=>{
                if(res.data.success){
                    alert("Thanh cong");
                    this.showModal = false;
                    this.getSubImage(this.detail.product_id);
                }
            })
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
                this.detail.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
    }

}
</script>

