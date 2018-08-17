export function preloadImage(url) {

	const img = document.createElement('img');
	const p = new Promise(function(resolve, reject) {
		img.onload = () => resolve(url);
		img.onerror = () => reject(url);
	});

	img.src = url;

	return p;

}



export function getRandomInteger(min, max) {

	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;

}



export function getElementPosition(el) {
	let xPosition = 0;
	let yPosition = 0;
 
	while (el) {
		if (el.tagName == "BODY") {
			// deal with browser quirks with body/window/document and page scroll
			let xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
			let yScrollPos = el.scrollTop || document.documentElement.scrollTop;
 
			xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
			yPosition += (el.offsetTop - yScrollPos + el.clientTop);
		} else {
			xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
			yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
		}
 
		el = el.offsetParent;
	}
	return {
		x: xPosition,
		y: yPosition
	};
}



export function getCursorPositionByCenterOfElement(el, event) {

		// element size
		let w = el.offsetWidth;
		let h = el.offsetHeight;

		// element center position
		let cw = (w/2);
		let ch = (h/2);

		// cursor position
		let x = event.pageX - getElementPosition(el).x;
		let y = event.pageY - getElementPosition(el).y;

		// cursor position by center of element
		let px = x - cw;
		let py = y - ch;

		return {
			x: px,
			y: py
		};

}
