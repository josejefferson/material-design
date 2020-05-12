/*
---------------------------------
Material Design (PC)
Versão ALPHA
Desenvolvido por Jefferson Dantas
Baseado em Google Material Design
---------------------------------

* Requer jQuery e legitRipple
*/

// Funções ao carregar página
$(document).ready(function() {
	$('.menu').after('<div class="menuFade" onclick="closeMenu()"><\/div>');
	$('.menu a, .menu button').click(function(){
		closeMenu();
	});
	$('.snackBar .function button, .snackBar .function a').ripple();
	$('.topbar button:not(.text-button), .topbar a:not(.text-button)').ripple({
		maxDiameter: "100%"
	});
});

// Mostrar e ocultar barra superior
function showTopbar(element) {
	$('.topbar' + element).removeClass('indented');
}
function hideTopbar(element) {
	$('.topbar' + element).addClass('indented');
}

// Abrir e fechar menu de opções
function openMenu(element) {
	$(element).css('transform','scale(1)');
	$(element + '+ .menuFade').show();
}
function closeMenu() {
	$('.menu').css('transform','scale(0)');
	$('.menuFade').hide();
}

// Abrir e fechar snackbar
var snackbarTimer;
function snackBar(element) {
	clearTimeout(snackbarTimer);
	closeSnackBar();
	openSnackBar(element);
	snackBarTimer = setTimeout(function() {
		closeSnackBar(element)
	}, 8000);
}
function openSnackBar(element) {
	var elHeight = 16 + $(element).outerHeight();
	$(element).css('transform','translateY(0%)');
	$('.fab-button').css('bottom',elHeight + 'px');
}
function closeSnackBar() {
	$('.snackbar').css('transform','translateY(100%)');
	$('.fab-button').css('bottom','16px');
}

// Mostrar e ocultar sombra de elementos
function showShadow(element) {
	$(element).removeClass('no-shadow');
}
function hideShadow(element) {
	$(element).addClass('no-shadow');
}