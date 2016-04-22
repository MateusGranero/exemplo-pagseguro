var pagSeguro = require ('pagseguro');


var pag = new pagSeguro({
    // PARAMETROS DE AUTENTICAÇÃO
    email: '',       // E-mail referente a conta PagSeguro
    token: '',       // Token Gerado
    mode : 'sandbox' // Ambiente de testes do PagSeguro (Requer um token especifico gerado no ambiente sandbox do PagSeguro)
    });

pag.setRedirectURL("http://177.11.185.7");
pag.setNotificationURL("http://177.11.185.7/notificacao");

//CONFIGURAÇÕES DE MOEDA E REFERENCIA DO PEDIDO
pag.currency('BRL');      // O unico valor aceito é 'BRL'
pag.reference('REF123');  // Referencia

module.exports.pagCart = pag;