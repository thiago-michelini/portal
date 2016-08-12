var baseUrl = window.location.protocol + '//' + window.location.host;

$(function(){
	$('#header-apps').load(baseUrl + '/portal/header-apps.html', callbackHeader);
});

function callbackHeader() {
	$('#btn_logout').click(function(){
		localStorage.removeItem('tnd-user-session');
		window.location = baseUrl + '/portal';
	});

	var dadosUsuario = JSON.parse(localStorage.getItem('tnd-user-session'));
	$('#lb_login').html('Usuário: ' + dadosUsuario.nome);
	$('#lb_sessao').html('Sessão: ' + dadosUsuario.sessao);
	$('#lb_nome_app').html(NOME_APLICACAO);

	$('#img-logo-header').attr('src', baseUrl + '/portal/img/img_logo_header.png');

	$('.tooltipped').tooltip({delay: 50});

	$('.dropdown-button').dropdown({
			inDuration: 300,
			outDuration: 225,
			constrain_width: false, // Does not change width of dropdown to that of the activator
			hover: true, // Activate on hover
			gutter: 0, // Spacing from edge
			belowOrigin: false, // Displays dropdown below the button
			alignment: 'left' // Displays dropdown with edge aligned to the left of button
		}
	);
}