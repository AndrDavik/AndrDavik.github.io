"use strict";

// const isMobile = {
// 	Android: function () {
// 		return navigator.userAgent.match(/Android/i);
// 	},
// 	BlackBerry: function () {
// 		return navigator.userAgent.match(/BlackBerry/i);
// 	},
// 	iOS: function () {
// 		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
// 	},
// 	Opera: function () {
// 		return navigator.userAgent.match(/Opera Mini/i);
// 	},
// 	Windows: function () {
// 		return navigator.userAgent.match(/IEMobile/i);
// 	},
// 	any: function () {
// 		return (
// 			isMobile.Android() ||
// 			isMobile.BlackBerry() ||
// 			isMobile.iOS() ||
// 			isMobile.Opera() ||
// 			isMobile.Windows()
// 		);
// 	}
// };

// if (isMobile.any()) {
// 	document.body.classList.add('_touch');
// }else{
// 	document.body.classList.add('_pc');
// }
const menuBurger = document.querySelector('.menu__burger');
if (menuBurger) {
	const mobmenu = document.querySelector('.mobmenu');
	menuBurger.addEventListener("click", function(e) {
		mobmenu.classList.toggle('mobmenu_active');
	});
}



