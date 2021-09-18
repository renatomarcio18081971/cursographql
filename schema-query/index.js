const { ApolloServer, gql } = require('apollo-server')
const typeDefs = gql`
    #ponto de entrada da consulta

    scalar Date

    type Usuario {
        id: ID!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
        nomeMaisIdade: String
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Int
        precoComDesconto: Float
    }

    type Query {
        ola: String!
        horaCerta: Date!
        usuarioLogado: Usuario
    }
`
const resolvers = {
    Usuario: {
        salario(usuario){
            return (usuario.salario_real * 2) /2
        },
        nomeMaisIdade(usuario){
            return usuario.nome + ' - ' + usuario.idade
        }
    },
    Query: {
        ola(){
            return 'Bom dia !!!!'
        },
        horaCerta() {
            var agora = new Date()
            return `${new Date()}`
            //return agora.getHours().toString() + ':' + agora.getMinutes().toString() + ':' + agora.getSeconds().toString()
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: "dora",
                email: "dora.teste@gmail.com",
                idade: 54,
                salario_real: 6000,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                nome: "Guarana",
                preco: 25.50,
                desconto: 10
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(url)
})