
export default function FileDisplay(props) {
    const { handleFormSubmission, file, audioStream, handelAudioReset, setDownloading } = props
    console.log(file ? file : audioStream)
    return (
        <main className="flex-1 p-4 flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 pb-28">
            <h1 className="font-semibold bold text-4xl sm:text-5xl md:text-6xl">Your <span className="text-blue-400">{(file ? 'file' : 'voice')}</span></h1>
            <div className="flex justify-between items-center gap-2 w-64 max-w-full -mt-4 mb-4 text-sm sm:text-base">
                <p className="text-left font-semibold">Name</p>
                <p className="flex-1 text-blue-800 text-right">{file ? file?.name : "recorded voice"}</p>
            </div>
            <div className="flex justify-between items-center gap-4 w-80 max-w-full">
                <p className="italic text-slate-400 cursor-pointer" onClick={handelAudioReset}>reset</p>
                <button onClick={handleFormSubmission}
                    className="flex justify-between items-center gap-2 py-2 px-3 rounded-full text-blue-900 border border-blue-400 hover:border-transparent custom-btn">
                    <p className="font-semibold">Transcripe</p>
                    <i className="fa-solid fa-pen-nib"></i>
                </button>
            </div>
        </main>
    )
}
