<template>

<div class="container mt-5">
  <div class="row">
      <div class="col-5">
        <div class="img-full border mb-2">
            <img v-if="selectedImage"  id="full-img" :src="getImage(selectedImage)" class="w-100" alt="">
        </div>

        <div class="sub-img d-flex">
          <div v-if="product.image" class="item w-25 mx-2 border pointer">
            <img  @click="changeImgae(product.image)"   :src="getImage(product.image)"  alt="" class="w-100 sub-img-item">
          </div>
          <div  v-for="(item, index) in images" :key="index"  class="item w-25 mx-2 border pointer">
            <img @click="changeImgae(item.image)"  :src="getImage(item.image)"  alt="" class="w-100 sub-img-item">
          </div>     
         


        </div>
      </div>

      <div class="col-7">
          <div class="card p-4">
            <h2 class="">{{ product.name }}</h2>
            <div class="h5 fw-normal">{{ product.categoryName }}</div>
            <div class="h5 fw-normal  m-0 ">{{ formatPrice(product.price) }}đ</div>
            <hr>
            <p class="text-describe">{{ product.describe }}</p>
            <hr>

            <button class="btn btn-dark  w-50" @click="addToCart(product.id)">
              <i class="fa fa-shopping-bag me-2"></i>Thêm vào giỏ hàng
            </button>
          </div>
      </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex'
import Swal from 'sweetalert2'



export default{
  data(){
    return{
      product: [],
      cart: {
        product_id: '',
        quantity: 1
      },
      images:[],
      selectedImage:''
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  created() {
    let productId = this.$route.params.id;
    if (productId) {
      this.getProduct(productId);
      this.getSubImage(productId);

    }
  },
  methods:{
    getProduct(id){
      axios.get(`products/${id}`).then(res=>{
        this.product = res.data
        this.selectedImage = res.data.image;

      });
    },
    getSubImage(productID) {
      axios.get(`images/${productID}`).then(res => {
        this.images = res.data;
      })
    },          
    getImage(image){
      return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
    },
    changeImgae(image){
        this.selectedImage = image;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
     
    async addToCart(productID) {
    console.log(this.user.id)

      if (localStorage.getItem('tokenUser') == null) {
        this.$router.push({ name: 'login' });
      }
      else {
        this.cart.product_id = productID;
        await axios.post(`cart/${this.user.id}`, this.cart).then(res => {
          if (res.data.success) {

            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: 'Đã thêm thành công'
            })

            axios.get(`cart/${this.user.id}`).then(res => {
              this.$store.commit('addToCart', res.data);
            })

          }
        })
      }
    },


  }

}
</script>

<style>
.text-describe{
  color: #575757;
}
</style>