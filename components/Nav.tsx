import { useState } from "react";
import NavItem from "./NavItem";

export default function Nav() {

    const [ativo, setAtivo] = useState<string | null>(null);

    const liStyle = 'hover:text-white cursor-pointer w-fit' 

    return (
        <nav>
            <ul className="hidden md:flex gap-11 text-lg font-semibold">
                <NavItem 
                    texto="Projetos & Ações ▾" 
                    modal 
                    isOpen={ativo === "Projetos & Ações ▾"}
                    onHover={() => setAtivo("Projetos & Ações ▾")}
                    onLeave={() => setAtivo(null)}
                >
                    <li className={liStyle}>Futuros Possíveis</li>
                    <li className={liStyle}>Processos e Experimentos</li>
                </NavItem>

                <NavItem 
                    texto="Pesquisa & Análise ▾" 
                    modal 
                    isOpen={ativo === "Pesquisa & Análise ▾"}
                    onHover={() => setAtivo("Pesquisa & Análise ▾")}
                    onLeave={() => setAtivo(null)}
                >
                    <li className={liStyle}>Dados de Pesquisa</li>
                    <li className={liStyle}>Artigos e Textos</li>
                    <li className={liStyle}>Territórios e Lugares</li>
                </NavItem>
            </ul>
        </nav>
    );
}