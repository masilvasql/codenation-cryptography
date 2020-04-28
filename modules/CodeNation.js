const axios = require('axios')
const { Cipher } = require("js-cipher");
const cipher = new Cipher();
const sha1 = require('sha1');
const FormData = require('form-data');
const fetch = require('node-fetch');


module.exports = {
    getParams: () => {
        return new Promise(result => {
            axios.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=f149f04c0fc60ba6398b75d8bfcdad7cc030e15b').then(resp => {
                result(resp.data)
            })
        })
    },
    decodeCifra: (textoCriptografado, numero_casas) => {
        return cipher.decrypt(textoCriptografado, numero_casas)
    },
    encodeCifra: (textoDescriptografado, numero_casas) => {
        return cipher.encrypt(textoDescriptografado, numero_casas)
    },
    resumoSHA1: (textoDecifrado) => {
        return sha1(textoDecifrado)
    },
    sendJson: (answer) => {
        const url = "https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=f149f04c0fc60ba6398b75d8bfcdad7cc030e15b"

        return new Promise(result => {

            let formData = new FormData();

            formData.append('answer', answer);

            fetch(url, {
                method: 'POST',
                body: formData
            }).then((response) => {
                result(response.json())
            }).catch((error) => {
                result(error)
            });

        })
    }
}

