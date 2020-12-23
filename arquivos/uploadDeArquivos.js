const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeDoArquivo, callBackImagemCriada) => {
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho)
    const tipoEValido = tiposValidos.indexOf(tipo.substring(1)) !== -1 //verifica se possui a string no tiposValidos dentro to tipo (retorna -1 caso não tenha)

    if(tipoEValido) {
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`

        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callBackImagemCriada(false, novoCaminho))

    } else {
        const erro = "Extensão do arquivo inválido"
        console.log('Extensão do arquivo inválido')
        callBackImagemCriada(erro)
    }
}