angular.module('scape').directive('splitterVertical', 
		[ '$document', '$timeout', function($document, $timeout) {

	function resizeFrame() {
		var bodyHeight = $("body").innerHeight();
		$(".fill-height").each(function(index) {
			var height = bodyHeight - $(this).offset().top - 15;
			$(this).css("height", String(height) + "px");
			$(this).css("overflow-y", "auto");
		});
	}

	function link(scope, element, attrs) {
		var limit = attrs.limit || 30;
		var position = attrs.position || '50%';

		$.event.add(window, "load", resizeFrame);
		$.event.add(window, "resize", resizeFrame);
		$timeout(resizeFrame, 0);

		$(element).split({
			orientation: 'vertical',
			limit: limit,
			position: position,
			onDrag: function(e) {
				resizeFrame();
			}
		});
	}

	return {
		restrict: 'C',
		link: link
	}
}]);