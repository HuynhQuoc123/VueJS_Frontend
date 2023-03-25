<template>
    <div class="container">
        <div class="card mt-5 p-4">
            <div class="address">
                <div class="address-default">
                    <h5 class="fw-normal mb-3">
                        <i class="fa-solid fa-location-dot"></i>
                        Địa chỉ nhận hàng
                    </h5>

                    <div class="d-flex ">
                        <p class="contact d-flex" v-if="contacts.length > 0">
                            <span class="">{{ selectedContact.name || contacts[0].name }} - {{ selectedContact.phone ||
                                contacts[0].phone }}</span>:
                            <i class="px-1">
                                {{ selectedContact.address || contacts[0].address }}, {{ selectedContact.ward ||
                                    contacts[0].ward }}, {{ selectedContact.district || contacts[0].district }},
                                     {{selectedContact.city || contacts[0].city }}
                            </i>
                        <div class="px-3 pointer text-primary" @click="showModal = true">Thay đổi</div>
                        </p>
                        <p class="contact d-flex" v-if="contacts.length == 0">
                            Chưa có địa chỉ
                        <div class="px-3 pointer text-primary" @click="showModal = true">Thêm</div>
                        </p>


                    </div>

                    <div class="modal" v-if="showModal">
                        <div class="modal-content">
                            <span class="close" @click="showModal = false">
                                &times;
                            </span>
                            <div>
                                <AddressModal :get-contacts="getContacts" :show-modal="showAddAddressModal"
                                    @close="showAddAddressModal = false" @add="addAddress"></AddressModal>

                                <div>
                                    <h5 class="m-0 py-3 px-4 fw-normal">Địa chỉ của tôi</h5>
                                    <hr class="m-0">
                                </div>

                                <div v-for="(contact, index) in contacts" :key="index" @click="selectContact(contact)"
                                    class="w-100  row py-2 px-4 border-bottom m-0">
                                    <div class="col-10 pointer">
                                        <h6 class="m-0 ">{{ contact.name }} - {{ contact.phone }}</h6>
                                        <i>{{ contact.address }} <br>
                                            {{ contact.ward }}, {{ contact.district }}, {{ contact.city }}</i>
                                    </div>
                                    <div class="col-2">

                                        <span  class="pointer text-primary px-4">Xóa</span>
                                    </div>
                                </div>

                                <div class="text-center py-3">
                                    <button class="btn btn-black" @click="showAddAddressModal = true">Thêm Địa Chỉ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>

        <div class="card mt-3">
            <div class="products p-4">
                <div class="row mb-2">
                    <div class="col-6 h5 fw-normal">
                        Sản phẩm
                    </div>
                    <div class="col-2 h5 fw-normal">Đơn giá</div>
                    <div class="col-2 h5 fw-normal">Số lượng</div>
                    <div class="col-2 h5 fw-normal">Thành tiền</div>
                </div>
                <div class="border  mt-3 py-3" v-for="(cart, index) in order.carts" :key="index">
                    <div class="row">
                        <div class="col-6 d-flex align-items-center ">
                            <img :src="getImage(cart.productImage)" class="" alt="Shopping item" style="width: 100px;">
                            <span class="px-3"> {{ cart.productName }}</span>
                        </div>
                        <div class="col-2 d-flex align-items-center">{{ formatPrice(cart.productPrice) }}</div>
                        <div class="col-2 d-flex align-items-center">{{ cart.quantity }}</div>
                        <div class="col-2 d-flex align-items-center">{{ formatPrice(cart.productPrice * cart.quantity) }}
                        </div>
                    </div>
                </div>

            </div>
            <div class="shipping-cost">
                <div class="d-flex ">
                    <div class="col-6 px-4 py-3 border">
                        <div class="d-flex">
                            <div class="d-flex align-items-center">Lời nhắn: </div>
                            <input class="p-2 w-75 mx-3" type="text" placeholder="Lưu ý cho người bán ....">
                        </div>
                    </div>
                    <div class="col-6 p-3 border">
                        <div class="row ">
                            <div class="col-4">Hình thức vận chuyển:</div>
                            <div class="col-4">Nhanh</div>
                            <div class="col-4">Miễn phí</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="pay p-4">
                <div class="row">
                    <div class="col-8">
                        <div class="mb-2 h5 fw-normal">Hình thức thanh toán:</div>                    
                            <div ref="paypal" class="w-50"></div>
                    



                    </div>
                    <div class="col-4">
                        <div class="row">
                            <div class="col-8">
                                <div>Tổng tiền hàng:</div>
                                <div>Phí vận chuyển:</div>
                                <div>Tổng thanh toán:</div>

                            </div>
                            <div class="col-4">
                                <div>{{ formatPrice(this.total) }}</div>
                                <div>Miễn phí</div>
                                <div>{{ formatPrice(order.total) }}</div>
                                <div class="mt-3 ">
                                    <button @click="handleClick(customer_id)" class="btn btn-black">Đặt hàng</button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import AddressModal from '@/components/layoutUser/AddressModal.vue';
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name: "Checkout",
    components: {
        AddressModal
    },
    data() {
        return {
            loaded: false,
            paidFor: false,
            showModal: false,
            showAddAddressModal: false,
            selectedContact: [],
            contacts: [],
            // ship: 55000,
            total: 0,
            totalUSD: 0,
            customer_id: '',
            order: {
                id_employee: 1,
                id_contact: '',
                order_date: new Date().toLocaleDateString(),
                payments: "Chưa thanh toán",
                total: '',
                status: 0,
                carts: [],
            }
        }
    },
    mounted: function () {
        const script = document.createElement("script");
        script.src =
            "https://www.paypal.com/sdk/js?client-id=AWZ1kioAsllufioga5M-sbbT9Bub7Z-4mZId-H93-lKYWOsPqaInz1O8UT9_GPWZureAjwZRvONIHGtp";
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
    },


    async created() {
        this.getContacts();
        if (localStorage.getItem('tokenUser') != null) {
            const res = await axios.get('user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('tokenUser')

                }
            })
            this.customer_id = res.data.id;
            this.getCart(res.data);
        }


    },
    methods: {
        setLoaded: function () {
            this.loaded = true;
            window.paypal
                .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    currency_code: "USD",
                                    value: this.totalUSD
                                }
                            }
                            ]
                        });
                    },

                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        this.paidFor = true;


                        
                        if (this.paidFor) {
                      
                                this.handleClick(this.customer_id);
                        }
                    },
                    onError: err => {
                        console.log(err);
                    }
                })
                .render(this.$refs.paypal);
        },
        handleClick(id) {
            if (this.paidFor) {
                this.order.payments = "Đã thanh toán"
            }
            axios.post(`/order/${id}`, this.order).then(res => {
                if (res.data.success) {
                    this.$router.push('/orderList')
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
                            title: 'Đặt hàng thành công'
                        })

                }
            })
                .catch(error => {
                    console.log(error);
                    console.log(order)
                });
        },
        async getCart(user) {
            await axios.get(`cart/${user.id}`).then(res => {
                this.order.carts = res.data
                this.total = this.calculateTotal(this.order.carts);
                this.order.total = this.total;
                this.totalUSD = (this.total/23000).toFixed(2);

            })
        },
        async getContacts() {
            await axios.get('user', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('tokenUser')
                }
            }).then(async (res) => {
                await axios.get(`contact/${res.data.id}`).then(res => {
                    this.contacts = res.data;
                    this.order.id_contact = this.contacts[0].id;
                })
            })

        },
        selectContact(contact) {
            if (contact) {
                this.selectedContact = contact;
                this.order.id_contact = this.selectedContact.id;
            }
            this.showModal = false;
        },
        getImage(image) {
            return 'http://127.0.0.1:8000/storage/uploads/products/' + image;
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace('.', ',');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        calculateTotal(items) {
            let sum = 0;
            for (let i = 0; i < items.length; i++) {
                sum += items[i].productPrice * items[i].quantity;
            }
            return sum;
        },
 

    }
}
</script>
