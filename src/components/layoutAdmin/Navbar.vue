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
	<!-- NAVBAR -->
</template>
<style>
#menuIcon:hover{
	cursor: pointer;
}
</style>