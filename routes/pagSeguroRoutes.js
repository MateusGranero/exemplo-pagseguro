module.exports = function (app) {
    var pagSeguro = app.controllers.pagSeguroController;
    
    app.route('/')
        .get(pagSeguro.index)
        .post(pagSeguro.comprador)
    
}