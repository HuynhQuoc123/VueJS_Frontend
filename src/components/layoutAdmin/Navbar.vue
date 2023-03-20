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
		<b>
			<i>
				Hello, {{ admin.name }}
			</i>
		</b>
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
            const res = await axios.get('user',{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin')

            }
		})		
		this.admin = res.data;
            
        }      
    },
}
</script>


<style>
#menuIcon:hover{
	cursor: pointer;
}
</style>
