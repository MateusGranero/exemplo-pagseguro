module.exports = {
    retornoNotificacao: retornoNotificacao
}

function retornoNotificacao(obj, callback) {
    callback({
        type: {
            type: obj.transaction.type,
            tipo: retornoTipoTransacao(obj.transaction.type)
        },
        status: {
            code: obj.transaction.status,
            message: retornoStatusTransacao(obj.transaction.status)
        },
        paymentMethod: {
            type: obj.transaction.paymentMethod.type,
            tipo: retornoTipoPagamento(obj.transaction.paymentMethod.type),
            code: obj.transaction.paymentMethod.code,
            descricao: retornoDescicaoPagamento(obj.transaction.paymentMethod.code)
        },
        shipping: {
            address: obj.transaction.shipping.address,
            type: obj.transaction.shipping.type,
            cost: obj.transaction.shipping.cost,
            frete: retornoFrete(obj.transaction.shipping.type)
        }
    });
}

function retornoTipoTransacao(type) {
    switch (type) {
        case '1' : return "Pagamento";
        case '11': return "Assinatura";
        default  : return "Tipo de transação desconhecido";
    }
}

function retornoStatusTransacao(status) {
    switch (status) {
        case '1': return "Aguardando Pagamento";
        case '2': return "Em análise";
        case '3': return "Paga";
        case '4': return "Disponível";
        case '5': return "Em disputa";
        case '6': return "Devolvida";
        case '7': return "Cancelada";
        case '8': return "Debitado";
        case '9': return "Retenção temporária";
        default: return "Retorno desconhecido";
    }
}

function retornoTipoPagamento(type) {
    switch (type) {
        case '1': return "Cartão de Credito";
        case '2': return "Boleto";
        case '3': return "Débito Online(TEF)";
        case '4': return "Saldo PagSeguro";
        case '5': return "Oi Paggo";
        case '7': return "Depósito em conta";
        default: return "Tipo desconhecido";
    }
}

function retornoDescicaoPagamento(code) {
    switch (code) {
        case '101': return "Cartão de Credito Visa";
        case '102': return "Cartão de Credito MasterCard";
        case '103': return "Cartão de Credito American Express";
        case '104': return "Cartão de Credito Diners";
        case '105': return "Cartão de Credito Hipercard";
        case '106': return "Cartão de Credito Aura";
        case '107': return "Cartão de Credito Elo";
        case '108': return "Cartão de Credito PLENOCard";
        case '109': return "Cartão de Credito PersonalCard";
        case '110': return "Cartão de Credito JCB";
        case '111': return "Cartão de Credito Discover";
        case '112': return "Cartão de Credito BrasilCard";
        case '113': return "Cartão de Credito FORTBRASIL";
        case '114': return "Cartão de Credito CARDBAN";
        case '115': return "Cartão de Credito VALECARD";
        case '116': return "Cartão de Credito Cabal";
        case '117': return "Cartão de Credito Mais!";
        case '118': return "Cartão de Credito Avista";
        case '119': return "Cartão de Credito GRANDCARD";
        case '120': return "Cartão de Credito Sorocred";
        case '201': return "Boleto Bradesco";
        case '202': return "Boleto Santander";
        case '301': return "Débito online Bradesco";
        case '302': return "Débito online Itaú";
        case '303': return "Débito online Unibanco";
        case '304': return "Débito online Banco do Brasil";
        case '305': return "Débito online Banco Real";
        case '306': return "Débito online Banrisul";
        case '307': return "Débito online HSBC";
        case '401': return "Depósito em Saldo PagSeguro";
        case '501': return "Oi Paggo";
        case '701': return "Depósito em conta - Banco do Brasil";
        case '702': return "Depósito em conta - HSBC";
        default: return "Descrição desconhecida";
    }
}

function retornoFrete(type) {
    switch (type) {
        case '1': return "Encomenda normal (PAC)";
        case '2': return "SEDEX";
        case '3': return "Tipo de frete não especificado";
        default: return "Tipo de frete desconhecido";
    }
}