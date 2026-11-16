import { useState } from "react";
import NavItem from "./NavItem";
import NavSubItem from "./NavSubItem";

export default function Nav() {

    const [ativo, setAtivo] = useState<string | null>(null);

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
                    <NavSubItem
                        title="Futuros Possíveis"
                        texto="Especulações projetuais, cenários urbanos emergentes e propostas visionárias que investigam novos modos de habitar, construir e imaginar a cidade contemporânea."
                    />
                    <NavSubItem
                        title="Processos e Experimentos"
                        texto="Registros de investigação projetual, croquis preliminares, ensaios materiais, maquetes de estudo e testes construtivos que documentam o percurso criativo antes da obra consolidada."
                    />
                </NavItem>

                <NavItem
                    texto="Pesquisa & Análise ▾"
                    modal
                    isOpen={ativo === "Pesquisa & Análise ▾"}
                    onHover={() => setAtivo("Pesquisa & Análise ▾")}
                    onLeave={() => setAtivo(null)}
                >
                    <NavSubItem
                        title="Dados de Pesquisa"
                        texto="Levantamentos técnicos, mapeamentos cartográficos, indicadores urbanos, séries históricas e bases documentais que fundamentam as análises e decisões de projeto."
                    />
                    <NavSubItem
                        title="Artigos e Textos"    
                        texto="Ensaios críticos, memoriais teóricos, publicações acadêmicas e reflexões escritas que articulam a prática arquitetônica com o pensamento urbano e cultural."
                    />
                    <NavSubItem
                        title="Territórios e Lugares"
                        texto="Estudos de sítio, leituras da paisagem, registros fotográficos e intervenções em diferentes escalas geográficas, explorando a relação entre arquitetura, memória e contexto."
                    />
                </NavItem>
            </ul>
        </nav>
    );
}