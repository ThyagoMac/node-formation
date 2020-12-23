class Tabelas {
    init(conexao) {
        console.log('Criando tabelas...')
        this.conexao = conexao

        this.criarAtendimentos()
        this.criarPets()
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, dataa datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log("Tabela Atendimento... OK")
            }
        })

    }

    criarPets() {
        const query = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50), imagem varchar(200), PRIMARY KEY (id))'

        this.conexao.query(query, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log("Tabela Pet... ok")
            }

        })
    }
}

module.exports = new Tabelas