import Header from "../../../components/Header";
import ImagePost from "../../../components/ImagesPost";
import { Main } from "../../../components/Main";

export default function Post() {
    return (
        <>
            <Header />
            <Main title="Nome do Projeto">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row">
                        <ImagePost />
                        <ul className="flex flex-col text-lg gap-3">
                            <li className="font-semibold">Autor: </li>
                            <li className="font-semibold">Data: </li>
                            <li className="font-semibold">Localização: </li>
                            <li className="font-semibold">Catégoria: </li>
                            <li className="font-semibold">Área: </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold">Descrição</h3>
                        <p>A fusão entre a ancestralidade do Oriente Médio e a estética contemporânea encontra sua expressão máxima na arquitetura de inspiração árabe. Mais do que meras estruturas físicas, edifícios desenhados sob essa vertente contam histórias por meio de volumes dramáticos, jogos de luz e sombra e uma geometria impecável que desafia a percepção espacial. O grande triunfo do projeto reside na reinterpretação dos elementos tradicionais da arquitetura islâmica para a escala urbana moderna. A fachada do edifício é envolvida por um dinâmico muxarabi em grande escala — treliças recortadas com precisão milimétrica que filtram a luz solar intensa ao longo do dia. Esse elemento não apenas garante conforto térmico e eficiência energética, reduzindo a carga de climatização interna, mas também projeta um espetáculo mutável de renda e sombra nos espaços interiores.</p>
                    </div>
                </div>
            </Main>
        </>
    )
}