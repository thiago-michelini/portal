$(function() {
    $('#btnLogin').click(function() {
        var dadosUsuario = {};
        dadosUsuario.nome = $('#tx_usuario').val();
        dadosUsuario.sessao = 'd646876fsdvfd9764fsd4';
    	localStorage.setItem('tnd-user-session', JSON.stringify(dadosUsuario));
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