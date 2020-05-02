(function (modules) {
	var installedModules = {};

	function __webpack_require__(moduleId) {
		if (installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		module.l = true;
		return module.exports;
	}
	__webpack_require__.m = modules;
	__webpack_require__.c = installedModules;
	__webpack_require__.d = function (exports, name, getter) {
		if (!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, {
				enumerable: true,
				get: getter
			});
		}
	};
	__webpack_require__.r = function (exports) {
		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, {
				value: 'Module'
			});
		}
		Object.defineProperty(exports, '__esModule', {
			value: true
		});
	};
	__webpack_require__.t = function (value, mode) {
		if (mode & 1) value = __webpack_require__(value);
		if (mode & 8) return value;
		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', {
			enumerable: true,
			value: value
		});
		if (mode & 2 && typeof value != 'string')
			for (var key in value) __webpack_require__.d(ns, key, function (key) {
				return value[key];
			}.bind(null, key));
		return ns;
	};
	__webpack_require__.n = function (module) {
		var getter = module && module.__esModule ? function getDefault() {
			return module['default'];
		} : function getModuleExports() {
			return module;
		};
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};
	__webpack_require__.o = function (object, property) {
		return Object.prototype.hasOwnProperty.call(object, property);
	};
	__webpack_require__.p = "";
	return __webpack_require__(__webpack_require__.s = "./assets/js/main.js");
})
({
	"./assets/js/main.js":
		/*!***************************!*\
		!*** ./assets/js/main.js ***!
		\***************************/
		/*!no exports provided*/ (function (module, __webpack_exports__, __webpack_require__) {
			"use strict";
			__webpack_require__.r(__webpack_exports__);
			var _scroll_entrance_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*!./scroll-entrance.min.js*/ "./assets/js/scroll-entrance.min.js");
			var _scroll_entrance_min_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_scroll_entrance_min_js__WEBPACK_IMPORTED_MODULE_0__);
			var typed = new Typed('#typed', {
				strings: ['$ National-level Hackathon'],
				typeSpeed: 30,
				backSpeed: 8,
				backDelay: 3500,
				startDelay: 1000,
				fadeOut: false,
				loop: true,
				shuffle: false,
				cursorChar: '_'
			});
			const items = document.querySelectorAll('.accordion a.question');

			function toggleAccordion() {
				this.classList.toggle('active');
				for (let item of items) {
					if (item !== this) {
						item.classList.remove('active');
						item.nextElementSibling.classList.remove('active');
					}
				}
				this.nextElementSibling.classList.toggle('active');
			}
			items.forEach(item => item.addEventListener('click', toggleAccordion));
			$(document).ready(function () {
				$('#progressBar').addClass('flat');
				$(document).on('scroll', function () {
					var maxAttr = $('#progressBar').attr('max');
					var valueAttr = $('#progressBar').attr('value');
					var percentage = (valueAttr / maxAttr) * 100;
				});
				var getMax = function () {
					return $(document).height() - $(window).height();
				}
				var getValue = function () {
					return $(window).scrollTop();
				}
				if ('max' in document.createElement('progress')) {
					var progressBar = $('progress');
					progressBar.attr({
						max: getMax()
					});
					$(document).on('scroll', function () {
						progressBar.attr({
							value: getValue()
						});
					});
					$(window).resize(function () {
						progressBar.attr({
							max: getMax(),
							value: getValue()
						});
					});
				} else {
					var progressBar = $('.progress-bar'),
						max = getMax(),
						value, width;
					var getWidth = function () {
						value = getValue();
						width = (value / max) * 100;
						width = width + '%';
						return width;
					}
					var setWidth = function () {
						progressBar.css({
							width: getWidth()
						});
					}
					$(document).on('scroll', setWidth);
					$(window).on('resize', function () {
						max = getMax();
						setWidth();
					});
				}
			});
			let navItems = $(".page-header nav li")
			let anchors = navItems.map(function (i, elem) {
				let id = $(elem).data('id');
				let $els = {
					navItem: navItems.eq(i),
					page: $(`#${id}`),
				}
				return {
					id,
					$els
				};
			});
			let triggerAnchorDist = $(window).height() / 5;
			let $navBackdrop = $(".page-header.backdrop");
			$(window).scroll(function () {
				let scrollTop = $(this).scrollTop();
				if (scrollTop >= 600) {
					$('#scroll-to-top').fadeIn("fast");
				} else {
					$('#scroll-to-top').fadeOut("fast");
				}
				let opacity;
				if (scrollTop >= 2 * triggerAnchorDist) {
					opacity = 1;
				} else if (scrollTop >= triggerAnchorDist) {
					opacity = (scrollTop - triggerAnchorDist) / triggerAnchorDist;
				} else {
					opacity = 0;
				}
				$navBackdrop.css("opacity", opacity);
				for (let i = anchors.length - 1; i >= 0; i--) {
					let anchor = anchors[i];
					let $els = anchor.$els;
					let anchorTop = $els.page.offset();
					if (scrollTop + triggerAnchorDist > anchorTop) {
						$(".page-header nav li.selected").removeClass("selected");
						$els.navItem.addClass("selected");
						break;
					}
				}
			});
			$('#scroll-to-top').click(function () {
				$('body,html').animate({
					scrollTop: 0
				}, 500);
			});
			document.querySelectorAll('.scene').forEach((elem) => {
				const modifier = elem.getAttribute('data-modifier')
				basicScroll.create({
					elem: elem,
					from: 0,
					to: 519,
					direct: true,
					props: {
						'--translateY': {
							from: '0',
							to: `${ 10*modifier }px`
						}
					}
				}).start()
			})
		}),
	"./assets/js/scroll-entrance.min.js":
		/*!******************************************!*\
		!*** ./assets/js/scroll-entrance.min.js ***!
		\******************************************/
		/*!no static exports found*/ (function (module, exports) {
			! function () {
				entrance = {}, entrance.duration = "1000", entrance.distance = "200", entrance.heightOffset = 200, entrance.isElemInView = function (e) {
					var t = e.getBoundingClientRect();
					return t.top + entrance.heightOffset >= 0 && t.top + entrance.heightOffset <= window.innerHeight || t.bottom + entrance.heightOffset >= 0 && t.bottom + entrance.heightOffset <= window.innerHeight || t.top + entrance.heightOffset < 0 && t.bottom + entrance.heightOffset > window.innerHeight
				}, entrance.setInitialStyles = function (e) {
					document.body.style.overflowX = "hidden";
					var t = e.getAttribute("data-entrance"),
						n = e.getAttribute("data-entrance-delay");
					e.style.transition = "all " + entrance.duration / 1e3 + "s ease", n && (e.style.transitionDelay = n / 1e3 + "s"), "fade" == t && (e.style.opacity = "0"), "from-left" == t && (e.style.opacity = "0", e.style.transform = "translate(-" + entrance.distance + "px, 0)"), "from-right" == t && (e.style.opacity = "0", e.style.transform = "translate(" + entrance.distance + "px, 0)"), "from-top" == t && (e.style.opacity = "0", e.style.transform = "translate(0, -" + entrance.distance + "px)"), "from-bottom" == t && (e.style.opacity = "0", e.style.transform = "translate(0, " + entrance.distance + "px)")
				}, entrance.enter = function (e) {
					e.style.visibility = "visible", e.style.opacity = "1", e.style.transform = "translate(0, 0)", e.className += " has-entered"
				}, entrance.viewportChange = function () {
					Array.prototype.map.call(entrance.elements, function (e) {
						if (entrance.isElemInView(e)) {
							var t = e.classList.contains("has-entered");
							t || entrance.enter(e)
						}
					})
				}, entrance.init = function () {
					entrance.elements = document.querySelectorAll("[data-entrance]"), Array.prototype.map.call(entrance.elements, function (e) {
						entrance.setInitialStyles(e), entrance.isElemInView(e) && addEventListener("load", function () {
							entrance.enter(e)
						}, !1)
					})
				}, addEventListener("DOMContentLoaded", entrance.init, !1), addEventListener("scroll", entrance.viewportChange, !1), addEventListener("resize", entrance.viewportChange, !1)
			}();
		})
});