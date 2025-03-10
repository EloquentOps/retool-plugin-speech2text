import css from './style.module.css'
import { version } from '../package.json'

const Ret = window.Retool

let toggleBtn
let errWrapper
let isRec = false

const errors = {
    'not-allowed': 'You need to allow "Microphone" and "Storage and cookies" in Custom Component panel.',
    'no-speech': 'Stop due no speech around.'
}

const buildUI = (model) => {
    const { btnColor = '#3170f9' } = model || {}
    document.body.classList.add(css.speecher)

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

    const { labelStart = 'Start' } = model || {}

    toggleBtn = document.createElement('button')
    toggleBtn.textContent = labelStart
    toggleBtn.classList.add(css.button)
    toggleBtn.style.backgroundColor = btnColor
    row.append(toggleBtn)
    toggleBtn.addEventListener('click', () => {
        if(isRec){
            stopSpeecher()
            isRec = false
        }else{
            if(!recognition) buildSpeecher(model)
            startSpeecher()
            isRec = true
        }
    })

    document.body.append(errWrapper)

}




let inited = false
let recognition
let paused = false
let isError = false

const messages = []


const buildSpeecher = (model) => {
    const { 
        continuous = false, 
        interimResults = true, 
        lang = 'en-US', 
        maxAlternatives = 1, 
        keepActive = true,
        labelStart = 'Start', 
        labelStop = 'Stop',
    } = model || {}

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
        errWrapper.style.visibility = 'hidden'
        isError = false
        toggleBtn.textContent = labelStop
    }

    recognition.onerror = function(event) { 
        errWrapper.style.visibility = 'visible'
        errWrapper.innerHTML = errors[event.error]

        if(event.error === 'no-speech' && keepActive){

        }else{
            errWrapper.style.visibility = 'visible'
            isError = true
        }
    }
    recognition.onend = function() { 
        toggleBtn.textContent = labelStart
        if(isError) return
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

    const { preload = false } = model || {}
    if(preload){
        console.log('Speech2Text: component is preloaded')
        // just return true to avoid buildUI for preload purposes
        return true
    }

    if(!inited){
        buildUI(model)
        inited = true
    }
})


