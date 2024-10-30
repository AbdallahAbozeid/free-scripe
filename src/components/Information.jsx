import { useRef, useState, useEffect } from "react"
import Transcription from "./Transcription"
import Translation from "./Translation"

export default function Information(props) {

    const { output } = props
    const [tab, setTab] = useState("transcription")
    const [toLang, setToLang] = useState("Select language")
    const [translating, setTranslating] = useState(false)
    const [translation, setTranslation] = useState(null)
    const worker = useRef(null)
    function handleCopy(text) {
        navigator.clipboard.writeText(text)
    }
    function handleDownload(text) {
        const element = document.createElement('a')
        const file = new Blob([text], { type: 'text/palin' })
        element.href = URL.createObjectURL(file)
        element.download = `FreeScribe_${new Date().toDateString()}.txt`
        document.body.appendChild(element)
        element.click()
    }
    useEffect(() => {
        if (!worker.current) {
            worker.current = new Worker(new URL('../utils/translate.worker.js', import.meta.url), {
                type: 'module'
            })
        }
        const onMessageReceived = async (e) => {
            switch (e.data.status) {
                case 'initiate':
                    console.log('DOWNLOADING')
                    break;
                case 'progress':
                    console.log('LOADING')
                    break;
                case 'update':
                    setTranslation(e.data.output)
                    console.log(e.data.output)
                    break;
                case 'complete':
                    setTranslating(false)
                    console.log("DONE")
                    break;
            }
        }
        worker.current.addEventListener('message', onMessageReceived)
        return () => worker.current.removeEventListener('message', onMessageReceived)
    })

    const outText = output.map(ele => ele.text).join(" ")
    function generateTranslation() {
        if (translating || toLang === 'Select language') { return }
        setTranslating(true)
        // worker.current.postMessage({
        //     text: outText,
        //     src_language: 'eng_Latn',
        //     tgt_lng: toLang
        // })
        setTranslation("translation is broken right now 😢")
    }

    return (
        <main className="flex-1 p-4 flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 pb-28">
            <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl">Your <span className="text-blue-400 bold">Transcription</span></h1>
            <div className="grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden">
                <button onClick={() => setTab('transcription')}
                    className={"px-4 py-1 font-medium text-blue-400 hover:text-blue-600 duration-200" + (tab === "transcription" ? " bg-blue-400 text-white hover:text-white" : "")}>Transcription</button>
                <button onClick={() => setTab('translation')}
                    className={"px-4 py-1 font-medium text-blue-400 hover:text-blue-600 duration-200" + (tab === "translation" ? " bg-blue-400 text-white hover:text-white" : "")}>Translation</button>
            </div>
            {(tab === 'transcription') ?
                <Transcription output={output} handleCopy={handleCopy} handleDownload={handleDownload} /> :
                <Translation handleCopy={handleCopy} handleDownload={handleDownload} toLang={toLang} setToLang={setToLang} translating={translating} translation={translation} generateTranslation={generateTranslation} />}

        </main>
    )
}
