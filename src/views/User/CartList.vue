<template>
<section class="h-100">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card">
          <div class="card-body p-4">

            <div class="row">
                <h5 class="mb-3">
                  <RouterLink to="/products" class="text-body">
                    <i class="fas fa-long-arrow-alt-left me-2"></i>Tiếp tục mua sắm
                  </RouterLink>
                </h5>
                <hr class="">
              <div class="col-lg-8">

                <div class="card mb-3" v-for="(cart, index) in carts.flat()" :key="index">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img
                            :src="getImage(cart.productImage)"
                            class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                        </div>
                        <div class="ms-3">
                          <h5 class="fw-normal">{{ cart.productName }}</h5>
                        </div>
                      </div>
                      <div class="d-flex justify-content-around align-items-center">
                        <div class="d-flex w-50" >
                          <button class="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                            <i class="fas fa-minus"></i>
                          </button>

                          <input id="form1" min="0" name="quantity" v-model="cart.quantity" type="number"
                            class="form-control form-control-sm w-50 " />

                          <button class="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                        <div class="cart-price">
                          <span>{{ formatPrice(cart.productPrice) }} vnd</span>
                        </div>
                        <div>
                          <a href="#!"><i class="fas fa-trash-alt"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
              <div class="col-lg-4">
                <div class="card position-sticky top-0">
                  <div class="p-3 bg-light bg-opacity-10">
                    <h6 class="card-title mb-3">Tổng sản phẩm</h6>
                    <div class="d-flex justify-content-between mb-1 small">
                      <span>Tổng tiền:</span> <b>{{ formatPrice(this.total) }} vnd</b>
                    </div>
                    <div class="d-flex justify-content-between mb-1 small">
                      <span>Phí giao hàng:</span> <span>0 vnd</span>
                    </div>
                    <div class="d-flex justify-content-between mb-1 small">
                      <span>Khuyến mãi</span> <span class="text-danger">-0 vnd</span>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between mb-4 small">
                      <span>Tổng thanh toán:</span> <strong class="text-dark">{{ formatPrice(calculateTotal(carts.flat())) }} vnd</strong>
                    </div>
         
                    <div class="text-center">
                      <RouterLink to="/checkout" class="btn btn-black w-75  mt-2">Tiến hành đặt hàng</RouterLink>
                    </div>
                  </div>
                </div>
              </div>     

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  
</section>




</template>

<script>

import axios from 'axios';
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      carts:[],
      total: 0
    }
  },

  async created() {
    if (localStorage.getItem('tokenUser') != null) {
      const res = await axios.get('user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenUser')

        }
      })
      this.getCart(res.data);

    }

  },

  methods: {
    async getCart(user) {
      await axios.get(`cart/${user.id}`).then(res => {
        this.carts = res.data
        this.total = this.calculateTotal(this.carts);
      })
    },
    calculateTotal(items) {
      let sum = 0;
      for (let i = 0; i < items.length; i++) {
        sum += items[i].productPrice * items[i].quantity;
      }
      return sum;
    },
    getImage(image) {
      return 'http://127.0.0.1:8000/storage/uploads/products/' + image;
    },
    deleteCart(idCart) {
      axios.delete(`cart/${idCart}`).then(res => {
        if (res.data.success) {
          alert('hello')

        }
      })
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
  }
}
</script>

<style scoped>



</style>