export default {
	changeCurrentAlbum(state, payload) {
		state.currentAlbum = payload.index;
		state.photos = state.albums[state.currentAlbum].photos;
	},
	changeLoadedPhotos(state, payload) {
		state.loadedPhotos = payload.loadedPhotos;
	},
	changeLoading(state, payload) {
		state.loading = payload.loading;
	},
	changeLoaded(state, payload) {
		state.loaded = payload.loaded;
	},
	changeActivePhoto(state, payload) {
		state.activePhoto = payload.activePhoto;
	},
	changeMatrix3dData(state, payload) {
		state.matrix3dData = payload.matrix3dData;
	},
	changeOriginMatrix3dData(state, payload) {
		state.originMatrix3dData = payload.originMatrix3dData;
	},
	changeActiveScene(state, payload) {
		state.activeScene = payload.activeScene;
	}
};