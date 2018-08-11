<template>

	<div class="app-wrapper">

		<div class="sidebar">
			<albums :albums="albums"/>
		</div>
		
		<div class="plane">

			<div class="space-bg"></div>

			<div class="elements"></div>
			
		</div>

		<div class="clearfix"></div>

	</div>

</template>



<script>
	
	import albumsData from './data/albums'
	import Albums from './components/Albums'

	export default {
		name: 'App',
		data() {
			return {
				albums: albumsData
			}
		},
		components: {
			Albums
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

	.elements {
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

		.element {
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
