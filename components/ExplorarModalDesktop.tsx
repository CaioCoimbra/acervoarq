import { IconeLupa, IconeFlexa } from "./Icons"

interface ExplorarModalDesktopProps {
    ativado: boolean
    setAtivado: (valor: boolean) => void
}

export default function ExplorarModalDesktop(props: ExplorarModalDesktopProps) {
    if (!props.ativado) return null

    const liStyle = "flex items-center gap-1 h-5 hover:text-white cursor-pointer transition-all duration-300ms hover:gap-3"

    return (
        <div className="hidden md:flex flex-col justify-center absolute w-full left-0 top-0 mt-[6vh]">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md h-screen" />
            <div className="flex justify-center w-full bg-zinc-900/95 backdrop-blur-lg mb-30" onMouseLeave={() => props.setAtivado(false)}>
                <div className="flex flex-col gap-5 w-155 pt-10 pb-20 ">
                    <div className="flex gap-3">
                        <span className="py-1">{IconeLupa}</span>
                        <input className="flex flex-1 text-2xl" type="text" placeholder="Buscar..." />
                    </div>
                    <div className="flex flex-col gap-5">
                        <h1 className="text-xl">Sugestões</h1>
                        <ul className="flex flex-col gap-3">
                            <li className={liStyle}>Sugestão {<IconeFlexa />}</li>
                            <li className={liStyle}>Sugestão {<IconeFlexa />}</li>
                            <li className={liStyle}>Sugestão {<IconeFlexa />}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )   
}