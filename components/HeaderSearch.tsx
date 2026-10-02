import { useState } from "react"
import ExplorarModal from "./ExplorarModal"
import { IconeLupa } from "./Icons"

export default function HeaderSearch() {
    const [ativado, setAtivado] = useState(false)

    return (
        <>
            <div className="flex">
                <input className="hidden md:bg-white rounded-lg text-black" type="text" />
                <button className="hidden md:block text-xl cursor-pointer">
                    {IconeLupa}
                </button>
                
                <button className="text-xl cursor-pointer md:hidden" onClick={() => setAtivado(true)}>
                    ☰
                </button>
            </div>
            <ExplorarModal ativado={ativado} setAtivado={setAtivado} />
        </>
    )
}