<template>
    <section class="page_404">
       <div class="container pt-5">
           <div class="row">
               <div class="col-sm-12">
                   <div class=" text-center">
                       <div class="four_zero_four_bg">
                           <h1 class="text-center">404</h1>
                       </div>
                       <div class="content_box_404">
                           <h3 >Có vẻ bạn đang lạc</h3>
                           <p>Trang bạn tìm kiếm không tồn tại</p>
                           <RouterLink to="/">Trở về</RouterLink>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </section>
</template>

<style scoped>
.page_404
{
    padding: 40px 0;
    background: #fff;
    font-family: 'Poppins';
}


.four_zero_four_bg
{
    background: url('@/assets/images/bg.gif');
    height: 400px;
    background-position: center;
}

h1
{
    font-size: 80px;
}

h3
{
    font-size: 50px;
}

a
{
    color: #fff;
    text-decoration: none;
    padding: 10px 20px;
    background: #39ac31;
    display: inline-block;
}

.content_box_404
{
    margin-top: -50px;
}
a:hover
{
    text-decoration: none;
    color: #fff;
}
</style>