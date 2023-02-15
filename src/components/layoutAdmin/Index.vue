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

export default{
    components:{
        Sidebar,
        Navbar
    }
}
</script>
