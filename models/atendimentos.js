const { default: axios } = require('axios')
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
                    res.status(201).json(atendimentoDatado)
                }
            })
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`
        
        conexao.query(sql, async (erro, resultados) => {
            const atendimento = resultados[0]
            const cpf = atendimento.cliente
            if(erro) {
                res.status(400).json(erro)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {
        if(valores.dataa){
            valores.dataa = moment(valores.dataa, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento