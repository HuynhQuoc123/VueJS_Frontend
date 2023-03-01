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
    mounted(){
        // $(window).scroll(function () {
        //     if($(this).scrollTop() ){
        //         $('#mainnav').addClass('menu-home');
        //         $('.menu-item').addClass('text-black');
        //     } else{
        //         $('#mainnav').removeClass('menu-home');
        //         $('.menu-item').removeClass('text-black')

        //     }
        // });
    }
}


</script>
<style scoped>

@import "@/assets/css/user.css";

</style>

