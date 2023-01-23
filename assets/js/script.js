// Função prototype para substituir letras no índice
String.prototype.replaceAt = function (index, replacement) {
    if (index >= this.length) {
        return this.valueOf()
    }

    let chars = this.split('')
    chars[index] = replacement
    return chars.join('')

}

// Conseguindo a altura da imagem de fundo
let bodyHeight = document.querySelector('body').clientHeight
let imgFundo = document.querySelector('.backg')

window.addEventListener('resize', () => {imgFundo.style.height = bodyHeight - 1 + 'px'})


// Radio buttons personalizados
const codeOptBtn = document.querySelector('#code')
const decodeOptBtn = document.querySelector('#decode')
const codeBtn = document.querySelector('#codeBtn')
const decodeBtn = document.querySelector('#decodeBtn')

codeBtn.addEventListener('click', () => { codeOptBtn.checked = true; checkRadio(codeOptBtn, codeBtn, decodeBtn) } )
decodeBtn.addEventListener('click', () => { decodeOptBtn.checked = true; checkRadio(decodeOptBtn, decodeBtn, codeBtn)  } )


function checkRadio(checkedBtn, theBtn, theOtherBtn) {
    noErrorForRadio()
    if (checkedBtn.checked === true) {
        let optChecked = document.createElement('div')
        optChecked.setAttribute('class', 'rChecked')
        theBtn.appendChild(optChecked)

        if (theOtherBtn.childNodes[0]) {
        theOtherBtn.removeChild(theOtherBtn.childNodes[0])
        }

        accordingCommand(checkedBtn.value)
    }
}

// Botão submit muda de acordo com a opção selecionada
const act = document.querySelector('#act')

function accordingCommand(text) {
    act.innerHTML = text
}

// Incremento se a opção for a Cifra de Cézar
const algorithm = document.querySelector('#algorithm')
const increment = document.querySelectorAll('.increment')

function cipher() {
    if (algorithm.value == 'cezarCipher'){
        increment[0].style.display = 'flex'
        increment[1].style.display = 'flex'
    } else {
        increment[0].style.display = 'none'
        increment[1].style.display = 'none'
    }
}

// Validando entradas
const entry = document.querySelector('#entry')

function validateEntries() {
    if (entry.value == ''){
        renderError(entry, 'Nenhum valor digitado');
        return false
    }
    else if (algorithm.value == '') {
        renderError(algorithm, 'Nenhum algoritmo selecionado');
        return false
    }
    else if (algorithm.value == 'cezarCipher' && increment[1].value == '') {
        renderError(increment[1], 'Incremento não especificado');
        return false
    }
    else if (!codeOptBtn.checked && !decodeOptBtn.checked) {
        renderErrorForRadio()
        return false
    }

    if (algorithm.value == 'cezarCipher') {
        if (codeOptBtn.checked) {
            codeToCezars(entry.value)
        } else {
            decodeFromCezars(entry.value)
        }        
    } else {
        if (codeOptBtn.checked) {
            codeToBase(entry.value)
        } else {
            decodeFromBase(entry.value)
        }
    }
}

function lowerOrGreater() {
    val = increment[1]
    if (val.value < 1) {
        val.value = 1
    } else if (val.value > 25) {
        val.value = 25
    }
}

entry.addEventListener('input', () => { 
    if (entry.value == ''){ 
        renderError(entry, 'Nenhum valor digitado')
    } else {
        noError(entry)
    }} )

algorithm.addEventListener('change', () => {noError(algorithm)} )

increment[1].addEventListener('input', () => { 
    if (increment[1].value == ''){ 
        renderError(increment[1], 'Incremento não especificado')
    } else {
        lowerOrGreater()
        noError(increment[1])
    }} )

// Estilizando as mensagens de erro
function renderError(field, message) {
    const errorMsg = document.querySelector('#' + field.id + ' ~ .errorMsg')

    field.style.outline = '2px solid #aa0505'
    errorMsg.innerHTML = message

}

function renderErrorForRadio() {
    const label = document.querySelector('#increment ~ label')
    label.style.color = "#aa0505"
    label.style.fontWeight = 'bold'
}

function noError(field) {
    const errorMsg = document.querySelector('#' + field.id + ' ~ .errorMsg')

    field.style.outline = ''
    errorMsg.innerHTML = ""

}

function noErrorForRadio() {
    const label = document.querySelector('#increment ~ label')
    label.style.color = ""
    label.style.fontWeight = ''
}

// Cifra de Cézar
const regExUpCase = /[A-Z]/
const regExXpecial = /[^a-zA-Z0-9]+/g

// Codificar
function codeToCezars(entryValue) {
    let entryValueL = entryValue.toLowerCase()
    let entryStr = []
    let entryChars = []
    let outStr = ""

    // Criando uma array com as letras minúsculas da entrada
    for (let i = 0; i < entryValueL.length; i++) {
        entryStr.push(entryValueL[i])
    }
    // Criando um array com os CharCodes de cada letra da string
    for (const index of entryStr) {
        let charC = index.charCodeAt()
        entryChars.push(charC)
    }
    // Incrementar
    for (let charLetter in entryChars) {
        entryChars[charLetter] += Number(increment[1].value)
        if (entryChars[charLetter] > 122) {
            let exceed = entryChars[charLetter] - 122
            entryChars[charLetter] = 96 + exceed
        }
        outStr += String.fromCharCode(entryChars[charLetter])
    }

    // Mantendo as letras maiúsculas e os caracteres especiais
    for (let index = 0; index < entryValue.length; index++) {
        let charac = entryValue[index]
        // Letras maiúsculas
        if (regExUpCase.test(charac)) {
            let repl = outStr[index].toUpperCase()
            outStr = outStr.replaceAt(index, repl)
        }
        // Caracteres especiais
        if (regExXpecial.test(charac) || charac.includes(' ')) {
            outStr = outStr.replaceAt(index, charac)
        }
    }

    responseToOutput(outStr)

}


// Decodificar
function decodeFromCezars(entryValue) {
    let entryValueL = entryValue.toLowerCase()
    let entryStr = []
    let entryChars = []
    let outStr = ""

    // Tornando todas as letras minúsculas e colocando em um array
    for (let i = 0; i < entryValueL.length; i++) {
        entryStr.push(entryValueL[i])
    }
    // Criando um array com os CharCodes das letras da string
    for (const index of entryStr) {
        let charC = index.charCodeAt()
        entryChars.push(charC)
    }
    // Decrementar
    for (let charLetter in entryChars) {
        entryChars[charLetter] -= Number(increment[1].value)
        if (entryChars[charLetter] < 97) {
            let exceed = 97 - entryChars[charLetter]
            entryChars[charLetter] = 123 - exceed
        }
        // Formando a primeira saída
        outStr += String.fromCharCode(entryChars[charLetter])
    }

    // Mantendo as letras maiúsculas e os caracteres especiais
    for (let index = 0; index < entryValue.length; index++) {
        let charac = entryValue[index]
        // Letras maiúsculas
        if (regExUpCase.test(charac)) {
            let repl = outStr[index].toUpperCase()
            outStr = outStr.replaceAt(index, repl)
        }
        // Caracteres especiais
        if (regExXpecial.test(charac) || charac.includes(' ')) {
            outStr = outStr.replaceAt(index, charac)
        }
    }

    responseToOutput(outStr)
}


// base64

// Codificar
function codeToBase(entryValue) {
    let converted64 = btoa(entryValue)

    responseToOutput(converted64)
}

// Decodificar
function decodeFromBase(entryValue) {
    let deconverted64 = atob(entryValue)

    responseToOutput(deconverted64)
}


// Saída do Resultado na tela
const output = document.querySelector('#output')

function responseToOutput(outStr) {

    output.value = outStr
}