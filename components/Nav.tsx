import NavItem from "./NavItem";
import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <ul className="hidden md:flex gap-11 text-lg">
                <li className="cursor-pointer hover:text-white"><Link href="/">Início</Link></li>
                <NavItem texto="Projetos & Ações ▾" modal >
                    <li>Futuros Possíveis</li>
                    <li>Processos e Experimentos</li>
                </NavItem>
                <NavItem texto="Pesquisa & Análise ▾" modal >
                    <li>Dados de Pesquisa</li>
                    <li>Artigos e Textos</li>
                    <li>Territórios e Lugares</li>
                </NavItem>
            </ul>
        </nav>
    )

}
