/**
 * Text Bubbles
 * represent words as a series of bubbles
 * 
 * Ken Sugiura 2014
 * MIT License
 */

var textBubbles = (function () {

	var kBT = {
		LINEAR : 0, SQUARE : 1, AREA : 2
	};

	var scale      = 2,
		spacing    = 12,
		regExp     = /[^a-zA-Z\d]/,
		bubbleType = kBT.LINEAR;

	var IN,
		OUT,
		OPT_LIN,
		OPT_SQUARE,
		OPT_AREA;

	function init () {
		IN  = document.getElementById('text-bubbles-input');
		IN.oninput = updateBubbles;
		OUT = document.getElementById('text-bubbles-output');
		OPT_LIN    = document.getElementById('bubble-type-linear');
		OPT_SQUARE = document.getElementById('bubble-type-square');
		OPT_AREA   = document.getElementById('bubble-type-area');
		OPT_LIN    .onclick = setBubbleType;
		OPT_SQUARE .onclick = setBubbleType;
		OPT_AREA   .onclick = setBubbleType;
		document.getElementById('bubble-set-scale').value   = scale;
		document.getElementById('bubble-set-spacing').value = spacing;
		document.getElementById('bubble-set-scale').onchange =
			function () {setScale(Number(this.value));};
		document.getElementById('bubble-set-spacing').onchange =
			function () {setSpacing(Number(this.value));};
	}

	function getSize (x) {
		switch (bubbleType) {
			case kBT.LINEAR : return x;
			case kBT.SQUARE : return Math.sqrt(x);
			case kBT.AREA   : return Math.sqrt(x / Math.PI) * 2;
			default         : return x;
		}
	}

	function createBubble (word) {
		var newBubble = document.createElement('div'),
			size      = getSize(word.length) * scale;
		newBubble.classList.add('word-bubble');
		newBubble.title = '[' + word.length + '] ' + word;
		newBubble.style.height =
			newBubble.style.width =
				size + 'px';
		newBubble.style.marginTop =
			newBubble.style.marginLeft =
				newBubble.style.marginRight =
					newBubble.style.marginBottom =
						(spacing - size) / 2 + 'px';
		return newBubble;
	}

	function removeAllChildren (node) {
		while (node.firstChild)
			node.removeChild(node.firstChild);
	}

	function updateBubbles () {
		printBubbles(IN.value.split(regExp));
	}

	function printBubbles (words) {
		removeAllChildren(OUT);
		for (var i = 0, ii = words.length; i < ii; i++) {
			if (words[i].length) {
				OUT.appendChild(
					createBubble(words[i])
				);
			}
		}
	}

	function setBubbleType () {
		if (OPT_AREA.checked)
			bubbleType = kBT.AREA;
		else if(OPT_SQUARE.checked)
			bubbleType = kBT.SQUARE;
		else
			bubbleType = kBT.LINEAR;
		updateBubbles();			
	}

	function setScale (x) {
		if (!isNaN(x)) {
			scale = x / 10;
			updateBubbles();
		}
	}

	function setSpacing (x) {
		if (!isNaN(x)) {
			spacing = x;
			updateBubbles();
		}
	}

	return {
		init         : init,
		printBubbles : printBubbles,
	};

})();
