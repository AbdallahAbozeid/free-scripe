import { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
export default function HomePage(props) {
    const { setFile, setAudioStream } = props
    const [recordingStatus, setRecordingStatus] = useState("inactive")
    const [duration, setDuration] = useState(0)
    const mediaRecorder = useRef(null)
    const mediaStream = useRef(null)
    const mimeType = 'audio/webm'

    async function startRecording() {
        console.log('Start Recording')
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })
            mediaStream.current = stream
        }
        catch (err) {
            console.log(err.message)
            return
        }
        setRecordingStatus("active")
        const media = new MediaRecorder(mediaStream.current, { type: mimeType })
        mediaRecorder.current = media
        let localChuncks = []
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') { return }
            if (event.data.size === 0) { return }
            localChuncks.push(event.data)
        }
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(localChuncks, { type: mimeType })
            setAudioStream(audioBlob)
            console.log('Stop Recording')
        }
        mediaRecorder.current.start()
    }

    async function stopRecording() {
        mediaRecorder.current.stop()
        mediaStream.current.getTracks().forEach(track => track.stop())
        setRecordingStatus("inactive")
        setDuration(0)
    }
    useEffect(() => {
        if (recordingStatus == "inactive") { return }
        const interval = setInterval(() => {
            setDuration(curr => curr + 1)
        }, 1000)
        return () => clearInterval(interval)
    })
    return (
        <main className="flex-1 p-4 flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 pb-28">
            <h1 className="font-semibold bold text-5xl sm:text-6xl md:text-7xl">Free<span className="text-blue-400">Scribe</span></h1>
            <h3 className="font-medium md:text-lg -mt-4 mb-4">Record <span className="text-blue-400">&rarr;</span>
                Transcript <span className="text-blue-400">&rarr;</span> translate</h3>
            <button onClick={(recordingStatus === "inactive") ? startRecording : stopRecording}
                className={"text-base text-blue-900 flex justify-between items-center w-64 max-w-full px-4 py-2 gap-2 rounded-full border border-blue-400 hover:border-transparent custom-btn" + (recordingStatus === 'active' ? ' text-rose-400' : "")}>
                <p className="flex-1 text-left">{(recordingStatus === 'inactive') ? 'Record' : 'Done recording'}</p>
                {(recordingStatus === "active" ? <span>{duration}s</span> : <span></span>)}
                <i className='fa-solid fa-microphone'></i>
            </button>
            <p className="text-base">Or <label className="cursor-pointer text-blue-400 hover:text-blue-600 duration-200">Upload
                <input onChange={(e) => {
                    const tempFile = e.target.files[0]
                    setFile(tempFile)
                }} type="file" className="hidden" accept=".mp3,.wave,.m4a" /></label> an Existing mp3 file</p>
            <p className="italic text-sm sm:text-base text-slate-400">Free now, free forever</p>
        </main>
    )
}

HomePage.propTypes = {
    setFile: PropTypes.func.isRequired,
    setAudioStream: PropTypes.func.isRequired
}