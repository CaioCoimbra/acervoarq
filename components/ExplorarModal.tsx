import ExplorarItem from "./ExplorarItem"
import { IconeX, IconeLupa } from "./Icons"

export default function ExplorarModal(props) {
    if (!props.ativado) return null



    return (
        <>
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
            <div className="flex justify-between bg-black/40 bottom-0 fixed h-15 w-full left-0 px-3 py-3 gap-3">
                <input className="bg-black/80 flex-1 rounded-2xl pl-3" type="text" placeholder="Escreva Aqui..." />
                <button className="bg-black/80 flex justify-center items-center rounded-full w-[10vw]">{IconeLupa}</button>
            </div>
        </>
    )
}