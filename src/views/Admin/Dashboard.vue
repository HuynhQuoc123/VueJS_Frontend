<template>
    	<!-- MAIN -->
		<main>
			<ul class="box-info">
				<li>
                    <i class="bx fa-solid fa-box"></i>
					<span class="text">
						<h3>{{ products.length }}</h3>
						<p>Tổng số sản phẩm</p>
					</span>
				</li>
				<li>
                    <i class="bx fa-solid fa-users"></i>					
                    <span class="text">
						<h3>
							{{ customers.length }}
						</h3>
						<p>Tổng số khách hàng</p>
					</span>
				</li>
				<li>
                    <i class="bx fa-solid fa-users"></i>
					<span class="text">
						<h3>{{ employees.length }}</h3>
						<p>Tổng số nhân viên</p>
					</span>
				</li>
		
			</ul>
			<ul class="box-info">
				<li>
					<i class="bx fa-solid fa-rectangle-list"></i>
                    <span class="text">
						<h3>
							{{ orders.length }}
						</h3>
						<p>Tổng đơn hàng</p>
					</span>
				</li>
	
				<li>
					<i class="bx fa-solid fa-comments-dollar"></i>
					<span class="text">				   
						<h3>
							{{ formatPrice(revenue) }}
						</h3>
						<p>Tổng doanh thu</p>
					</span>
				</li>

				<li>
					<i class="bx fa-solid fa-comments-dollar"></i>
					<span class="text">				   
						<h3>
							{{formatPrice(revenue - importPrice)}}
						</h3>
						<p>Tổng lợi nhuận</p>
					</span>
				</li>
			</ul>
	
		</main>
		<!-- MAIN -->
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex'


export default{
	data(){
		return{
			orders: [],
			products: [],
			employees: [],
			customers: [],
			revenue: null,
			importPrice: null,
		}
	},
	async created(){
        this.getOrder();
		this.getProducts();
		this.getEmployees();
		this.getCustomers();
		

     

	},
	methods:{
		async getOrder(){
            await axios.get('orders').then(res=>{
                this.orders = res.data;   
				this.revenue = this.totalRevenue(this.orders)
				this.importPrice = this.totalImportPrice(this.orders)
            })
        },
		async getProducts(){
			await axios.get('products').then(res=>{
				this.products = res.data
			})
		},
		async getEmployees(){
            await axios.get('employees').then(res=>{
                this.employees = res.data;
             
            })
        },
		async getCustomers(){
            await axios.get('allCustomer').then(res=>{
                this.customers = res.data;
             
            })
        },
		formatPrice(value) {
            let val = (value / 1).toFixed(0).replace('.', ',');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        totalRevenue(items) {
            let sum = 0;
            for (let i = 0; i < items.length; i++) {
                sum += items[i].total;
            }
            return sum;
        },
		totalImportPrice(items) {
			let sum = 0;
			for (let i = 0; i < items.length; i++) {
				for (let j = 0; j < items[i].order_details.length; j++) {
					sum += items[i].order_details[j].import_price * items[i].order_details[j].quantity;
				}
			}
			return sum;
		},


		
	},
	computed:{
        ...mapGetters(['admin']),    

   
    }
	

}
</script>