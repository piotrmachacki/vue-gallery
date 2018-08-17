import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		albums: require('../data/albums.json'),
		photos: [],
		loadedPhotos: [],
		currentAlbum: 0,
		loading: false,
		loaded: false,
		activePhoto: null,
		matrix3dData: [],
		originMatrix3dData: [],
		activeScene: false,
		scenePerspectiveOrigin: ''
	},
	getters,
	mutations,
	actions,
});