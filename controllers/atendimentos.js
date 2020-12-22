
module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('ok pipi '))

    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        const pp = req.body
        res.send('rota atendimentos - post')
    })
}