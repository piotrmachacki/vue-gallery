<template>

	<div class="app-wrapper">

		<div class="sidebar">
			<vue-scrollbar classes="sidebar-scrollbar" ref="Scrollbar">
				<div class="scrollbar-wrapper">
					<albums :albums="albums" />
				</div>
			</vue-scrollbar>
		</div>
		
		<div class="plane">

			<div class="space-bg"></div>

			<photos :photos="photos" />
			
		</div>

		<div class="clearfix"></div>

	</div>

</template>



<script>
	
	import Albums from './components/Albums'
	import Photos from './components/Photos'
	import VueScrollbar from 'vue2-scrollbar';
	import 'vue2-scrollbar/dist/style/vue2-scrollbar.css'

	export default {
		name: 'App',
		computed: {
			albums() {
				return this.$store.state.albums;
			},
			currentAlbum() {
				return this.$store.state.currentAlbum;
			},
			photos() {
				return this.$store.state.photos;
			}
		},
		methods: {
			
		},
		components: {
			Albums,
			Photos,
			VueScrollbar
		},
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
		// overflow: hidden;
		// overflow-y: scroll;
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

	.sidebar-scrollbar {
		width: 100%;
		min-width: 100%;
		max-height: 100%;

		.scrollbar-wrapper {
			background: #222;
			padding-right: 10px;
			padding-left: 5px;
		}

		.vue-scrollbar__scrollbar-vertical .scrollbar,
		.vue-scrollbar__scrollbar-horizontal .scrollbar {
			background: #666;
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
