<template>

<div class="container mt-5">
  <div class="row">
      <div class="col-5">
        <div class="img-full border my-2">
            <img id="full-img" :src="getImage(product.image)" class="w-100" alt="">
        </div>

        <div class="sub-img d-flex justify-content-center">
          <div class="item w-25 mx-2 border">
            <img src="@/assets/images/img2.jpg"  alt="" class="w-100 sub-img-item">
          </div>
          <div class="item w-25 mx-2 border">
            <img src="@/assets/images/img2.jpg"  alt="" class="w-100 sub-img-item">
          </div>
          <div class="item w-25 mx-2 border">
            <img src="@/assets/images/img2.jpg"  alt="" class="w-100 sub-img-item">
          </div>
          <div class="item w-25 mx-2 border">
            <img src="@/assets/images/img2.jpg"  alt="" class="w-100 sub-img-item">
          </div>
         


        </div>
      </div>

      <div class="col-7">
         <h2>{{ product.name }}</h2>
         <p>mo ta</p>
         <div>sl</div>
         <button class="btn btn-dark">theem do do</button>
      </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';

export default{
  data(){
    return{
      product: []
    }
  },
  created(){
    let productId = this.$route.params.id;
        if(productId){
            this.getProduct(productId);
        }
  },
  methods:{
    getProduct(id){
      axios.get(`products/${id}`).then(res=>{
        this.product = res.data
      });
    },
         
    getImage(image){
            return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
    },
  }

}
</script>