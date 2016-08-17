var baseUrl = window.location.protocol + '//' + window.location.host;

$(function(){
	var dependencias = '<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' +
		'<script src="' + baseUrl + '/portal/js/jquery.popupoverlay.js"></script>';
	$(dependencias).insertAfter($('#app-config-js'));
	setTimeout(function(){
		$('#header-apps').load(baseUrl + '/portal/header-apps.html', callbackHeader);
	}, 500);
});

function callbackHeader() {
	definirEventos();

	desenharHeader();

	definirTooltips();

	definirLinksApps();
}

function definirEventos() {
	$('#btn_logout').click(function(){
		$('#tooltip-user_wrapper').removeClass("popup_wrapper_visible").addClass("popup_wrapper_visible_user");
	});
	$('#user-sair').click(function(){
		localStorage.removeItem('tnd-user-session');
		window.location = baseUrl + '/portal';
	});
}

function desenharHeader() {
	var dadosUsuario = JSON.parse(localStorage.getItem('tnd-user-session'));
	if (dadosUsuario) {
		$('#div_login').html(dadosUsuario.nome);
	}
	$('#lb_nome_app').html(NOME_APLICACAO);

	$('#img-logo-header').attr('src', baseUrl + '/portal/img/img_logo_header.png');
	$('#img-logo-sgv').attr('src', baseUrl + '/portal/img/sgv_32.png');
	$('#img-logo-sgr').attr('src', baseUrl + '/portal/img/sgr_50.png');
}

function definirTooltips() {
	$('#tooltip-apps').popup({
		type: 'tooltip'/*,
		offsettop: 100,
		offsetleft: 170*/
	});
	$('#tooltip-user').popup({
		type: 'tooltip'
	});
}

function definirLinksApps() {
	$('#link-sgr').attr('href', baseUrl + '/crud-angular');
	$('#link-sgv').attr('href', baseUrl + '/front-end');
}