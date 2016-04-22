var pag = require('../config/pagseguroConfig');

module.exports = {
    index:index,
    comprador:comprador
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
       type: 1,             //1- Encomenda Normal (PAC) // 2- SEDEX // 3-Tipo de frete não especificado 
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
    	        description: 'Produto teste', // Descrição
    	        amount: 5.99,                 // Valor do Produto
    	        quantity: 1,                  // Quantidade
    	        weight: 10000                 // Peso em gramas
    	    });
    pag.pagCart.addItem({
        id: 3,                        // Id do Produto
        description: 'Produto lalala', // Descrição
        amount: 50.99,                 // Valor do Produto
        quantity: 3,                  // Quantidade
        weight: 10000                 // Peso em gramas
    });

    // Enviando  
     pag.pagCart.send(function(err, data) {
            if (err) {
                console.log(err);
                res.status(500).json(data);      
            }else{
                console.log(data);
                res.status(200).json(data);    
            }
        });           
}