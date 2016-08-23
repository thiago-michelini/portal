$(function() {
    $('#btnLogin').click(function() {
        var dadosUsuario = {};
        dadosUsuario.nome = $('#tx_usuario').val();
        //dadosUsuario.dtHrSessaoGravada = new Date();
        dadosUsuario.minutosSessao = 15;
    	//localStorage.setItem('tnd-user-session', JSON.stringify(dadosUsuario));
        setCookie('tnd-user-session', JSON.stringify(dadosUsuario), dadosUsuario.minutosSessao);
    	window.location = getQueryStringByName('redirect');
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