var pag      = require('../config/pagseguroConfig'),
    xml2json = require('xml2js'),
    request  = require('request'),
    retorno  = require('./pagRetornos');

module.exports = {
    index:index,
    comprador:comprador,
    notificacao: notificacao
}

function index(req,res,next){
    res.render('pagseguro/index.html');
}

function comprador(req,res,next){
    //Informações do comprador
    pag.pagCart.buyer({
        name: req.body.nome,           // Nome
        email: req.body.email,         // E-mail
        phoneAreaCode: req.body.ddd,   // DDD
        phoneNumber: req.body.telefone // Telefone
    });
    
    //Informações para entrega
    pag.pagCart.shipping({
       type: 1,                          //1- Encomenda Normal (PAC) // 2- SEDEX // 3-Tipo de frete não especificado 
       street: req.body.rua,             // Rua
       number: req.body.numero,          // Numero
       complement: req.body.complemento, // Complemento
       district: req.body.bairro,        // Bairro
       postalCode: req.body.cep,         // CEP
       city: req.body.cidade,            // Cidade
       state: req.body.uf,               // Estado  
       country: 'BRA'                    // País (No momento apenas 'BRA' Brasil é aceito)
    });
    
    // Adicionando produtos a compra
    pag.pagCart.addItem({
        id: 1,                        // Id do Produto
        description: 'Produto Teste', // Descrição
        amount: 1.99,                 // Valor do Produto
        quantity: 1,                  // Quantidade
        weight: 10000                 // Peso em gramas
    });
   
    // Enviando compra
     pag.pagCart.send(function(err, data) {
            if (err) {
                console.log(err);
                res.status(500).json(data);      
            }else{
                xml2json.parseString(data,{ explicitArray : false, ignoreAttrs : true }, function(err,result){
                    if(err){
                        res.status(500).json({msg:'Erro ao converter xml para Json'})
                    }
                    console.log(result);
                    res.status(200).json({'url' : 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=' + result.checkout.code});  
                });
            }
        });           
}

function notificacao(req,res,next) {
    // console.log(req.body.notificationCode);
    // console.log(req.body.notificationType);
    console.log(pag.pagCart.email);
    var url = `https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/notifications/${req.body.notificationCode}`
        + `?email=${pag.pagCart.email}` 
        + `&token=${pag.pagCart.token}` 
      
    request({
        method:"GET",
        url:url,
        header:{
            'Content-Type': 'application/xml; charset=UTF-8'
        }
    }, function(err, resp, body) {
        if (err) 
            res.json('erro');
        else {
            xml2json.parseString(body,{ explicitArray : false, ignoreAttrs : true }, function(err,result){
                if(err)
                    res.status(500).json({msg:'Erro ao converter xml para Json'})
                    
               retorno.retornoNotificacao(result, function(obj){
                   var x = result.transaction;
                    x.status = obj.status;
                    x.paymentMethod = obj.paymentMethod;
                    x.type = obj.type;
                    x.shipping = obj.shipping;
                    
                    result.transaction = x;
                    console.log(obj);
                    res.status(200).json(obj);  
               })
            });
        }
    });
}