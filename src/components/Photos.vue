<template>
	
	<div class="scene-wrap">
		<div class="photos-progress" v-if="loading">
			<h5>Loaded {{ this.counter }}/{{ this.photosCount }}</h5>
			<b-progress :variant="'secondary'" show-progress>
				<b-progress-bar :value="progress">
					<span class="progress-bar-value">{{ progress.toFixed(2) }} %</span>
				</b-progress-bar>
			</b-progress>
		</div>
		<div :class="['scene', { 'active': activeScene }]">
			<b-button :class="['reset-scene', { 'active': activeScene }]" @click="resetScene()">close</b-button>
			<div :class="['photos', { 'loading': loading, 'loaded': loaded }]">
				<div class="photo" @click="showPhoto(index)" v-for="(photo, index) in photosData">
					<img :src="photo.url" :alt="photo.title">
				</div>
			</div>
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
		data() {
			return {
				photosData: [],
				loading: false,
				loaded: false,
				updated: false,
				counter: 0,
				photosCount: 0,
				progress: 0,
				activeScene: false
			}
		},
		methods: {
			changePhotos() {
				this.loading = true;
				this.loaded = false;
				const photos = document.querySelectorAll('.photos .photo');
				matrix3D(photos, 1000);
			},
			loadPhotos() {
				let photosData = [];
				let promises = [];

				this.photos.forEach(photo => {

					let p = preloadImage(photo.url).then(
						url => {
							photosData.push(photo);
							this.counter++
							this.updateCounter();
						},
						url => {
							this.photosCount--;
							this.updateCounter();
						}
					);

					promises.push(p);

				});

				Promise.all(promises).then(values => {
					this.photosData = photosData;
					this.updated = true;
					// this.counter = 0;
				}).catch(reason => { 
					console.log(reason);
				});
			},
			displayPhotos() {
				const photos = document.querySelectorAll('.photos .photo');
				matrix3D(photos);
				this.counter = 0;
				this.progress = 0;
				this.loading = false;
				this.loaded = true;
				this.resetScene();
			},
			updateCounter() {
				this.progress = (this.counter/this.photosCount*100);
			},
			showPhoto(index) {

				let sceneNode = document.querySelector('.scene')
				let photos = document.querySelectorAll('.photos .photo');
				let activePhoto = photos[index];

				photos.forEach(photo => {
					photo.classList.remove('activePhoto');
				});

				this.activeScene = true;
				sceneNode.style.perspectiveOrigin = '';
				sceneNode.classList.add('active');
				activePhoto.classList.add('activePhoto');

				let zDistance = -200;

				let activeMoveX = activePhoto.dataset.moveX;
				let activeMoveY = activePhoto.dataset.moveY;
				let activeMoveZ = activePhoto.dataset.moveZ;

				let breakpoint = false;

				activePhoto.style.transform = `
					translate(-50%, -50%) 
					matrix3d(
						1, 0, 0, 0,
						0, 1, 0, 0,
						0, 0, 1, 0,
						0, 0, ${zDistance}, 1
					)
				`;

				photos.forEach(photo => {

					if(!photo.classList.contains('activePhoto')) {

						let moveX = photo.dataset.moveX;
						let moveY = photo.dataset.moveY;
						let moveZ = photo.dataset.moveZ;

						photo.style.transform = `
							translate(-50%, -50%) 
							matrix3d(

								1, 0, 0, 0,
								0, 1, 0, 0,
								0, 0, 1, 0,
								${moveX - activeMoveX}, ${moveY - activeMoveY}, ${moveZ - activeMoveZ + zDistance}, 1

							)
						`;

						if(breakpoint === false) photo.style.opacity = 0;

					} else {
						breakpoint = true;
					}

				});
			},
			resetScene() {

				let sceneNode = document.querySelector('.scene')
				let photos = document.querySelectorAll('.photos .photo');

				photos.forEach(photo => {

					photo.classList.remove('activePhoto');

					let moveX = photo.dataset.moveX;
					let moveY = photo.dataset.moveY;
					let moveZ = photo.dataset.moveZ;

					photo.style.transform = `
						translate(-50%, -50%) 
						matrix3d(

							1, 0, 0, 0,
							0, 1, 0, 0,
							0, 0, 1, 0,
							${moveX}, ${moveY}, ${moveZ}, 1

						)
					`;

					photo.style.opacity = '';

				});

				this.activeScene = false;
				sceneNode.classList.remove('active');

			}
		},
		watch: {
			photos(newValue, oldValue) {
				this.photosCount = this.photos.length;
				this.changePhotos();
				setTimeout(() => {
					this.loadPhotos();
				}, 1000);
			}
		},
		mounted() {
		},
		updated() {
			if(this.updated === true) {
				this.updated = false;
				this.changePhotos();
				setTimeout(() => {
					this.displayPhotos();
				}, 1000);
			}
		}


	};

</script>



<style lang="scss">

	.photos-progress {
		position: absolute;
		z-index: 100;
		width: 50%;
		height: 50%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) translateZ(-500px);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		h5 {
			color: #fff;
			text-shadow: 0 0 5px #6c757d;
			line-height: unset;
		}

		.progress {
			width: 100%;
			height: 1.4rem;

			.progress-bar {
				height: 100%;
				align-self: center;
				justify-content: center;

				.progress-bar-value {
					padding: 0 5px
				}
			}
		}
	}
	
	.scene-wrap {
		position: absolute;
		z-index: 20;
		width: 100%;
		height: 100%;
		left: 0;
		right: 0;
		top:0;
		bottom: 0;
	}

	.scene {
		width: 100%;
		height: 100%;
		z-index: 30;
		perspective: 2000px;
		perspective-origin: 50% 50%;
		padding-top: 30%;
	}

	.reset-scene {
		position: absolute;
		top: -20px;
		right: -20px;
		opacity: 0;
		transition: all 0.3s ease;

		&.active {
			top: 20px;
			right: 20px;
			opacity: 1;
		}
	}

	.photos {
		// position: absolute;
		// z-index: 40;
		// width: 100%;
		// height: 100%;
		// left: 0;
		// right: 0;
		// top:0;
		// bottom: 0;
		// transform: matrix3d( 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 2001, 1);
		transform: translateZ(1000px);
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
			opacity: 0;
			transition: all 1s cubic-bezier(0.22, 0.61, 0.36, 1);

			img {
				width: 100%;
			}
		}

		&.loading {
			// background: url('./assets/img/loader.gif') no-repeat center center;

			.photo {
				opacity: 0;
			}
		}

		&.loaded {
			.photo {
				opacity: 1;
			}
		}
	}

</style>