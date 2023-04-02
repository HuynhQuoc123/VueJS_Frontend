<template>
	<nav>
		<i id="menuIcon" class="fa-sharp fa-solid fa-bars p-2"></i>
		<form action="#">
			<div class="form-input">
				<input type="search" placeholder="Search...">
				<button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
			</div>
		</form>
		<!-- <input type="checkbox" id="switch-mode" hidden>
		<label for="switch-mode" class="switch-mode"></label> -->
		<a href="#" class="notification">
			<i class="fa-sharp fa-solid fa-bell"></i>
    		<span class="num">8</span>
		</a> 
		<!-- <a href="#" class="profile">
			<i class="fa-solid fa-user"></i>
		</a> -->
	
		<div class="dropdown">
			<div class="pointer"  data-bs-toggle="dropdown">
				<b>
					<i>
						{{ admin.name }}
					</i>			
				</b>
			</div>
			<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
				<li @click="logOut()">
					<a href="#" class="logout dropdown-item">
						<i class="fa-solid fa-backward px-3"></i>
						<span class="text" >Đăng xuất</span>
					</a>
				</li>
		
			</ul>
		</div>
	</nav>

	

	
</template>


<script>
import axios from 'axios'

export default{
	data(){
		return{
			admin: []
		}
	},
	async created(){
        if(localStorage.getItem('tokenAdmin') != null){
            const res = await axios.get('admin',{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin')

            }
		})		
		this.$store.dispatch('admin', res.data);                
		this.admin = res.data;

            
        }      
    },
	methods:{
		logOut(){
            localStorage.removeItem('tokenAdmin');
            this.$store.dispatch('admin', null);

        },
	}
}
</script>


<style>
#menuIcon:hover{
	cursor: pointer;
}
</style>
