import { IconeCategoria, IconeData, IconePin } from "./Icons";

interface TextProps {
    descricao_resumida: string
    localizacao: string
    data: string
    categoria: string
}

export default function TextPostBottom(props: TextProps) {

     const listyle = "flex gap-1.5 items-center"

    return (
        <div className="flex flex-col-reverse md:flex-col h-full">
            <div className="h-30 md:h-full overflow-hidden">
                <p className="text-justify line-clamp-14 text-sm whitespace-pre-line">
                    {props.descricao_resumida}</p>
            </div>
            <ul className="flex text-xs gap-5 pb-2 md:pb-0">
                <li className={listyle}><span><IconePin /></span>{props.localizacao}</li>
                <li className={listyle}><span><IconeData /></span>{props.data}</li>
                <li className={listyle}><span><IconeCategoria /></span>{props.categoria}</li>
            </ul>
        </div>
    )
}