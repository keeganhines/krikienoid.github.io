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
		spacing     = 1,
		isGridded   = false,
		regExpUTF   =
			'\\u00ad' +
			'\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00d8-\\u01bf' + // Extended Latin
			'\\u01c4-\\u02af\\u0370-\\u0373\\u0376\\u0377'  + // Greek and Russian
			'\\u037b-\\u037d\\u0386\\u0388-\\u038a\\u038c'  +
			'\\u038e-\\u03a1\\u03a3-\\u0481\\u048a-\\u0527' +
			'\\u0531-\\u0556\\u0561-\\u0587' + // Armenian
			'\\u05d0-\\u05ea\\u05f0-\\u05f2' + // Hebrew
			'\\u0620-\\u064a\\u0660-\\u0669' + // Arabic
			'\\u066d-\\u06d3\\u06f0-\\u06fc' +
			'\\u0710-\\u072f\\u074d-\\u07a5' +
			'\\u07c0-\\u07ea\\u0800-\\u0815' + // Thaana
			'\\u0840-\\u0858\\u08a0-\\u08b2' + // Mandaic & Arabic Extended
			'\\u0904-\\u0939\\u0958-\\u0961' + // Devanagari
			'\\u0966-\\u096f\\u0972-\\u097f' +
			'\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8' + // Bengali
			'\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9' +
			'\\u09dc-\\u09e1\\u09e6-\\u09f1' +
			'',
		regExpSplit = new RegExp('[^a-zA-Z' + regExpUTF + '\\d\\.\\-\']'),
		regExpCount = new RegExp('[^a-zA-Z' + regExpUTF + '\\d]', 'g'),
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

				if (len) {
					bubbles.push(
						$('<div />')
							.addClass('word-bubble')
							.attr('data-title', '[' + len + '] ' + word)
							.width(size)
							.height(size)
							.css('background-color', 'hsl(' + (len * 7 - 300) + ', 50%, 50%)')
							.css(
								(isGridded)?
									{'margin' : (spacing - size + 10) / 2} :
									{'margin-right' : spacing}
							)
					);
				}
			}
		);

		$output.empty().append(bubbles);

	}

	$(document).ready(function () {

		$input  = $('#text-bubbles-input');
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
						spacing = x / 5;
						updateBubbles();
					}
				}
			);

		$('#bubble-set-gridded')
			.on(
				'change',
				function () {
					isGridded = !!this.checked;
					updateBubbles();
				}
			);

		$input.on('input', updateBubbles).trigger('input');

	});

})();
