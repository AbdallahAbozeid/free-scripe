import { LANGUAGES } from "../utils/presets"
export default function Translation(props) {
    const { handleCopy, handleDownload, toLang, setToLang, translation, translating, generateTranslation } = props
    return (
        <>
            {!translating && (<>
                <p className="text-slate-400 text-sm italic -mb-4 sm:-mb-6 w-80 sm:w-96">To Language:</p>
                <div className="flex justify-between items-center max-w-96 text-sm   gap-2 sm:text-base">
                    <select className="flex-none md:flex-1 rounded-lg" value={toLang} onChange={(e) => setToLang(e.target.value)}>
                        <option value="Select language">Select language</option>
                        {Object.entries(LANGUAGES).map((value, key) => {
                            return (
                                <option key={key} value={value[1]}>{value[0]}</option>
                            )
                        })}
                    </select>
                    <button onClick={generateTranslation} className="text-blue-400 py-2 px-3 rounded-full font-bold   custom-btn">Translate</button>
                </div>
            </>)}
            {translating && !translation &&
                (<div className="gird place-items-center">
                    <i className="fa-solid fa-spinner m-10 text-2xl animate-spin"></i>
                </div>)
            }
            {translation && (<>
                <div className="max-w-lg mt-4 p-4 bg-slate-100 shadow-lg rounded-xl">{translation}</div>
                <div className="flex items-center justify-between w-12">
                    <button onClick={() => handleCopy(translation)} title="copy" className="duration-200 hover:text-blue-400 text-base"><i className="fa-solid fa-copy"></i></button>
                    <button onClick={() => handleDownload(translation)} title="download" className="duration-200 hover:text-blue-400 text-base"><i className="fa-solid fa-file-arrow-down"></i></button>
                </div>
            </>)}
        </>
    )
}
