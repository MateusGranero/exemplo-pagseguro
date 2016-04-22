module.exports = {
    retornoNotificacao:retornoNotificacao
}

function retornoNotificacao(codigo, callback){
    var message;
    switch(codigo){
        case 1:
            message = "kjdshkfjhsd";
        case 2:
            message = "kjdshkfjhsd";
        case 3:
            message = "kjdshkfjhsd";
        default:
            message = "kjdshkfjhsd";
    }
    
    callback({
        code:codigo,
        message:message
    });
}