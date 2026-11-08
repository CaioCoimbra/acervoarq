import { IconeCategoria, IconeData, IconePin } from "./Icons";

export default function TextPostBottom() {

     const listyle = "flex gap-1.5 items-center"

    return (
        <div className="flex flex-col-reverse md:flex-col h-full">
            <div className="h-30 md:h-full overflow-hidden">
                <p className="text-justify line-clamp-14 text-sm">
                    A fusão entre a ancestralidade do Oriente Médio e a estética contemporânea encontra sua expressão máxima na arquitetura de inspiração árabe. Mais do que meras estruturas físicas, edifícios desenhados sob essa vertente contam histórias por meio de volumes dramáticos, jogos de luz e sombra e uma geometria impecável que desafia a percepção espacial.
                    O grande triunfo do projeto reside na reinterpretação dos elementos tradicionais da arquitetura islâmica para a escala urbana moderna. A fachada do edifício é envolvida por um dinâmico muxarabi em grande escala — treliças recortadas com precisão milimétrica que filtram a luz solar intensa ao longo do dia. Esse elemento não apenas garante conforto térmico e eficiência energética, reduzindo a carga de climatização interna, mas também projeta um espetáculo mutável de renda e sombra nos espaços interiores.</p>
            </div>
            <ul className="flex text-xs gap-5 pb-2 md:pb-0">
                <li className={listyle}><span><IconePin /></span>Localização</li>
                <li className={listyle}><span><IconeData /></span>Data</li>
                <li className={listyle}><span><IconeCategoria /></span>Categoria</li>
            </ul>
        </div>
    )
}