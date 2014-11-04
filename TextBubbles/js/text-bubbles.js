var textBubbles = (function () {

	var scale   = 3,
		spacing = 12;
		regExp  = /[^a-zA-Z\d]/;

	var IN,
		OUT;

	function init () {
		IN  = document.getElementById('text-bubbles-input');
		OUT = document.getElementById('text-bubbles-output');
		document.getElementById('text-bubbles-enter').onclick = function () {
			printBubbles(IN.value.split(regExp));
		};
	}

	function createBubble (word) {
		var newBubble = document.createElement('div'),
			size      = word.length * scale;
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

	return {
		init         : init,
		printBubbles : printBubbles
	};

})();

