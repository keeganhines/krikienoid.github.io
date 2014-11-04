/**
 * Text Bubbles
 * represent words as a series of bubbles
 * 
 * Contributors:
 *
 * Ken Sugiura /u/krikienoid (reddit)
 * /u/qi1 (reddit)
 * /u/kylemit (reddit)
 *
 * MIT License 2014
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

	var $input,
		$output;

	function getSize (x) {
		switch (bubbleType) {
			case kBT.LINEAR : return x * scale;
			case kBT.SQUARE : return Math.sqrt(x) * scale;
			case kBT.AREA   : return Math.sqrt(x / Math.PI) * 2 * scale;
			default         : return x * scale;
		}
	}

	function updateBubbles () {

		var bubbles = [];

		$.each(
			$input.val().split(regExpSplit), 
			function (i, word) {
				var len  = word.replace(regExpCount, '').length,
					size = getSize(len);

				bubbles.push(
					$('<div />')
						.addClass('word-bubble')
						.data('word', word)
						.data('size', size)
						.width(size)
						.height(size)
						.attr('title', '[' + len + '] ' + word)
						.css('background-color', 'hsl(' + (len * 7 - 300) + ', 50%, 50%)')
						//.css({margin:(spacing - size) / 2})
				);
			}
		);

		$output.empty().append(bubbles);

	}

	$(document).ready(function () {

		$input  = $('#text-bubbles-input')
		$output = $('#text-bubbles-output');

		$('#bubble-type')
			.on(
				'change',
				function () {
					if     (this.value === "area")
						bubbleType = kBT.AREA;
					else if(this.value === "square")
						bubbleType = kBT.SQUARE;
					else
						bubbleType = kBT.LINEAR;
					updateBubbles();
				}
			);

		$('#bubble-set-scale')
			.val(scale)
			.on(
				'change',
				function () {
					var x = Number(this.value);
					if (!isNaN(x)) {
						scale = x / 10;
						updateBubbles();
					}
				}
			);

		$('#bubble-set-spacing')
			.val(spacing)
			.on(
				'change',
				function () {
					var x = Number(this.value);
					if (!isNaN(x)) {
						spacing = x;
						updateBubbles();
					}
				}
			);

		$input.on('input', updateBubbles).trigger('input');

	});

})();