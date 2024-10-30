
export default function Header() {
    return (
        <header className="flex justify-between items-center p-4">
            <a href="/">
                <h1 className="font-bold">Free<span className="text-blue-400 bold">Scribe</span></h1>
            </a>
            <a href="/"><button className="flex items-center gap-1 text-blue-900 py-1 px-2 rounded-full border border-blue-400 hover:border-transparent custom-btn">
                <p>New</p>
                <i className="fa-solid fa-plus"></i>
            </button>
            </a>
        </header>
    )
}
