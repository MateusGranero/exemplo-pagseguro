var pagSeguro = require ('pagseguro');

var pag = new pagSeguro({
    email: '',
    token: '',
    mode : 'sandbox'
    });

pag.setRedirectURL("http://www.lojamodelo.com.br/retorno");
pag.setNotificationURL("http://www.lojamodelo.com.br/notificacao");
//CONFIGURAÇÕES DE MOEDA E REFERENCIA DO PEDIDO
pag.currency('BRL'); // O UNICO VALOR ACEITO É 'BRL'
pag.reference('REF123');

module.exports.pagCart = pag;