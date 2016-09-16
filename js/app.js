var ambientes = ['dev','int','sit','uat','local'];
var URL_BASE_RESOURCES = criarUrl('microservices2', ':8080');

$(function() {
    $('#btnLogin').click(function() {

        $.ajax({
            url: URL_BASE_RESOURCES + '/api_rest/ms_acesso/login',
            method: 'GET',
            headers: {
                'X-Dados-Login': $('#tx_usuario').val() + ':' + $('#tx_senha').val()
            },
            success: function(data) {
                setCookie('tnd-user-session', JSON.stringify(data), data.segundosSessao * 1000);
                $('.div-erro').hide();
                window.location = (null == getQueryStringByName('redirect')) ? '#' : getQueryStringByName('redirect');
            },
            error: function(erro) {
                var divErro = $('.div-erro');
                $(divErro).show();
                $(divErro).html(erro.responseJSON.erro.mensagem);
                var layout = $('.container');
                $(layout).css('height', '520px').css('margin-top', '-265px');
            }
        });

     //    dadosUsuario.minutosSessao = 15;
     //    setCookie('tnd-user-session', JSON.stringify(dadosUsuario), dadosUsuario.minutosSessao);
    	// window.location = getQueryStringByName('redirect');
    })
});

function getQueryStringByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setCookie(cname, cvalue, exminu) {
    var d = new Date();
    d.setTime(d.getTime() + (exminu*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; path=/ ;" + expires + "; domain=" + obterDomain();
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function obterDomain() {
    var result = window.location.host;
    var ehIp = Number(result.substring(0, result.indexOf('.')));
    if (!isNaN(ehIp))
        return result;

    result = result.substring(result.indexOf('.'), result.length);
    return result;
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