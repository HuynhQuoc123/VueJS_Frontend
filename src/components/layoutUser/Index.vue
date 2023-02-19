<template>
    <Header></Header>
    <main class="bg-light">
    
        <router-view></router-view>
        
        <div class="container pt-5">
            <h2>Danh muc</h2>
            <div class="d-flex justify-content-between">
                <div class="category-item">
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img src="@/assets/images/img1.jpg"  class="w-100" alt="">
                            </div>
                            <div class="flip-card-back">
                                <p class="title">XEM NGAY</p>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div class="category-item">
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img src="@/assets/images/img2.jpg"  class="w-100" alt="">
                            </div>
                            <div class="flip-card-back">
                                <p class="title">XEM NGAY</p>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div class="category-item">
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img src="@/assets/images/img3.jpg"  class="w-100" alt="">
                            </div>
                            <div class="flip-card-back">
                                <p class="title">XEM NGAY</p>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div class="category-item">
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img src="@/assets/images/img4.jpg"  class="w-100" alt="">
                            </div>
                            <div class="flip-card-back">
                                <p class="title">XEM NGAY</p>
                               
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>









        
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
        $(window).scroll(function () {
        if($(this).scrollTop() ){
            $('#mainnav').addClass('text-black Small shadow');
            $('.menu a').addClass('text-black');
        } else{
            $('#mainnav').removeClass('text-black Small shadow');
            $('.menu a').removeClass('text-black')

        }
    });
    }
}


</script>
<style scoped>

@import "@/assets/user.css";
/* 
.category-item{
    position: relative;
}


.category-item a{
    width: 200px;
    text-decoration: none;
    position: absolute;
    z-index: 100;
    bottom: 0;
    opacity: 0;
    left: calc(100% - 200px);
    transition: linear 0.4s;
}

.category-item:hover a{
    display: block;
    bottom: 50%;
    opacity: 1;
} */

.flip-card {
  background-color: transparent;
  width: 250px;
  height: 300px;
  perspective: 1000px;
  font-family: sans-serif;
}

.title {
  font-size: 1.5em;
  font-weight: 900;
  text-align: center;
  margin: 0;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 1px solid #000;
  border-radius: 1rem;
}

.flip-card-front {
  /* background: linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%,
     rgb(255, 211, 195) 40%, rgba(255, 127, 80, 0.603) 48%);
  color: coral; */
}

.flip-card-back {
  /* background: linear-gradient(120deg, rgb(255, 174, 145) 30%, coral 88%,
     bisque 40%, rgb(255, 185, 160) 78%);
  color: white; */
  transform: rotateY(180deg);
}

</style>

