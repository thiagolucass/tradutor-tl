let traduzirbtn = document.querySelector('#btn-traduzir')
let txtinput = document.querySelector('.input')
let idioma = document.querySelector('.idiomas')
let traducao = document.querySelector('#txtresultado')
let microfone = document.querySelector('.microfone')

traduzirbtn.addEventListener('click', traduzirTexto)
microfone.addEventListener('click', falar)

async function traduzirTexto() {

    if (!txtinput.value.trim()) {
        traducao.textContent = "Digite um texto primeiro."
        return
    }

    let texto = encodeURIComponent(txtinput.value)
    let idiomaselecionado = idioma.value

    let url = `https://api.mymemory.translated.net/get?q=${texto}&langpair=pt-BR|${idiomaselecionado}`

    try {
        let resposta = await fetch(url)
        let dados = await resposta.json()

        traducao.textContent = dados.responseData.translatedText
    } catch (erro) {
        traducao.textContent = "Erro ao traduzir."
    }
}

async function falar() {

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
        alert("Seu navegador não suporta reconhecimento de voz.")
        return
    }

    let reconhecimento = new SpeechRecognition()
    reconhecimento.lang = 'pt-BR'
    reconhecimento.start()

    reconhecimento.onresult = function (evento) {
        let transcrito = evento.results[0][0].transcript
        txtinput.value = transcrito
        traduzirTexto()
    }
}