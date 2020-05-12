(function ($) {

	function Material() {
		var rippleElements = [
			'.button:not(:disabled):not([disabled])',
			'.fabButton:not(:disabled):not([disabled])',
			'.navBar button.textButton:not(:disabled):not([disabled])',
			'.navBar a.textButton:not(:disabled):not([disabled])',
			'.menu button:not(:disabled):not([disabled])',
			'.menu a:not(:disabled):not([disabled])',
			'.drawer button:not(:disabled):not([disabled])',
			'.drawer a:not(:disabled):not([disabled])',
			'.snackBar button:not(:disabled):not([disabled])',
			'.snackBar a:not(:disabled):not([disabled])',
			'button.list .item',
			'a.list .item'
		];

		var centerRippleElements = [
			'.navBar button:not(.textButton):not(:disabled):not([disabled])',
			'.navBar a:not(.textButton):not(:disabled):not([disabled])',
			'.checkBox .icon:not(:disabled):not([disabled])',
			'.radio .icon:not(:disabled):not([disabled])'
		];

		$('.drawer').after('<div class="drawerFade"><\/div>');
		$('.drawer a, .drawer button, .drawerFade').click(function () {
			material.closeDrawer();
		});

		$('.menu').after('<div class="menuFade"><\/div>');
		$('.menuFade').on('touchstart click', function () {
			material.closeMenu();
		});
		$('.menu a, .menu button').on('touchend click', function () {
			material.closeMenu();
		});

		$('input[type=checkbox][indeterminate]').prop('indeterminate', true);

		$(rippleElements.join()).ripple();

		$(window).on('load resize', function () {
			window.innerWidth <= 1024 ?
				$(centerRippleElements.join()).ripple() :
				$(centerRippleElements.join()).ripple({ fixedPos: true });
		});
		this.updateRipples = function () {
			$(rippleElements.join()).ripple();
			window.innerWidth <= 1024 ?
				$(centerRippleElements.join()).ripple() :
				$(centerRippleElements.join()).ripple({ fixedPos: true });
		}

		// Mostrar e ocultar barra superior
		this.showTopBar = function (element) {
			$('.navBar' + element).removeClass('indented');
		}
		this.hideTopBar = function (element) {
			$('.navBar' + element).addClass('indented');
		}

		// Abrir e fechar menu de opções
		this.openMenu = function (element) {
			$('.menu' + element).addClass('opened');
			$('.menu' + element + '+ .menuFade').show();
		}
		this.closeMenu = function () {
			$('.menu').removeClass('opened');
			$('.menu + .menuFade').hide();
		}

		// Abrir e fechar drawer lateral
		this.openDrawer = function (element) {
			$('.drawer' + element).addClass('opened');
			$('.drawer' + element + '+ .drawerFade').fadeIn(300);
		}
		this.closeDrawer = function () {
			$('.drawer').removeClass('opened');
			$('.drawer + .drawerFade').fadeOut(300);
		}

		var snackBarTimer;
		this.snackBar = function (data) {
			if (!$('.snackBarContainer').length) {
				$('body').prepend('<div class="snackBarContainer"></div>');
			}

			clearTimeout(snackBarTimer);
			this.closeSnackBar();
			this.openSnackBar(data);
		}

		this.openSnackBar = function (data) {
			let text = (typeof data.text == 'string') ? data.text : '';
			let time = (typeof data.time == 'number') ? data.time : 7000;
			let button = (typeof data.button == 'boolean') ? data.button : true;
			let buttonFunction = (typeof data.buttonFunction == 'string' || typeof data.buttonFunction == 'function') ? data.buttonFunction : function () { material.closeSnackBar() };
			let textButton = (typeof data.textButton == 'string') ? data.textButton : 'OK';

			$('.snackBarContainer').html(
				'<div class="snackBar">' +
				'<div class="text">' + text + '</div>' +
				(button ? '<div class="function">' +
					'<button>' + textButton +
					'</button></div>' : '') +
				'</div>'
			);

			$('.snackBar .function button, .snackBar .function a').click(buttonFunction);

			this.updateRipples();
			let snackBarHeight = $('.snackBar').outerHeight();
			$('.snackBar').addClass('opened');
			window.innerWidth <= 1024 && $('.fabButton.floating').css('transform', 'translateY(-' + snackBarHeight + 'px)');
			snackBarTimer = setTimeout(this.closeSnackBar, time);
		}

		this.closeSnackBar = function () {
			$('.snackBar').removeClass('opened');
			$('.fabButton.floating').css('transform', 'translateX(0)');
		}

		// Abrir e fechar página
		this.openPage = function (element) {
			$('.page' + element).addClass('opened');
		}
		this.closePage = function (element) {
			$('.page' + element).removeClass('opened');
		}
	}

	material = new Material();

})(jQuery);