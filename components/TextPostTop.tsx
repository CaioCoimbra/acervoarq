import { IconeICon } from "./Icons";

export default function TextPostTop() {
    return (
        <div className="flex flex-col h-fit gap-2">
            <h3 className="text-xl font-semibold">Título do Projeto</h3>
            <h4 className="flex gap-1.5 items-center text-sm"><span><IconeICon /></span>Autor</h4>
        </div>
    )
}