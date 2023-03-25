<template>

    <Header></Header>
   
    <main class="bg-light">
    
        <router-view></router-view>
        
    </main>
    
   <Footer></Footer>
</template>


<script>
import $ from 'jquery'
import Header from './Header.vue'
import Footer from './Footer.vue'
export default{
    components:{
        Header,
        Footer
    },
}


</script>
<style scoped>

@import "@/assets/css/user.css";

</style>

