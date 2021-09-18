const { ApolloServer, gql } = require('apollo-server')
const typeDefs = gql`
    scalar Date

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Usuario {
        id: ID!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
        nomeMaisIdade: String
    }

    #ponto de entrada da consulta
    type Query {
        ola: String!
        horaCerta: Date!
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
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
    Produto: {
        precoComDesconto(produto){
            return produto.preco - ((produto.preco * produto.desconto) / 100)
        }
    },
    Query: {
        ola(){
            return 'Bom dia !!!!'
        },
        horaCerta() {
            var agora = new Date()
            return `${new Date()}`
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