var baseUrl = window.location.protocol + '//' + window.location.host;
var ambientes = ['dev','int','sit','uat','local'];

$(function(){
	var dependencias = '<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' +
		'<script src="' + criarUrl('portal', '/portal') + '/js/jquery.popupoverlay.js"></script>';
	$(dependencias).insertAfter($('#app-config-js'));
	setTimeout(function(){
		$('#header-apps').load(criarUrl('portal', '/portal') + '/header-apps.html', callbackHeader);
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
		document.cookie = "tnd-user-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + obterDomain();
		window.location = criarUrl('portal', '/portal');
	});
}

function desenharHeader() {
	var dadosUsuario = JSON.parse(getCookie('tnd-user-session'));
	if (dadosUsuario) {
		$('#div_login').html(dadosUsuario.nome);
	}
	$('#lb_nome_app').html(NOME_APLICACAO);

	$('#img-logo-header').attr('src', criarUrl('portal', '/portal') + '/img/img_logo_header.png');
	$('#img-logo-sgv').attr('src', criarUrl('portal', '/portal') + '/img/sgv_32.png');
	$('#img-logo-sgr').attr('src', criarUrl('portal', '/portal') + '/img/sgr_50.png');
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
	$('#link-sgr').attr('href', criarUrl('crud', '/crud-angular'));
	$('#link-sgv').attr('href', criarUrl('tutorial', '/front-end'));
}

function criarUrl(app, uri) {
  var result = app;
  if (urlEhIp())//usuario estah usando ip para acesso a aplicacao
    return window.location.protocol + '//' + window.location.host + uri;
  
  //usuario estah usando DNS para acesso a aplicacao
  var amb = window.location.host;
  amb = amb.substring(0, amb.indexOf('.'));
  $(ambientes).each(function(i, v) {
    if (amb.indexOf(v) > -1) {
      result += '-' + v;
    }
  });

  return window.location.protocol + '//' + result + obterDomain();
}

function urlEhIp() {
	var h = window.location.host;
	var ehIp = Number(h.substring(0, h.indexOf('.')));
    if (!isNaN(ehIp))
        return true;

    return false;
}

function obterDomain() {
    var result = window.location.host;
    var ehIp = Number(result.substring(0, result.indexOf('.')));
    if (!isNaN(ehIp))
        return result;

    result = result.substring(result.indexOf('.'), result.length);
    return result;
}