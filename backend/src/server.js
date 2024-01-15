const express = require("express");
const { database, 
    readAllDespesas,
    createDespesa, 
    createGasto,
    readGastosDasDespesas,
    updateNomeDaDespesa,
    updateGastoDaDespesa
} = require("../database/infra.js")

const app = express();

app.use(express.json());
const port = process.env.PORT || 3000


// READ
app.get('/', async(req, res) => {
    try{
        await database.connect()
        res.status(200).send(await readAllDespesas())
    }finally{
        await database.close()
    } 
});

app.get('/despesas/:nomeDaDespesa', async(req,res) => {
    try{
        await database.connect()
        res.status(200).send(await readGastosDasDespesas(req.params.nomeDaDespesa))
    }finally{
        await database.close()
    } 
})

// CREATE
app.post('/', async(req,res) => {
    try{
        await database.connect()
        await createDespesa(req.body.nome)
        res.status(201).send("Cadastro feito com sucesso")
    }finally{
        await database.close()
    }
})

app.post('/:nomeDespesa', async(req,res) => {
    try{
        await database.connect()
        console.log(req.params.nomeDespesa)
        await createGasto(req.body.nome, req.body.preco, req.body.descricao, req.params.nomeDespesa)
        res.status(200).send("Cadastro feito com sucesso!")
    }finally{
        await database.close()
    }
})

// UPDATE
app.patch('/despesas/:nomeDespesa', async(req,res) => {
    try{
        await database.connect()
        await updateNomeDaDespesa(req.params.nomeDespesa, req.body.nome)
        res.status(200).send('Atualização de dado feita com sucesso!')
    } finally {
        await database.close()
    }
})

app.put('/despesas/:nomeDaDespesa/:nomeGasto', async(req,res) => {
    try{
        await database.connect()
        await updateGastoDaDespesa(req.params.nomeDaDespesa, req.body)
        res.status(200).send('Atualização de dado feita com sucesso!')
    } finally {
        await database.close()
    }
})

app.get('/teste/:nomeDaDespesa', async(req,res) => {
    try{
        await database.connect()
        await updateGastoDaDespesa(req.params.nomeDaDespesa)
        res.status(200).send('Atualização de dado feita com sucesso!')
    } finally {
        await database.close()
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
