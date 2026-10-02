import NavItem from "./NavItem";

export default function Nav() {
    return (
        <nav>
            <ul className="hidden md:flex gap-11 text-lg">
                <NavItem texto="Ínicio"/>
                <NavItem texto="Projetos & Ações ▾"/>
                <NavItem texto="Pesquisa & Análise ▾"/>
            </ul>
        </nav>
    )

}