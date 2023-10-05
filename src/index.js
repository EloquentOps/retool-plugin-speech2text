import css from './style.module.css'
import { version } from '../package.json'

const Ret = window.Retool

let startBtn
let stopBtn
let errWrapper


const errors = {
    'not-allowed': 'You need to allow "Microphone" and "Storage and cookies" in Custom Component panel.',
    'no-speech': 'Stop due no speech around.'
}

const buildUI = (model) => {
    console.log('buildUI')
    document.body.classList.add(css.speecher)

    const titleWrapper = document.createElement('div')
    titleWrapper.classList.add(css.title)
    titleWrapper.innerHTML = 'Speech-2-Text' + ' (v'+version+')'
    document.body.append(titleWrapper)

    errWrapper = document.createElement('div')
    errWrapper.classList.add(css.err)
    errWrapper.style.visibility = 'hidden'

    const speechRec = window.SpeechRecognition || window.webkitSpeechRecognition

    if(!speechRec){
        errWrapper.style.visibility = 'visible'
        errWrapper.innerHTML = 'Your browser is not supported, sorry.'
    }

    const row = document.createElement('div')
    row.classList.add(css.row)
    document.body.append(row)

    startBtn = document.createElement('button')
    startBtn.textContent = 'Start'
    startBtn.classList.add(css.button)
    row.append(startBtn)
    startBtn.addEventListener('click', () => {
        if(!recognition) buildSpeecher(model)
        startSpeecher()
    })

    stopBtn = document.createElement('button')
    stopBtn.textContent = 'Stop'
    stopBtn.classList.add(css.button, css.inactive)
    row.append(stopBtn)
    stopBtn.addEventListener('click', () => {
        stopSpeecher()
    })

    document.body.append(errWrapper)

    

}




let inited = false
let recognition
let paused = false
let isError = false

const messages = []

const cleanBtn = () => {
    startBtn.classList.remove(css.active, css.inactive)
    stopBtn.classList.remove(css.active, css.inactive)
}

const buildSpeecher = (model) => {
    console.log('buildSpeecher')
    const { continuous = false, interimResults = true, lang = 'en-US', maxAlternatives = 1, keepActive = true} = model || {}

    recognition = new webkitSpeechRecognition()
    recognition.continuous = continuous
    recognition.interimResults = interimResults
    recognition.lang = lang
    recognition.maxAlternatives = maxAlternatives

    recognition.onresult = (event) => {
        const res = event.results[0]
        const a = res[0]
        const msg = a.transcript.trim()
        
        if(res.isFinal) {
            messages.push(msg)
            Ret.modelUpdate({lastMessage:msg, messages})
        }
    }

    recognition.onstart = function() { 
        console.log('onstart')
        errWrapper.style.visibility = 'hidden'
        isError = false

        cleanBtn()
        stopBtn.classList.add(css.active)
        startBtn.classList.add(css.inactive)
    }

    recognition.onerror = function(event) { 
        console.log('onerror', event)
        cleanBtn()
        startBtn.classList.add(css.inactive)
        stopBtn.classList.add(css.inactive)

        errWrapper.style.visibility = 'visible'
        errWrapper.innerHTML = errors[event.error]

        if(event.error === 'no-speech' && keepActive){

        }else{
            errWrapper.style.visibility = 'visible'
            isError = true
        }
    }
    recognition.onend = function() { 
        if(isError) return
        console.log('onend')

        cleanBtn()
        startBtn.classList.add(css.active)
        stopBtn.classList.add(css.inactive)
        
        if(keepActive && !paused) startSpeecher()
    }

}

const startSpeecher = () => {
    paused = false
    recognition.start()
}

const stopSpeecher = () => {
    paused = true
    recognition.stop()
}


Ret.subscribe(_model => {
    const model = _model || {}

    if(!model?.lastMessage && !model?.messages){
        console.log('Speech2Text: model changed from editor')
    }

    if(!inited){
        buildUI(model)
        inited = true
    }
})


