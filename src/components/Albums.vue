<template>
	
	<div class="albums">
		<b-nav>
			<template v-for="(album, index) in albums">
				<album :name="album.name" :title="album.title" :thumbnail="album.thumbnail" :photos="album.photos" :index="index" @click.native="changeAlbum(index)" />
			</template>
		</b-nav>
	</div>
	

</template>



<script>
	
	import Album from "./Album";

	export default {
		name: 'Albums',
		props: {
			albums: Array
		},
		data() {
			return {
				authKey: '563492ad6f9170000100000185ca9c638e4644329728ab7c2d92172d'
			}
		},
		methods: {
			changeAlbum(index) {
				this.$store.commit('changeCurrentAlbum', { index });
				this.$store.commit('changeLoading', { loading: true });
				this.$store.commit('changeLoaded', { loaded: false });

				let albumName = encodeURIComponent(this.albums[index].name);
				let url = `https://api.pexels.com/v1/search?query=${albumName}&per_page=40&page=1`;

				this.$http.get(url, {headers: {'Authorization': this.authKey}})
					.then(({ data }) => {
                		this.$store.commit('changePhotos', { photos: data.photos });
                	}).catch(reason => { 
						console.log(reason);
					});
			}
		},
		components: {
			Album
		},
		mounted() {
			this.changeAlbum(0);
		}
	}

</script>



<style lang="scss">

	.albums {
		.nav-item {
			margin: 0.5rem;

			.nav-link {
				padding: 0;
				border: 2px solid #525252;
				position: relative;
				transition: all ease 0.3s;

				.title {
					width: 100%;
					height: 80px;
					background: rgba(0, 0, 0, 0.5);
					position: absolute;
					z-index: 10;
					left: 0;
					right: 0;
					bottom: 0;
					margin: 0;
					padding: 20px 10px;
					color: #fff;
					transition: all ease 0.3s;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				&:hover {
					.title {
						background: rgba(0, 0, 0, 0.7);
						height: 100%;
					}
				}
				
				.thumbnail {
					max-width: 100%;
				}
			}
		}
	}


</style>