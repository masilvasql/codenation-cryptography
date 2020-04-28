const express = require('express')
const bodyParser = require('body-parser')
const {
    getParams,
    decodeCifra,
    encodeCifra,
    resumoSHA1,
    sendJson
} = require('./modules/CodeNation')
const fs = require('fs')


let jsonData = require('./answer.json')


const app = express()


app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))


app.get('/getParams', async (req, res) => {
    let result = await getParams()
    let json = JSON.stringify(result)
    fs.writeFile('answer.json', json, (err) => {
        if (err) res.send("Erro... " + err);
        res.send("Salvo")
    })
})


app.get('/decriptText', (req, res) => {
    let decriptografado = decodeCifra(jsonData.cifrado.toLocaleLowerCase(), jsonData.numero_casas)

    let newJson = {
        numero_casas: jsonData.numero_casas,
        token: jsonData.token,
        cifrado: jsonData.cifrado.toLocaleLowerCase(),
        decifrado: decriptografado.toLocaleLowerCase(),
        resumo_criptografico: resumoSHA1(decriptografado.toLocaleLowerCase())
    }

    fs.writeFile('answer.json', JSON.stringify(newJson), (err) => {
        if (err) res.send("Erro...")
        res.send(decriptografado)
    })

})


app.get('/encryptText', (req, res) => {
    let criptoGrafado = encodeCifra("WE CANNOT LEARN WITHOUT PAIN. ARISTOTLE", jsonData.numero_casas)
    res.send(criptoGrafado)
})


app.post("/sendJson", async (req, res) => {
    let arquivo = fs.createReadStream('./answer.json')
    let resp = await sendJson(arquivo)
    res.send(resp)
})


app.listen(5001, () => {
    console.log("rodando na porta 5001")
})