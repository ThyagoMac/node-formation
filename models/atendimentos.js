const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const dataa = moment(atendimento.dataa, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
        
        const dataEValida = moment(dataa).isSameOrAfter(dataCriacao)
        const clientEValido = atendimento.cliente.length >= 3
        
        const validacoes = [
            {
                nome: 'data',
                valido: dataEValida,
                mensagem: 'Data não pode estar no passado.'
            },
            {
                nome: 'cliente',
                valido: clientEValido,
                mensagem: 'Cliente deve ter pelo menos 3 caracteres.'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido) //captura as validacoes com campo validos = false
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, dataa}
            
            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }
}

module.exports = new Atendimento