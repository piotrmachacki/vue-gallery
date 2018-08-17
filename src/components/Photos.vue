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
		<div 
		:class="['scene', { 'active': activeScene }]"
		:style="{'perspective-origin': scenePerspectiveOrigin}"
		@mousemove="transformScene($event)"
		>
			<b-button :class="['reset-scene', { 'active': activeScene }]" @click="resetScene()">close</b-button>
			<div :class="['photos', { 'loading': loading, 'loaded': loaded }]">
				<div v-for="(photo, index) in loadedPhotos"
				:class="['photo', (activePhoto === index) ? 'activePhoto' : '', (activePhoto !== null && activePhoto > index) ? 'breakpoint' : '']"
				:style="{'transform': `
					translate(-50%, -50%) 
					matrix3d(
						1, 0, 0, 0,
						0, 1, 0, 0,
						0, 0, 1, 0,
						${matrix3dData[index].moveX}, ${matrix3dData[index].moveY}, ${matrix3dData[index].moveZ}, 1
					)
				`}"
				@click="showPhoto(index)">
					<img :src="photo.url" :alt="photo.title">
				</div>
			</div>
		</div>
	</div>
	

</template>



<script>
	
	import { preloadImage, getRandomInteger, getCursorPositionByCenterOfElement } from "../helpers/helpers";

	export default {
		name: 'Photos',
		props: {
			photos: Array
		},
		data() {
			return {
				counter: 0,
				photosCount: 0,
				progress: 0
			}
		},
		computed: {
			loadedPhotos() {
				return this.$store.state.loadedPhotos;
			},
			loading() {
				return this.$store.state.loading;
			},
			loaded() {
				return this.$store.state.loaded;
			},
			activePhoto() {
				return this.$store.state.activePhoto;
			},
			matrix3dData() {
				return this.$store.state.matrix3dData;
			},
			originMatrix3dData() {
				return this.$store.state.originMatrix3dData;
			},
			activeScene() {
				return this.$store.state.activeScene;
			},
			scenePerspectiveOrigin() {
				return this.$store.state.scenePerspectiveOrigin;
			}
		},
		methods: {
			matrixData(length, rangeVal = 500) {
				let matrixData = [];

				for(let i = 0; i < length; i++) {

					let j = i + 1;
					let range = rangeVal * (j/2);
					let posZ = -500;

					let moveX = getRandomInteger(-range, range);
					let moveY = getRandomInteger(-range, range);
					let moveZ = posZ + (j+1) * -500;

					matrixData[i] = {moveX, moveY, moveZ};

				}

				return matrixData;
			},
			loadPhotos() {
				let loadedPhotos = [];
				let promises = [];

				this.photos.forEach(photo => {

					let p = preloadImage(photo.url).then(
						url => {
							loadedPhotos.push(photo);
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

				setTimeout(() => {
					Promise.all(promises).then(values => {
						this.$store.commit('changeLoadedPhotos', { loadedPhotos });
					}).catch(reason => { 
						console.log(reason);
					});
				}, 1000);
			},
			displayPhotos() {
				this.counter = 0;
				this.progress = 0;
				this.$store.commit('changeLoading', { loading: false });
				this.$store.commit('changeLoaded', { loaded: true });
				this.resetScene();
			},
			showPhoto(index) {
				this.$store.commit('changeActivePhoto', { activePhoto: index });

				this.$store.commit('changeActiveScene', { activeScene: true });
				this.$store.commit('changeScenePerspectiveOrigin', { scenePerspectiveOrigin: '' });

				let zDistance = -200;

				let matrix3dData = [];

				this.matrix3dData.forEach((el, i) => {

					let moveX = this.matrix3dData[i].moveX - this.matrix3dData[index].moveX;
					let moveY = this.matrix3dData[i].moveY - this.matrix3dData[index].moveY;
					let moveZ = this.matrix3dData[i].moveZ - this.matrix3dData[index].moveZ + zDistance;
					matrix3dData.push({moveX, moveY, moveZ});

				});

				this.$store.commit('changeMatrix3dData', {matrix3dData});
			},
			transformScene(e) {
				let sceneNode = e.currentTarget;

				if(!this.activeScene) {

					let pos = getCursorPositionByCenterOfElement(sceneNode, e);

					let w = sceneNode.offsetWidth;
					let h = sceneNode.offsetHeight;

					let tx = pos.x/w*100;
					let ty = pos.y/h*100;

					this.$store.commit('changeScenePerspectiveOrigin', { scenePerspectiveOrigin: `${50+tx*2}% ${50+ty*2}%` });

				}
			},
			resetScene() {
				this.$store.commit('changeActivePhoto', { activePhoto: null });

				let matrix3dData = this.originMatrix3dData;
				this.$store.commit('changeMatrix3dData', {matrix3dData});

				this.$store.commit('changeActiveScene', { activeScene: false });
			},
			updateCounter() {
				this.progress = (this.counter/this.photosCount*100);
			}
		},
		watch: {
			photos(newValue, oldValue) {
				this.$store.commit('changeActivePhoto', { activePhoto: null });
				this.photosCount = this.photos.length;
				this.$store.commit('changeLoading', { loading: true });
				this.$store.commit('changeLoaded', { loaded: false });
				this.loadPhotos();
				let matrix3dData = this.matrixData(newValue.length, 3000);
				this.$store.commit('changeMatrix3dData', {matrix3dData});
			},
			loaded() {
				let matrix3dData = this.matrixData(this.loadedPhotos.length);
				let originMatrix3dData = [...matrix3dData];
				this.$store.commit('changeOriginMatrix3dData', {originMatrix3dData});
				this.$store.commit('changeMatrix3dData', {matrix3dData});
			},
			loadedPhotos() {
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
			.photo {
				opacity: 0;
			}
		}

		&.loaded {
			.photo {
				opacity: 1;

				&.breakpoint {
					opacity: 0;
				}
			}
		}
	}

</style>