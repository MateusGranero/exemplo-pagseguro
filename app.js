var express = require('express'),
    app     = express();
    load    = require('express-load'),
    bodyParser = require('body-parser')

    
app.set('views',__dirname + '/views');
app.engine('html', require('ejs').renderFile);


app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


load('controllers').then('routes').into(app)

app.listen(5000,function(){
    console.log('Servidor rodando na porta 5000 ');
});