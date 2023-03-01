<template>
    <Sidebar></Sidebar>

	<!-- CONTENT -->
	<section id="content">
        <Navbar></Navbar>
        
        <router-view></router-view>
	</section>
	<!-- CONTENT -->
</template>

<script>
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';
import $ from 'jquery'

export default{
    components:{
        Sidebar,
        Navbar
    },

    mounted(){
        $('#menuIcon').click(function(){
            $('#sidebar').toggleClass('hide');
        });
  
    }
 
    
}
</script>
<style scoped>
    @import "@/assets/css/admin.css";

</style>
