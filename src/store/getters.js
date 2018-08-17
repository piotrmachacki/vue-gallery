export default {
	photos(state) {
		return (albumId) => {
			return state.albums[albumId];
		};
	},
	loadedPhotos(state) {
		return () => {
			return state.loadedPhotos;
		};
	},
	loading(state) {
		return () => {
			return state.loading;
		};
	},
	loaded(state) {
		return () => {
			return state.loaded;
		};
	},
	activePhoto(state) {
		return () => {
			return state.activePhoto;
		};
	},
	matrix3dData(state) {
		return () => {
			return state.matrix3dData;
		};
	},
	originMatrix3dData(state) {
		return () => {
			return state.originMatrix3dData;
		};
	},
	activeScene(state) {
		return () => {
			return state.activeScene;
		};
	},
	scenePerspectiveOrigin(state) {
		return () => {
			return state.scenePerspectiveOrigin;
		};
	}
};