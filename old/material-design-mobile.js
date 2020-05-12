/*
---------------------------------
Material Design (PC)
Versão ALPHA
Desenvolvido por Jefferson Dantas
Baseado em Google Material Design
---------------------------------

* Requer jQuery (3.3.1 !!!) e legitRipple
*/

var lastScrollTop, delta, navbarHeight;

$(document).ready(function () {
	var rippleElements = [
		'.button:not(:disabled):not([disabled])',
		'.fabButton:not(:disabled):not([disabled])',
		'.menu button:not(:disabled):not([disabled])',
		'.menu a:not(:disabled):not([disabled])',
		'.navBar button:not(:disabled):not([disabled])',
		'.navBar a:not(:disabled):not([disabled])'
	];

	$('.menu').after('<div class="menuFade" onclick="closeMenu()"><\/div>');
	$('.menu a, .menu button').click(function () {
		closeMenu();
	});
	$(rippleElements.join()).ripple();


	lastScrollTop = $(this).scrollTop();
	delta = 50;
	navbarHeight = $('.navBar.floating.hideOnScroll').outerHeight();



});
$(window).scroll(function (event) {
	navBarScroll();
});

// Mostrar e ocultar barra superior
function showTopBar(element) {
	$('.navBar' + element).removeClass('indented');
}
function hideTopBar(element) {
	$('.navBar' + element).addClass('indented');
}

// Abrir e fechar menu de opções
function openMenu(element) {
	$(element).css('transform', 'scale(1)');
	$(element + '+ .menuFade').show();
}
function closeMenu() {
	$('.menu').css('transform', 'scale(0)');
	$('.menuFade').hide();
}

var snackBarTimer;
function snackBar(data) {
	if (!$('.snackBarContainer').length) {
		$('body').prepend('<div class="snackBarContainer"></div>');
	}

	clearTimeout(snackBarTimer);
	snackBarClose();
	snackBarOpen(data);
}

function snackBarOpen(data) {
	let text = (typeof data.text == 'string') ? data.text : '';
	let time = (typeof data.time == 'number') ? data.time : 7000;
	let button = (typeof data.button == 'boolean') ? data.button : true;
	let buttonFunction = (typeof data.buttonFunction == 'function' || typeof data.buttonFunction == 'string') ? data.buttonFunction : "snackBarClose()";
	let textButton = (typeof data.textButton == 'string') ? data.textButton : 'OK';

	$('.snackBarContainer').html(
		'<div class="snackBar">' +
		'<div class="text">' + text + '</div>' +
		(button ? '<div class="function">' +
			'<button onclick="' + buttonFunction.toString() + '">' + textButton +
			'</button></div>' : '') +
		'</div>'
	);

	$('.snackBar button, .snackBar a').ripple();
	let snackBarHeight = $('.snackBar').outerHeight();
	$('.snackBar').addClass('opened');
	$('.fabButton.floating').css('bottom', snackBarHeight + 16);
	snackBarTimer = setTimeout(snackBarClose, time);
}

function snackBarClose() {
	$('.snackBar').removeClass('opened');
	$('.fabButton.floating').css('bottom', '16px')
}

function navBarScroll() {
	var scrollTop = $(this).scrollTop();
	if (Math.abs(lastScrollTop - scrollTop) <= delta) {
		return;
	}

	if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
		$('.navBar.floating.hideOnScroll').addClass('sIndented');
	} else {
		if (scrollTop + $(window).height() < $(document).height()) {
			$('.navBar.floating.hideOnScroll').removeClass('sIndented');
		}
	}
	lastScrollTop = scrollTop;
}

function openPage(element) {
	$('.page' + element).addClass('opened');
}

// function closePage(element) {
// 	let target = (element === this) ? $(element).closest('.page').removeClass('opened') : $(element).removeClass('opened');
// }