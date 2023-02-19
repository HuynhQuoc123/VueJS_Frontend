<template>
           <header class="position-relative">
            <nav id="mainnav" class="text-white fixed-top d-flex justify-content-around  align-items-center py-2">
                <div cilass="logo">
                    <i class="bi bi-music-note-list h2"></i>
                </div>
                <div class="menu">
                    <a class="h6 text-white ">Trang chủ</a>
                    <a class="h6 text-white px-3">Sản phẩm</a>
                    <a class="h6 text-white ">Giới thiệu</a>
                </div>
                <div class="icon d-flex">
                    <div class="cart px-3">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </div>
             
                    <div class="dropdown">                        
                        <i class="fa-solid fa-user dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul class="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="@/assets/images/slider1.jpg" class="d-block w-100" height="700" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img src="@/assets/images/slider2.jpg" class="d-block w-100" height="700" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img src="@/assets/images/slider3.jpg" class="d-block w-100" height="700" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </header>
</template>