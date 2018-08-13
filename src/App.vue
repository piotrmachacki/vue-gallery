<template>

	<div class="app-wrapper">

		<div class="sidebar">
			<albums :albums="albums" @currentAlbum="changeAlbum" />
		</div>
		
		<div class="plane">

			<div class="space-bg"></div>

			<photos :photos="photos" />
			
		</div>

		<div class="clearfix"></div>

	</div>

</template>



<script>
	
	import albumsData from './data/albums'
	import Albums from './components/Albums'
	import Photos from './components/Photos'
	import { getCursorPositionByCenterOfElement } from "./helpers/helpers";

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
				this.photos = this.activeAlbum.photos;
			}
		},
		methods: {
			changeAlbum: function(index) {
				this.active = index;
			},
			transformScene() {

				let sceneNode = document.querySelector('.scene');

				sceneNode.addEventListener('mousemove', e => {

					if(!sceneNode.classList.contains('active')) {

						let pos = getCursorPositionByCenterOfElement(sceneNode, e);

						let w = sceneNode.offsetWidth;
						let h = sceneNode.offsetHeight;

						let tx = pos.x/w*100;
						let ty = pos.y/h*100;

						sceneNode.style['perspective-origin'] = `${50+tx*2}% ${50+ty*2}%`;

					}

				}, false);

			}
		},
		components: {
			Albums,
			Photos
		},
		mounted() {
			this.changeAlbum(0);
			this.transformScene();
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

	@-webkit-keyframes rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}

</style>
