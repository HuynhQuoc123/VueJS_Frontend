<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content p-4">
      <span class="close" @click="closeModal">&times;</span>
      <h3>Địa chỉ nhận hàng</h3>
      <form @submit.prevent="addAddress">
        <div class="row">
          <div class="col-6">
            <div class="form-group mt-3">
              <label>Tên: </label>
              <input type="text" v-model="contact.name" class="form-control">
            </div>
            <div class="form-group mt-3">
              <label>Số điện thoại: </label>
              <input type="text" v-model="contact.phone" class="form-control">
            </div>
          </div>
          <div class="col-6">

            <div class="form-group mt-3">
              <label for="city">Tỉnh/Thành phố:</label>
              <select id="city" class="form-control" v-model="selectedCity" @change="loadDistricts">
                <option value="">Chọn tỉnh/thành phố</option>
                <option v-for="city in cities" :value="city.id">{{ city.name }}</option>
              </select>
            </div>
            <div class="form-group mt-3">
              <label for="district">Quận/Huyện:</label>
              <select id="district" class="form-control" v-model="selectedDistrict" @change="loadWards">
                <option value="">Chọn quận/huyện</option>
                <option v-for="district in districts" :value="district.id">{{ district.name }}</option>
              </select>
            </div>
            <div class="form-group mt-3">
              <label for="ward">Phường/Xã:</label>
              <select id="ward" class="form-control" v-model="contact.ward_id">
                <option value="">Chọn phường/xã</option>
                <option v-for="ward in wards" :value="ward.id">{{ ward.name }}</option>
              </select>
            </div>
            <div class="form-group mt-3">
              <label>Địa chỉ: </label>
              <input type="text" v-model="contact.address" class="form-control">
            </div>

            <button type="submit" class="mt-3 btn btn-black">Lưu</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    getContacts: {
      type: Function,
      required: true
    }

  },
  data() {
    return {
      contact: {
        ward_id: '',
        address: '',
        name: '',
        phone: '',

      },
      cities: [],
      districts: [],
      wards: [],
      selectedCity: '',
      selectedDistrict: '',
      selectedWard: ''
    }
  },

  mounted() {
    this.getCities();
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async addAddress() {
      await axios.get('user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenUser')
        }
      }).then(async (res) => {
        await axios.post(`contact/${res.data.id}`, this.contact).then(res => {
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
            this.$emit('close');
            this.getContacts();
          }
        })
      })
    },
    getCities() {
      axios.get('/cities')
        .then(res => {
          this.cities = res.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadDistricts() {
      axios.get(`/districts/${this.selectedCity}`)
        .then(res => {
          this.districts = res.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadWards() {
      axios.get(`/wards/${this.selectedDistrict}`)
        .then(res => {
          this.wards = res.data
        })
        .catch(error => {
          console.log(error)
        })
    },
   
  },

}
</script>
  
