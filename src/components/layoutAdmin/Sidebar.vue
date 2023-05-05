<template>
    <!-- SIDEBAR -->
	<section id="sidebar">
		<a href="/admin/dashboard" class="brand mt-2">
            <i class="fa-solid fa-face-smile px-4"></i>
            <span class="text">CanTho Shop</span>
		</a>
		<ul class="side-menu top p-0">
			<li class="item">
					<RouterLink to="/admin/dashboard">
						<i class="fa-sharp fa-solid fa-gauge px-3"></i>
						<span class="text">Tổng quan</span>
					</RouterLink>
			</li>
			<li class="item">
					<RouterLink to="/admin/producers" >
						<i class="fa-solid fa-truck px-3"></i>
						<span class="text">Nhà sản xuất</span>
					</RouterLink>
			</li>
			<li class="item">
					<RouterLink to="/admin/categories" >
						<i class="fa-solid fa-boxes-stacked px-3"></i>
						<span class="text">Danh mục</span>
					</RouterLink>
			</li>
			<li class="item">
				<RouterLink to="/admin/products" >
					<i class="fa-solid fa-box px-3"></i>
					<span class="text">Sản phẩm</span>
				</RouterLink>
			</li>
			<li class="item">
				<RouterLink to="/admin/orders" >
					<i class="fa-solid fa-rectangle-list px-3"></i>
					<span class="text">Đơn hàng</span>
				</RouterLink>
			</li>

			<li class="">
				<RouterLink to="/admin/roles" >
					<i class="fa-solid fa-gear px-3"></i>
					<span class="text">Quản lý vai trò</span>
				</RouterLink>
			</li>
			<li class="">
				<RouterLink to="/admin/employees" >
					<i class="fa-solid fa-users px-3"></i>
					<span class="text">Quản lý nhân viên</span>
				</RouterLink>
			</li>				
								
		</ul>
		
	</section>

	<!-- SIDEBAR -->
</template>

<script>
import axios from "axios";

export default{
	data(){
		return{
			admin: [],
			showMenu: false
		}
	},
	async created(){
        if(localStorage.getItem('tokenAdmin') != null){
            const res = await axios.get('',{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin')

            }
		})
		
		this.$store.dispatch('admin', res.data);
		this.admin = res.data;

            
        }      
    },


}

</script>

<style scoped>
a.router-link-active{
	background-color: #fff;
	position: relative;
	border: 1px solid #eee;
}
a.router-link-active::before{
	content: '';
	position: absolute;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	top: -40px;
	right: 0;
	box-shadow: 20px 20px 0 var(--grey);
	z-index: -1;
}
a.router-link-active::after{
	content: '';
	position: absolute;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	bottom: -40px;
	right: 0;
	box-shadow: 20px -20px 0 var(--grey);
	z-index: -1;
}



a:hover{
	color: black !important;
}


</style>

