/*
---------------------------------
Material Design (ALL)
Versão ALPHA
Desenvolvido por Jefferson Dantas
Baseado em Google Material Design
---------------------------------

* Requer jQuery (3.3.1 !!!) e legitRipple
*/

const notDisabled = ':not(:disabled):not([disabled])';

var rippleElements = [
	'.button',
	'.fabButton',
	'.navBar button.textButton',
	'.navBar a.textButton',
	'.menu button',
	'.menu a',
	'.drawer button',
	'.drawer a',
	'.snackBar button',
	'.snackBar a',
	'button.list .item',
	'a.list .item'
];

var centerRippleElements = [
	'.navBar button:not(.textButton)',
	'.navBar a:not(.textButton)',
	'.checkBox .icon',
	'.radio .icon'
];

$(document).ready(function () {

	$('.drawer').after('<div class="drawerFade"><\/div>');
	$('.drawer a, .drawer button, .drawerFade').click(closeDrawer);

	$('.menu').after('<div class="menuFade"><\/div>');
	$('.menuFade').on('touchstart mousedown', closeMenu);
	$('.menu a, .menu button').on('touchend click', closeMenu);

	$('input[type=checkbox][indeterminate]').prop('indeterminate', true);

	$(rippleElements.join(`${notDisabled},`) + notDisabled).ripple();
});

$(window).on('load resize', () => {
	window.innerWidth <= 1024 ?
		$(centerRippleElements.join(`${notDisabled},`) + notDisabled).ripple() :
		$(centerRippleElements.join(`${notDisabled},`) + notDisabled).ripple({ fixedPos: true });
});

function updateRipples() {
	$(rippleElements.join(`${notDisabled},`) + notDisabled).ripple();
	window.innerWidth <= 1024 ?
		$(centerRippleElements.join(`${notDisabled},`) + notDisabled).ripple() :
		$(centerRippleElements.join(`${notDisabled},`) + notDisabled).ripple({ fixedPos: true });
}

// Mostrar e ocultar barra superior
function showTopBar(element) {
	$(`.navBar${element}`).removeClass('indented');
}
function hideTopBar(element) {
	$(`.navBar${element}`).addClass('indented');
}

// Abrir e fechar menu de opções
function openMenu(element) {
	$(`.menu${element}`).addClass('opened');
	$(`.menu${element} + .menuFade`).show();
}
function closeMenu() {
	$('.menu').removeClass('opened');
	$('.menu + .menuFade').hide();
}

// Abrir e fechar drawer lateral
function openDrawer(element) {
	$(`.drawer${element}`).addClass('opened');
	$(`.drawer${element} + .drawerFade`).fadeIn(300);
}
function closeDrawer() {
	$('.drawer').removeClass('opened');
	$('.drawer + .drawerFade').fadeOut(300);
}

var snackBarTimer;
function snackBar(data) {
	if (!$('.snackBarContainer').length) {
		$('body').prepend('<div class="snackBarContainer"></div>');
	}

	clearTimeout(snackBarTimer);
	closeSnackBar();
	openSnackBar(data);
}

function openSnackBar(data) {
	let text = (typeof data.text == 'string') ? data.text : '';
	let time = (typeof data.time == 'number') ? data.time : 7000;
	let button = (typeof data.button == 'boolean') ? data.button : true;
	let buttonFunction = (typeof data.buttonFunction == 'function') ?
		data.buttonFunction : function () { closeSnackBar() };
	let textButton = (typeof data.textButton == 'string') ? data.textButton : 'OK';

	$('.snackBarContainer').html(`
		<div class="snackBar">
			<div class="text">${text}</div>
			${button ? `
			<div class="function">
				<button>${textButton}</button>
			</div>
			` : ''}
		</div>
	`);

	// $('.snackBarContainer').html(
	// 	'<div class="snackBar">' +
	// 	'<div class="text">' + text + '</div>' +
	// 	(button ? '<div class="function">' +
	// 		'<button>' + textButton +
	// 		'</button></div>' : '') +
	// 	'</div>'
	// );

	$('.snackBar .function button, .snackBar .function a').click(buttonFunction);

	updateRipples();
	let snackBarHeight = $('.snackBar').outerHeight();
	$('.snackBar').addClass('opened');
	window.innerWidth <= 1024 && $('.fabButton.floating').css('transform', 'translateY(-' + snackBarHeight + 'px)');
	snackBarTimer = setTimeout(closeSnackBar, time);
}

function closeSnackBar() {
	$('.snackBar').removeClass('opened');
	$('.fabButton.floating').css('transform', 'translateX(0)');
}

// Abrir e fechar página
function openPage(element) {
	$(`.page${element}`).addClass('opened');
}
function closePage(element) {
	$(`.page${element}`).removeClass('opened');
}