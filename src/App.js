import React, { useState, useRef, useEffect} from "react"

const App = () => {
    let synth = window.speechSynthesis
    let utter = new SpeechSynthesisUtterance()
    let recognition = new window.webkitSpeechRecognition();
    let [recognizing, setRecognizing] = useState(false)
    let [x, setX] = useState(0)
    let ref = useRef()

    recognition.continuous = true;
    recognition.lang = "en-US"
    utter.lang = "en-US"

        recognition.onstart = () => {
            setRecognizing(true)
        }
        recognition.onend = () => {
            setRecognizing(false)
        }
        recognition.onresult = (ev) => {
            let data = ev.results[ev.results.length-1];
            cmd(data[0].transcript.trim())
        }
    
      const cmd = (message) => {
        if(ref.current.value.length !== 0) {
            write(ref.current.value, 0)
            ref.current.value = ""
        }else {
            write(message, 0)
        }
     
        switch(message) {
            case "hey":
                    speak("Hey there !")             
                break;
                default:
                    speak("I didn't understand, can you repeat please ?")
                break;
        }
      }
    const speak = (msg) => {
        utter.text = msg
        synth.speak(utter)
        write(msg, 1)
    }
    const write = (msg, type) => {
        let block = document.getElementById("block")
        let new_li = document.createElement("li")
        new_li.textContent = msg;
        if(type === 0) {
            new_li.style.background = "green";
        }else {
            new_li.style.background = "red";
        }
       
        block.appendChild(new_li)
    }
      const starter = () => {
        recognition.start()
        setX(1)
    }
    const stopper = () => {
        recognition.stop()
        setX(0)
    }

    useEffect(() => {
window.addEventListener("keypress", (ev) => {
    if(ev.key === "Enter") {
        if(ref.current.value.length === 0) return;
        cmd(ref.current.value)
    }
})
    })
    return(
     <div className="container">
        <div className="first">
<h2 id="main_title"><i class="fas fa-robot"></i> | Voice Assistant</h2>
<p id="main_description">A simple assistant that gives you plenty of cool informations :D</p>
<button onClick={x === 0 ? starter : stopper} id="btn_action"><i className="fas fa-microphone"></i></button>
<div id="inside_aligner"><svg fill={recognizing ? "green" : "red"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM176 432h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
<p id="status">{recognizing ? "Speak !" : "Press the button"}</p>

</div>
<div id="input_aligner"><input id="input_main" ref={ref} /><i className="fa fa-sticky-note-o" aria-hidden="true" onClick={() => {cmd(ref.current.value); }}></i></div>

        </div>
        <ul className="second" id="block">
            
        </ul>
        </div>
   
    )
}
export default App;