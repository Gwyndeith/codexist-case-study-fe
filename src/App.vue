<template>
	<img
		style="margin-top: 20px; border-radius: 20px"
		alt="Vue logo"
		src="./assets/codexist-logo.jpg"
		width="200px"
	/>
	<main>
		<RouterView />
	</main>
	<!--MapScreen msg="Welcome to Your Vue.js App" /-->
</template>

<script>
export default {
	name: "App",
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background-color: darkslategrey;
}
</style>
