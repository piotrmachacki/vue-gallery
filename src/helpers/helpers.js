export function preloadImage(url) {

	const img = document.createElement("img");
	const p = new Promise(function(resolve, reject) {
		img.onload = () => resolve(url);
		img.onerror = () => reject(url);
	});

	img.src = url;

	return p;

}



function getRandomInteger(min, max) {

	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;

}



export function matrix3D(elements, rangeVal = 200) {

	for(var i = 0; i < elements.length; i++) {

		var j = i + 1;
		var range = rangeVal * j;

		var moveX = getRandomInteger(-range, range);
		var moveY = getRandomInteger(-range, range);
		var moveZ = (j+1) * -500;

		elements[i].style.transform = `
			translate(-50%, -50%) 
			matrix3d(

				1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				${moveX}, ${moveY}, ${moveZ}, 1

			)
		`;

	}

}
