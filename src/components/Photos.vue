<template>
	
	<div class="photos">
		<div class="photo" v-for="photo in photos">
			<img :src="photo.url" :alt="photo.title">
		</div>
	</div>
	

</template>



<script>
	
	import { preloadImage, matrix3D } from "../helpers/helpers";

	export default {
		name: 'Photos',
		props: {
			photos: Array
		},
		watch: {
			photos(newValue, oldValue) {
				// console.log(newValue, oldValue);
				// if(oldValue.length === 0 && newValue.length !== 0) {
				// 	preloadImage(this.activeUrl)
				// 		.then(url => this.loaded = true);
				// }

				this.displayPhotos();
			}
		},
		methods: {
			displayPhotos() {
				const photos = document.querySelectorAll('.photos .photo');

				// matrix3D(photos, 5000);

				setTimeout(function() {
					matrix3D(photos);
				}, 100);
			}
		},
		updated() {
			this.displayPhotos();
		}
	};

</script>



<style lang="scss">

</style>