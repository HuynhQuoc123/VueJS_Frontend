<template>
	<!-- NAVBAR -->
	<nav>
		<i id="menuIcon" class="fa-sharp fa-solid fa-bars p-2"></i>
		<form action="#">
			<div class="form-input">
				<input type="search" placeholder="Search...">
				<button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
			</div>
		</form>
		<input type="checkbox" id="switch-mode" hidden>
		<label for="switch-mode" class="switch-mode"></label>
		<a href="#" class="notification">
			<i class="fa-sharp fa-solid fa-bell"></i>
    		<span class="num">8</span>
		</a>
		<a href="#" class="profile">
			<i class="fa-solid fa-user"></i>
		</a>
	</nav>

	<h6 v-if="admin" class="m-5">{{ admin }}</h6>
	

	<!-- NAVBAR -->
</template>


<script>
import {mapGetters} from 'vuex'
import axios from 'axios'

export default{
	async created(){
        if(localStorage.getItem('tokenAdmin') != null){
            const res = await axios.get('admin',{
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('tokenAdmin')

            }
		})
		
		this.$store.dispatch('admin', res.data.data); 

            
        }      
    },


	computed:{
        ...mapGetters(['admin'])
    }
}
</script>


<style>
#menuIcon:hover{
	cursor: pointer;
}
</style>
