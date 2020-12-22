const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('ok pipi '))

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        
        Atendimento.adiciona(atendimento)
        res.send('rota atendimentos - post')
    })
}