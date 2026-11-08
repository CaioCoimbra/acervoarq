import { useState } from "react"
import ExplorarModalMobile from "./ExplorarModalMobile"
import { IconeLupa } from "./Icons"
import ExplorarModalDesktop from "./ExplorarModalDesktop"

export default function HeaderSearch() {
    const [ativado, setAtivado] = useState(false)

    return (
        <>
            <div className="flex">
                <button className="hidden md:block text-xl cursor-pointer" onClick={() => setAtivado(!ativado)}>
                    {IconeLupa}
                </button>

                <button className="text-2xl cursor-pointer md:hidden" onClick={() => setAtivado(true)}>
                    ☰
                </button>
            </div>
            <ExplorarModalMobile ativado={ativado} setAtivado={setAtivado} />
            <ExplorarModalDesktop ativado={ativado} setAtivado={setAtivado} />
        </>
    )
}