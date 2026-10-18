import ExplorarItem from "./ExplorarItem"
import { IconeX, IconeLupa } from "./Icons"

interface ExplorarModalMobileProps {
    ativado: boolean
    setAtivado: (valor: boolean) => void
}

export default function ExplorarModalMobile(props: ExplorarModalMobileProps) {
    if (!props.ativado) return null

    return (
        <div className="md:hidden">
            <div className="flex flex-col items-end h-screen w-screen bg-black/98 backdrop-blur-sm text-white text-right fixed top-0 pt-5 px-3 left-0 font-semibold">
                <span className="pb-5" onClick={() => props.setAtivado(false)}>{IconeX}</span>
                <h1 className="text-3xl pb-5">Explorar</h1>
                <ul className="flex flex-col gap-5 text-2xl">
                    <li>Início</li>
                    <ExplorarItem texto="Projetos & Ações" >
                        <li>Futuros Possíveis</li>
                        <li>Processos e Experimentos</li>
                    </ExplorarItem>
                    <ExplorarItem texto="Pesquisa & Análise" >
                        <li>Dados de Pesquisa</li>
                        <li>Artigos e Textos</li>
                        <li>Territórios e Lugares</li>
                    </ExplorarItem>
                </ul>
            </div>
            <div className="flex justify-between bottom-0 fixed h-15 w-full left-0 px-3 py-3 gap-2">
                <input className="backdrop-blur-3xl flex-1 rounded-2xl pl-3 shadow-[0_0_18px_3px_rgba(0,0,0,0.3)]" type="text" placeholder="Buscar..." />
                <button className="backdrop-blur-3xl flex justify-center items-center rounded-full w-[10vw] shadow-[0_0_18px_3px_rgba(0,0,0,0.3)]">{IconeLupa}</button>
            </div>
        </div>
    )
}