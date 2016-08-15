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
	$('#btn_logout').click(function(){
		localStorage.removeItem('tnd-user-session');
		window.location = baseUrl + '/portal';
	});

	var dadosUsuario = JSON.parse(localStorage.getItem('tnd-user-session'));
	if (dadosUsuario) {
		$('#lb_login').html('Usuário: ' + dadosUsuario.nome);
		$('#lb_sessao').html('Sessão: ' + dadosUsuario.sessao);
	}
	$('#lb_nome_app').html(NOME_APLICACAO);

	$('#img-logo-header').attr('src', baseUrl + '/portal/img/img_logo_header.png');
	$('#img-logo-sgv').attr('src', baseUrl + '/portal/img/logo_sgv.png');
	$('#img-logo-sgr').attr('src', baseUrl + '/portal/img/logo_sgr.png');

	$('#tooltip-apps').popup({
		type: 'tooltip'/*,
		offsettop: 100,
		offsetleft: 170*/
	});
}