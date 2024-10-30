
export default function Transcription(props) {
    const { output, handleCopy, handleDownload } = props
    const textStr = output.map(ele => ele.text).join(" ")
    console.log(textStr)
    return (
        <> <div className="max-w-lg mt-4 p-4 bg-slate-100 shadow-lg rounded-xl">{output ? textStr : '...'}</div>
            <div className="flex items-center justify-between w-12">
                <button onClick={() => handleCopy(textStr)} title="copy" className="duration-200 hover:text-blue-400 text-base"><i className="fa-solid fa-copy"></i></button>
                <button onClick={() => handleDownload(textStr)} title="download" className="duration-200 hover:text-blue-400 text-base"><i className="fa-solid fa-file-arrow-down"></i></button>
            </div></>
    )
}
