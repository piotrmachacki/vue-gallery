<template>

	<b-nav-item>
		<h2 class="title">{{ title }}</h2>
		<img class="thumbnail" :src="thumbnail" :alt="title">
	</b-nav-item>

</template>



<script>

	export default {
		name: 'Album',
		props: {
			name: String,
			title: String,
			thumbnail: String,
			photos: Array
		}
	};

</script>