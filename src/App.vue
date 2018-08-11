<template>

	<div class="app-wrapper">

		<div class="sidebar">
			<albums :albums="albums" @currentAlbum="changeAlbum" />
		</div>
		
		<div class="plane">

			<div class="space-bg"></div>

			<div class="elements">
				<photos :photos="photos" />
			</div>
			
		</div>

		<div class="clearfix"></div>

	</div>

</template>



<script>
	
	import albumsData from './data/albums'
	import Albums from './components/Albums'
	import Photos from './components/Photos'
	// import { preloadImage, matrix3D } from "./helpers/helpers";

	export default {
		name: 'App',
		data() {
			return {
				albums: albumsData,
				active: null,
				photos: []
			}
		},
		computed: {
			activeAlbum() {
				return this.albums[this.active];
			}
		},
		watch: {
			active: function(val) {
				// this.displayPhotos(val)
				this.photos = this.activeAlbum.photos;
			}
		},
		methods: {
			changeAlbum: function(index) {
				this.active = index;
				// this.photos = this.activeAlbum.photos;
			},
			// displayPhotos(index) {

				// this.active = index;

				// const elementsNode = document.querySelector('.plane .photos');
				// elementsNode.innerHTML = '';

				// this.photos.forEach(photo => {
				// 	const el = document.createElement('div');
				// 	el.className = 'photo';

				// 	const img = document.createElement('img');
				// 	img.src = photo.url;

				// 	el.appendChild(img);

				// 	elementsNode.appendChild(el);
				// });

				// const elementsSet = elementsNode.querySelectorAll('.photo');

				// matrix3D(elementsSet, 5000);

				// setTimeout(function() {
				// 	matrix3D(elementsSet);
				// }, 100);

			// }
		},
		components: {
			Albums,
			Photos
		},
		mounted() {
			this.changeAlbum(0);
		}
	}

</script>



<style lang="scss">

	.main-app {
		background: #222;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		text-align: center;
		color: #c1c1c1;
	}

	.app-wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: no-wrap;
	}

	.sidebar {
		width: 20%;
		height: 100vh;
		float: left;
		overflow: hidden;
		overflow-y: scroll;
		border-right: 2px solid #525252;
	}

	.plane {
		width: 80%;
		height: 100vh;
		background-color: #000;
		position: relative;
		z-index: 1;
		overflow: hidden;
		float: left;
	}

	.space-bg {
		position: absolute;
		z-index: 10;
		width: 400%;
		height: 400%;
		left: -150%;
		right: 0;
		top: -150%;
		bottom: 0;
		background-image: url('./assets/img/space-bg1.jpg');
		background-size: contain;
		animation: rotation 500s linear infinite;
	}

	.photos {
		position: absolute;
		z-index: 20;
		width: 100%;
		height: 100%;
		left: 0;
		right: 0;
		top:0;
		bottom: 0;
		transform-style: preserve-3d;
		perspective: 1000px;

		.photo {
			width: 50%;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,0,0,1);
			// border: 2px solid #525252;
			box-shadow: 0 0 40px rgba(255, 255, 255, 0.8);
			text-align: center;
			cursor: pointer;
			transition: all 0.5s ease;

			img {
				width: 100%;
			}
		}
	}

	@-webkit-keyframes rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}

</style>
