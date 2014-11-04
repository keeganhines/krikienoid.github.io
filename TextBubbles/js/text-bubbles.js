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

	var scale       = 2,
		spacing     = 12,
		regExpSplit = /[^a-zA-Z\d\-']/,
		regExpCount = /[^a-zA-Z\d]/,
		bubbleType  = kBT.LINEAR;

	var IN,
		OUT;

	function init () {
		IN  = document.getElementById('text-bubbles-input');
		IN.oninput = updateBubbles;
		OUT = document.getElementById('text-bubbles-output');
		document.getElementById('bubble-type').onchange =
			function () {
				if     (this.value === "area")
					bubbleType = kBT.AREA;
				else if(this.value === "square")
					bubbleType = kBT.SQUARE;
				else
					bubbleType = kBT.LINEAR;
				updateBubbles();
			};
		document.getElementById('bubble-set-scale').value = scale;
		document.getElementById('bubble-set-spacing').value = spacing;
		document.getElementById('bubble-set-scale').onchange =
			function () {
				var x = Number(this.value);
				if (!isNaN(x)) {
					scale = x / 10;
					updateBubbles();
				}
			};
		document.getElementById('bubble-set-spacing').onchange =
			function () {
				var x = Number(this.value);
				if (!isNaN(x)) {
					spacing = x;
					updateBubbles();
				}
			};
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
		newBubble.title = '[' + word.replace(regExpCount, '').length + '] ' + word;
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
		var words = IN.value.split(regExpSplit);
		removeAllChildren(OUT);
		for (var i = 0, ii = words.length; i < ii; i++) {
			if (words[i].length) {
				OUT.appendChild(
					createBubble(words[i])
				);
			}
		}
	}

	return {
		init : init
	};

})();
