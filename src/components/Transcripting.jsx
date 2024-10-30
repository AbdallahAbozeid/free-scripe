
export default function Transcripting(props) {
    const { downloading, loading } = props
    return (
        <main className="flex-1 p-4 flex flex-col justify-center items-center gap-10 sm:gap-12 md:gap-14 pb-28">
            <h1 className="font-semibold bold text-4xl sm:text-5xl md:text-6xl text-blue-400">Transcripting</h1>
            <p className="-mt-12 text-slate-400">{!loading ? "warming up cylinders" : "core cylinder engaged"}</p>
            <div className="flex flex-col justify-between items-start gap-4 w-full max-w-[400px]">
                {[0, 1, 2].map((val) => {
                    return (
                        <div key={val}
                            className={'bg-slate-400 h-2 sm:h-3 md:h-4 rounded-md w-full bar bar-' + val}></div>
                    )
                })}</div>
        </main >
    )
}
