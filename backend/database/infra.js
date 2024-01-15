const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://davizin:123@cluster0.qbco9ek.mongodb.net/";

const database = new MongoClient(uri);
const collection = database.db('despesas').collection('despesas') 

// CREATE
async function createDespesa (nomeDaDespesa) {
    const doc = {
        nome: `${nomeDaDespesa}`,
        despesas: []
    }

    const result = await collection.insertOne(doc)
    console.log(`O documento foi inserido com o _id: ${result.insertedId}`);
}

async function createGasto (nome, preco, descricao, nomeDaDespesa){
    const filter = {nome: nomeDaDespesa}
    const doc  = {
        nome: nome,
        preco: preco,
        descricao: descricao
    }

    await collection.findOneAndUpdate(
        filter,
        { $push: { despesas: doc } },
        { returnDocument: 'after' }, // Retorna o documento atualizado
        (erro, resultado) => {
            if (erro) {
              console.log('Erro ao adicionar despesa:', erro);
            } else {
              console.log('Despesa adicionada com sucesso:', resultado);
            }
        }

    )
}

// READ
async function readAllDespesas () {
    const cursor = collection.find({})
    const documents = await cursor.toArray()
    return documents
}

async function readGastosDasDespesas (nomeDaDespesa){
    const cursor = collection.find({nome: nomeDaDespesa})
    const documents = await cursor.toArray()
    return documents[0]["despesas"]
}


module.exports = { database, readAllDespesas,  createDespesa, createGasto, readGastosDasDespesas}

exports.database = database
exports.readAllDespesas = readAllDespesas
exports.createDespesa = createDespesa
exports.createGasto = createGasto
exports.readGastosDasDespesas = readGastosDasDespesas
