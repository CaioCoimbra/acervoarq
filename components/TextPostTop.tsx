import { IconeICon } from "./Icons";

export default function TextPostTop({ nome, autores }: { nome?: string; autores?: string }) {
    return (
        <div className="flex flex-col h-fit gap-2">
            <h3 className="text-xl font-semibold">{nome ?? "Título do Projeto"}</h3>
            <h4 className="flex gap-1.5 items-center text-sm"><span><IconeICon /></span>{autores ?? "Autor"}</h4>
        </div>
    )
}
